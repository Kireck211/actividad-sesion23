function deleteUser(id, $tr) {
  $.ajax({
    method: '', // 6.2 Ingresa el método adecuado para borrar un estudiante
    url: '', // 6.3 Ingresa la url adecuada para borrar un esudiante (importante: debe de contener el id en algún lugar)
    headers: {
      // 6.4 Agrega el header adecuado para obtener el permiso de borrar 
    },
    success: () => {
      bootbox.alert('El estudiante ha sido eliminado');
      $tr.fadeOut(function() {
        $(this).remove();
      })
    },
    error: () => {
      bootbox.alert('No tienes permiso para borrar el usuario')
    }
  })
}

function addListeners() {
  $('table').on('click', (event) => {
    const $element = $(event.target);
    const $tr = $element.closest('tr');
    const id = $tr.data('id');
    if ($element.hasClass('btn-info')) {
      location.href = `/views/editStudent.html?id=${id}`;
    } else if ($element.hasClass('btn-danger')) {
      deleteUser(id, $tr);
    }
  });
  $('button.add-new').on('click', (event) => {
    location.href = '/views/createStudent.html'
  })
}

function parseDate() {
  const date =  new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function insertRow(student) {
  return `
  <tr>
    <td>${student.name}</td>
    <td>${parseDate(new Date(student.birth))}</td>
    <td>${student.favoriteColor}</td>
    <td>${student.score}</td>
    <td>${student.favoriteCourse}</td>
    <td>${student.email}</td>
    <td>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-info">Editar</button>
      <button type="button" class="btn btn-danger">Eliminar</button>
    </div>
    <td>
  </tr>
  `
}

function insertStudents({students}) {
  const $tbody = $('tbody');
  students.forEach(student => {
    $tbody.append(insertRow(student));
    $tbody.children().last().data('id', student._id);
  });
}

async function getStudents() {
  $.ajax({
    method: 'GET',
    contentType: 'application/json',
    url: '/students',
    headers: {
      'x-auth': getToken()
    },
    success: (data) => {
      insertStudents(data);
    },
    error: (xhr) => {
      bootbox.alert('No tienes permisos para ver los estudiantes, por favor inicia sesión', () => {
        location.href = '/views/login.html'
      });
    }
  })
}

async function main() {
  getStudents();
  addListeners();
}

$(function() {
  main();
});