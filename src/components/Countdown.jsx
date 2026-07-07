import React, { useState, useEffect } from 'react';

/**
 * COMPONENTE: Countdown (Cuenta Regresiva Oficial)
 * -------------------------------------------------------------------------
 * Explicación para Bryan: Este componente calcula dinámicamente los días,
 * horas, minutos y segundos restantes desde hoy (6 de julio de 2026) 
 * hasta la fecha de estreno (20 de julio de 2026).
 */
const Countdown = () => {
  // 1. Estado inicial del reloj en cero
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // 2. Definimos la fecha de estreno exacta (20 de Julio de 2026 a la medianoche)
    const targetDate = new Date('2026-07-20T00:00:00').getTime();

    // 3. Creamos el intervalo para actualizar el conteo en tiempo real cada segundo
    const interval = setInterval(() => {
      // Obtiene la fecha y hora exacta del momento en que se carga o ejecuta
      const now = new Date().getTime();
      
      // Restamos la fecha final menos el tiempo actual (esto calcula automáticamente los días restantes desde el 6 de julio)
      const difference = targetDate - now;

      // Si el tiempo expira o llega a 0, detenemos el reloj por completo
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // 4. Conversión matemática de milisegundos a unidades de tiempo reales
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // 5. Guardamos los datos calculados en el estado de React
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    // Limpiamos el intervalo al desmontar el componente para mantener la memoria limpia
    return () => clearInterval(interval);
  }, []);

  // Función interna para añadir un '0' a la izquierda si el número es menor a 10 (ej: "06" en lugar de "6")
  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    /* Contenedor del reloj con Tailwind CSS: tipografía monoespaciada para evitar saltos visuales */
    <div className="flex justify-center items-center gap-6 my-8 font-mono select-none">
      
      {/* Bloque indicador de Días */}
      <div className="text-center">
        <span className="text-5xl md:text-6xl font-bold tracking-tight text-white block">
          {formatNumber(timeLeft.days)}
        </span>
        <span className="text-xs uppercase tracking-widest text-gray-400 mt-1 block">días</span>
      </div>

      {/* Separador estético */}
      <span className="text-3xl text-gray-500 font-light self-start mt-2">:</span>

      {/* Bloque indicador de Horas */}
      <div className="text-center">
        <span className="text-5xl md:text-6xl font-bold tracking-tight text-white block">
          {formatNumber(timeLeft.hours)}
        </span>
        <span className="text-xs uppercase tracking-widest text-gray-400 mt-1 block">horas</span>
      </div>

      {/* Separador estético */}
      <span className="text-3xl text-gray-500 font-light self-start mt-2">:</span>

      {/* Bloque indicador de Minutos */}
      <div className="text-center">
        <span className="text-5xl md:text-6xl font-bold tracking-tight text-white block">
          {formatNumber(timeLeft.minutes)}
        </span>
        <span className="text-xs uppercase tracking-widest text-gray-400 mt-1 block">minutos</span>
      </div>

      {/* Separador estético */}
      <span className="text-3xl text-gray-500 font-light self-start mt-2">:</span>

      {/* Bloque indicador de Segundos */}
      <div className="text-center">
        <span className="text-5xl md:text-6xl font-bold tracking-tight text-white block">
          {formatNumber(timeLeft.seconds)}
        </span>
        <span className="text-xs uppercase tracking-widest text-gray-400 mt-1 block">segundos</span>
      </div>

    </div>
  );
};

export default Countdown;