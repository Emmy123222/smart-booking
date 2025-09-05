import React from 'react';
import { BarChart3, TrendingUp, Activity, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const eventStats = [
  {
    label: 'Total Revenue',
    value: '2,450 STX',
    change: '+12%',
    icon: DollarSign,
    color: 'text-green-500',
  },
  {
    label: 'Tickets Sold',
    value: '347',
    change: '+8%',
    icon: BarChart3,
    color: 'text-blue-500',
  },
  {
    label: 'Active Events',
    value: '12',
    change: '+3',
    icon: Activity,
    color: 'text-purple-500',
  },
  {
    label: 'Growth Rate',
    value: '23%',
    change: '+5%',
    icon: TrendingUp,
    color: 'text-orange-500',
  },
];

export default function EventInfo() {
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
            Platform
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {' '}Analytics
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real-time insights and transparent data about all platform activity.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {eventStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <IconComponent className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-semibold ${stat.color} bg-gray-50 px-2 py-1 rounded`}>
                    {stat.change}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Blockchain Activity</h3>
          
          <div className="space-y-4">
            {[
              { action: 'Ticket Purchased', event: 'Tech Conference 2025', user: 'SP1ABC...XYZ', time: '2 minutes ago' },
              { action: 'Event Created', event: 'Blockchain Summit', user: 'SP2DEF...ABC', time: '15 minutes ago' },
              { action: 'Ticket Transferred', event: 'Developer Meetup', user: 'SP3GHI...DEF', time: '1 hour ago' },
              { action: 'Ticket Purchased', event: 'Blockchain Summit', user: 'SP4JKL...GHI', time: '2 hours ago' },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.event} • {activity.user}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}