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
import ProductModal from './components/ProductModal';

// =========================================================================
// TUS NUEVOS COMPONENTES SEPARADOS (Afuera del archivo)
// =========================================================================
import CountdownMobile from './components/CountdownMobile';
import CountdownDesktop from './components/CountdownDesktop';

function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState('hero');
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  // =========================================================================
  // CONTROL DE VISTAS LIMPIO (Móvil vs Escritorio sin repetir código)
  // =========================================================================
  if (!isReleased) {
    return (
      <>
        {/* En móvil bloqueamos el escritorio y llamamos tu componente limpio */}
        <div className="block md:hidden">
          <CountdownMobile setIsReleased={setIsReleased} />
        </div>

        {/* En escritorio bloqueamos el móvil y llamamos tu componente limpio */}
        <div className="hidden md:block">
          <CountdownDesktop setIsReleased={setIsReleased} />
        </div>
      </>
    );
  }

  // Vista principal de la app cuando ya se cumpla el lanzamiento
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar setView={setView} view={view} session={session} />
      <main className="container mx-auto px-4 py-8">
        {view === 'hero' && <Hero setView={setView} />}
        {view === 'catalog' && <Catalog onSelectProduct={setSelectedProduct} />}
        {view === 'about' && <About />}
        {view === 'contact' && <Contact />}
        {view === 'admin' && session && <Admin />}
        {view === 'login' && <Login />}
      </main>
      <Footer />
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
}

export default App;