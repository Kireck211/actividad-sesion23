async function main() {
  $('tr').on('click', () => {
    location.href = "/views/editStudent.html";
  });
  $('button').on('click', () => {
    location.href = "/views/createStudent.html";
  })
}

$(function() {
  main();
});