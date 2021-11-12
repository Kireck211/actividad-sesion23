function getStudent(id) {
  $.ajax({
    url: 'http://localhost:3000/students/' + id,
    method: 'GET',
    headers: {
      'x-auth': getToken()
    },
    success: ({student}) => {
      Object.keys(student)
        .forEach(property => {
          if (property === 'birth')
            student[property] = student[property].substring(0, student[property].length - 8);
          $(`#${property}`).val(student[property]);
        });
    },
    error: () => {
      bootbox.alert('No tienes permiso para ver está página, por favor inicia sesión', () => {
        location.href = '/views/login.html'
      });
    }
  })
}

function addListeners() {
  $('form').on('', (event) => { // 5.2 Agrega el evento correspondiente para escuchar submit en un form
    event.preventDefault();
    const data = $('form').serializeArray().reduce((obj, input) => {
      obj[input.name] = input.value;
      return obj;
    }, {});

    $('button').attr('disabled', 'disabled');

    $.ajax({
      method: '', // 5.2 Agrega el método correspondiente para editar un estudiante
      url: `/students/${qs('id')}`,
      contentType: 'application/json',
      data: JSON.stringify(data),
      headers: {
        'x-auth': getToken()
      },
      success: (data)  => {
        bootbox.alert('Estudiante guardado!');
        // 5.3 Redirecciona el usuario location.href = <url_tabla_estudiantes>
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

async function main() {
  addListeners();
  const id = qs('id')
  getStudent(id);
}

$(function() {
  main();
});