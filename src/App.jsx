// src/App.jsx
import React, { useState } from 'react';
import { Wrench, FolderOpen, ClipboardList, Gauge, GraduationCap } from 'lucide-react';
import Header from './components/Header';
import TurneroCard from './components/TurneroCard';
import DetalleTarea from './components/DetalleTarea';
import HistorialModal from './components/HistorialModal';
import Buscador from './components/Buscador';
import CheckHerramientas from './components/CheckHerramientas';
import ATSForm from './components/ATSForm';
import APRForm from './components/APRForm';
import Capacitaciones from './components/Capacitaciones';
import { TAREAS_CRITICAS } from './data/tareas';
import { MODELOS } from './data/modelos';
import { buscarEnTareas } from './utils/busqueda';

const MODELO_ICONOS = { Wrench, ClipboardList, Gauge, GraduationCap };

export default function App() {
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [historialAbierto, setHistorialAbierto] = useState(false);
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const resultados = buscarEnTareas(busqueda);
  const hayBusqueda = busqueda.trim().length > 0;

  const abrirTarea = (tarea) => {
    setTareaSeleccionada(tarea);
    setModeloSeleccionado(null);
    setBusqueda('');
  };

  const abrirModelo = (id) => {
    setModeloSeleccionado(id);
    setTareaSeleccionada(null);
    setBusqueda('');
  };

  const renderModelo = () => {
    switch (modeloSeleccionado) {
      case 'ats':
        return <ATSForm onBack={() => setModeloSeleccionado(null)} />;
      case 'apr':
        return <APRForm onBack={() => setModeloSeleccionado(null)} />;
      case 'check-herramientas':
        return <CheckHerramientas onBack={() => setModeloSeleccionado(null)} />;
      case 'capacitacion':
        return <Capacitaciones onBack={() => setModeloSeleccionado(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* 1. Encabezado estilo Turnero con botón de Historial */}
      <Header onOpenHistorial={() => setHistorialAbierto(true)} />

      {/* 2. Contenido principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6">
        {modeloSeleccionado ? (
          renderModelo()
        ) : !tareaSeleccionada ? (
          <div className="space-y-6">
            {/* Buscador global */}
            <Buscador
              busqueda={busqueda}
              onChange={setBusqueda}
              resultados={resultados}
              onSelect={abrirTarea}
            />

            {/* Sin búsqueda activa: bienvenida + tareas + modelos */}
            {!hayBusqueda && (
              <>
                <div className="bg-white p-5 md:p-6 rounded-2xl shadow-xs border border-slate-200 text-center">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full mb-2 uppercase tracking-wider">
                    Paso 1: Seleccione la Tarea de Riesgo
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                    ¿Qué trabajo se va a realizar en obra?
                  </h2>
                  <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto mt-1.5 leading-relaxed">
                    Toque una tarjeta táctil para acceder a las <strong>resoluciones oficiales (SRT)</strong>, la guía técnica y las <strong>planillas de control</strong> para operarios y capataces.
                  </p>
                </div>

                {/* Grilla de tareas de riesgo crítico */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {TAREAS_CRITICAS.map((tarea) => (
                    <TurneroCard
                      key={tarea.id}
                      tarea={tarea}
                      onSelect={abrirTarea}
                    />
                  ))}
                </div>

                {/* Documentos y modelos de gestión */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <FolderOpen className="w-5 h-5 text-slate-500" />
                    <h2 className="text-sm md:text-base font-black text-slate-700 uppercase tracking-wide">
                      Documentos y Modelos de Gestión
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MODELOS.map((modelo) => {
                      const Icono = MODELO_ICONOS[modelo.icono] || Wrench;
                      return (
                        <button
                          key={modelo.id}
                          onClick={() => abrirModelo(modelo.id)}
                          className={`${modelo.colorBg} text-white text-left p-5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center gap-4 border-2 border-white/20 cursor-pointer group`}
                        >
                          <div className="p-3 bg-black/25 rounded-xl group-hover:scale-105 transition-transform shrink-0">
                            <Icono className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-base md:text-lg font-black leading-tight">{modelo.titulo}</h3>
                            <p className="text-xs text-white/85 mt-0.5 leading-relaxed">{modelo.subtitulo}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              </>
            )}
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
