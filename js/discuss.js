var user = "";
var localUser = localStorage.getItem("discussUser");
var userRef = db.collection("users").doc(localUser);
var postRef = db.collection("posts").doc();
window.onload = function () {
  var using = "";
  userRef.get().then(function (doc) {
    using = doc.get("username");
    setUser(using);
    loadPosts(using);
  });
};

function setUser(x) {
  user = x;
  for (i = 0; i < document.getElementsByClassName("user").length; i++) {
    document.getElementsByClassName("user")[i].innerHTML = user;
  }
}
document.getElementById("send").onclick = function () {
  var totalMsg = [];
  var totalTopic = [];
  var totalUsers = [];
  var topic = document.getElementById("topic").value;
  var message = document.getElementById("msg").value;
  db.collection("posts").doc(topic).set({
    topic: topic,
    message: message,
    user: user,
  });
};
function loadPosts(user) {
  var postHead = [];
  var postMesg = [];
  var byUser = [];
  db.collection("posts")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        addToDiv(doc.get("topic"), doc.get("message"), doc.get("user"));
      });
    });
}
function addToDiv(heading, message, user) {
  var apnaDiv =
    "<div><h1>" +
    heading +
    "</h1><p>" +
    user +
    "</p><h3>" +
    message +
    "</h3><button id='reply'>Reply</button><div id='replyTo'></div></div>";
  document.getElementById("posts").insertAdjacentHTML("beforeend", apnaDiv);
}
