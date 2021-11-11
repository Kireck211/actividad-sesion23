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
      data: JSON.stringify(data),
      success: function(data) {
        bootbox.alert('Estudiante guardado!');
        location.href = '/views/students.html'
      },
      error: function(xhr) {
        bootbox.alert('No tienes permiso para guardar un usuario');
      },
      complete: function() {
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