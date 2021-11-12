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
      url: '/admin/register',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: (data) => {
        const {token} = data;
        if (token) {
          localStorage.setItem('token', token);
          location.href = '/views/students.html'
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