// src/components/CheckHerramientas.jsx
import React, { useState } from 'react';
import {
  ArrowLeft,
  Wrench,
  Disc3,
  Drill,
  Rows3,
  PlugZap,
  Cable,
  Hammer,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  RotateCcw
} from 'lucide-react';
import { HERRAMIENTAS } from '../data/herramientas';
import { generarCheckHerramientasPDF } from '../utils/generateModelosPdf';
import { guardarDocumento } from '../utils/storageModelos';

const ICONOS = { Disc3, Drill, Rows3, PlugZap, Cable, Hammer };

const ESTADOS = [
  { id: 'CONFORME', label: 'Conforme' },
  { id: 'NO CONFORME', label: 'No conforme' },
  { id: 'NO APLICA', label: 'No aplica' }
];

function claseEstado(estadoId, seleccionado) {
  if (estadoId === 'CONFORME') {
    return seleccionado
      ? 'bg-emerald-600 text-white border-emerald-600'
      : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50';
  }
  if (estadoId === 'NO CONFORME') {
    return seleccionado
      ? 'bg-rose-600 text-white border-rose-600'
      : 'bg-white text-rose-700 border-rose-300 hover:bg-rose-50';
  }
  return seleccionado
    ? 'bg-slate-600 text-white border-slate-600'
    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50';
}

