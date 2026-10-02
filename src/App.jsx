// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import TurneroCard from './components/TurneroCard';
import DetalleTarea from './components/DetalleTarea';
import HistorialModal from './components/HistorialModal';
import { TAREAS_CRITICAS } from './data/tareas';

export default function App() {
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [historialAbierto, setHistorialAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* 1. Encabezado estilo Turnero con botón de Historial */}
      <Header onOpenHistorial={() => setHistorialAbierto(true)} />

      {/* 2. Contenido principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6">
        {!tareaSeleccionada ? (
          <div className="space-y-6">
            {/* Banner de bienvenida interactivo */}
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-xs border border-slate-200 text-center">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full mb-2 uppercase tracking-wider">
                Paso 1: Seleccione la Tarea de Riesgo
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                ¿Qué trabajo se va a realizar en obra?
              </h2>
              <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto mt-1.5 leading-relaxed">
                Toque una tarjeta táctil para acceder a las <strong>resoluciones oficiales (SRT)</strong>, el protocolo de actuación y las <strong>planillas de control</strong> para operarios y capataces.
              </p>
            </div>

            {/* Grilla de Botones Gigantes Estilo Turnero */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {TAREAS_CRITICAS.map((tarea) => (
                <TurneroCard
                  key={tarea.id}
                  tarea={tarea}
                  onSelect={setTareaSeleccionada}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Vista Detallada de la Tarea */
          <DetalleTarea
            tarea={tareaSeleccionada}
            onBack={() => setTareaSeleccionada(null)}
          />
        )}
      </main>

      {/* 3. Modal de Historial de Permisos (Persistencia Offline) */}
      <HistorialModal
        isOpen={historialAbierto}
        onClose={() => setHistorialAbierto(false)}
      />

      {/* 4. Pie de página */}
      <footer className="bg-white border-t border-slate-200 py-3.5 px-6 text-center text-xs text-slate-500 mt-auto">
        Sistema Ágil de Seguridad e Higiene Laboral &middot; Desarrollado en React 19 + Tailwind CSS &middot; Modo Tótem Táctil
      </footer>
    </div>
  );
}
