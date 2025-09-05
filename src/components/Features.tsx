import React from 'react';
import { Shield, Zap, Users, Lock, RefreshCw, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'Fraud-Proof Security',
    description: 'Blockchain-powered verification ensures every ticket is authentic and cannot be counterfeited.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Zap,
    title: 'Instant Transactions',
    description: 'Fast and reliable ticket purchases with immediate confirmation on the Stacks network.',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    icon: Users,
    title: 'Peer-to-Peer Transfer',
    description: 'Securely transfer tickets directly between users without intermediaries.',
    color: 'from-blue-500 to-purple-600',
  },
  {
    icon: Lock,
    title: 'Immutable Records',
    description: 'All transactions are permanently recorded on the blockchain for complete transparency.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: RefreshCw,
    title: 'Smart Contracts',
    description: 'Automated execution of ticket rules and conditions with no human intervention needed.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: CreditCard,
    title: 'STX Payments',
    description: 'Simple and secure payments using STX tokens with transparent pricing.',
    color: 'from-red-500 to-pink-600',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {' '}StacksEvents
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of event ticketing with blockchain security, 
            transparency, and complete user control.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}