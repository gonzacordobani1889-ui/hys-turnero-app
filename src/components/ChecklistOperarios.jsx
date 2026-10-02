// src/components/ChecklistOperarios.jsx
import React from 'react';
import { CheckSquare, Square, CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react';

export default function ChecklistOperarios({ checklist, checkedIndices, onToggle, onReset }) {
  const total = checklist.length;
  const completados = checkedIndices.length;
  const esCompleto = completados === total;
  const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider">
              Control Operativo en Terreno
            </span>
            <h3 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Check List para Operarios</span>
            </h3>
          </div>
          <div className="text-right">
            <span className={`text-xs font-black px-3 py-1 rounded-full ${
              esCompleto ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
            }`}>
              {completados} / {total} Verificados
            </span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className={`h-2 transition-all duration-300 ${esCompleto ? 'bg-emerald-500' : 'bg-amber-500'}`}
            style={{ width: `${porcentaje}%` }}
          />
        </div>

        <p className="text-xs text-slate-500 mb-4">
          Toca cada elemento conforme lo inspeccionas en el lugar. Todos los puntos son <strong>obligatorios</strong> para habilitar el trabajo.
        </p>

        {/* Lista de checks táctiles */}
        <div className="space-y-2.5">
          {checklist.map((item, index) => {
            const isChecked = checkedIndices.includes(index);
            return (
              <button
                key={index}
                type="button"
                onClick={() => onToggle(index)}
                className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-colors cursor-pointer ${
                  isChecked 
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
                    : 'bg-slate-50/60 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <span className={`text-xs md:text-sm font-semibold select-none leading-snug flex-1 ${
                  isChecked ? 'line-through text-slate-500 font-normal' : ''
                }`}>
                  {item}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar lista</span>
        </button>

        <div className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
          esCompleto 
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
            : 'bg-amber-100 text-amber-900 border border-amber-300'
        }`}>
          {esCompleto ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verificación 100% Completa</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Faltan {total - completados} ítems por auditar</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
