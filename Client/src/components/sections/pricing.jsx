import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Basic Plan",
      price: "49",
      features: ["Condition Monitoring", "Real-time Alerts", "Email Support", "24/7 Connectivity"],
      highlight: false
    },
    {
      name: "Standard Plan",
      price: "99",
      features: ["Advanced Analytics", "Custom Dashboards", "Priority Support", "Seamless Integration"],
      highlight: true
    },
    {
      name: "Advanced Plan",
      price: "149",
      features: ["Predictive Maintenance", "Multi-site Support", "Dedicated Manager", "Full IoT Suite"],
      highlight: false
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h5 className="text-[#06A3DA] font-bold uppercase tracking-widest mb-2">Pricing Plans</h5>
          <h1 className="text-[#091E3E] text-4xl font-bold mb-4">We Are Offering Competitive Prices for Our IoT Services</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`p-8 rounded shadow-lg transition-transform duration-300 hover:-translate-y-2 ${
                plan.highlight ? 'bg-white border-2 border-[#06A3DA] scale-105 z-10' : 'bg-[#F8FBFF]'
              }`}
            >
              <div className="mb-8">
                <h3 className="text-[#091E3E] text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-[#06A3DA]">$</span>
                  <span className="text-5xl font-bold text-[#06A3DA]">{plan.price}</span>
                  <span className="text-[#6B6A75] ml-1">/ Month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-[#6B6A75]">
                    <Check className="w-5 h-5 text-[#06A3DA] mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 px-6 rounded font-semibold transition-colors duration-300 ${
                plan.highlight ? 'bg-[#06A3DA] text-white hover:bg-[#091E3E]' : 'bg-[#06A3DA] text-white hover:bg-[#091E3E]'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
