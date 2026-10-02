// src/components/HistorialModal.jsx
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  FileText, 
  Download, 
  Trash2, 
  Calendar, 
  User, 
  Building, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { getHistorialPermisos, eliminarPermisoDeHistorial, limpiarTodoElHistorial } from '../utils/storage';
import { generarPermisoPDF } from '../utils/generatePdf';

export default function HistorialModal({ isOpen, onClose }) {
  const [permisos, setPermisos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPermisos(getHistorialPermisos());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEliminar = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este registro del historial local?')) {
      const actualizados = eliminarPermisoDeHistorial(id);
      setPermisos(actualizados);
    }
  };

  const handleLimpiarTodo = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar TODOS los permisos del historial local? Esta acción no se puede deshacer.')) {
      limpiarTodoElHistorial();
      setPermisos([]);
    }
  };

  const handleRedescargarPDF = (permiso) => {
    try {
      generarPermisoPDF({
        tarea: permiso.tarea,
        datosObra: permiso.datosObra,
        checklistItems: permiso.checkedIndices,
        signatureDataUrl: permiso.signatureDataUrl
      });
    } catch (err) {
      console.error('Error al regenerar PDF:', err);
      alert('No se pudo regenerar el PDF.');
    }
  };

  // Filtrado de búsqueda
  const permisosFiltrados = permisos.filter((p) => {
    const texto = `${p.id} ${p.tarea?.titulo || ''} ${p.datosObra?.obra || ''} ${p.datosObra?.responsable || ''}`.toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Cabecera del modal */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b-4 border-amber-500">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-wide">
                Historial de Permisos Emitidos
              </h3>
              <p className="text-xs text-slate-400">
                Registros guardados en la memoria del dispositivo (Offline) &middot; Total: {permisos.length}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Barra de búsqueda y acciones */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por obra, capataz o código..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {permisos.length > 0 && (
            <button
              onClick={handleLimpiarTodo}
              className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Vaciar Historial</span>
            </button>
          )}
        </div>

        {/* Lista de permisos */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3.5">
          {permisosFiltrados.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-700">
                {permisos.length === 0 ? 'Aún no se emitieron permisos' : 'No se encontraron coincidencias'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {permisos.length === 0 
                  ? 'Cuando completes un formulario y emitas un Permiso de Trabajo Seguro (PTS), aparecerá automáticamente listado aquí.'
                  : 'Prueba buscando con otro término.'}
              </p>
            </div>
          ) : (
            permisosFiltrados.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-amber-400 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md">
                      {p.id}
                    </span>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                      {p.tarea?.titulo}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{p.checkedIndices?.length || 0} checks aprobados</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-800 truncate">{p.datosObra?.obra || 'Obra no especificada'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{p.datosObra?.responsable} ({p.datosObra?.matricula})</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{p.fecha}</span>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <button
                    onClick={() => handleRedescargarPDF(p)}
                    className="flex-1 md:flex-none bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar PDF</span>
                  </button>
                  <button
                    onClick={() => handleEliminar(p.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    title="Eliminar registro"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pie del modal */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Cerrar Historial
          </button>
        </div>

      </div>
    </div>
  );
}
