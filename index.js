// اسکرول دکمه های صفحه
const scrollButton = document.getElementById("wireScrollBtn");
const targetSection = document.getElementById("wireTargetSec");

scrollButton.addEventListener("click", () => {
  const targetPosition = targetSection.offsetTop;
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth"
  });
});

const scrollButtonn = document.getElementById("wireScrollBtn1");
const targetSectionn = document.getElementById("wireTargetSec1");

scrollButtonn.addEventListener("click", () => {
  const targetPosition = targetSection.offsetTop;
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth"
  });
});

// اعتبار سنجی
function validateField(value, message, invalidValue = '', minLength = 0) {
  // بررسی اینکه مقدار ورودی با مقدار نامعتبر برابر است یا خیر
  if (value === invalidValue) {
      alert(message);
      return false;
  }

  // بررسی اینکه طول ورودی کمتر از حداقل مجاز نباشد
  if (minLength > 0 && value.length < minLength) {
      alert(`ورودی باید حداقل ${minLength} کاراکتر باشد.`);
      return false;
  }

  return true;
}

function validateMobile(mobile, messages) {
  // بررسی اینکه آیا شماره موبایل خالی است
  if (mobile === '') {
      alert(messages.required);
      return false;
  }
  // بررسی اینکه آیا شماره موبایل با "09" شروع می‌شود و 11 رقم دارد
  if (!/^(09\d{9})$/.test(mobile)) {
      alert(isNaN(mobile) ? messages.number : messages.length);
      return false;
  }
  return true;
}

// ثبت کلیک روی دکمه ارسال
const submitButton = document.getElementById("wireless_submit_button");
submitButton.addEventListener("click", async () => {
  const Name = document.getElementById('tbName').value;
  const mobile = document.getElementById('tbMobile').value;
  const city = document.getElementById('tbCity').value;

  // پیام‌های اعتبارسنجی
  const messages = {
      required: 'شماره موبایل الزامی است.',
      number: 'شماره موبایل باید عدد باشد.',
      length: 'شماره موبایل باید 11 رقم و با 09 شروع شود.',
      name: 'نام نباید کمتر از 3 کاراکتر باشد.',
      city: 'لطفا یک شهر را انتخاب کنید.'
  };

  // اعتبارسنجی فیلدها
  if (!validateField(Name, messages.name, '', 3) || 
      !validateField(city, messages.city, '0') || 
      !validateMobile(mobile, messages)) {
      return;
  }

  // اگر اعتبارسنجی موفق بود، درخواست ارسال شود
  const url = "https://store.pishgaman.net/Order/it";
  const data = {
      tbName: Name,
      tbMobile: mobile,
      tbCity: city,
  };

  await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
  })
  .then(data => {
      console.log('Success:', data);

      // نمایش پیام موفقیت
      let alertElement = document.getElementById("alertMessage");
      alertElement.innerHTML = "اطلاعات شما ثبت گردید. همکاران ما جهت ارائه راهکارهای مناسب با شما تماس خواهند گرفت.";
      alertElement.style.display = "block";

      // تغییر URL بدون رفرش صفحه
      window.history.pushState(null, null, window.location.pathname + '/complete');
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});

// بارگذاری فهرست شهرها
fetch('cities.txt')
.then(response => response.text())
.then(data => {
  document.getElementById('tbCity').innerHTML = data;
})
.catch(error => console.error('Error loading cities:', error));