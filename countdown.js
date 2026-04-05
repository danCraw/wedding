(function () {
  var root = document.documentElement;
  var raw = root.getAttribute("data-wedding-date");
  if (!raw) return;

  var target = new Date(raw);
  if (Number.isNaN(target.getTime())) return;

  var el = document.getElementById("countdown");
  if (!el) return;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    var now = new Date();
    var ms = target - now;
    if (ms <= 0) {
      el.querySelector('[data-unit="days"]').textContent = "0";
      el.querySelector('[data-unit="hours"]').textContent = "0";
      el.querySelector('[data-unit="minutes"]').textContent = "0";
      el.querySelector('[data-unit="seconds"]').textContent = "0";
      return;
    }
    var s = Math.floor(ms / 1000);
    var days = Math.floor(s / 86400);
    s -= days * 86400;
    var hours = Math.floor(s / 3600);
    s -= hours * 3600;
    var minutes = Math.floor(s / 60);
    var seconds = s - minutes * 60;

    el.querySelector('[data-unit="days"]').textContent = String(days);
    el.querySelector('[data-unit="hours"]').textContent = pad(hours);
    el.querySelector('[data-unit="minutes"]').textContent = pad(minutes);
    el.querySelector('[data-unit="seconds"]').textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
})();
