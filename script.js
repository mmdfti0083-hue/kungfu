const TELEGRAM_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwDwy-hux1HEXuSvET4Ratr-rRQ4a35x6VRIuaKrG0ua59wZeHYnTggTQatH8GCDPmz/exec";

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

      alert('✅ درخواست ثبت‌نام شما با موفقیت ارسال شد.\n\nمسئول ثبت‌نام باشگاه به‌زودی با شما تماس خواهد گرفت.');

      form.reset();

    } catch (error) {

      alert('❌ ارسال درخواست انجام نشد. لطفاً دوباره امتحان کنید.');

      console.error(error);

    } finally {

      button.disabled = false;
      button.textContent = 'ارسال درخواست ثبت‌نام';

    }

  });

}