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
      url: 'http://localhost:3000/admin/login',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: (data) => {
        const {token} = data;
        localStorage.setItem('token', token);
        location.href = 'http://localhost:3000/views/students.html'
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