import { create } from 'zustand';

// Swal-alert
import Swal from 'sweetalert2';

export const useAlerts = create((set) => ({
  ask: ({
    title,
    text,
    icon = 'question',
    confirmButtonColor = '#0008FF',
    confirmButtonText,
    cancelButtonText = 'Cancelar',
  }) =>
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    }),
  successAlert: (title, text, confirmButtonText = 'OK') =>
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: confirmButtonText,
      confirmButtonColor: '#0008FF',
    }),
  errorAlert: (title, text, confirmButtonText = 'OK') =>
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: confirmButtonText,
      confirmButtonColor: '#CB0000',
    }),

  waitingAlert: () => {
    const html = `
      <div class="heigth-spinners">
        <p>Creando gira y subiendo imagenes...</p> 
        <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span>
      </div>`;
    return Swal.fire({
      title: 'Cargando...',
      html: html,
      allowOutsideClick: false, // Evita que el usuario cierre la alerta haciendo clic fuera de ella
      showConfirmButton: false, // Oculta el botón OK
    });
  },
}));
