const TELEGRAM_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwDwy-hux1HEXuSvET4Ratr-rRQ4a35x6VRIuaKrG0ua59wZeHYnTggTQatH8GCDPmz/exec";


/* =========================
   حرکت نرم داخل سایت
   ========================= */

document.querySelectorAll('a[href^="#"]').forEach(a => {

  a.addEventListener('click', e => {

    const el = document.querySelector(a.getAttribute('href'));

    if (el) {

      e.preventDefault();

      el.scrollIntoView({
        behavior: 'smooth'
      });

    }

  });

});


/* =========================
   فرم ثبت نام و تلگرام
   ========================= */

const form = document.getElementById('registerForm');

if (form) {

  form.addEventListener('submit', async function(e) {

    e.preventDefault();

    const button = form.querySelector('button[type="submit"]');

    button.disabled = true;
    button.textContent = 'در حال ارسال...';


    const data = {

      fullname: document.getElementById('fullname').value,

      age: document.getElementById('age').value,

      phone: document.getElementById('phone').value,

      nationalCode: document.getElementById('nationalCode').value,

      fatherName: document.getElementById('fatherName').value,

      course: document.getElementById('course').value,

      gender: document.getElementById('gender').value,

      message: document.getElementById('message').value

    };


    try {

      await fetch(TELEGRAM_WEB_APP_URL, {

        method: 'POST',

        mode: 'no-cors',

        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },

        body: JSON.stringify(data)

      });


      alert(
        '✅ درخواست ثبت‌نام شما با موفقیت ارسال شد.\n\n' +
        'مسئول ثبت‌نام باشگاه به‌زودی با شما تماس خواهد گرفت.'
      );


      form.reset();


    } catch (error) {

      alert(
        '❌ ارسال درخواست انجام نشد. لطفاً دوباره امتحان کنید.'
      );

      console.error(error);

    } finally {

      button.disabled = false;

      button.textContent = 'ارسال درخواست ثبت‌نام';

    }

  });

}


/* =========================
   تایمر مسابقات مایانا
   ========================= */

/*
   مسابقات:
   ۳۰ مرداد ۱۴۰۵
   شروع: ۸ صبح
   پایان: ۱۶:۰۰

   تاریخ میلادی معادل:
   21 August 2026
*/


const eventCard = document.getElementById('mayanaEvent');


if (eventCard) {

  const eventStart = new Date('2026-08-21T08:00:00+03:30').getTime();

  const eventEnd = new Date('2026-08-21T16:00:00+03:30').getTime();


  const days = document.getElementById('eventDays');

  const hours = document.getElementById('eventHours');

  const minutes = document.getElementById('eventMinutes');

  const seconds = document.getElementById('eventSeconds');

  const status = document.getElementById('eventStatus');


  function updateEventTimer() {

    const now = Date.now();


    /* بعد از پایان مسابقه */

    if (now >= eventEnd) {

      eventCard.style.display = 'none';

      return;

    }


    /* مسابقات در حال برگزاری */

    if (now >= eventStart) {

      days.textContent = '00';

      hours.textContent = '00';

      minutes.textContent = '00';

      seconds.textContent = '00';

      status.textContent = '🔴 مسابقات در حال برگزاری است';

      return;

    }


    /* زمان باقی مانده تا مسابقه */

    const difference = eventStart - now;


    const d = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );


    const h = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );


    const m = Math.floor(
      (difference / (1000 * 60)) % 60
    );


    const s = Math.floor(
      (difference / 1000) % 60
    );


    days.textContent = String(d).padStart(2, '0');

    hours.textContent = String(h).padStart(2, '0');

    minutes.textContent = String(m).padStart(2, '0');

    seconds.textContent = String(s).padStart(2, '0');


    status.textContent = '⏳ در انتظار شروع مسابقات';

  }


  updateEventTimer();

  setInterval(updateEventTimer, 1000);

}
