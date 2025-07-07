import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Int "mo:base/Int";

actor VoiceChain {
    // Types
    public type User = {
        id: Text;
        username: Text;
        voiceId: Text;
        assistantName: Text;
        language: Text;
        createdAt: Int;
    };

    public type Wallet = {
        id: Text;
        address: Text;
        balance: Float;
        owner: Text;
    };

    public type Token = {
        symbol: Text;
        name: Text;
        balance: Float;
        value: Float;
        change24h: Float;
    };

    public type Transaction = {
        id: Text;
        transactionType: Text; // 'send' | 'receive' | 'swap' | 'stake'
        amount: Float;
        token: Text;
        recipient: ?Text;
        sender: ?Text;
        status: Text; // 'pending' | 'completed' | 'failed'
        timestamp: Int;
        hash: Text;
    };

    public type VoiceCommand = {
        text: Text;
        language: Text;
        timestamp: Int;
        response: ?Text;
    };

    public type CryptoPrice = {
        symbol: Text;
        price: Float;
        change24h: Float;
        volume24h: Float;
        marketCap: Float;
    };

    // State
    private stable var userEntries : [(Text, User)] = [];
    private stable var walletEntries : [(Text, Wallet)] = [];
    private stable var transactionEntries : [(Text, Transaction)] = [];
    private stable var voiceCommandEntries : [(Text, VoiceCommand)] = [];
    
    private var users = HashMap.HashMap<Text, User>(10, Text.equal, Text.hash);
    private var wallets = HashMap.HashMap<Text, Wallet>(10, Text.equal, Text.hash);
    private var transactions = HashMap.HashMap<Text, Transaction>(50, Text.equal, Text.hash);
    private var voiceCommands = HashMap.HashMap<Text, VoiceCommand>(100, Text.equal, Text.hash);

    // Initialize state from stable storage
    system func preupgrade() {
        userEntries := Iter.toArray(users.entries());
        walletEntries := Iter.toArray(wallets.entries());
        transactionEntries := Iter.toArray(transactions.entries());
        voiceCommandEntries := Iter.toArray(voiceCommands.entries());
    };

    system func postupgrade() {
        users := HashMap.fromIter<Text, User>(userEntries.vals(), userEntries.size(), Text.equal, Text.hash);
        wallets := HashMap.fromIter<Text, Wallet>(walletEntries.vals(), walletEntries.size(), Text.equal, Text.hash);
        transactions := HashMap.fromIter<Text, Transaction>(transactionEntries.vals(), transactionEntries.size(), Text.equal, Text.hash);
        voiceCommands := HashMap.fromIter<Text, VoiceCommand>(voiceCommandEntries.vals(), voiceCommandEntries.size(), Text.equal, Text.hash);
    };

    // User Management
    public func createUser(
        username: Text,
        voiceId: Text,
        assistantName: Text,
        language: Text
    ) : async Result.Result<User, Text> {
        let userId = username # "_" # Int.toText(Time.now());
        
        // Check if username already exists
        for ((_, user) in users.entries()) {
            if (user.username == username) {
                return #err("Username already exists");
            };
        };

        let newUser : User = {
            id = userId;
            username = username;
            voiceId = voiceId;
            assistantName = assistantName;
            language = language;
            createdAt = Time.now();
        };

        users.put(userId, newUser);
        #ok(newUser)
    };

    public query func getUser(userId: Text) : async ?User {
        users.get(userId)
    };

    public query func getUserByUsername(username: Text) : async ?User {
        for ((_, user) in users.entries()) {
            if (user.username == username) {
                return ?user;
            };
        };
        null
    };

    public query func getAllUsers() : async [User] {
        Iter.toArray(users.vals())
    };

    // Wallet Management
    public func createWallet(
        address: Text,
        owner: Text,
        initialBalance: Float
    ) : async Result.Result<Wallet, Text> {
        let walletId = address # "_" # Int.toText(Time.now());
        
        let newWallet : Wallet = {
            id = walletId;
            address = address;
            balance = initialBalance;
            owner = owner;
        };

        wallets.put(walletId, newWallet);
        #ok(newWallet)
    };

    public query func getWallet(walletId: Text) : async ?Wallet {
        wallets.get(walletId)
    };

    public query func getWalletsByOwner(owner: Text) : async [Wallet] {
        let userWallets = Array.filter<Wallet>(
            Iter.toArray(wallets.vals()),
            func(wallet: Wallet) : Bool { wallet.owner == owner }
        );
        userWallets
    };

    public func updateWalletBalance(walletId: Text, newBalance: Float) : async Result.Result<Wallet, Text> {
        switch (wallets.get(walletId)) {
            case null { #err("Wallet not found") };
            case (?wallet) {
                let updatedWallet : Wallet = {
                    id = wallet.id;
                    address = wallet.address;
                    balance = newBalance;
                    owner = wallet.owner;
                };
                wallets.put(walletId, updatedWallet);
                #ok(updatedWallet)
            };
        }
    };

    // Transaction Management
    public func createTransaction(
        transactionType: Text,
        amount: Float,
        token: Text,
        recipient: ?Text,
        sender: ?Text
    ) : async Result.Result<Transaction, Text> {
        let transactionId = Int.toText(Time.now()) # "_" # token;
        let hash = "0x" # Int.toText(Time.now()); // Simplified hash generation
        
        let newTransaction : Transaction = {
            id = transactionId;
            transactionType = transactionType;
            amount = amount;
            token = token;
            recipient = recipient;
            sender = sender;
            status = "pending";
            timestamp = Time.now();
            hash = hash;
        };

        transactions.put(transactionId, newTransaction);
        #ok(newTransaction)
    };

    public query func getTransaction(transactionId: Text) : async ?Transaction {
        transactions.get(transactionId)
    };

    public query func getTransactionsByUser(userId: Text) : async [Transaction] {
        let userTransactions = Array.filter<Transaction>(
            Iter.toArray(transactions.vals()),
            func(tx: Transaction) : Bool {
                switch (tx.sender, tx.recipient) {
                    case (?s, _) { s == userId };
                    case (_, ?r) { r == userId };
                    case (null, null) { false };
                }
            }
        );
        userTransactions
    };

    public func updateTransactionStatus(transactionId: Text, status: Text) : async Result.Result<Transaction, Text> {
        switch (transactions.get(transactionId)) {
            case null { #err("Transaction not found") };
            case (?tx) {
                let updatedTransaction : Transaction = {
                    id = tx.id;
                    transactionType = tx.transactionType;
                    amount = tx.amount;
                    token = tx.token;
                    recipient = tx.recipient;
                    sender = tx.sender;
                    status = status;
                    timestamp = tx.timestamp;
                    hash = tx.hash;
                };
                transactions.put(transactionId, updatedTransaction);
                #ok(updatedTransaction)
            };
        }
    };

    // Voice Command Management
    public func recordVoiceCommand(
        text: Text,
        language: Text,
        response: ?Text
    ) : async Result.Result<VoiceCommand, Text> {
        let commandId = Int.toText(Time.now()) # "_voice";
        
        let newCommand : VoiceCommand = {
            text = text;
            language = language;
            timestamp = Time.now();
            response = response;
        };

        voiceCommands.put(commandId, newCommand);
        #ok(newCommand)
    };

    public query func getVoiceCommand(commandId: Text) : async ?VoiceCommand {
        voiceCommands.get(commandId)
    };

    public query func getRecentVoiceCommands(limit: Nat) : async [VoiceCommand] {
        let allCommands = Iter.toArray(voiceCommands.vals());
        let sortedCommands = Array.sort<VoiceCommand>(
            allCommands,
            func(a: VoiceCommand, b: VoiceCommand) : {#less; #equal; #greater} {
                if (a.timestamp > b.timestamp) { #less }
                else if (a.timestamp < b.timestamp) { #greater }
                else { #equal }
            }
        );
        
        if (sortedCommands.size() <= limit) {
            sortedCommands
        } else {
            Array.subArray<VoiceCommand>(sortedCommands, 0, limit)
        }
    };

    // Mock Crypto Prices (in production, this would fetch from external APIs)
    public query func getCryptoPrices() : async [CryptoPrice] {
        [
            {
                symbol = "ICP";
                price = 12.45;
                change24h = 5.67;
                volume24h = 45000000.0;
                marketCap = 5700000000.0;
            },
            {
                symbol = "BTC";
                price = 43250.30;
                change24h = -2.34;
                volume24h = 15000000000.0;
                marketCap = 850000000000.0;
            },
            {
                symbol = "ETH";
                price = 2650.75;
                change24h = 3.21;
                volume24h = 8000000000.0;
                marketCap = 320000000000.0;
            },
            {
                symbol = "USDT";
                price = 1.00;
                change24h = 0.01;
                volume24h = 25000000000.0;
                marketCap = 95000000000.0;
            },
            {
                symbol = "USDC";
                price = 1.00;
                change24h = -0.01;
                volume24h = 3500000000.0;
                marketCap = 25000000000.0;
            }
        ]
    };

    // Voice Processing Functions
    public func processVoiceCommand(command: Text, language: Text, userId: Text) : async Text {
        let lowerCommand = Text.toLowercase(command);
        
        // Record the voice command
        ignore await recordVoiceCommand(command, language, null);
        
        // Simple command processing (in production, this would use AI/NLP)
        if (Text.contains(lowerCommand, #text "balance")) {
            "Your current portfolio balance is $10,992.34. You have 245.67 ICP, 0.0847 ckBTC, and 1.234 ckETH."
        } else if (Text.contains(lowerCommand, #text "send")) {
            "I can help you send crypto. Please specify the amount and recipient address or VoiceChain ID."
        } else if (Text.contains(lowerCommand, #text "buy")) {
            "I can help you buy cryptocurrency. Please specify the amount and which token you'd like to purchase."
        } else if (Text.contains(lowerCommand, #text "stake")) {
            "Staking ICP can earn you up to 15% APY. Would you like me to guide you through the staking process?"
        } else if (Text.contains(lowerCommand, #text "price")) {
            "Current prices: ICP $12.45 (+5.67%), BTC $43,250 (-2.34%), ETH $2,651 (+3.21%)"
        } else if (Text.contains(lowerCommand, #text "portfolio")) {
            "Your portfolio is well-diversified with ICP, ckBTC, and ckETH. Total value: $10,992.34 with a 24h change of +4.12%."
        } else {
            "I understand you're asking about crypto and DeFi. I can help with trading, portfolio management, transactions, and more. What would you like to do?"
        }
    };

    // Utility Functions
    public query func getSystemStats() : async {
        totalUsers: Nat;
        totalWallets: Nat;
        totalTransactions: Nat;
        totalVoiceCommands: Nat;
    } {
        {
            totalUsers = users.size();
            totalWallets = wallets.size();
            totalTransactions = transactions.size();
            totalVoiceCommands = voiceCommands.size();
        }
    };

    public query func healthCheck() : async Text {
        "VoiceChain Backend is running successfully!"
    };
}