export default function CheckHerramientas({ onBack }) {
  const [herramientaId, setHerramientaId] = useState(null);
  const [resultados, setResultados] = useState({});
  const [obra, setObra] = useState('');
  const [responsable, setResponsable] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [codigoEmitido, setCodigoEmitido] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const herramienta = HERRAMIENTAS.find((h) => h.id === herramientaId) || null;

  const seleccionarHerramienta = (id) => {
    setHerramientaId(id);
    setResultados({});
    setCodigoEmitido(null);
    setErrorMsg('');
  };

  const setEstado = (indice, estado) => {
    setResultados((prev) => ({ ...prev, [indice]: estado }));
    setErrorMsg('');
  };

  const todosEvaluados = herramienta
    ? herramienta.checks.every((_, i) => resultados[i])
    : false;

  const hayNoConforme = herramienta
    ? herramienta.checks.some((_, i) => resultados[i] === 'NO CONFORME')
    : false;

  const handleGenerar = () => {
    if (!herramienta) return;
    if (!todosEvaluados) {
      setErrorMsg('Debe evaluar todos los controles antes de emitir el check.');
      return;
    }
    if (!responsable.trim()) {
      setErrorMsg('Indique el nombre del responsable del control.');
      return;
    }

    try {
      const codigo = generarCheckHerramientasPDF({
        herramienta,
        resultados: herramienta.checks.map((_, i) => resultados[i]),
        obra,
        responsable,
        observaciones
      });

      guardarDocumento({
        id: codigo,
        tipo: 'check-herramientas',
        herramienta: { id: herramienta.id, nombre: herramienta.nombre },
        resultados: herramienta.checks.map((_, i) => resultados[i]),
        obra,
        responsable,
        observaciones,
        fecha: new Date().toLocaleString('es-AR')
      });

      setCodigoEmitido(codigo);
      setErrorMsg('');
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocurrió un error al generar el PDF del check.');
    }
  };

  const reiniciar = () => {
    setHerramientaId(null);
    setResultados({});
    setObra('');
    setResponsable('');
    setObservaciones('');
    setCodigoEmitido(null);
    setErrorMsg('');
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-5 rounded-xl shadow-xs transition active:scale-95 cursor-pointer text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Menú Principal</span>
      </button>

      {/* Encabezado */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-800 text-amber-400 rounded-xl">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
              Documento de Gestión
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              Check Pre-uso de Herramientas y Equipos
            </h2>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Verificación previa a la utilización. Si detecta una <strong>no conformidad</strong>, el equipo no debe utilizarse hasta subsanarla.
        </p>
      </div>

      {codigoEmitido ? (
        <div className="bg-emerald-50 border-2 border-emerald-300 p-6 rounded-2xl text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
          </div>
          <h4 className="text-emerald-950 font-black text-lg">CHECK EMITIDO CORRECTAMENTE</h4>
          <p className="text-xs text-emerald-800 font-semibold">
            Código: <span className="font-mono font-bold">{codigoEmitido}</span>
          </p>
          <p className="text-[11px] text-slate-500">
            El documento se descargó en PDF y quedó guardado en el historial del dispositivo.
          </p>
          <button
            onClick={reiniciar}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer"
          >
            Emitir un nuevo check
          </button>
        </div>
      ) : (
        <>
          {/* Selector de herramienta */}
          <div>
            <div className="flex items-center gap-2 text-slate-800 font-black text-sm uppercase tracking-wide mb-3">
              <span>1. Seleccione la herramienta o equipo</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {HERRAMIENTAS.map((h) => {
                const Icono = ICONOS[h.icono] || Wrench;
                const activa = h.id === herramientaId;
                return (
                  <button
                    key={h.id}
                    onClick={() => seleccionarHerramienta(h.id)}
                    className={`p-3 rounded-xl border-2 text-left flex flex-col items-center gap-2 transition cursor-pointer ${
                      activa
                        ? 'border-amber-500 bg-amber-50 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <Icono className={`w-6 h-6 ${activa ? 'text-amber-600' : 'text-slate-500'}`} />
                    <span className="text-[11px] font-bold text-slate-700 leading-tight text-center">
                      {h.nombre}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Checklist de la herramienta seleccionada */}
          {herramienta && (
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6">
              <div className="flex items-center gap-2 text-slate-800 font-black text-sm uppercase tracking-wide mb-1">
                <span>2. Evalúe cada control</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Toque la opción que corresponda a cada ítem.
              </p>

              <div className="space-y-2.5">
                {herramienta.checks.map((control, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl p-3">
                    <p className="text-xs md:text-sm font-semibold text-slate-800 leading-snug mb-2">
                      {control}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ESTADOS.map((estado) => {
                        const seleccionado = resultados[i] === estado.id;
                        return (
                          <button
                            key={estado.id}
                            onClick={() => setEstado(i, estado.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition cursor-pointer ${claseEstado(estado.id, seleccionado)}`}
                          >
                            {estado.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {hayNoConforme && (
                <div className="mt-4 bg-rose-50 border border-rose-300 text-rose-800 p-3.5 rounded-xl text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">EQUIPO NO APTO PARA SU USO.</strong>
                    {' '}Existen controles no conformes. No utilice el equipo hasta subsanar las no conformidades.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Datos y emisión */}
          {herramienta && (
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6 space-y-3.5">
              <div className="flex items-center gap-2 text-slate-800 font-black text-sm uppercase tracking-wide">
                <span>3. Datos del control y emisión</span>
              </div>

              {errorMsg && (
                <div className="bg-rose-50 border border-rose-300 text-rose-800 p-3 rounded-xl text-xs font-semibold flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-xs">Obra o frente</label>
                  <input
                    type="text"
                    value={obra}
                    onChange={(e) => setObra(e.target.value)}
                    placeholder="Ej: Edificio Central - Sector Norte"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-xs">Responsable del control</label>
                  <input
                    type="text"
                    value={responsable}
                    onChange={(e) => setResponsable(e.target.value)}
                    placeholder="Nombre y apellido"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">Observaciones</label>
                <textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows={3}
                  placeholder="Detalle de no conformidades, acciones correctivas u observaciones…"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none resize-y"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={handleGenerar}
                  className={`flex-1 py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    todosEvaluados
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 active:scale-98'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <FileDown className="w-4 h-4" />
                  <span>Generar PDF del Check</span>
                </button>
                <button
                  onClick={reiniciar}
                  className="py-3.5 px-4 rounded-xl font-bold text-sm text-slate-600 hover:text-slate-800 border border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
