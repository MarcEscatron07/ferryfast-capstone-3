import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
    toast: true,
    background: 'rgba(41, 188, 245, 0.9)',
    position: 'bottom-end',
    showConfirmButton: true,
    timer: 2500,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});