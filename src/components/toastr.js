import toastr from 'toastr'

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "350",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export function showMessage(title, message, type){
    // eslint-disable-next-line
    Command: toastr[type](title, message)
}

export function errorMessage(message){
    showMessage("Erro", message, "error")
}

export function successMessage(message){
    showMessage("Sucesso", message, "success")
}

export function alertMessage(message){
    showMessage("Alerta", message, "warning")
}