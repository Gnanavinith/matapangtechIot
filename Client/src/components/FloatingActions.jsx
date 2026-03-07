import React from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

export function FloatingActions() {
  const phoneNumber = "+918248742297";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '').replace(/\s/g, '')}`;
  const callUrl = `tel:${phoneNumber.replace(/\s/g, '')}`;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={30} />
      </a>
      <a
        href={callUrl}
        className="w-14 h-14 bg-[#06A3DA] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Call Us"
      >
        <FaPhoneAlt size={24} />
      </a>
    </div>
  );
}
