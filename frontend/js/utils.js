function getToken() {
  return localStorage.getItem('token') || '';
}

function qs(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
  var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function encodeTextForURL(key, value) {
  return `${key}=${encodeURIComponent(value)}`;
}

function logout() {
  localStorage.removeItem('token');
  location.href = '/views/login.html'
}