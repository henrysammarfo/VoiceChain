import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Search, Send, Copy, Edit, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Contact {
  id: string;
  name: string;
  voiceId: string;
  address: string;
  avatar?: string;
  favorite: boolean;
}

interface AddressBookProps {
  isOpen: boolean;
  onClose: () => void;
  onSendTo?: (contact: Contact) => void;
}

export const AddressBook: React.FC<AddressBookProps> = ({ isOpen, onClose, onSendTo }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', voiceId: '', address: '' });

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      voiceId: 'alice.voice',
      address: 'rdmx6-jaaaa-aaaah-qcaiq-cai',
      favorite: true
    },
    {
      id: '2',
      name: 'Bob Smith',
      voiceId: 'bob.voice',
      address: 'rrkah-fqaaa-aaaah-qcaiq-cai',
      favorite: false
    },
    {
      id: '3',
      name: 'Carol Williams',
      voiceId: 'carol.voice',
      address: 'ryjl3-tyaaa-aaaah-qcaiq-cai',
      favorite: true
    },
    {
      id: '4',
      name: 'David Brown',
      voiceId: 'david.voice',
      address: 'rdmx6-jaaaa-aaaah-qcaiq-cai',
      favorite: false
    }
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.voiceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddContact = () => {
    if (newContact.name && (newContact.voiceId || newContact.address)) {
      const contact: Contact = {
        id: Date.now().toString(),
        name: newContact.name,
        voiceId: newContact.voiceId || `${newContact.name.toLowerCase().replace(' ', '')}.voice`,
        address: newContact.address || 'rdmx6-jaaaa-aaaah-qcaiq-cai',
        favorite: false
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: '', voiceId: '', address: '' });
      setShowAddContact(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleFavorite = (contactId: string) => {
    setContacts(contacts.map(contact =>
      contact.id === contactId ? { ...contact, favorite: !contact.favorite } : contact
    ));
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Address Book</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowAddContact(true)}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Add Contact Form */}
        {showAddContact && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-3">Add New Contact</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                placeholder="Contact Name"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={newContact.voiceId}
                onChange={(e) => setNewContact({ ...newContact, voiceId: e.target.value })}
                placeholder="VoiceChain ID (e.g., alice.voice)"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={newContact.address}
                onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
                placeholder="Wallet Address (optional)"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleAddContact}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Contact
                </button>
                <button
                  onClick={() => setShowAddContact(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-900">{contact.name}</p>
                        {contact.favorite && <span className="text-yellow-500">⭐</span>}
                      </div>
                      <p className="text-sm text-blue-600">{contact.voiceId}</p>
                      <p className="text-xs text-gray-500 font-mono">
                        {contact.address.substring(0, 20)}...
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => onSendTo?.(contact)}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleCopy(contact.voiceId)}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(contact.id)}
                      className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      ⭐
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};