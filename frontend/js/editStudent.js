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
          if (property === 'birth')
            student[property] = student[property].substring(0, student[property].length - 8);
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
      method: 'PUT',
      url: `/students/${qs('id')}`,
      contentType: 'application/json',
      data: JSON.stringify(data),
      headers: {
        'x-auth': getToken()
      },
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

async function main() {
  addListeners();
  const id = qs('id')
  getStudent(id);
}

$(function() {
  main();
});