import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  MapPin, Phone, Mail, Twitter, Facebook, Linkedin,
  Instagram, Youtube, Menu, X, LogOut, ChevronRight,
} from "lucide-react";
import logo from '../../assets/Matapang.png';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Close drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  const socials = [
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/matapang-a-424b463a3/", label: "LinkedIn" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body, #root {
          overflow-x: hidden;
          max-width: 100vw;
        }

        /* ── Underline animation for desktop nav ── */
        .nav-link-underline { position: relative; }
        .nav-link-underline::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 3px;
          background: #06A3DA;
          transition: width 0.3s ease;
          border-radius: 2px;
        }
        .nav-link-underline:hover::after,
        .nav-link-underline.active::after { width: 100%; }

        /* ── Drawer link stagger animation ── */
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .drawer-link {
          animation: slideInRight 0.3s ease both;
        }

        /* ── Focus ring for accessibility ── */
        .focus-ring:focus-visible {
          outline: 2px solid #06A3DA;
          outline-offset: 2px;
        }

        /* ── Smooth topbar collapse ── */
        .topbar-wrap {
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.35s ease;
        }
        .topbar-wrap.visible {
          max-height: 44px;
          opacity: 1;
        }
        .topbar-wrap.hidden-bar {
          max-height: 0;
          opacity: 0;
        }

        /* ── Prevent tap highlight on mobile ── */
        a, button { -webkit-tap-highlight-color: transparent; }

        /* ── Safe area insets for notched phones ── */
        .drawer-panel {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }

        /* ── Active state pulse on mobile menu button ── */
        @keyframes menuPulse {
          0%   { transform: scale(1); }
          50%  { transform: scale(0.92); }
          100% { transform: scale(1); }
        }
        .menu-btn:active { animation: menuPulse 0.15s ease; }
      `}</style>

      {/* ══════════════════════ HEADER ══════════════════════ */}
      <header
        className="w-full fixed top-0 left-0 z-[1000] transition-all duration-500"
        style={{
          background: isSticky
            ? "rgba(255,255,255,0.97)"
            : "transparent",
          backdropFilter: isSticky ? "blur(16px)" : "none",
          WebkitBackdropFilter: isSticky ? "blur(16px)" : "none",
          boxShadow: isSticky ? "0 2px 24px rgba(0,0,0,0.1)" : "none",
        }}
      >
        {/* ── TOPBAR (desktop only) ── */}
        <div className={`topbar-wrap hidden lg:block border-b border-white/15 ${isSticky ? "hidden-bar" : "visible"}`}>
          <div className="container mx-auto h-[44px] px-8 xl:px-12 flex items-center justify-between text-white text-[13px]">
            <div className="flex gap-5 items-center flex-wrap">
              {[
                { Icon: MapPin, text: "Innov8 Mantri Commercio – Bellandur, Bangalore 560103" },
                { Icon: Phone, text: "+91 8248742297" },
                { Icon: Mail, text: "info@matapangtech.com" },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-1.5 whitespace-nowrap">
                  <Icon size={14} className="text-[#06A3DA] shrink-0" />
                  <span className="opacity-90">{text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-1.5 shrink-0">
              {socials.map(({ Icon, href, label }, i) => (
                <a key={i} href={href}
                  aria-label={label}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  className="focus-ring w-7 h-7 flex items-center justify-center border border-white/25 rounded-full hover:bg-[#06A3DA] hover:border-[#06A3DA] transition-all duration-200"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── NAVBAR ── */}
        <nav className="px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className={`container mx-auto flex items-center justify-between transition-all duration-300 ${
            isSticky ? "h-[72px] lg:h-[88px]" : "h-[60px] sm:h-[68px] lg:h-[84px]"
          }`}>

            {/* Logo */}
            <Link to="/" className="z-[1100] shrink-0 flex items-center gap-2 sm:gap-3 focus-ring rounded-md">
              <img
                src={logo}
                alt="MataPang Logo"
                className={`transition-all duration-300 object-contain ${
                  isSticky
                    ? "h-[42px] sm:h-[48px] lg:h-[64px]"
                    : "h-[36px] sm:h-[40px] lg:h-[64px] brightness-0 invert"
                }`}
              />
              <div className="flex flex-col justify-center leading-tight">
                <span className={`font-bold whitespace-nowrap transition-all duration-300 ${
                  isSticky ? "text-[#091E3E]" : "text-white"
                } ${isSticky ? "text-xl sm:text-2xl lg:text-3xl" : "text-xl sm:text-2xl lg:text-3xl"}`}>
                  Matapang
                </span>
                <span className={`text-[#06A3DA] font-semibold whitespace-nowrap transition-all duration-300 ${
                  isSticky ? "text-[10px] sm:text-xs lg:text-sm" : "text-[10px] sm:text-xs lg:text-sm"
                }`}>
                  Innovative IoT Solutions
                </span>
              </div>
            </Link>

            {/* ── DESKTOP LINKS ── */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 h-full">
              {navLinks.map((item) => (
                <Link key={item.label} to={item.path}
                  className={`nav-link-underline focus-ring relative px-3 xl:px-4 font-semibold text-[14px] xl:text-[15px] h-full flex items-center transition-colors duration-200 ${
                    isActive(item.path)
                      ? "active text-[#06A3DA]"
                      : isSticky
                        ? "text-[#091E3E] hover:text-[#06A3DA]"
                        : "text-white hover:text-[#06A3DA]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <a href="/#quote"
                className="focus-ring ml-3 xl:ml-4 py-2 xl:py-2.5 px-4 xl:px-5 bg-[#06A3DA] text-white text-[13px] xl:text-[14px] font-bold rounded-[3px] hover:bg-[#091E3E] transition-all duration-200 whitespace-nowrap shadow-[0_4px_14px_rgba(6,163,218,0.3)]"
              >
                Get Quote
              </a>

              {user ? (
                <div className="ml-3 flex items-center gap-2">
                  <span className={`text-sm font-semibold truncate max-w-[120px] ${isSticky ? "text-[#091E3E]" : "text-white"}`}>
                    {user.name}
                  </span>
                  <button onClick={logout} title="Logout"
                    className={`focus-ring p-2 rounded-full transition-all ${
                      isSticky
                        ? "bg-gray-100 hover:bg-gray-200 text-[#091E3E]"
                        : "bg-white/20 hover:bg-white/30 text-white"
                    }`}
                  >
                    <LogOut size={17} />
                  </button>
                </div>
              ) : (
                <Link to="/login"
                  className={`focus-ring ml-2 xl:ml-3 py-2 xl:py-2.5 px-4 xl:px-5 text-[13px] xl:text-[14px] font-bold rounded-[3px] border-2 transition-all duration-200 whitespace-nowrap ${
                    isSticky
                      ? "border-[#06A3DA] text-[#06A3DA] hover:bg-[#06A3DA] hover:text-white"
                      : "border-white text-white hover:bg-white hover:text-[#06A3DA]"
                  }`}
                >
                  Login
                </Link>
              )}
            </div>

            {/* ── MOBILE RIGHT ACTIONS ── */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Hide "Get Quote" on very small screens to avoid overflow */}
              <a href="/#quote"
                className="hidden sm:inline-flex focus-ring py-2 px-3 sm:px-4 bg-[#06A3DA] text-white text-[12px] sm:text-[13px] font-bold rounded-[3px] hover:bg-[#091E3E] transition-all whitespace-nowrap"
              >
                Get Quote
              </a>

              {/* Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`menu-btn focus-ring w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                  isSticky
                    ? "text-[#091E3E] bg-gray-100 hover:bg-gray-200"
                    : "text-white bg-white/15 hover:bg-white/25 border border-white/20"
                }`}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-drawer"
              >
                <Menu size={21} strokeWidth={2.2} />
              </button>
            </div>

          </div>
        </nav>
      </header>

      {/* ══════════════════════ MOBILE DRAWER ══════════════════════ */}

      {/* Backdrop */}
      <div
        role="presentation"
        onClick={() => setMobileMenuOpen(false)}
        className={`lg:hidden fixed inset-0 z-[1900] bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`drawer-panel lg:hidden fixed top-0 right-0 h-full w-[82vw] max-w-[340px] z-[2000] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "linear-gradient(170deg, #091E3E 0%, #0d2f6e 60%, #091E3E 100%)",
          boxShadow: "-16px 0 60px rgba(0,0,0,0.55)",
        }}
      >
        {/* Decorative background accent */}
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(6,163,218,0.12) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />

        {/* ── Drawer top bar ── */}
        <div className="relative flex justify-between items-center px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-7 brightness-0 invert" />
            <span className="text-white font-bold text-base tracking-wide">Matapang</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="focus-ring w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
            aria-label="Close navigation menu"
          >
            <X size={17} className="text-white" />
          </button>
        </div>

        {/* ── Nav links ── */}
        <nav className="flex-1 overflow-y-auto py-2" aria-label="Mobile navigation">
          {navLinks.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="drawer-link flex items-center justify-between px-5 py-[14px] transition-all duration-150 group active:bg-white/5"
              style={{
                animationDelay: mobileMenuOpen ? `${i * 55}ms` : "0ms",
                borderLeft: isActive(item.path) ? "3px solid #06A3DA" : "3px solid transparent",
                background: isActive(item.path) ? "rgba(6,163,218,0.08)" : "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span className={`text-[15px] font-semibold tracking-wide ${
                isActive(item.path) ? "text-[#06A3DA]" : "text-white/85 group-hover:text-white"
              }`}>
                {item.label}
              </span>
              <ChevronRight size={15} className={`transition-transform duration-150 group-hover:translate-x-0.5 ${
                isActive(item.path) ? "text-[#06A3DA]" : "text-white/25 group-hover:text-white/50"
              }`} />
            </Link>
          ))}

          {/* Get Quote — visible in drawer for xs screens */}
          <div className="px-5 pt-4 sm:hidden">
            <a href="/#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-lg bg-[#06A3DA] text-white text-[14px] font-bold hover:bg-[#0590c4] active:bg-[#047aab] transition-colors shadow-[0_4px_14px_rgba(6,163,218,0.3)]"
            >
              Get Quote
            </a>
          </div>
        </nav>

        {/* ── Bottom area ── */}
        <div className="relative px-5 pb-6 pt-4 border-t border-white/10 space-y-4">
          {/* Auth */}
          {user ? (
            <div className="rounded-xl px-4 py-3.5 space-y-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div>
                <p className="text-white font-semibold text-[14px] truncate">{user.name}</p>
                <p className="text-white/45 text-[12px] truncate">{user.email}</p>
              </div>
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="focus-ring w-full bg-red-500/85 hover:bg-red-600 active:bg-red-700 text-white py-2.5 rounded-lg font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              <Link to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="focus-ring text-center py-3 rounded-lg border border-white/20 text-white text-[13px] font-semibold hover:border-[#06A3DA] hover:text-[#06A3DA] active:bg-white/5 transition-all"
              >
                Login
              </Link>
              <a href="/#quote"
                onClick={() => setMobileMenuOpen(false)}
                className="focus-ring text-center py-3 rounded-lg bg-[#06A3DA] text-white text-[13px] font-semibold hover:bg-[#0590c4] active:bg-[#047aab] transition-all shadow-[0_4px_12px_rgba(6,163,218,0.25)]"
              >
                Get Quote
              </a>
            </div>
          )}

          {/* Socials */}
          <div className="flex justify-center gap-2 pt-1">
            {socials.map(({ Icon, href, label }, i) => (
              <a key={i} href={href}
                aria-label={label}
                target={href !== "#" ? "_blank" : undefined}
                rel={href !== "#" ? "noopener noreferrer" : undefined}
                className="focus-ring w-9 h-9 flex items-center justify-center rounded-full border border-white/15 text-white/45 hover:bg-[#06A3DA] hover:border-[#06A3DA] hover:text-white active:scale-95 transition-all"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-white/20 text-[10px] tracking-widest uppercase">
            © 2024 Matapang Tech
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;