import React from 'react';
import { Connect } from '@stacks/connect-react';
import { AppConfig, UserSession } from '@stacks/connect';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import EventCreation from './components/EventCreation';
import TicketPurchase from './components/TicketPurchase';
import TicketManagement from './components/TicketManagement';
import TechSpecs from './components/TechSpecs';
import EventInfo from './components/EventInfo';
import Footer from './components/Footer';

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1 className="text-center text-red-600 mt-10">Something went wrong. Please refresh the page.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  // Configure Stacks UserSession
  const appConfig = new AppConfig(['store_write'], 'EventSphere App');
  const userSession = new UserSession({ appConfig });

  // Define authOptions for Connect component
  const authOptions = {
    appDetails: {
      name: 'EventSphere App',
      icon: window.location.origin + '/logo.png', // Ensure this path points to a valid image
    },
    userSession,
  };

  return (
    <ErrorBoundary>
      <Connect authOptions={authOptions}>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Hero />
          <Features />
          <HowItWorks />
          <TicketPurchase />
          <EventCreation />
          <TicketManagement />
          <TechSpecs />
          <EventInfo />
          <Footer />
        </div>
      </Connect>
    </ErrorBoundary>
  );
}

export default App;