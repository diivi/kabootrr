function darksite() {
  document.getElementById("darkp").innerHTML =
    "For sanctuaries, the kabootrrs had ruled peacefully over their lands. Grains would be pecked at, twigs & straw would make plush palaces, and surfaces would be shat on. <br> In the midst of the comfort, the Supreme Kabootrr proclaimed a Kabootrr Din to celebrate and reward the greatest kabootrr in his realm. The economy only boosted in response as did the rambunctiousness of his subjects.<br> All was well, until a devious, hippie crow went forth on his ethereal quest to become a kabootrr himself. <br> Come and immerse yourself in our next big play. The next big musical. The next big kabootrr. The flyest event of your life. ";
}
function haitoh() {
  alert("Colours (Blue & Black) already displayed");
}
function no() {
  alert("This Product has no other coulours");
}
var colour = "";
function colorBlack(x) {
  $(".kaala").removeClass("active");
  $(x).addClass("active");
  $(".neela").removeClass("active");
  $(".safed").removeClass("active");
  colour = "black";
}
function colorWhite(x) {
  $(".safed").removeClass("active");
  $(x).addClass("active");
  $(".neela").removeClass("active");
  $(".kaala").removeClass("active");
  colour = "white";
}
function colorBlue(x) {
  $(".neela").removeClass("active");
  $(x).addClass("active");
  $(".kaala").removeClass("active");
  $(".safed").removeClass("active");
  colour = "blue";
}
function lele(x) {
  var buttonDiv = $(x).parent().attr("class").split(" ")[1];
  var selectedDiv = $(".active").parent().attr("class");
  if (selectedDiv == buttonDiv) {
    $("#" + selectedDiv).attr(
      "src",
      "./images/" + colour + selectedDiv + ".png"
    );
  } else {
    alert(
      "You are either not selecting a colour, or have selected a colour of another product"
    );
  }
}
