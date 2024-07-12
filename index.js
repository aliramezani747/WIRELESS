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


const submitButton=document.getElementById("wireless_submit_button")
submitButton.addEventListener("click", async() => {
  const Name = document.getElementById('tbName').value
  const mobile = document.getElementById('tbMobile').value
  const city = document.getElementById('tbCity').value

  const url = "https://store.pishgaman.net/Order/it";
  const data = {
    tbName: Name,
    tbMobile: mobile,
    tbCity: city,
};


await fetch(url, {
    method: 'POST', 
    // mode:"cors",
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
})
.catch((error) => {
    console.error('Error:', error);
});
});


function validateFormAndItems() {
  let tbName = document.getElementById('tbName').value.trim();
  let tbCity = document.getElementById('tbCity').value.trim();
  let tbMobile = document.getElementById('tbMobile').value.trim();
  
  if (tbName === '' || tbCity === '' || tbMobile === '') {
    alert('لطفا تمام فیلدهای فرم را پر کنید');
    return false;
  }

  else {
    const success = 
    document.getElementById("wireless_submit_button").addEventListener("click", () => {
    let alertElement = document.getElementById("alertMessage");

    alertElement.innerHTML = "همکاران ما به زودی با شما تماس میگیرند";
    alertElement.style.display = "block";
});
console.log(success)
window.history.pushState(null, null, window.location.pathname + '/complete');
  }
  return true;
}
