function getCookie(c_name) {
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
    c_start = c_value.indexOf(c_name + "=");
  }
  if (c_start == -1) {
    c_value = null;
  } else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start, c_end));
  }
  return c_value;
}

function setCookie(c_name, value, exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value =
    escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
}

function checkCookie() {
  var username = getCookie("username");
  var password = getCookie("password");
  if (
    username != null &&
    username != "" &&
    password != null &&
    password != ""
  ) {
    document.getElementById("username").value = username;
    document.getElementById("username").readOnly = true;
    document.getElementById("username").disabled = true;
    document.getElementById("password").value = password;
  }
}

function checkboxed() {
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  rem = document.getElementById("rem");
  // username = prompt("Please enter your username:", "");
  // password = prompt("Please enter your password:", "");
  if (
    username != null &&
    username != "" &&
    password != null &&
    password != ""
  ) {
    setCookie("username", username, 365);
    setCookie("password", password, 365);
  }
}
