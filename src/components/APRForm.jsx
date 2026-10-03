// src/components/APRForm.jsx
import React, { useState } from 'react';
import {
  ArrowLeft,
  Gauge,
  Plus,
  Trash2,
  FileDown,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import SignaturePad from './SignaturePad';
import { generarAPRPDF, nivelRiesgo } from '../utils/generateModelosPdf';
import { guardarDocumento } from '../utils/storageModelos';

const PROBABILIDAD = [
  { value: 1, label: '1 · Rara' },
  { value: 2, label: '2 · Poco probable' },
  { value: 3, label: '3 · Probable' },
  { value: 4, label: '4 · Muy probable' }
];

const CONSECUENCIA = [
  { value: 1, label: '1 · Leve' },
  { value: 2, label: '2 · Moderada' },
  { value: 3, label: '3 · Grave' },
  { value: 4, label: '4 · Catastrófica' }
];

const NIVEL_CLASE = {
  BAJO: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  MEDIO: 'bg-amber-100 text-amber-800 border-amber-300',
  ALTO: 'bg-orange-100 text-orange-800 border-orange-300',
  'CRÍTICO': 'bg-red-100 text-red-800 border-red-300'
};

const filaVacia = () => ({ peligro: '', probabilidad: 1, consecuencia: 1, medidas: '' });

export default function APRForm({ onBack }) {
  const [obra, setObra] = useState('');
  const [actividad, setActividad] = useState('');
  const [responsable, setResponsable] = useState('');
  const [filas, setFilas] = useState([filaVacia(), filaVacia(), filaVacia()]);
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);
  const [codigoEmitido, setCodigoEmitido] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const actualizarFila = (i, campo, valor) => {
    setFilas((prev) => prev.map((f, idx) => (idx === i ? { ...f, [campo]: valor } : f)));
    setErrorMsg('');
  };

  const agregarFila = () => setFilas((prev) => [...prev, filaVacia()]);

  const quitarFila = (i) => {
    setFilas((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev));
  };

  const handleGenerar = () => {
    if (!obra.trim() || !actividad.trim() || !responsable.trim()) {
      setErrorMsg('Complete la obra, la actividad y el responsable.');
      return;
    }
    if (!filas.every((f) => f.peligro.trim())) {
      setErrorMsg('Complete al menos el campo "Peligro / riesgo" de cada fila.');
      return;
    }
    if (!signatureDataUrl) {
      setErrorMsg('Se requiere la firma del responsable de la evaluación.');
      return;
    }
    try {
      const codigo = generarAPRPDF({ obra, actividad, responsable, filas, signatureDataUrl });
      guardarDocumento({
        id: codigo,
        tipo: 'apr',
        obra,
        actividad,
        responsable,
        filas,
        fecha: new Date().toLocaleString('es-AR')
      });
      setCodigoEmitido(codigo);
      setErrorMsg('');
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocurrió un error al generar el PDF del APR.');
    }
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

      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-800 text-slate-300 rounded-xl">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
              Documento de Gestión
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              APR — Análisis de Riesgos
            </h2>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Identifique los peligros y evalúe <strong>probabilidad</strong> × <strong>consecuencia</strong> para obtener el nivel de riesgo de cada uno.
        </p>
      </div>

      {codigoEmitido ? (
        <div className="bg-emerald-50 border-2 border-emerald-300 p-6 rounded-2xl text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
          </div>
          <h4 className="text-emerald-950 font-black text-lg">APR EMITIDO CORRECTAMENTE</h4>
          <p className="text-xs text-emerald-800 font-semibold">
            Código: <span className="font-mono font-bold">{codigoEmitido}</span>
          </p>
          <button
            onClick={() => {
              setCodigoEmitido(null);
              setFilas([filaVacia(), filaVacia(), filaVacia()]);
              setObra('');
              setActividad('');
              setResponsable('');
              setSignatureDataUrl(null);
            }}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer"
          >
            Emitir un nuevo APR
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6 space-y-3.5">
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-300 text-rose-800 p-3 rounded-xl text-xs font-semibold flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1 text-xs">Actividad a analizar</label>
                <input
                  type="text"
                  value={actividad}
                  onChange={(e) => setActividad(e.target.value)}
                  placeholder="Ej: Trabajos de soldadura en sector de calderas"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">Obra o frente</label>
                <input
                  type="text"
                  value={obra}
                  onChange={(e) => setObra(e.target.value)}
                  placeholder="Ej: Planta Industrial Sur"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">Responsable de la evaluación</label>
                <input
                  type="text"
                  value={responsable}
                  onChange={(e) => setResponsable(e.target.value)}
                  placeholder="Nombre y apellido"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Filas de evaluación de riesgo */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                Peligros y evaluación del riesgo
              </h3>
              <button
                onClick={agregarFila}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-3 py-2 rounded-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar peligro</span>
              </button>
            </div>

            {filas.map((fila, i) => {
              const nivel = nivelRiesgo(fila.probabilidad, fila.consecuencia);
              return (
                <div key={i} className="border border-slate-200 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-slate-500 uppercase">Peligro {i + 1}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg border ${NIVEL_CLASE[nivel]}`}>
                        {nivel}
                      </span>
                      {filas.length > 1 && (
                        <button
                          onClick={() => quitarFila(i)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                          title="Quitar peligro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={fila.peligro}
                    onChange={(e) => actualizarFila(i, 'peligro', e.target.value)}
                    placeholder="Peligro / riesgo identificado"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Probabilidad</label>
                      <select
                        value={fila.probabilidad}
                        onChange={(e) => actualizarFila(i, 'probabilidad', Number(e.target.value))}
                        className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none bg-white"
                      >
                        {PROBABILIDAD.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Consecuencia</label>
                      <select
                        value={fila.consecuencia}
                        onChange={(e) => actualizarFila(i, 'consecuencia', Number(e.target.value))}
                        className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none bg-white"
                      >
                        {CONSECUENCIA.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={fila.medidas}
                    onChange={(e) => actualizarFila(i, 'medidas', e.target.value)}
                    placeholder="Medidas preventivas para reducir el riesgo"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                  />
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6 space-y-3">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Firma del responsable</h3>
            <SignaturePad onSignatureChange={setSignatureDataUrl} />

            <button
              onClick={handleGenerar}
              className="w-full py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-md bg-slate-900 hover:bg-slate-800 text-white active:scale-98 transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Validar y Emitir APR (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
