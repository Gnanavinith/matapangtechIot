import React from 'react';
import { Box, Award, Users, Phone } from 'lucide-react';

const Features = () => {
  return (
    <section className="py-12 md:py-24 bg-white" id="features">
      <style>{`
        @keyframes dotSlide {
          0% { left: 0px; opacity: 1; }
          100% { left: 130px; opacity: 1; }
        }
        .feat-line-wrap {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-65px);
          width: 130px;
          height: 4px;
        }
        .feat-line-blue {
          width: 130px;
          height: 4px;
          background: #06A3DA;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .feat-line-dot {
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

        {/* Section Header */}
        <div className="max-w-[700px] mx-auto text-center relative mb-12 md:mb-16">
          <h5 className="text-[1rem] md:text-[1.25rem] font-bold text-[#06A3DA] uppercase tracking-wider mb-2">
            Why Choose Us
          </h5>
          <div className="text-center relative pb-5 mb-8">
            <h1 className="text-[1.8rem] sm:text-[2.1rem] md:text-[2.5rem] font-extrabold text-[#091E3E] leading-tight mb-0">
              We Are Here to Grow Your Business Exponentially
            </h1>
            <div className="feat-line-wrap">
              <span className="feat-line-blue"></span>
              <span className="feat-line-dot"></span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">

          {/* Left Column */}
          <div className="flex flex-col justify-between space-y-8 lg:space-y-12">
            {[
              {
                Icon: Box,
                title: "Smart Connectivity",
                desc: "Real-time data flow that enhances decision-making and keeps operations connected, responsive, and efficient",
              },
              {
                Icon: Award,
                title: "Innovative Solutions",
                desc: "Tailored, advanced solutions designed to elevate productivity, streamline processes, and drive measurable business growth",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="group flex lg:flex-col items-start gap-4 lg:gap-0">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#06A3DA] rounded flex items-center justify-center shrink-0 lg:mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="text-white w-7 h-7 md:w-8 md:h-8" />
                </div>
                <div>
                  <h4 className="text-[1.2rem] md:text-[1.5rem] font-bold text-[#091E3E] mb-2">{title}</h4>
                  <p className="text-[#6B6A75] text-[0.9rem] md:text-base leading-relaxed m-0">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Middle Column - Image */}
          <div className="relative min-h-[260px] sm:min-h-[340px] lg:min-h-full order-first lg:order-none rounded overflow-hidden">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1c4ef999-e26e-49ca-963f-8e789d56b22c-matapangtech-com/assets/images/feature-5.jpg"
              alt="Matapang IoT smart connectivity and industrial automation features"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between space-y-8 lg:space-y-12">
            {[
              {
                Icon: Users,
                title: "Seamless Integration",
                desc: "Effortless system integration that unifies operations for a cohesive, efficient, and fully optimized workflow",
              },
              {
                Icon: Phone,
                title: "Reliable Support",
                desc: "Comprehensive, end-to-end support focused on maintaining long-term performance, reliability, and client satisfaction",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="group flex lg:flex-col items-start gap-4 lg:gap-0">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#06A3DA] rounded flex items-center justify-center shrink-0 lg:mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="text-white w-7 h-7 md:w-8 md:h-8" />
                </div>
                <div>
                  <h4 className="text-[1.2rem] md:text-[1.5rem] font-bold text-[#091E3E] mb-2">{title}</h4>
                  <p className="text-[#6B6A75] text-[0.9rem] md:text-base leading-relaxed m-0">{desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;