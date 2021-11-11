function hideLogin() {
  $('.nav-link:contains("Login")').hide();
}

function hideLogout() {
  $('.nav-link:contains("Logout")').hide();
}

function hideRegister() {
  $('.nav-link:contains("Crear usuario")').hide();
}

function addLogoutListener() {
  $('.nav-link:contains("Logout")').on('click', (event) => {
    event.preventDefault();
    logout();
  })
}

function setCorrectLinks(){
  const token = getToken();
  if(token) {
    hideLogin();
    hideRegister();
  } else {
    hideLogout();
  }
}

$(function() {
  setCorrectLinks();
  addLogoutListener();
});