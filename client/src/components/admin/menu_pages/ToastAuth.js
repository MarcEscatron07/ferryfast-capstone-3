import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
    toast: true,
    background: '#eeeeee',
    position: 'bottom-end',
    showConfirmButton: true,
    timer: 2500,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});