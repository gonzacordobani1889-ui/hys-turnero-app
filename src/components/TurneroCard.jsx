// src/components/TurneroCard.jsx
import React from 'react';
import {
  Mountain,
  Construction,
  Zap,
  Box,
  Flame,
  Anchor,
  ChevronRight
} from 'lucide-react';

const iconMap = {
  Mountain: Mountain,
  Tractor: Construction,
  Zap: Zap,
  Box: Box,
  Flame: Flame,
  Anchor: Anchor
};

export default function TurneroCard({ tarea, onSelect }) {
  const IconComponent = iconMap[tarea.icono] || Construction;
  // "oscuro" = tarjeta de color saturado con texto blanco; "claro" = texto oscuro
  const oscuro = tarea.tema !== 'claro';

  return (
    <button
      onClick={() => onSelect(tarea)}
      className={`${tarea.colorBg} ${oscuro ? 'text-white' : 'text-gray-900'} text-left p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-150 transform active:scale-95 flex flex-col justify-between h-52 md:h-60 border-2 ${oscuro ? 'border-white/20' : 'border-black/10'} w-full group cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-400`}
    >
      <div className="flex items-start justify-between w-full">
        <div className={`p-3 rounded-2xl backdrop-blur-xs group-hover:scale-110 transition-transform ${oscuro ? 'bg-black/25' : 'bg-white/30'}`}>
          <IconComponent className={`w-8 h-8 md:w-10 md:h-10 ${oscuro ? 'text-white' : 'text-gray-900'}`} />
        </div>
        <span className={`text-xs font-black uppercase px-3 py-1 rounded-xl tracking-wider flex items-center gap-1 ${oscuro ? 'bg-black/30 text-white/95' : 'bg-black/10 text-gray-900'}`}>
          <span>Abrir</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-black tracking-wide leading-tight drop-shadow-xs">
          {tarea.titulo}
        </h2>
        <p className={`text-xs md:text-sm mt-1 line-clamp-2 leading-relaxed ${oscuro ? 'text-white/85' : 'text-gray-800/80'}`}>
          {tarea.subtitulo}
        </p>
      </div>
    </button>
  );
}
