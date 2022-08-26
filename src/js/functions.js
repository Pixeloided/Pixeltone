function warn() {
  console.error(
    "%cHold Up!",
    "font-size: 50px; color: #426eff; border: 1px solid #426eff; padding: 10px;"
  );
  console.error(
    "%cIf someone told you to copy/paste something here you have an 11/10 chance you're being scammed.",
    "font-size: 18px;"
  );
  console.error(
    "%cPasting anything in here could give attackers access to your Minecraft account, or other important credentials.",
    "font-size: 20px; color: #ff4258; font-weight: bold;"
  );
}
warn();

function readData(key) {
  return localStorage.getItem(key);
}
function writeData(key, value) {
  localStorage.setItem(key, value);
}
function removeData(key) {
  localStorage.removeItem(key);
}

function getRawWP() {
  return JSON.parse(readData("wps"))["waypoints"];
}

function addWaypoint(n, x, y, z) {
  var w = getRawWP();
  var e_n = !0;
  var e_c = !0;
  w.forEach((elem) => {
    if (elem.name == n) e_n = !1;
    if (elem.x == x && elem.y == y && elem.z == z) e_c = !1;
  });
  if (e_n && e_c) {
    writeData(
      "wps",
      JSON.stringify({ waypoints: [...w, { name: n, x, y, z }] })
    );
    return 0;
  } else {
    if (!e_n) return 1;
    if (!e_c) return 2;
  }
}
function getWaypoint(name) {
  var w = getRawWP();
  var c;
  w.forEach((e) => {
    if (e.name == name) c = e;
  });
  if (!c) return null;
  return { x: c.x, y: c.y, z: c.z };
}

function removeWaypoint(n) {
  var w = getRawWP();
  var i;
  w.forEach((e) => {
    if (e.name == n) {
      i = w.indexOf(e);
    }
  });
  if (i > -1) {
    w.splice(i, 1);
  }
  writeData("wps", JSON.stringify({ waypoints: w }));
}

function getAllWaypointNames() {
  return getRawWP().map((n) => n.name);
}

function openUrl(url) {
  window.electronAPI.openExternal(url);
}

function setClipboard(text) {
  window.electronAPI.setClipboard(text);
}

function setPresence(details, state) {
  window.electronAPI.setDetails(details, state);
}
