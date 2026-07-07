import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

// Tus otros imports...
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Catalog from './components/Catalog';
import Admin from './components/Admin';
import Login from './components/Login';
import ProductModal from './components/ProductModal'; // 1. Importa el modal

// =========================================================================
// NUEVO IMPORT: Componente de cuenta regresiva para el muro de intriga
// =========================================================================
import Countdown from './components/Countdown'; 

function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState('hero');
  const [selectedProduct, setSelectedProduct] = useState(null); // 2. Estado para el producto seleccionado

  // =========================================================================
  // NUEVO ESTADO: Controla si la fecha de estreno ya llegó (20 de Julio de 2026)
  // =========================================================================
  const [isReleased, setIsReleased] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_IN') setView('admin');
      if (_event === 'SIGNED_OUT') setView('hero');
    });

    return () => subscription.unsubscribe();
  }, []);

 if (!isReleased) {
    return (
      <div 
        className="fixed inset-0 z-50 flex flex-col justify-center items-center p-4 bg-cover bg-center bg-no-repeat select-none font-sans"
        style={{ backgroundImage: "url('/fondo-publicidad.jpeg')" }}
      >
        {/* INTERFAZ DE TABLETA / PANEL DIGITAL */}
        <div className="relative backdrop-blur-2xl bg-slate-950/50 p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl text-center max-w-2xl w-full mx-4 overflow-hidden">
          
          {/* Nombre de la marca */}
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white drop-shadow-lg">
            liontech
          </h1>
          <p className="text-[10px] tracking-[0.8em] uppercase text-cyan-400 font-bold mb-8">
            System Online
          </p>

          {/* Componente del cronómetro (El centro de atención) */}
          <div className="py-6 bg-black/30 rounded-3xl border border-white/5 mb-10">
            <Countdown onComplete={() => setIsReleased(true)} />
          </div>

          {/* REDES SOCIALES: Ahora como barra intermedia estilizada */}
          <div className="flex justify-center items-center gap-10 mb-12">
            <a href="https://www.instagram.com/liontech_accesorios?igsh=OXd2a2trNTE1bzE=" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-pink-600/20 group-hover:border-pink-500/50 transition-all duration-300">
                <svg className="w-5 h-5 text-white/40 group-hover:text-pink-500 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61568382338538" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all duration-300">
                <svg className="w-5 h-5 text-white/40 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </div>
            </a>
            <a href="https://wa.me/+573159309346" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-green-600/20 group-hover:border-green-500/50 transition-all duration-300">
                <svg className="w-5 h-5 text-white/40 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
            </a>
          </div>

          {/* FECHA DE IMPACTO: Abajo y en tamaño masivo */}
          <div className="relative pt-8 border-t border-white/10">
            <span className="text-[10px] tracking-[0.4em] uppercase font-black text-cyan-400/60 block mb-2">
              Fecha de Lanzamiento
            </span>
            <div className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              20.07.<span className="text-cyan-500">2026</span>
            </div>
            {/* Pequeño reflejo decorativo debajo de la fecha */}
            <div className="w-full h-8 bg-gradient-to-t from-transparent to-cyan-500/5 mt-2 rounded-full blur-md"></div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;