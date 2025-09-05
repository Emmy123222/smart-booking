import React, { useState } from "react";
import {
  Code,
  Database,
  Shield,
  Zap,
  GitBranch,
  Layers,
  Search,
  Send,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const techFeatures = [
  {
    icon: Code,
    title: "Clarity Smart Contracts",
    description:
      "Built on Stacks blockchain using Clarity for maximum security and predictability.",
    details: [
      "Immutable code execution",
      "No reentrancy attacks",
      "Predictable gas costs",
    ],
  },
  {
    icon: Database,
    title: "On-Chain Data",
    description:
      "All ticket data stored permanently on the blockchain for transparency.",
    details: ["Event metadata", "Ownership records", "Transfer history"],
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description:
      "Multi-layer security with built-in fraud prevention mechanisms.",
    details: ["Digital signatures", "Address verification", "Access controls"],
  },
  {
    icon: Zap,
    title: "Fast Transactions",
    description: "Optimized for quick confirmation times and low fees.",
    details: ["Sub-second UI updates", "Batch operations", "Gas optimization"],
  },
  {
    icon: GitBranch,
    title: "Decentralized",
    description:
      "No central authority controls your tickets or event data.",
    details: ["Peer-to-peer transfers", "Self-custody", "Censorship resistant"],
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description:
      "Built to handle events of any size from small meetups to large conferences.",
    details: [
      "Efficient data structures",
      "Optimized queries",
      "Horizontal scaling",
    ],
  },
];

export default function TechSpecs() {
  // ✅ Added missing states
  const [searchAddress, setSearchAddress] = useState("");
  const [transferRecipient, setTransferRecipient] = useState("");
  const [userTicket, setUserTicket] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Stub functions
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // Replace this with actual search logic
      console.log("Searching tickets for:", searchAddress);
      setTimeout(() => {
        setUserTicket("SAMPLE_TICKET_ID"); // Simulate finding a ticket
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleTransfer = async () => {
    setIsLoading(true);
    try {
      // Replace this with actual transfer logic
      console.log(
        `Transferring ticket ${userTicket} to ${transferRecipient}`
      );
      setTimeout(() => {
        setUserTicket(null); // Simulate transfer success
        setTransferRecipient("");
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Built on{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Blockchain
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Powered by cutting-edge blockchain technology for unparalleled
            security and transparency.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-center space-x-2 text-sm text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Search Functionality */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Search className="h-5 w-5 text-yellow-400" />
                <span>Verify Ticket Ownership</span>
              </h3>

              <div className="space-y-3">
                <input
                  type="text"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  placeholder="Enter Stacks address to check tickets..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                />
                <button
                  onClick={handleSearch}
                  disabled={!searchAddress || isLoading}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:from-gray-500 disabled:to-gray-600 text-black font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      <span>Check Tickets</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Transfer Functionality */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Send className="h-5 w-5 text-blue-400" />
                <span>Transfer Your Ticket</span>
              </h3>

              <div className="space-y-3">
                <input
                  type="text"
                  value={transferRecipient}
                  onChange={(e) => setTransferRecipient(e.target.value)}
                  placeholder="Recipient's Stacks address..."
                  disabled={!userTicket}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleTransfer}
                  disabled={!transferRecipient || !userTicket || isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <ArrowRight className="h-4 w-4" />
                      <span>Transfer Ticket</span>
                    </>
                  )}
                </button>
              </div>

              {!userTicket && (
                <p className="text-sm text-gray-400 text-center">
                  Search for a ticket first to enable transfers
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
