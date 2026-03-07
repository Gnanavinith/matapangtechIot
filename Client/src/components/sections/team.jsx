import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Team = () => {
  const members = [
    {
      name: "John Doe",
      designation: "IoT Specialist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
      name: "Jane Smith",
      designation: "Solutions Architect",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      name: "Mike Johnson",
      designation: "Technical Support",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h5 className="text-[#06A3DA] font-bold uppercase tracking-widest mb-2">Team Members</h5>
          <h1 className="text-[#091E3E] text-4xl font-bold mb-4">Professional Staff Ready to Help Your Business</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div key={index} className="group relative bg-[#F8FBFF] rounded overflow-hidden shadow-lg">
              <div className="relative overflow-hidden">
                <img src={member.image} alt={`${member.name} - ${member.designation} at Matapang`} className="w-full transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#091E3E]/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex space-x-2">
                    {[Twitter, Facebook, Instagram, Linkedin].map((Icon, iIdx) => (
                      <a key={iIdx} href="#" className="w-10 h-10 bg-[#06A3DA] text-white flex items-center justify-center rounded hover:bg-white hover:text-[#06A3DA] transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h4 className="text-[#091E3E] text-xl font-bold mb-1">{member.name}</h4>
                <p className="text-[#6B6A75] uppercase text-sm tracking-wider">{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
