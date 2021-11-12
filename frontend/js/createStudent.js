function addListeners() {
  $('form').on('submit', (event) => {
    event.preventDefault();
    const data = $('form').serializeArray().reduce((obj, input) => {
      obj[input.name] = input.value;
      return obj;
    }, {});

    $('button').attr('disabled', 'disabled');

    $.ajax({
      method: 'POST',
      url: '/students',
      contentType: 'application/json',
      headers: {
        // 4.2 Agrega header: 'x-auth': getToken()
      },
      data: JSON.stringify(data),
      success: (data) => {
        bootbox.alert('Estudiante guardado!');
        location.href = '/views/students.html'
      },
      error: (xhr) => {
        bootbox.alert('No tienes permiso para guardar un usuario');
      },
      complete: () => {
        $('button').removeAttr('disabled');
      }
    })
  });
}

function main() {
  addListeners();
}

$(function() {
  main();
});