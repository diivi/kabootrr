Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};
$(".userout").on("click", function () {
  jaanahai = confirm("Are you sure you want to sign out?");
  if (jaanahai == true) {
    signUserOut();
    $("#log").show();
  } else {
  }
});
let seatnametemp = "";
$(".cinema-seats .seat").on("click", function () {
  seatnametemp = "";
  $(this).toggleClass("active"); // yaha if statement
  let active = $(".seat.active");
  active.each(function () {
    let seatsPerRow = $(this).parent().find(".seat").length;
    if (!$(this).closest(".cinema-seats").hasClass("right")) {
      let prevRows =
        $(this).parent(".cinema-row").prevAll(".cinema-row").length - 1;
      seatnametemp +=
        (prevRows + 1).toString() +
        ($(this).index() + 9).toString(36).toUpperCase() +
        " ";
    } else {
      let leftSeats = $(".left").find(".seat").length;
      let prevRows = $(this).parent(".cinema-row").prevAll(".cinema-row")
        .length;
      seatnametemp +=
        (prevRows + 8).toString() +
        ($(this).index() + 9).toString(36).toUpperCase() +
        " ";
    }
  });
  var bookedSeats = document.querySelectorAll(".active").length;
  document.querySelector(".booked").innerHTML = bookedSeats;
  document.querySelector(".seatsbooked").innerHTML = seatnametemp;
});
var currr = "";
var bookHogayi = "";
var kisneki = "";
var cloned = "";
firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    // user is not signed in.
    $("#notlog").remove();
    $("#log").show();
    $("#thanku").hide(); // User is signed in.
  } else {
    currr = user.email;
    document.getElementById("usershow").innerHTML = user.email;
    // user is signed in.
    $("#log").hide();
    $("#notlog").show();
    $("#thanku").hide();
    loadSeats();
    var docRef = db.collection("users").doc(currr);
  }
});

function loadSeats() {
  db.collection("seats")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        bookHogayi += doc.id + " ";
        kisneki += doc.get("seatOwner") + " ";
      });
      document.querySelector(".hochuki").innerHTML = bookHogayi;
      dekhle(bookHogayi, kisneki);
    });
}

function showDialog() {
  redirectBooked = false;
  finalSeats = document.querySelector(".seatsbooked").innerHTML;
  let numberOfSeatsBooked = finalSeats.split(" ");
  numberOfSeatsBooked = numberOfSeatsBooked.remove("").length;
  if (numberOfSeatsBooked > 0) {
    ready = confirm(
      "Are you sure you want to book the following " +
        numberOfSeatsBooked +
        " seats for ₹ " +
        numberOfSeatsBooked * 200 +
        ":\n" +
        finalSeats
    );
  } else {
    ready = alert("Please select atleast one seat");
  }
  if (ready === true) {
    for (let i = 0; i < finalSeats.trim().split(" ").length; i++) {
      db.collection("seats")
        .doc(finalSeats.trim().split(" ")[i])
        .get()
        .then(function (doc) {
          if (doc.exists) {
            alert(
              "The following seat was already booked by you or somebody else during this session \n" +
                finalSeats.trim().split(" ")[i]
            );
          } else {
            db.collection("seats")
              .doc(finalSeats.trim().split(" ")[i])
              .set({
                seatNumber: finalSeats.trim().split(" ")[i],
                seatOwner: currr,
                uid: auth.currentUser.uid,
              });
          }
        });
    }
    $("#notlog").remove();
    $("#thanku").show();
  } else {
    console.log("lolgareeb");
  }
}
function dekhle(allBooked, bande) {
  var eachSeat = allBooked.toString().split(" ");
  eachSeat.remove("");
  var eachOwner = bande.split(" ");
  for (i = 0; i < eachSeat.length; i++) {
    var number = 0;
    var numberfromString = 0;

    var str = eachSeat[i];
    var matches = str.match(/(\d+)/);

    number = matches[0];
    var letter = eachSeat[i].replace(/[0-9]/g, "").toString();
    numberfromString = letter.toLowerCase().charCodeAt(0) - 97 + 1;
    owner = eachOwner[i];
    getSeat(number, numberfromString, owner);
  }
}
function getSeat(num, letr, prsn) {
  letr += 1;
  if (num <= 7) {
    var selector =
      ".left .row-" +
      num.toString() +
      " .seat:nth-child(" +
      letr.toString() +
      ")";
    if (currr === prsn) {
      $(selector).addClass("same");
    } else {
      $(selector).addClass("different");
    }
  } else if (num > 7) {
    num -= 7;
    var selector =
      ".right .row-" +
      num.toString() +
      " .seat:nth-child(" +
      letr.toString() +
      ")";
    if (currr === prsn) {
      $(selector).addClass("same");
    } else {
      $(selector).addClass("different");
    }
  }
}
function signUserOut() {
  auth
    .signOut()
    .then(function () {
      window.location.href = "./index.html";
    })
    .catch(function (error) {
      alert("Could'nt Sign you out!");
    });
}
