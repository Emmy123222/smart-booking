import React, { useState } from 'react';
import { ShoppingCart, Clock, Users, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const mockEvents = [
  {
    id: 1,
    name: 'Tech Conference 2025',
    price: 50,
    remainingTickets: 25,
    totalTickets: 100,
    date: 'March 15, 2025',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    name: 'Blockchain Summit',
    price: 75,
    remainingTickets: 5,
    totalTickets: 50,
    date: 'April 22, 2025',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    name: 'Developer Meetup',
    price: 25,
    remainingTickets: 0,
    totalTickets: 30,
    date: 'May 10, 2025',
    image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function TicketPurchase() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<number | null>(null);

  const handlePurchase = async (eventId: number, price: number) => {
    setIsLoading(eventId);
    
    // Simulate contract call
    setTimeout(() => {
      alert(`Ticket purchased for ${price} STX!`);
      setIsLoading(null);
    }, 2000);
  };

  const getAvailabilityStatus = (remaining: number, total: number) => {
    const percentage = (remaining / total) * 100;
    if (remaining === 0) return { color: 'red', text: 'Sold Out', icon: AlertTriangle };
    if (percentage <= 20) return { color: 'yellow', text: 'Few Left', icon: Clock };
    return { color: 'green', text: 'Available', icon: CheckCircle };
  };

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Upcoming
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {' '}Events
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover and purchase tickets for exciting events powered by blockchain technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockEvents.map((event, index) => {
            const status = getAvailabilityStatus(event.remainingTickets, event.totalTickets);
            const StatusIcon = status.icon;
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                {/* Event Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className={`flex items-center space-x-1 bg-${status.color}-100 text-${status.color}-800 px-3 py-1 rounded-full text-sm font-medium`}>
                      <StatusIcon className="h-3 w-3" />
                      <span>{status.text}</span>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                    <p className="text-gray-600 flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-purple-600">{event.price} STX</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{event.remainingTickets} of {event.totalTickets} left</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePurchase(event.id, event.price)}
                      disabled={event.remainingTickets === 0 || isLoading === event.id}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isLoading === event.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      ) : (
                        <ShoppingCart className="h-4 w-4" />
                      )}
                      <span>
                        {event.remainingTickets === 0 ? 'Sold Out' : 
                         isLoading === event.id ? 'Purchasing...' : 'Buy Now'}
                      </span>
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((event.totalTickets - event.remainingTickets) / event.totalTickets) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}