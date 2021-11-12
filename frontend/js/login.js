$(function() {
  $('form').on('submit', (event) => {
    event.preventDefault();
    const data = $('form').serializeArray().reduce((obj, input) => {
      obj[input.name] = input.value;
      return obj;
    }, {});

    $('button').attr('disabled','disabled');
    
    $.ajax({
      method: 'POST',
      url: '', // 3.1. Agrega la correcta url
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: (data) => {
        const {token} = data;
        if (token) {
          // 3.2. Guarda el token en localStorage con la llave 'token'
          // 3.3. Redirige al usuario a la vista de los estudiantes '/views/students.html'
        }
      },
      error: (xhr) => {
        if (xhr.status === 403) {
          bootbox.alert('Correo o contraseña equivocados');
        }
      },
      complete: () => {
        $('button').removeAttr('disabled');
      }
    })
  });
});