import Swal from 'sweetalert2'

export const fireError= (msg) => {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: '<h1>Erro!</h1>',
        html: msg ? `<h4>${msg}</h4>` : '<h4>Ocorreu um erro ao processar sua solicitação.</h4>',
        type: 'error',
        showConfirmButton: false,
        timer: 1500
    })
}
export const fireSuccess = (msg) => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '<h1>Sucesso!</h1>',
        html: msg ? `<h4>${msg}</h4>`  : '<h4>Operação realizada com sucesso.</h4>',
        type: 'success',
        showConfirmButton: false,
        timer: 1500,
    })
}