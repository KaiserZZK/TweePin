const firebaseConfig = {
  // apiKey: "AIzaSyD9UnaLsQq-aonfxwZtzyw5Gx4-nTBjmBk",
  // authDomain: "tweepin.firebaseapp.com",
  // databaseURL: "https://tweepin-default-rtdb.firebaseio.com",
  // projectId: "tweepin",
  // storageBucket: "tweepin.appspot.com",
  // messagingSenderId: "916556146792",
  // appId: "1:916556146792:web:d4909e3a670f4eb6b7b3dd",
  // measurementId: "G-D5HQL2TJ11"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");

  saveMessages(name, emailid, msgContent);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
