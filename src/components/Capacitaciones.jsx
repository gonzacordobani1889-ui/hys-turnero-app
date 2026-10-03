// src/components/Capacitaciones.jsx
import React, { useState } from 'react';
import {
  ArrowLeft,
  GraduationCap,
  Plus,
  Trash2,
  FileDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  BookOpen
} from 'lucide-react';
import SignaturePad from './SignaturePad';
import { CAPACITACIONES } from '../data/capacitaciones';
import { generarCapacitacionPDF } from '../utils/generateModelosPdf';
import { guardarDocumento } from '../utils/storageModelos';

const participanteVacio = () => ({ nombre: '', dni: '' });

export default function Capacitaciones({ onBack }) {
  const [capacitacionId, setCapacitacionId] = useState(null);
  const [participantes, setParticipantes] = useState([participanteVacio(), participanteVacio(), participanteVacio()]);
  const [instructor, setInstructor] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);
  const [codigoEmitido, setCodigoEmitido] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const capacitacion = CAPACITACIONES.find((c) => c.id === capacitacionId) || null;

  const seleccionar = (id) => {
    setCapacitacionId(id);
    setCodigoEmitido(null);
    setErrorMsg('');
  };

  const actualizarParticipante = (i, campo, valor) => {
    setParticipantes((prev) => prev.map((p, idx) => (idx === i ? { ...p, [campo]: valor } : p)));
    setErrorMsg('');
  };

  const agregarParticipante = () => setParticipantes((prev) => [...prev, participanteVacio()]);

  const quitarParticipante = (i) => {
    setParticipantes((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev));
  };

  const handleGenerar = () => {
    if (!capacitacion) return;
    if (!instructor.trim()) {
      setErrorMsg('Indique el nombre del instructor o responsable.');
      return;
    }
    if (!participantes.some((p) => p.nombre.trim())) {
      setErrorMsg('Cargue al menos un participante con nombre.');
      return;
    }
    if (!signatureDataUrl) {
      setErrorMsg('Se requiere la firma del instructor.');
      return;
    }
    try {
      const codigo = generarCapacitacionPDF({
        capacitacion,
        instructor,
        empresa,
        participantes,
        signatureDataUrl
      });
      guardarDocumento({
        id: codigo,
        tipo: 'capacitacion',
        capacitacion: { id: capacitacion.id, titulo: capacitacion.titulo },
        instructor,
        empresa,
        participantes,
        fecha: new Date().toLocaleString('es-AR')
      });
      setCodigoEmitido(codigo);
      setErrorMsg('');
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocurrió un error al generar el PDF de la capacitación.');
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
          <div className="p-2.5 bg-slate-800 text-amber-400 rounded-xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
              Documento de Gestión
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              Modelos de Capacitación
            </h2>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Seleccione un módulo, cargue la lista de asistentes y emita la <strong>constancia de capacitación</strong> con planilla de asistencia.
        </p>
      </div>

      {codigoEmitido ? (
        <div className="bg-emerald-50 border-2 border-emerald-300 p-6 rounded-2xl text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
          </div>
          <h4 className="text-emerald-950 font-black text-lg">CONSTANCIA EMITIDA CORRECTAMENTE</h4>
          <p className="text-xs text-emerald-800 font-semibold">
            Código: <span className="font-mono font-bold">{codigoEmitido}</span>
          </p>
          <button
            onClick={() => {
              setCodigoEmitido(null);
              setCapacitacionId(null);
              setParticipantes([participanteVacio(), participanteVacio(), participanteVacio()]);
              setInstructor('');
              setEmpresa('');
              setSignatureDataUrl(null);
            }}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer"
          >
            Emitir una nueva constancia
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Selector de módulo */}
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide mb-3">
              1. Seleccione el módulo de capacitación
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CAPACITACIONES.map((c) => {
                const activa = c.id === capacitacionId;
                return (
                  <button
                    key={c.id}
                    onClick={() => seleccionar(c.id)}
                    className={`p-4 rounded-xl border-2 text-left transition cursor-pointer ${
                      activa
                        ? 'border-amber-500 bg-amber-50 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <h4 className="font-black text-slate-900 text-sm leading-tight">{c.titulo}</h4>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {c.duracion}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {c.destinatarios.split(',')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detalle del módulo */}
          {capacitacion && (
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6 space-y-3">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                Contenido del módulo seleccionado
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Objetivo:</strong> {capacitacion.objetivo}
              </p>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wide mb-2">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Contenidos</span>
                </div>
                <ul className="space-y-1.5">
                  {capacitacion.contenidos.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Datos y participantes */}
          {capacitacion && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6 space-y-3">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                  2. Datos de la capacitación
                </h3>
                {errorMsg && (
                  <div className="bg-rose-50 border border-rose-300 text-rose-800 p-3 rounded-xl text-xs font-semibold flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">Instructor / responsable</label>
                    <input
                      type="text"
                      value={instructor}
                      onChange={(e) => setInstructor(e.target.value)}
                      placeholder="Nombre y apellido"
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">Empresa / obra</label>
                    <input
                      type="text"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Razón social o frente"
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                    3. Lista de asistentes
                  </h3>
                  <button
                    onClick={agregarParticipante}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-100 px-3 py-2 rounded-lg cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar asistente</span>
                  </button>
                </div>

                {participantes.map((p, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={p.nombre}
                      onChange={(e) => actualizarParticipante(i, 'nombre', e.target.value)}
                      placeholder={`Asistente ${i + 1} — nombre y apellido`}
                      className="flex-1 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={p.dni}
                      onChange={(e) => actualizarParticipante(i, 'dni', e.target.value)}
                      placeholder="DNI"
                      className="sm:w-32 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    {participantes.length > 1 && (
                      <button
                        onClick={() => quitarParticipante(i)}
                        className="p-2.5 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-xl cursor-pointer"
                        title="Quitar asistente"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6 space-y-3">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">4. Firma del instructor</h3>
                <SignaturePad onSignatureChange={setSignatureDataUrl} />

                <button
                  onClick={handleGenerar}
                  className="w-full py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-md bg-amber-500 hover:bg-amber-600 text-slate-950 active:scale-98 transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Validar y Emitir Constancia (PDF)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
