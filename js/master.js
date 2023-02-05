// Start Settings Box
let gearButton = document.querySelector(".toggle-settings");
let settingsBox = document.querySelector(".settings-box");
gearButton.addEventListener("click", function () {
  settingsBox.classList.toggle("clicked");
});
// Switch Color
//Check If there is color in local storage
const colorLi = document.querySelectorAll(".colors-list li");
setColorFromLocalStorage();
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    handelActive(e);
    document.documentElement.style.setProperty(
      "--main-color",
      `${li.dataset.color}`
    );
    window.localStorage.setItem("color", li.dataset.color);
  });
});
function removeActiveColor(colorLi) {
  colorLi.forEach((li) => {
    li.classList.remove("active");
  });
}
function setColorFromLocalStorage() {
  if (window.localStorage.getItem("color")) {
    removeActiveColor(colorLi);
    let theColor = window.localStorage.getItem("color");
    document.documentElement.style.setProperty("--main-color", `${theColor}`);
    colorLi.forEach((li) => {
      let oneColor = li.dataset.color;
      if (oneColor === window.localStorage.getItem("color")) {
        li.classList.toggle("active");
      }
    });
  }
}

//Random background options
let backgroundOption = true;

//Create Variable to control the interval
let backgroundInterval;

// cheack if local storage have boolean
getBooleanFromLocalStorage();
// Change the active in Yes and Not Button + Control the randomize with imgs
let randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handelActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      window.localStorage.setItem("RandomBackground", "yes");
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      window.localStorage.setItem("RandomBackground", "no");
    }
  });
});
function getBooleanFromLocalStorage() {
  let boolean = window.localStorage.getItem("RandomBackground");
  if (boolean !== null) {
    let randomBackEl = document.querySelectorAll(".random-backgrounds span");
    randomBackEl.forEach((span) => {
      span.classList.remove("active");
    });
    if (boolean === "yes") {
      backgroundOption = true;
      document
        .querySelector(".random-backgrounds .yes")
        .classList.add("active");
      randomizeImgs();
    } else {
      backgroundOption = false;
      document.querySelector(".random-backgrounds .no").classList.add("active");
      randomizeImgs();
    }
  }
}
// Start Bullets Options
let navBullets = document.querySelector(".nav-bullets");
let bulletsSpans = document.querySelectorAll(".bullets-option span");
let bulletsLocalItem = window.localStorage.getItem("bullets");

if (bulletsLocalItem !== null) {
  bulletsSpans.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsLocalItem === "show") {
    navBullets.style.display = " block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    navBullets.style.display = " none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpans.forEach((span) => {
  span.addEventListener("click", function (e) {
    if (span.dataset.display === "show") {
      navBullets.style.display = " block";
      window.localStorage.setItem("bullets", "show");
    } else {
      navBullets.style.display = " none";
      window.localStorage.setItem("bullets", "hide");
    }
    handelActive(e);
  });
});
// End Bullets Options

// Start Reset Options
let resetButton = document.querySelector(".reset-option");
resetButton.addEventListener("click", function () {
  localStorage.removeItem("color");
  localStorage.removeItem("RandomBackground");
  localStorage.removeItem("bullets");
  window.location.reload();
});
// End Reset Options
// End Settings Box

// Start Bullets
//  Select All Bullets
const allBulles = document.querySelectorAll(".nav-bullets .bullet");
// End Bullets

// Start Landing Page
let landingPage = document.querySelector(".landing-page");

let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
randomizeImgs();
// Change Background Image Url
function randomizeImgs() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage = `url("imags/${imgsArray[randomNumber]}")`;
    }, 10000);
  } else {
    clearInterval(backgroundInterval);
  }
}
// End Landing Page

// Start Flights page
window.onscroll = function () {
  if (this.scrollY >= 500) {
    let countries = document.querySelectorAll(".flight-box .flight-name");
    countries.forEach((country) => {
      let span = country.nextElementSibling.firstElementChild;
      span.style.width = `${country.dataset.progress}`;
    });
  }
};
// End Flights page

// Start Our Air Plane page
let ourAirPlaneImg = document.querySelectorAll(".our-airplane img");
ourAirPlaneImg.forEach((img) => {
  img.addEventListener("click", (e) => {
    //Create Overlay Element
    let overlay = document.createElement("div");

    //Add Class To Overlay
    overlay.classList.add("popup-overlay");
    document.body.append(overlay);

    //Create PopUp
    let popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");

    if (img.alt !== null) {
      //Create Heading for Alt image
      let imgHeading = document.createElement("h3");

      //Create Text For Heading
      let imgText = document.createTextNode(img.alt);

      //Append The Text To Heading
      imgHeading.appendChild(imgText);

      //Append The Heading To PopUp Box
      popupBox.appendChild(imgHeading);
    }

    //Create PopUp Img
    let popupImg = document.createElement("img");

    //Set Img Src
    popupImg.src = img.src;

    //Add Img To PopUp Box
    popupBox.appendChild(popupImg);

    //Append The PopUp Box To Body
    document.body.appendChild(popupBox);

    //Create The Close Span
    let closeImage = document.createElement("span");

    //Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    //Append X To Close Img
    closeImage.appendChild(closeButtonText);

    //Add Class T Close Img
    closeImage.classList.add("close-img");

    //Add Colse Img To PopUp Box
    popupBox.appendChild(closeImage);
  });
});

//Close PopUp
document.addEventListener("click", function (e) {
  if (e.target.className == "close-img") {
    //Remove  The Current PopUp
    // document.querySelector(".popup-box").remove();
    //OR
    e.target.parentElement.remove();

    //Remove OverLay
    document.querySelector(".popup-overlay").remove();
  }
});
// End Our Air Plane page

// Start Links
const allLinks = document.querySelectorAll(".links a");
function ScrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(`${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
ScrollToSection(allLinks);
ScrollToSection(allBulles);
//End Links

// Handle Active State

function handelActive(element) {
  element.target.parentElement.querySelectorAll(".active").forEach((child) => {
    {
      child.classList.remove("active");
    }
    element.target.classList.add("active");
  });
}

// Toggle Menu

let menuButton = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

menuButton.onclick = function (e) {
  e.stopPropagation();
  if (links.classList.contains("open")) {
    links.classList.remove("open");
    this.classList.remove("menu-active");
  } else {
    this.classList.add("menu-active");
    links.classList.add("open");
  }
};
// If Clicked anywhere outside menu close the menu if it is opened
document.onclick = function (e) {
  if (e.target !== menuButton && e.target !== links) {
    if (menuButton.classList.contains("menu-active")) {
      menuButton.classList.toggle("menu-active");
      links.classList.toggle("open");
    }
  }
};

//Stop Propagations on Menu
links.onclick = function (e) {
  e.stopPropagation();
};
