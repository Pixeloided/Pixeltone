window.onload = updateWaypointNames;

function updateWaypointNames() {
  var wpns = getAllWaypointNames();
  document.getElementById("wppath").innerHTML = "";
  wpns.forEach((elem) => {
    var opt = document.createElement("option");
    opt.innerText = elem;
    document.getElementById("wppath").appendChild(opt);
  });
  var first_wpt = getWaypoint(wpns[0]);
  document.getElementById(
    "wpc"
  ).innerHTML = `${first_wpt.x}, ${first_wpt.y}, ${first_wpt.z}`;
}

function removeWaypointSchedule() {
  var n = document.getElementById("wppath");
  removeWaypoint(n.value);
  updateWaypointNames();
}

function updateCoordinates() {
  var n = document.getElementById("wppath");
  var wps = getWaypoint(n.value);
  document.getElementById("wpc").innerHTML = `${wps.x}, ${wps.y}, ${wps.z}`;
}

function addWaypointSchedule() {
  var n = document.getElementById("wpname");
  var x = document.getElementById("wpx");
  var y = document.getElementById("wpy");
  var z = document.getElementById("wpz");
  if (n.value == "" || x.value == "" || y.value == "" || z.value == "") return;
  addWaypoint(n.value, x.value, y.value, z.value);
  n.value = "";
  x.value = "";
  y.value = "";
  z.value = "";
  updateWaypointNames();
}

function scrollChat(y) {
  var chat = document.getElementById("chat");
  chat.scrollTop = y;
}

function scrollChatBottom() {
  var chat = document.getElementById("chat");
  chat.scrollTop = 0;
}

function clearChat() {
  const messages = document.querySelectorAll(".message");

  messages.forEach((box) => {
    box.remove();
  });
}

function fillCurrentCoordinates() {
  var { x, y, z } = getCoords();
  document.getElementById("wpx").value = x;
  document.getElementById("wpy").value = y;
  document.getElementById("wpz").value = z;
}

function sendMessage(msg) {
  var chat = document.getElementById("chat");
  var message = document.createElement("div");
  message.className = "message";
  message.innerText = msg;
  chat.prepend(message);
  scrollChatBottom();
}

function setRead(read) {
  if (!read) {
    document.getElementById("chat").style =
      "box-shadow: inset 0px -77px 23px -55px rgba(255, 101, 101,0.7); transition: all 0.5s ease-in-out;";
  } else {
    document.getElementById("chat").style = "transition: all 0.5s ease-in-out;";
  }
}

function popAccent(id) {
  let accentable = document.getElementById(id);
  accentable.style.animation = "";
  accentable.style.animation = "popBg 0.25s ease-out";
  setTimeout(function () {
    accentable.style.animation = "";
  }, 250);
}

document.addEventListener("keydown", (e) => {
  const keyName = e.key;
  if (
    keyName === "Enter" &&
    document.getElementById("chat-text") === document.activeElement &&
    document.getElementById("chat-text").value !== ""
  ) {
    sendMessage(document.getElementById("chat-text").value);
    popAccent("chat-text");
    document.getElementById("chat-text").value = "";
  }
});

function setCoords(x, y, z) {
  document.getElementById("x").innerText = x;
  document.getElementById("y").innerText = y;
  document.getElementById("z").innerText = z;
}

function getCoords() {
  return {
    x: document.getElementById("x").innerText,
    y: document.getElementById("y").innerText,
    z: document.getElementById("z").innerText,
  };
}

function getHp() {
  switch (document.getElementById("bar").style) {
    case "width: 0%;":
      return 0;
    case "width: 3.6%;":
      return 1;
    case "width: 10%;":
      return 2;
    case "width: 13.9%;":
      return 3;
    case "width: 20%;":
      return 4;
    case "width: 24.2%;":
      return 5;
    case "width: 30%;":
      return 6;
    case "width: 34.5%;":
      return 7;
    case "width: 40%;":
      return 8;
    case "width: 44.8%;":
      return 9;
    case "width: 50%;":
      return 10;
    case "width: 55.1%;":
      return 11;
    case "width: 60%;":
      return 12;
    case "width: 65.4%;":
      return 13;
    case "width: 70%;":
      return 14;
    case "width: 75.7%;":
      return 15;
    case "width: 80%;":
      return 16;
    case "width: 86%;":
      return 17;
    case "width: 90%;":
      return 18;
    case "width: 96.42%;":
      return 19;
    case "width: 100%;":
      return 20;
  }
}

function setHp(hp) {
  switch (hp) {
    case 0:
      document.getElementById("bar").style = "width: 0%;";
      return true;
    case 1:
      document.getElementById("bar").style = "width: 3.6%;";
      return true;
    case 2:
      document.getElementById("bar").style = "width: 10%;";
      return true;
    case 3:
      document.getElementById("bar").style = "width: 13.9%;";
      return true;
    case 4:
      document.getElementById("bar").style = "width: 20%;";
      return true;
    case 5:
      document.getElementById("bar").style = "width: 24.2%;";
      return true;
    case 6:
      document.getElementById("bar").style = "width: 30%;";
      return true;
    case 7:
      document.getElementById("bar").style = "width: 34.5%;";
      return true;
    case 8:
      document.getElementById("bar").style = "width: 40%;";
      return true;
    case 9:
      document.getElementById("bar").style = "width: 44.8%;";
      return true;
    case 10:
      document.getElementById("bar").style = "width: 50%;";
      return true;
    case 11:
      document.getElementById("bar").style = "width: 55.1%;";
      return true;
    case 12:
      document.getElementById("bar").style = "width: 60%;";
      return true;
    case 13:
      document.getElementById("bar").style = "width: 65.4%;";
      return true;
    case 14:
      document.getElementById("bar").style = "width: 70%;";
      return true;
    case 15:
      document.getElementById("bar").style = "width: 75.7%;";
      return true;
    case 16:
      document.getElementById("bar").style = "width: 80%;";
      return true;
    case 17:
      document.getElementById("bar").style = "width: 86%;";
      return true;
    case 18:
      document.getElementById("bar").style = "width: 90%;";
      return true;
    case 19:
      document.getElementById("bar").style = "width: 96.42%;";
      return true;
    case 20:
      document.getElementById("bar").style = "width: 100%;";
      return true;
    default:
      return false;
  }
}
