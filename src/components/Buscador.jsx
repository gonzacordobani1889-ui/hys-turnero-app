// src/components/Buscador.jsx
import React from 'react';
import { Search, X, ArrowRight, AlertCircle } from 'lucide-react';

export default function Buscador({ busqueda, onChange, resultados, onSelect }) {
  const hayBusqueda = busqueda.trim().length > 0;

  return (
    <div className="space-y-3">
      {/* Campo de búsqueda táctil */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="search"
          inputMode="search"
          value={busqueda}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar tarea, normativa, resolución o ítem del checklist…"
          autoComplete="off"
          className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-slate-300 bg-white text-slate-900 text-base md:text-lg shadow-xs focus:border-slate-500 focus:ring-4 focus:ring-slate-200 focus:outline-none"
        />
        {hayBusqueda && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Resultados */}
      {hayBusqueda && (
        <div className="space-y-2">
          <div className="text-xs font-black text-slate-500 uppercase tracking-wide px-1">
            {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'} encontrados
          </div>

          {resultados.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h4 className="text-slate-800 font-black text-base">Sin coincidencias</h4>
              <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto">
                Intente con otro término. Ejemplos: «arnés», «disyuntor», «entibado», «LOTO», «matafuegos».
              </p>
            </div>
          ) : (
            resultados.map(({ tarea, coincidencias }) => (
              <button
                key={tarea.id}
                type="button"
                onClick={() => onSelect(tarea)}
                className="w-full bg-white rounded-2xl border border-slate-200 p-4 text-left hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${tarea.colorBadge}`}>
                    {tarea.titulo}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition shrink-0" />
                </div>

                <div className="mt-2.5 space-y-1.5">
                  {coincidencias.slice(0, 3).map((c, i) => (
                    <p key={i} className="text-xs text-slate-600 leading-snug">
                      <span className="font-black text-slate-800 uppercase text-[10px] tracking-wide">
                        {c.seccion}:
                      </span>{' '}
                      {c.texto}
                    </p>
                  ))}
                  {coincidencias.length > 3 && (
                    <p className="text-[11px] text-slate-600 font-bold">
                      + {coincidencias.length - 3} coincidencias más — toque para abrir
                    </p>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
