// src/components/DetalleTarea.jsx
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Scale, 
  ListOrdered, 
  OctagonAlert, 
  Mountain, 
  Construction, 
  Zap, 
  Box, 
  Flame, 
  Anchor 
} from 'lucide-react';
import ChecklistOperarios from './ChecklistOperarios';
import PlanillaCapataz from './PlanillaCapataz';

const iconMap = {
  Mountain: Mountain,
  Tractor: Construction,
  Zap: Zap,
  Box: Box,
  Flame: Flame,
  Anchor: Anchor
};

export default function DetalleTarea({ tarea, onBack }) {
  const [checkedIndices, setCheckedIndices] = useState([]);
  const IconComponent = iconMap[tarea.icono] || Construction;

  const handleToggle = (index) => {
    setCheckedIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const handleReset = () => {
    setCheckedIndices([]);
  };

  const checklistCompleto = checkedIndices.length === tarea.checklist.length;

  return (
    <div className="space-y-6">
      {/* Botón Volver al turnero */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-5 rounded-xl shadow-xs transition active:scale-95 cursor-pointer text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Menú Principal (Turnero)</span>
      </button>

      {/* SECCIÓN SUPERIOR: RESOLUCIONES POR ENCIMA Y PROCEDIMIENTO */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl shadow-lg border-2 border-amber-500 overflow-hidden">
        
        {/* Cabecera de la tarea */}
        <div className="bg-amber-500 text-slate-950 p-4 md:p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-950 rounded-xl text-amber-400">
              <IconComponent className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <div>
              <div className="text-[11px] uppercase font-black tracking-widest text-slate-900/80">
                Guía Operativa &middot; Protocolo de Prevención
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                {tarea.titulo}
              </h2>
            </div>
          </div>
          <span className="bg-slate-950 text-amber-400 text-xs font-black px-3.5 py-1.5 rounded-lg uppercase tracking-wider">
            Riesgo Crítico Reglamentado
          </span>
        </div>

        <div className="p-5 md:p-6 space-y-6">
          
          {/* BLOQUE DE RESOLUCIONES (POR ENCIMA DE TODO COMO SE PIDIÓ) */}
          <div className="bg-slate-800/90 rounded-xl p-4 md:p-5 border border-amber-500/40 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wide">
              <Scale className="w-4 h-4" />
              <span>Marco Legal & Resoluciones Oficiales Aplicables (SRT / Decretos / IRAM)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {tarea.resoluciones.map((res, i) => (
                <div key={i} className="bg-slate-900/80 p-3 rounded-lg border-l-4 border-amber-400">
                  <div className="font-black text-amber-300 uppercase tracking-wide">{res.norma}</div>
                  <div className="text-slate-300 mt-1 leading-snug">{res.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CÓMO TIENE QUE ACTUAR EL TÉCNICO / PASOS OPERATIVOS */}
          <div>
            <div className="flex items-center gap-2 text-white font-black text-sm uppercase tracking-wide mb-3">
              <ListOrdered className="w-4 h-4 text-amber-400" />
              <span>Protocolo de Actuación en Campo (Pasos Obligatorios)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {tarea.pasos.map((paso) => (
                <div key={paso.num} className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700/80">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center mb-2 shadow-xs">
                    {paso.num}
                  </div>
                  <div className="font-bold text-white text-xs uppercase mb-1">{paso.titulo}</div>
                  <div className="text-slate-300 text-xs leading-relaxed">{paso.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* STOP WORK AUTHORITY */}
          <div className="bg-rose-950/60 border border-rose-600/80 text-rose-200 p-3.5 rounded-xl text-xs flex items-start gap-3">
            <OctagonAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-bold">Autoridad de Detención de Tareas (Stop Work Authority):</strong>
              {' '}Si el entorno, las condiciones climáticas o los elementos certificados no cumplen estrictamente con la normativa citada, el técnico o capataz debe suspender inmediatamente la maniobra hasta subsanar la no conformidad.
            </div>
          </div>

        </div>
      </div>

      {/* SECCIÓN INFERIOR: PLANILLAS Y CHECKLISTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CHECKLIST OPERARIOS */}
        <div className="lg:col-span-7">
          <ChecklistOperarios
            checklist={tarea.checklist}
            checkedIndices={checkedIndices}
            onToggle={handleToggle}
            onReset={handleReset}
          />
        </div>

        {/* PLANILLA CAPATAZ / M.M.O. */}
        <div className="lg:col-span-5">
          <PlanillaCapataz
            tarea={tarea}
            checklistCompleto={checklistCompleto}
            checkedIndices={checkedIndices}
          />
        </div>
      </div>

    </div>
  );
}
