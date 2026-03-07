import React from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Zap, 
  Activity, 
  Settings, 
  BatteryCharging, 
  Server 
} from 'lucide-react';

const services = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Internet of Things",
    description: "Seamless integration of IoT solutions to enhance connectivity and data-driven decision-making",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Energy Efficiency",
    description: "Optimizing energy use to reduce costs and improve sustainability across operations",
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Production Monitoring System",
    description: "Real-time tracking and analysis of production processes for improved performance and efficiency",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "MEP",
    description: "Comprehensive Mechanical, Electrical, Plumbing solutions that ensure the smooth functioning of critical infrastructure.",
  },
  {
    icon: <BatteryCharging className="w-6 h-6" />,
    title: "Lithium Ion Batteries",
    description: "Advanced energy storage solutions with high efficiency and long-lasting performance for industrial applications",
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "IT Services",
    description: "Robust IT solutions designed to optimize infrastructure, improve system reliability, and support data-driven strategies for smarter business operations",
  },
];

const Services = () => {
  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden">
      <style>{`
        @keyframes dotSlide {
          0%   { left: 0px; opacity: 1; }
          100% { left: 130px; opacity: 1; }
        }
        .svc-line-wrap {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-65px);
          width: 130px;
          height: 4px;
        }
        .svc-line-blue {
          width: 130px;
          height: 4px;
          background: #06A3DA;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .svc-line-dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          position: absolute;
          bottom: -2px;
          left: 0;
          animation: dotSlide 1.4s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="container mx-auto px-4">

        {/* Section Title */}
        <div className="max-w-[700px] mx-auto text-center mb-10 md:mb-16 px-4">
          <h5 className="text-[1rem] md:text-[1.25rem] font-bold text-[#06A3DA] uppercase tracking-wider mb-2">
            Our Services
          </h5>
          <div className="text-center relative pb-6 mb-8">
            <h1 className="text-[1.8rem] sm:text-[2.1rem] md:text-[2.5rem] font-extrabold text-[#091e3e] mt-2 mb-0">
              Custom Solutions for Your Successful Business
            </h1>
            <div className="svc-line-wrap">
              <span className="svc-line-blue"></span>
              <span className="svc-line-dot"></span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-[#eefbff] p-6 md:p-10 flex flex-col items-center text-center transition-all duration-500 hover:bg-[#06A3DA] hover:shadow-2xl rounded-sm overflow-hidden"
            >
              {/* Diamond Icon */}
              <div className="relative mb-6 md:mb-8 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-white bg-[#06A3DA] z-10 transition-colors duration-500 group-hover:bg-white group-hover:text-[#06A3DA]">
                <div
                  className="absolute inset-0 bg-inherit"
                  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                ></div>
                <div className="relative z-20">{service.icon}</div>
              </div>

              {/* Text */}
              <h4 className="text-[1.2rem] md:text-[1.5rem] font-bold text-[#091e3e] mb-3 transition-colors duration-500 group-hover:text-white">
                {service.title}
              </h4>
              <p className="text-[#6b6a75] text-[0.9rem] md:text-base mb-6 md:mb-8 transition-colors duration-500 group-hover:text-white leading-[1.6]">
                {service.description}
              </p>

              {/* Arrow */}
              <a
                href="#"
                className="inline-flex items-center justify-center w-[40px] h-[40px] md:w-[45px] md:h-[45px] bg-[#06A3DA] text-white rounded-[2px] mt-auto transition-all duration-500 group-hover:bg-white group-hover:text-[#06A3DA]"
              >
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;