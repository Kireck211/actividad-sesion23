function getStudent(id) {
  $.ajax({
    url: 'http://localhost:3000/students/' + id,
    method: 'GET',
    headers: {
      'x-auth': getToken()
    },
    success: function({student}) {
      Object.keys(student)
        .forEach(property => {
          $(`#${property}`).val(student[property]);
        });
    },
    error: function() {
      bootbox.alert('No tienes permiso para ver está página, por favor inicia sesión');
      location.href = '/views/admin/login'
    }
  })
}

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
        bootbox.box('No tienes permiso para guardar un usuario');
      },
      complete: function() {
        $('button').removeAttr('disabled');
      }
    })
  });
}

async function main() {
  addListeners();
}

$(function() {
  main();
});