import React, { useState, useEffect, useRef } from 'react';

// Lógica y UI del cronómetro EXCLUSIVA para la versión móvil
function CountdownDigits({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const completedRef = useRef(false);

  useEffect(() => {
    const targetDate = new Date('2026-07-20T00:00:00').getTime();

    const tick = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete && onComplete();
        }
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [onComplete]);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const Unit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-black text-white leading-none tracking-tight">
        {formatNumber(value)}
      </span>
      <span className="text-[8px] uppercase tracking-widest text-gray-400 mt-1.5">
        {label}
      </span>
    </div>
  );

  const Separator = () => (
    <span className="text-lg text-gray-600 font-light self-start mt-1">:</span>
  );

  return (
    <div className="flex justify-center items-center gap-2.5 font-mono select-none">
      <Unit value={timeLeft.days} label="Días" />
      <Separator />
      <Unit value={timeLeft.hours} label="Horas" />
      <Separator />
      <Unit value={timeLeft.minutes} label="Minutos" />
      <Separator />
      <Unit value={timeLeft.seconds} label="Segundos" />
    </div>
  );
}

export default function CountdownMobile({ setIsReleased }) {
  return (
    <div 
      className="fixed inset-0 w-full h-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat font-sans select-none z-50"
      style={{ backgroundImage: "url('/fondo-publicidad.jpeg')" }}
    >
      {/* 📱 TARJETA CONTENEDORA TIPO TELÉFONO */}
      <div className="w-full max-w-[340px] h-[90vh] max-h-[660px] backdrop-blur-2xl bg-slate-950/65 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col justify-between p-6 text-center overflow-hidden">
        
        {/* ENCABEZADO */}
        <div className="w-full pt-4">
          <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-md uppercase leading-none">
            liontech
          </h1>
          <p className="text-[9px] tracking-[0.4em] uppercase text-cyan-400 font-bold mt-2">
            System Online
          </p>
        </div>

        {/* CONTENEDOR DEL CRONÓMETRO */}
        <div className="w-full py-6 px-3 bg-black/40 rounded-2xl border border-white/5 my-auto overflow-hidden">
          <CountdownDigits onComplete={() => setIsReleased(true)} />
        </div>

        {/* SECCIÓN INFERIOR */}
        <div className="w-full pb-4 flex flex-col gap-5">
          
          {/* Redes Sociales */}
          <div className="flex justify-center items-center gap-5">
            <a href="https://www.instagram.com/liontech_accesorios?igsh=OXd2a2trNTE1bzE=" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 rounded-xl border border-white/10 active:scale-95 transition-transform">
              <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61568382338538" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 rounded-xl border border-white/10 active:scale-95 transition-transform">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://wa.me/+573159309346" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 rounded-xl border border-white/10 active:scale-95 transition-transform">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>

          {/* Fecha de Lanzamiento */}
          <div className="w-full border-t border-white/10 pt-4">
            <span className="text-[9px] tracking-[0.3em] uppercase font-black text-cyan-400/60 block mb-1">
              Fecha de Lanzamiento
            </span>
            <div className="text-xl font-black text-white tracking-normal">
              20.07.<span className="text-cyan-500">2026</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}