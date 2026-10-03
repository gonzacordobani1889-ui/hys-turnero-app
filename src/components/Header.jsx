// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Clock, HardHat, FolderArchive } from 'lucide-react';

export default function Header({ onOpenHistorial }) {
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
    <header className="bg-slate-900 text-white px-4 md:px-6 py-4 shadow-md border-b-4 border-slate-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-slate-800 text-white rounded-xl flex items-center justify-center font-black text-2xl shadow-inner shrink-0">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-wide">HyS Tótem Operativo</h1>
            <span className="hidden sm:inline-block bg-slate-700 text-slate-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
              Versión de Campo
            </span>
          </div>
          <p className="text-xs md:text-sm font-semibold opacity-80 hidden sm:block">
            Asistente de Campo para Técnicos en Seguridad e Higiene Laboral
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-right">
        {/* Botón Historial */}
        <button
          onClick={onOpenHistorial}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs py-2.5 px-3.5 rounded-xl shadow-md border border-slate-600 transition-transform active:scale-95 cursor-pointer"
        >
          <FolderArchive className="w-4 h-4 text-slate-200" />
          <span>Historial PTS</span>
        </button>

        <div className="hidden sm:block bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
          <div className="flex items-center gap-1.5 text-white font-mono font-bold text-sm">
            <Clock className="w-4 h-4" />
            <span>{hora || '--:--:--'}</span>
          </div>
          <div className="text-[11px] font-bold text-slate-300 flex items-center justify-end gap-1">
            <HardHat className="w-3 h-3" />
            <span>Modo Obra Activo</span>
          </div>
        </div>
      </div>
    </header>
  );
}
