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
      url: '', // 2.1. Agrega la correcta url
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: (data) => {
        const {token} = data;
        if (token) {
          // 2.2. Guarda el token en localStorage con la llave 'token'
          // 2.3. Redirige al usuario a la vista de los estudiantes '/views/students.html'
        }
      },
      error: (xhr) => {
        console.log(xhr);
      },
      complete: () => {
        $('button').removeAttr('disabled');
      }
    })
  });
});