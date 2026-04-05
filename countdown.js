(function () {
  var root = document.documentElement;
  var raw = root.getAttribute("data-wedding-date");
  if (!raw) return;

  var target = new Date(raw);
  if (Number.isNaN(target.getTime())) return;

  var el = document.getElementById("countdown");
  if (!el) return;

  var forms = {
    days: ["день", "дня", "дней"],
    hours: ["час", "часа", "часов"],
    minutes: ["минута", "минуты", "минут"],
    seconds: ["секунда", "секунды", "секунд"],
  };

  function pluralRu(n, list) {
    n = Math.abs(Math.floor(n)) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) return list[2];
    if (n1 > 1 && n1 < 5) return list[1];
    if (n1 === 1) return list[0];
    return list[2];
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  var timerId = null;

  function tick() {
    var now = new Date();
    var ms = target.getTime() - now.getTime();
    if (ms <= 0) {
      el.querySelector('[data-unit="days"]').textContent = "0";
      el.querySelector('[data-unit="hours"]').textContent = "0";
      el.querySelector('[data-unit="minutes"]').textContent = "0";
      el.querySelector('[data-unit="seconds"]').textContent = "0";
      ["days", "hours", "minutes", "seconds"].forEach(function (key) {
        var label = el.querySelector('[data-unit-label="' + key + '"]');
        if (label) label.textContent = pluralRu(0, forms[key]);
      });
      if (timerId != null) {
        clearInterval(timerId);
        timerId = null;
      }
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

    el.querySelector('[data-unit-label="days"]').textContent = pluralRu(days, forms.days);
    el.querySelector('[data-unit-label="hours"]').textContent = pluralRu(hours, forms.hours);
    el.querySelector('[data-unit-label="minutes"]').textContent = pluralRu(minutes, forms.minutes);
    el.querySelector('[data-unit-label="seconds"]').textContent = pluralRu(seconds, forms.seconds);
  }

  tick();
  timerId = setInterval(tick, 1000);

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) tick();
  });
})();
