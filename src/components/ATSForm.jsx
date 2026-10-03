// src/components/ATSForm.jsx
import React, { useState } from 'react';
import {
  ArrowLeft,
  ClipboardList,
  Plus,
  Trash2,
  FileDown,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import SignaturePad from './SignaturePad';
import { generarATSPDF } from '../utils/generateModelosPdf';
import { guardarDocumento } from '../utils/storageModelos';

const filaVacia = () => ({ paso: '', peligros: '', controles: '' });

export default function ATSForm({ onBack }) {
  const [obra, setObra] = useState('');
  const [tarea, setTarea] = useState('');
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
    if (!obra.trim() || !tarea.trim() || !responsable.trim()) {
      setErrorMsg('Complete la obra, la tarea a analizar y el responsable.');
      return;
    }
    if (!filas.every((f) => f.paso.trim())) {
      setErrorMsg('Complete al menos el campo "Paso de la tarea" de cada fila.');
      return;
    }
    if (!signatureDataUrl) {
      setErrorMsg('Se requiere la firma del responsable del análisis.');
      return;
    }
    try {
      const codigo = generarATSPDF({ obra, tarea, responsable, filas, signatureDataUrl });
      guardarDocumento({
        id: codigo,
        tipo: 'ats',
        obra,
        tarea,
        responsable,
        filas,
        fecha: new Date().toLocaleString('es-AR')
      });
      setCodigoEmitido(codigo);
      setErrorMsg('');
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocurrió un error al generar el PDF del ATS.');
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
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
              Documento de Gestión
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              ATS — Análisis de Trabajo Seguro
            </h2>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Desglose la tarea en pasos secuenciales e identifique los <strong>peligros</strong> y las <strong>medidas de control</strong> de cada uno.
        </p>
      </div>

      {codigoEmitido ? (
        <div className="bg-emerald-50 border-2 border-emerald-300 p-6 rounded-2xl text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
          </div>
          <h4 className="text-emerald-950 font-black text-lg">ATS EMITIDO CORRECTAMENTE</h4>
          <p className="text-xs text-emerald-800 font-semibold">
            Código: <span className="font-mono font-bold">{codigoEmitido}</span>
          </p>
          <button
            onClick={() => {
              setCodigoEmitido(null);
              setFilas([filaVacia(), filaVacia(), filaVacia()]);
              setObra('');
              setTarea('');
              setResponsable('');
              setSignatureDataUrl(null);
            }}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer"
          >
            Emitir un nuevo ATS
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
                <label className="block font-bold text-slate-700 mb-1 text-xs">Tarea a analizar</label>
                <input
                  type="text"
                  value={tarea}
                  onChange={(e) => setTarea(e.target.value)}
                  placeholder="Ej: Montaje de andamio en fachada norte"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">Obra o frente</label>
                <input
                  type="text"
                  value={obra}
                  onChange={(e) => setObra(e.target.value)}
                  placeholder="Ej: Edificio Central"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">Responsable del análisis</label>
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

          {/* Filas de análisis */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                Pasos de la tarea, peligros y controles
              </h3>
              <button
                onClick={agregarFila}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-3 py-2 rounded-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar paso</span>
              </button>
            </div>

            {filas.map((fila, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-slate-500 uppercase">Paso {i + 1}</span>
                  {filas.length > 1 && (
                    <button
                      onClick={() => quitarFila(i)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                      title="Quitar paso"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={fila.paso}
                  onChange={(e) => actualizarFila(i, 'paso', e.target.value)}
                  placeholder="Paso de la tarea (qué se hace)"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={fila.peligros}
                  onChange={(e) => actualizarFila(i, 'peligros', e.target.value)}
                  placeholder="Peligro asociado a este paso"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={fila.controles}
                  onChange={(e) => actualizarFila(i, 'controles', e.target.value)}
                  placeholder="Medidas de control (eliminar, sustituir, ingeniería, administrativas, EPP)"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6 space-y-3">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Firma del responsable</h3>
            <SignaturePad onSignatureChange={setSignatureDataUrl} />

            <button
              onClick={handleGenerar}
              className="w-full py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-md bg-slate-900 hover:bg-slate-800 text-white active:scale-98 transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Validar y Emitir ATS (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
