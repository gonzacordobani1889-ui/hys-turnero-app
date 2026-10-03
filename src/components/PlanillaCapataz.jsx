// src/components/PlanillaCapataz.jsx
import React, { useState } from 'react';
import { FileCheck, Download, AlertCircle, CheckCircle } from 'lucide-react';
import SignaturePad from './SignaturePad';
import { generarPermisoPDF } from '../utils/generatePdf';
import { guardarPermisoEnHistorial } from '../utils/storage';

export default function PlanillaCapataz({ tarea, checklistCompleto, checkedIndices }) {
  const [formData, setFormData] = useState({
    obra: '',
    responsable: '',
    matricula: '',
    operarios: '',
    horario: '08:00 a 17:00',
    declaracion: false
  });

  const [signatureDataUrl, setSignatureDataUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [codigoEmitido, setCodigoEmitido] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checklistCompleto) {
      setErrorMsg('ATENCIÓN: Debe completar el 100% del Check List de operarios antes de emitir la habilitación.');
      return;
    }

    if (!signatureDataUrl) {
      setErrorMsg('ATENCIÓN: Se requiere la firma digital en pantalla del Capataz o M.M.O. para dar validez legal al permiso.');
      return;
    }

    try {
      const codigo = generarPermisoPDF({
        tarea,
        datosObra: formData,
        checklistItems: checkedIndices,
        signatureDataUrl
      });
      
      // Guardar en el historial local persistente
      guardarPermisoEnHistorial({
        id: codigo,
        tarea,
        datosObra: { ...formData },
        checkedIndices: [...checkedIndices],
        signatureDataUrl,
        fecha: new Date().toLocaleString('es-AR')
      });

      setCodigoEmitido(codigo);
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocurrió un error al generar el PDF del permiso.');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 md:p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
              Habilitación y Responsabilidad
            </span>
            <h3 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-slate-500" />
              <span>Planilla Capataz / M.M.O.</span>
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
            PTS FORM
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-4">
          Suscripción formal del <strong>Permiso de Trabajo Seguro</strong>. Complete los datos de la cuadrilla y firme en pantalla.
        </p>

        {errorMsg && (
          <div className="mb-4 bg-rose-50 border border-rose-300 text-rose-800 p-3 rounded-xl text-xs font-semibold flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {codigoEmitido ? (
          <div className="bg-emerald-50 border-2 border-emerald-300 p-5 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-emerald-950 font-black text-lg">TRABAJO HABILITADO CON ÉXITO</h4>
              <p className="text-xs text-emerald-800 font-semibold mt-1">
                Se descargó el documento oficial: <span className="font-mono font-bold">{codigoEmitido}</span>
              </p>
            </div>
            <p className="text-[11px] text-slate-500">
              El documento incluye el marco de resoluciones SRT, el checklist auditado y la firma digital. Puede reenviarlo por WhatsApp o archivarlo.
            </p>
            <button
              type="button"
              onClick={() => {
                setCodigoEmitido(null);
                setFormData({
                  obra: '',
                  responsable: '',
                  matricula: '',
                  operarios: '',
                  horario: '08:00 a 17:00',
                  declaracion: false
                });
                setSignatureDataUrl(null);
              }}
              className="text-xs font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer"
            >
              Emitir un nuevo permiso
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nombre de la Obra o Frente</label>
              <input
                type="text"
                name="obra"
                required
                value={formData.obra}
                onChange={handleChange}
                placeholder="Ej: Edificio Central - Frente Andamios Norte"
                className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Capataz o M.M.O.</label>
                <input
                  type="text"
                  name="responsable"
                  required
                  value={formData.responsable}
                  onChange={handleChange}
                  placeholder="Nombre y Apellido"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">DNI o Matrícula Prof.</label>
                <input
                  type="text"
                  name="matricula"
                  required
                  value={formData.matricula}
                  onChange={handleChange}
                  placeholder="DNI o N° Matrícula"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Operarios en Tarea</label>
                <input
                  type="number"
                  name="operarios"
                  min="1"
                  max="50"
                  required
                  value={formData.operarios}
                  onChange={handleChange}
                  placeholder="Cantidad de personas"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Rango Horario</label>
                <input
                  type="text"
                  name="horario"
                  required
                  value={formData.horario}
                  onChange={handleChange}
                  placeholder="Ej: 08:00 a 17:00"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Captura de firma digital */}
            <SignaturePad onSignatureChange={setSignatureDataUrl} />

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="declaracion"
                  required
                  checked={formData.declaracion}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded text-slate-500 focus:ring-slate-500"
                />
                <span className="text-[11px] text-slate-600 leading-tight select-none">
                  Declaro bajo juramento haber verificado los EPP certificados, el entorno de trabajo y notificado el procedimiento a la cuadrilla.
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className={`w-full py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  checklistCompleto 
                    ? 'bg-slate-900 hover:bg-slate-800 text-white active:scale-98' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Validar y Emitir Permiso PTS (PDF)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
