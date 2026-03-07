import React from 'react';
import { Quote } from 'lucide-react';

const Testimonial = () => {
  const testimonials = [
    {
      name: "Client Name 1",
      profession: "Business Owner",
      text: "Matapang's IoT platform has transformed our production monitoring. Real-time insights have helped us reduce downtime by 30%.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      name: "Client Name 2",
      profession: "Operations Manager",
      text: "The seamless integration and reliable support we received were outstanding. Their condition-based monitoring is truly pioneering.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      name: "Client Name 3",
      profession: "Maintenance Lead",
      text: "Actionable analytics provided by their platform allow our team to make smarter decisions. Highly recommended for industrial IoT.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    }
  ];

  return (
    <div className="py-20 bg-[#F8FBFF]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h5 className="text-[#06A3DA] font-bold uppercase tracking-widest mb-2">Testimonial</h5>
          <h1 className="text-[#091E3E] text-4xl font-bold mb-4">What Our Clients Say About Our Digital Services</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-white p-8 rounded shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <img src={t.image} alt={`${t.name} - ${t.profession} testimonial`} className="w-16 h-16 rounded-full mr-4 object-cover" />
                <div>
                  <h4 className="text-[#091E3E] font-bold">{t.name}</h4>
                  <p className="text-[#6B6A75] text-sm italic">{t.profession}</p>
                </div>
              </div>
              <div className="relative">
                <Quote className="absolute -top-4 -left-2 w-8 h-8 text-[#06A3DA] opacity-10" />
                <p className="text-[#6B6A75] leading-relaxed relative z-10">
                  {t.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
