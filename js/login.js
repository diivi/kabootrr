const user = document.querySelector("#user");
const pass = document.querySelector("#pass");
const enter = document.querySelector("#submit");

enter.addEventListener("click", function () {
  auth
    .signInWithEmailAndPassword(user.value.trim(), pass.value)
    .catch(function (error) {
      alert(error.message)
    });
});
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    window.location.href = "./booking.html";
    // User is signed in.
    var email = user.email;
    var uid = user.uid;
    // ...
  } else {
    // User is signed out.
    // ...
  }
});
var inputs = document.getElementsByTagName("input");
for (i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("submit").click();
    }
  });
}
