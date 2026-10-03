// src/components/Asistente.jsx
// Asistente virtual de guiado por reglas (100 % offline, sin API key).
// Orienta al técnico hacia la tarea de riesgo o el documento de gestión correcto.

import React, { useState } from 'react';
import {
  Bot,
  X,
  ArrowLeft,
  Search,
  HardHat,
  ClipboardList,
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import { TAREAS_CRITICAS } from '../data/tareas';
import { MODELOS } from '../data/modelos';

function Opcion({ icono, texto, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3 flex items-center gap-2.5 cursor-pointer transition-colors"
    >
      <span className="text-slate-600">{icono}</span>
      <span className="flex-1 text-xs font-bold text-slate-800">{texto}</span>
      <ChevronRight className="w-4 h-4 text-slate-300" />
    </button>
  );
}

export default function Asistente({ onAbrirTarea, onAbrirModelo, onBuscar }) {
  const [abierto, setAbierto] = useState(false);
  const [paso, setPaso] = useState('inicio');

  const cerrar = () => {
    setAbierto(false);
    setPaso('inicio');
  };

  const abrirTarea = (tarea) => {
    onAbrirTarea(tarea);
    cerrar();
  };

  const abrirModelo = (id) => {
    onAbrirModelo(id);
    cerrar();
  };

  const buscar = (texto) => {
    onBuscar(texto);
    cerrar();
  };

  return (
    <>
      {/* Botón flotante */}
      {!abierto && (
        <button
          onClick={() => setAbierto(true)}
          className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-slate-900 text-slate-200 shadow-xl border-2 border-slate-600 flex items-center justify-center hover:scale-105 transition cursor-pointer"
          aria-label="Abrir asistente de campo"
          title="Asistente de Campo"
        >
          <Bot className="w-7 h-7" />
        </button>
      )}

      {/* Panel del asistente */}
      {abierto && (
        <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
          <div className="bg-slate-900 text-white p-4 flex items-center gap-3 border-b-4 border-slate-700 shrink-0">
            <div className="p-2 bg-slate-700 text-white rounded-xl">
              <Bot className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-sm uppercase tracking-wide">Asistente de Campo</h3>
              <p className="text-[11px] text-slate-400">Guía paso a paso · modo offline</p>
            </div>
            <button onClick={cerrar} className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer" aria-label="Cerrar">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-3 overflow-y-auto">
            {paso !== 'inicio' && (
              <button
                onClick={() => setPaso('inicio')}
                className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al inicio</span>
              </button>
            )}

            {paso === 'inicio' && (
              <>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-3">
                  Hola, soy su asistente. Lo guío para elegir la <strong>tarea de riesgo</strong> o el <strong>documento de gestión</strong> correcto. ¿Qué necesita hacer?
                </p>
                <Opcion icono={<HardHat className="w-4 h-4" />} texto="Iniciar una tarea de riesgo" onClick={() => setPaso('tareas')} />
                <Opcion icono={<ClipboardList className="w-4 h-4" />} texto="Completar un documento (ATS / APR / check)" onClick={() => setPaso('documentos')} />
                <Opcion icono={<GraduationCap className="w-4 h-4" />} texto="Emitir una constancia de capacitación" onClick={() => abrirModelo('capacitacion')} />
                <Opcion icono={<Search className="w-4 h-4" />} texto="Buscar una normativa o un ítem" onClick={() => setPaso('buscar')} />
              </>
            )}

            {paso === 'tareas' && (
              <>
                <p className="text-xs text-slate-600 bg-slate-50 rounded-xl p-3">
                  Seleccione la tarea de riesgo que va a realizar:
                </p>
                {TAREAS_CRITICAS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => abrirTarea(t)}
                    className="w-full text-left bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${t.colorBg.split(' ')[0]}`} />
                    <span className="flex-1 text-xs font-bold text-slate-800">{t.titulo}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>
                ))}
              </>
            )}

            {paso === 'documentos' && (
              <>
                <p className="text-xs text-slate-600 bg-slate-50 rounded-xl p-3">
                  Seleccione el documento que desea completar:
                </p>
                {MODELOS.filter((m) => m.id !== 'capacitacion').map((m) => (
                  <button
                    key={m.id}
                    onClick={() => abrirModelo(m.id)}
                    className="w-full text-left bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <ClipboardList className="w-4 h-4 text-slate-500" />
                    <span className="flex-1 text-xs font-bold text-slate-800">{m.titulo}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>
                ))}
              </>
            )}

            {paso === 'buscar' && (
              <>
                <p className="text-xs text-slate-600 bg-slate-50 rounded-xl p-3">
                  Puede buscar desde la barra principal. Toque un tema frecuente para buscarlo:
                </p>
                {['arnés', 'disyuntor', 'entibado', 'LOTO', 'matafuegos', 'eslinga'].map((t) => (
                  <button
                    key={t}
                    onClick={() => buscar(t)}
                    className="w-full text-left bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 cursor-pointer transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
