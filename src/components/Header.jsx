// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Clock, HardHat } from 'lucide-react';

export default function Header() {
  const [hora, setHora] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setHora(now.toLocaleTimeString('es-AR'));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-amber-500 text-slate-950 px-6 py-4 shadow-md border-b-4 border-amber-600 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-slate-950 text-amber-400 rounded-xl flex items-center justify-center font-black text-2xl shadow-inner">
          <ShieldAlert className="w-7 h-7 text-amber-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-wide">HyS Tótem Operativo</h1>
            <span className="hidden sm:inline-block bg-slate-950 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
              MVP Campo
            </span>
          </div>
          <p className="text-xs md:text-sm font-semibold opacity-90">
            Asistente de Campo para Técnicos en Seguridad e Higiene Laboral
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-4 text-right">
        <div className="bg-amber-600/40 px-3 py-1.5 rounded-xl border border-amber-600/60">
          <div className="flex items-center gap-1.5 text-slate-950 font-mono font-bold text-sm">
            <Clock className="w-4 h-4" />
            <span>{hora || '--:--:--'}</span>
          </div>
          <div className="text-[11px] font-bold text-slate-900 flex items-center justify-end gap-1">
            <HardHat className="w-3 h-3" />
            <span>Modo Obra Activo</span>
          </div>
        </div>
      </div>
    </header>
  );
}
