import React, { useRef } from 'react';
import { Check, Phone } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef(null);

  return (
    <section className="py-12 md:py-20 bg-white" id="about" ref={sectionRef}>
      <style>{`
        @keyframes dotSlide {
          0% { left: 0px; opacity: 1; }
          100% { left: 130px; opacity: 1; }
        }

        .line-blue {
          width: 130px;
          height: 4px;
          background: #06A3DA;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        .line-dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          position: absolute;
          bottom: -2px;
          animation: dotSlide 1.4s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="container mx-auto px-4 lg:px-[48px]">
        <div className="flex flex-wrap -mx-4 items-stretch">

          {/* Left Column */}
          <div className="w-full lg:w-7/12 px-4 mb-10 lg:mb-0">

            <div className="relative pb-5 mb-6 md:mb-8">
              <h5 className="text-[1rem] md:text-[1.25rem] font-bold text-[#06A3DA] uppercase tracking-wider mb-2">
                ABOUT US
              </h5>

              <h1 className="text-[1.8rem] sm:text-[2.1rem] md:text-[2.5rem] font-bold text-[#091E3E] leading-tight mb-0">
                Pioneering the Future: Unmatched IoT Solutions for a Connected World
              </h1>

              <span className="line-blue"></span>
              <span className="line-dot"></span>
            </div>

            <p className="text-[#6B6A75] text-[0.95rem] md:text-base mb-8 md:mb-10 leading-[1.6]">
              At Matapang, we're driven by a passion for empowering businesses with our advanced IoT platform.
              Our technology delivers real-time, condition-based monitoring and actionable analytics for critical
              utilities and production equipment. With these insights, your maintenance and production teams can
              make smarter, data-driven decisions that optimize performance and boost operational efficiency.
            </p>

            <div className="flex flex-wrap mb-8">
              <div className="w-full sm:w-1/2 mb-4">
                {["Smart Connectivity", "Innovative Solutions"].map((label) => (
                  <div key={label} className="flex items-center mb-3">
                    <Check className="text-[#06A3DA] w-5 h-5 stroke-[3px] mr-3 shrink-0" />
                    <h5 className="text-[#091E3E] text-[0.9rem] md:text-[1rem] font-bold uppercase mb-0">
                      {label}
                    </h5>
                  </div>
                ))}
              </div>
              <div className="w-full sm:w-1/2 mb-4">
                {["Reliable Support", "Seamless Integration"].map((label) => (
                  <div key={label} className="flex items-center mb-3">
                    <Check className="text-[#06A3DA] w-5 h-5 stroke-[3px] mr-3 shrink-0" />
                    <h5 className="text-[#091E3E] text-[0.9rem] md:text-[1rem] font-bold uppercase mb-0">
                      {label}
                    </h5>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center mb-8">
              <div className="w-[48px] h-[48px] md:w-[55px] md:h-[55px] bg-[#06A3DA] rounded-[2px] flex items-center justify-center shrink-0">
                <Phone className="text-white fill-current w-5 h-5" />
              </div>
              <div className="pl-4 md:pl-6">
                <h5 className="text-[0.95rem] md:text-[1.125rem] font-bold text-[#091E3E] mb-1">
                  Call to ask any question
                </h5>
                <h4 className="text-[#06A3DA] text-[1.2rem] md:text-[1.5rem] font-bold mb-0">
                  +91 8248742297
                </h4>
              </div>
            </div>

            <a
              href="#"
              className="inline-block bg-[#06A3DA] text-white px-8 md:px-[48px] py-3 md:py-[16px] text-[0.9rem] md:text-base font-semibold rounded-[2px] transition-all duration-300 hover:scale-105"
            >
              Request A Demo
            </a>

          </div>

          {/* Right Column */}
          <div className="w-full lg:w-5/12 px-4 flex">
            <div className="relative w-full min-h-[260px] sm:min-h-[340px] lg:min-h-[400px] h-full">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1c4ef999-e26e-49ca-963f-8e789d56b22c-matapangtech-com/assets/images/about-4.jpg"
                alt="Matapang Team Collaboration"
                className="w-full h-full object-cover rounded-[5px]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;