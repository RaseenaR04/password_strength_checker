const passwordInput = document.getElementById("password"); 
const strengthMeter = document.getElementById("strength-meter-fill");
const strengthText = document.getElementById("strength-text");
 

const lengthReq = document.getElementById('length').querySelector('span:first-child');
const uppercaseReq = document.getElementById('uppercase').querySelector('span:first-child');
const lowercaseReq = document.getElementById('lowercase').querySelector('span:first-child');
const numberReq = document.getElementById('number').querySelector('span:first-child');
const specialCharReq = document.getElementById('special').querySelector('span:first-child');



const lengthRegex = /(?=.{8,})/;
const uppercaseRegex = /(?=.*[A-Z])/;
const lowercaseRegex = /(?=.*[a-z])/;
const numberRegex = /(?=.*[0-9])/;
const specialCharRegex = /(?=.*[@#$%^&*!])/;

passwordInput.addEventListener('input', updateStrength);

// Strength Checker Function
function updateStrength() {
  const password = passwordInput.value;
  let strength = 0;

  const requirements = [
  { regex: lengthRegex, element: lengthReq },
  { regex: uppercaseRegex, element: uppercaseReq },
  { regex: lowercaseRegex, element: lowercaseReq },
  { regex: numberRegex, element: numberReq },
  { regex: specialCharRegex, element: specialCharReq }
];


  requirements.forEach(req => {
    const isValid = req.regex.test(password);
    if (isValid) {
      strength += 20;
      req.element.className = 'check-icon';
      req.element.textContent = '✔️';
    } else {
      req.element.className = 'x-icon';
      req.element.textContent = '❌';
    }
  });

  // Set meter width
    strengthMeter.style.width = `${strength}%`;


    // Set text and color
    if (strength === 0) {
        strengthText.textContent = "No password";
        strengthMeter.style.backgroundColor = "#e0e0e0";
    } else if (strength < 20) {
        strengthText.textContent = "Very Weak";
        strengthMeter.style.backgroundColor = "#ff4d4d";
    } else if (strength < 40) {
        strengthText.textContent = "Weak";
        strengthMeter.style.backgroundColor = "#ff944d";
    } else if (strength < 60) {
        strengthText.textContent = "Moderate";
        strengthMeter.style.backgroundColor = "#ffff4d";
    } else if (strength < 80) {
        strengthText.textContent = "Strong";
        strengthMeter.style.backgroundColor = "#a3ff4d";
    } else {
        strengthText.textContent = "Very Strong";
        strengthMeter.style.backgroundColor = "#4dffff";
    }
}

function togglePasswordVisibility() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

// Initialize
updateStrength();
strengthText.textContent = "No password";

