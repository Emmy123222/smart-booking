import { useState } from 'react';
import { Search, Send, Ticket, User, ArrowRight, CheckCircle, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

// ✅ Define a Ticket type
interface TicketType {
  eventName: string;
  ticketId: string;
  purchaseDate: string;
  price: string;
  transferrable: boolean;
}

export default function TicketManagement() {
  const [searchAddress, setSearchAddress] = useState<string>('');
  const [transferRecipient, setTransferRecipient] = useState<string>('');
  const [userTicket, setUserTicket] = useState<TicketType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mockUserTicket: TicketType = {
    eventName: 'Tech Conference 2025',
    ticketId: '#TKT-001',
    purchaseDate: 'Feb 15, 2025',
    price: '50 STX',
    transferrable: true,
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserTicket(mockUserTicket);
      setIsLoading(false);
    }, 1500);
  };

  const handleTransfer = async () => {
    setIsLoading(true);
    setTimeout(() => {
      alert('Ticket transferred successfully!');
      setUserTicket(null);
      setTransferRecipient('');
      setIsLoading(false);
    }, 2000);
  };

  // ✅ add type for text param
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Manage Your
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {' '}Tickets
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Check ticket ownership, verify authenticity, and transfer tickets securely.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Ticket Lookup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Search className="h-6 w-6 text-purple-600" />
                <span>Ticket Lookup</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Wallet Address
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={searchAddress}
                      onChange={(e) => setSearchAddress(e.target.value)}
                      placeholder="SP1ABC...XYZ"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    />
                    <button
                      onClick={handleSearch}
                      disabled={!searchAddress || isLoading}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {userTicket && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Ticket Found!</h4>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Event:</span>
                        <span className="font-medium">{userTicket.eventName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Ticket ID:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{userTicket.ticketId}</span>
                          <button
                            onClick={() => copyToClipboard(userTicket.ticketId)}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchase Date:</span>
                        <span className="font-medium">{userTicket.purchaseDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price Paid:</span>
                        <span className="font-medium text-purple-600">{userTicket.price}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Ticket Transfer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Send className="h-6 w-6 text-blue-600" />
                <span>Transfer Ticket</span>
              </h3>

              {userTicket ? (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <Ticket className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-gray-900">Your Ticket</span>
                    </div>
                    <p className="text-gray-600">{userTicket.eventName}</p>
                    <p className="text-sm text-gray-500">{userTicket.ticketId}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      value={transferRecipient}
                      onChange={(e) => setTransferRecipient(e.target.value)}
                      placeholder="SP1ABC...XYZ"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <button
                    onClick={handleTransfer}
                    disabled={!transferRecipient || isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <ArrowRight className="h-5 w-5" />
                        <span>Transfer Ticket</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <User className="h-16 w-16 text-gray-400 mx-auto" />
                  <p className="text-gray-600">
                    Search for a ticket above to enable transfer functionality
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
