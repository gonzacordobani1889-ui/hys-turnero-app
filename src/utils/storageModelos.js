// src/utils/storageModelos.js
// Persistencia offline (LocalStorage) para los documentos de gestión:
// check de herramientas, ATS, APR, capacitaciones, etc.

const CLAVE = 'hys_documentos_v1';

export function getDocumentos() {
  try {
    const data = localStorage.getItem(CLAVE);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al leer documentos:', error);
    return [];
  }
}

export function guardarDocumento(documento) {
  try {
    const actuales = getDocumentos();
    const nuevos = [documento, ...actuales];
    localStorage.setItem(CLAVE, JSON.stringify(nuevos));
    return nuevos;
  } catch (error) {
    console.error('Error al guardar documento:', error);
    return [];
  }
}

export function eliminarDocumento(id) {
  try {
    const actuales = getDocumentos();
    const filtrados = actuales.filter((d) => d.id !== id);
    localStorage.setItem(CLAVE, JSON.stringify(filtrados));
    return filtrados;
  } catch (error) {
    console.error('Error al eliminar documento:', error);
    return [];
  }
}
