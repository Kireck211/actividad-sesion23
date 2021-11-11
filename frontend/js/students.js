function getToken() {
  return localStorage.getItem('token') || '';
}

function deleteUser(id) {
  $.ajax({
    method: 'DELETE',
    url: '/students/' + id,
    headers: {
      'x-auth': getToken()
    },
    success: function() {
      bootbox.alert('El estudiante ha sido eliminado');
    },
    error: function() {
      bootbox.alert('No tienes permiso para borrar el usuario')
    }
  })
}

function addListeners() {
  $('.btn-info').on('click', () => {
    location.href = '/views/editStudent.html'
  });
  $('.btn-danger').on('click', () => {
    const $tr = $(this).closest('tr');
    const id = $tr.data('id');
    deleteUser(id);
  });
}

function insertRow(student) {
  return `
  <tr>
    <td>${student.name}</td>
    <td>${new Date(student.birth).getDate()}</td>
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
    success: function(data) {
      insertStudents(data);
    },
    error: function(xhr) {
      bootbox.alert('No tienes permisos para ver los estudiantes, por favor inicia sesión', () => {
        location.href = '/views/login.html'
      });
    }
  })
}

async function main() {
  $('tr').on('click', () => {
    location.href = "/views/editStudent.html";
  });
  $('button').on('click', () => {
    location.href = "/views/createStudent.html";
  });
  getStudents();
}

$(function() {
  main();
});