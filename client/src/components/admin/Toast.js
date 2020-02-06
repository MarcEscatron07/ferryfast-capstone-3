import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
    toast: true,
    background: 'rgba(41, 188, 245, 0.9)',
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000 
});