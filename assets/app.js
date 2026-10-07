const prices = {
  "iphone14-128": 68500,
  "iphone13-128": 59900,
  "iphone12-64": 32500,
  "samsung-s23": 58500,
  "samsung-a55": 29900,
  "redmi-note13": 18400,
  "poco-x6": 31500,
  "poco-m6": 16400
};
const condK = { ideal: 1, good: 0.85, defect: 0.6 };

function fmt(n){ return (Math.round(n / 100) * 100).toLocaleString("ru-RU") + " сом"; }

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  const chips = document.querySelectorAll(".chip");
  const cards = document.querySelectorAll("#catalogGrid .card");
  chips.forEach(ch => ch.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    ch.classList.add("active");
    const f = ch.dataset.filter;
    cards.forEach(card => {
      const types = (card.dataset.type || "").split(" ");
      const show = f === "all" || types.includes(f);
      card.style.display = show ? "" : "none";
    });
  }));

  const modelSel = document.getElementById("calcModel");
  const condBtns = document.querySelectorAll(".cond button");
  const out = document.getElementById("calcOut");
  let cond = "good";
  function updateCalc(){
    const base = prices[modelSel.value] || 20000;
    const k = condK[cond] || 0.85;
    const low = Math.round(base * k * 0.92 / 100) * 100;
    const high = Math.round(base * k / 100) * 100;
    out.innerHTML = "<strong>" + fmt(low) + " - " + fmt(high) + "</strong><span>предварительно, точную цену назовем после проверки в магазине за 15 минут</span>";
  }
  condBtns.forEach(b => b.addEventListener("click", () => {
    condBtns.forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    cond = b.dataset.cond;
    updateCalc();
  }));
  modelSel.addEventListener("change", updateCalc);
  updateCalc();

  document.querySelectorAll(".faq-q").forEach(q => q.addEventListener("click", () => {
    const item = q.closest(".faq-item");
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
    if(!wasOpen) item.classList.add("open");
  }));

  const header = document.querySelector(".header");
  addEventListener("scroll", () => {
    header.style.boxShadow = scrollY > 10 ? "0 8px 24px rgba(0,0,0,.08)" : "none";
  }, { passive: true });

  const DETAILS = {
    iphone14: { brand: "Apple • новый", title: "iPhone 14 128 ГБ", price: "74 990 сом", img: "assets/img/iphone-14.jpg", desc: "Новый, запечатан. Отличная камера и автономность на каждый день. Активируем и переносим данные при вас.", specs: [["Экран", "6.1 OLED, 60 Гц"], ["Процессор", "Apple A15"], ["Память", "128 ГБ"], ["Камера", "12 + 12 Мп"], ["АКБ", "3279 мАч, 100%"], ["SIM", "2 SIM"], ["Состояние", "Новый"], ["Гарантия", "1 год"], ["Комплект", "Телефон, кабель, чек"]] },
    iphone13: { brand: "Apple • новый", title: "iPhone 13 128 ГБ", price: "64 990 сом", img: "assets/img/iphone-13.jpg", desc: "Хит витрины. Новый, полный комплект. Держит заряд весь день, камера тянет ночь.", specs: [["Экран", "6.1 OLED, 60 Гц"], ["Процессор", "Apple A15"], ["Память", "128 ГБ"], ["Камера", "12 + 12 Мп"], ["АКБ", "3240 мАч, 100%"], ["SIM", "2 SIM"], ["Состояние", "Новый"], ["Гарантия", "1 год"], ["Комплект", "Телефон, кабель, чек"]] },
    iphone12: { brand: "Apple • б/у, проверен", title: "iPhone 12 64 ГБ, б/у", price: "34 990 сом", img: "assets/img/iphone-12.jpg", desc: "Проверен по 20 пунктам. АКБ 89%, без ремонтов, Face ID и True Tone работают. Сброшен, вышел из iCloud.", specs: [["Экран", "6.1 OLED, без царапин"], ["Процессор", "Apple A14"], ["Память", "64 ГБ"], ["Камера", "12 + 12 Мп"], ["АКБ", "89%, держит день"], ["SIM", "2 SIM"], ["Состояние", "Отличное, б/у"], ["Гарантия", "3 месяца"], ["Комплект", "Телефон, кабель, чек"]] },
    s23: { brand: "Samsung • новый", title: "Galaxy S23 256 ГБ", price: "62 990 сом", img: "assets/img/galaxy-s23.jpg", desc: "Компактный флагман. Snapdragon 8 Gen 2, камера 50 Мп, снимает ночь чисто.", specs: [["Экран", "6.1 AMOLED, 120 Гц"], ["Процессор", "Snapdragon 8 Gen 2"], ["Память", "8 / 256 ГБ"], ["Камера", "50 + 12 + 10 Мп"], ["АКБ", "3900 мАч"], ["SIM", "2 SIM"], ["NFC", "Есть"], ["Состояние", "Новый"], ["Гарантия", "1 год"]] },
    a55: { brand: "Samsung • новый", title: "Galaxy A55 128 ГБ", price: "31 990 сом", img: "assets/img/galaxy-a55.jpg", desc: "Сбалансированный средний класс. AMOLED 120 Гц, влагозащита IP67, батарея на 2 дня.", specs: [["Экран", "6.6 AMOLED, 120 Гц"], ["Процессор", "Exynos 1480"], ["Память", "8 / 128 ГБ + microSD"], ["Камера", "50 + 12 + 5 Мп"], ["АКБ", "5000 мАч"], ["SIM", "2 SIM"], ["NFC", "Есть"], ["Состояние", "Новый"], ["Гарантия", "1 год"]] },
    note13: { brand: "Xiaomi • новый", title: "Redmi Note 13 256 ГБ", price: "19 990 сом", img: "assets/img/redmi-note-13.jpg", desc: "Цена недели. AMOLED, камера 108 Мп, зарядка 33 Вт в комплекте.", specs: [["Экран", "6.67 AMOLED, 120 Гц"], ["Процессор", "Snapdragon 685"], ["Память", "8 / 256 ГБ"], ["Камера", "108 + 8 + 2 Мп"], ["АКБ", "5000 мАч"], ["SIM", "2 SIM"], ["NFC", "Есть"], ["Состояние", "Новый"], ["Гарантия", "1 год"]] },
    pocox6: { brand: "Poco • новый", title: "Poco X6 Pro 12/512 ГБ", price: "33 990 сом", img: "assets/img/poco-x6-pro.jpg", desc: "Для игр и тяжелых задач. Dimensity 8300 Ultra, топит холодно, зарядка 67 Вт.", specs: [["Экран", "6.67 AMOLED, 120 Гц"], ["Процессор", "Dimensity 8300 Ultra"], ["Память", "12 / 512 ГБ"], ["Камера", "64 + 8 + 2 Мп"], ["АКБ", "5000 мАч, 67 Вт"], ["SIM", "2 SIM"], ["NFC", "Есть"], ["Состояние", "Новый"], ["Гарантия", "1 год"]] },
    pocom6: { brand: "Poco • новый", title: "Poco M6 Pro 8/256 ГБ", price: "17 990 сом", img: "assets/img/poco-m6-pro.jpg", desc: "Бюджетный разумный выбор. AMOLED 120 Гц, 256 ГБ, NFC для оплаты.", specs: [["Экран", "6.67 AMOLED, 120 Гц"], ["Процессор", "Helio G99 Ultra"], ["Память", "8 / 256 ГБ"], ["Камера", "64 + 8 + 2 Мп"], ["АКБ", "5000 мАч, 67 Вт"], ["SIM", "2 SIM"], ["NFC", "Есть"], ["Состояние", "Новый"], ["Гарантия", "1 год"]] }
  };

  const modal = document.getElementById("productModal");
  const mImg = document.getElementById("modalImg");
  const mBrand = document.getElementById("modalBrand");
  const mTitle = document.getElementById("modalTitle");
  const mPrice = document.getElementById("modalPrice");
  const mDesc = document.getElementById("modalDesc");
  const mSpecs = document.getElementById("modalSpecs");
  const mWa = document.getElementById("modalWa");
  function openProduct(id){
    const d = DETAILS[id];
    if(!d || !modal) return;
    mImg.src = d.img; mImg.alt = d.title;
    mBrand.textContent = d.brand;
    mTitle.textContent = d.title;
    mPrice.textContent = d.price;
    mDesc.textContent = d.desc;
    mSpecs.innerHTML = d.specs.map(s => "<tr><td>" + s[0] + "</td><td>" + s[1] + "</td></tr>").join("");
    mWa.href = "https://wa.me/996000000000?text=" + encodeURIComponent("Здравствуйте! Интересует " + d.title);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeProduct(){
    if(!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-open]").forEach(b => b.addEventListener("click", (e) => { e.stopPropagation(); openProduct(b.dataset.open); }));
  modal.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", closeProduct));
  addEventListener("keydown", (e) => { if(e.key === "Escape") closeProduct(); });
});
