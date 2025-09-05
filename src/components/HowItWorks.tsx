import React from 'react';
import { UserPlus, CreditCard, Ticket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: UserPlus,
    title: 'Connect Your Wallet',
    description: 'Connect your Stacks wallet to get started. We support all major Stacks wallets.',
    step: '01',
  },
  {
    icon: CreditCard,
    title: 'Purchase Tickets',
    description: 'Browse events and buy tickets securely using STX tokens with instant confirmation.',
    step: '02',
  },
  {
    icon: Ticket,
    title: 'Own Your Tickets',
    description: 'Your tickets are stored on the blockchain. Transfer, verify, or use them anytime.',
    step: '03',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {' '}Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get started with blockchain ticketing in three simple steps. 
            It's easier than traditional platforms and much more secure.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    
                    <div className="text-center space-y-4">
                      <div className="inline-flex p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl group-hover:from-purple-100 group-hover:to-blue-100 transition-colors">
                        <IconComponent className="h-8 w-8 text-purple-600" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-purple-400">
                        <ArrowRight className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}