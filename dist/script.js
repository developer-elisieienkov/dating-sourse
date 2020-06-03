"use strict";

var navToggler = document.querySelector(".header-nav__toggler"),
    navbar = document.querySelector(".header-nav"),
    profileCollapsibleSection = document.getElementById("aboutPerson"),
    profileCollapsingButton = document.getElementById("allInfo"),
    lastScroll,
    age = document.querySelectorAll(".ageSelector");

function showToggler(togleButton, targetElem, toglingClass, currentText, modifiedText) {
  togleButton.onclick = function () {
    targetElem.classList.toggle(toglingClass);

    if (currentText != undefined) {
      if (targetElem.classList.contains("show")) {
        togleButton.innerHTML = modifiedText;
      } else {
        togleButton.innerHTML = currentText;
      }
    }
  };
}

function textTogler(elem, currentText, modifiedText) {
  elem.onclick = function () {};
}

;
showToggler(navToggler, navbar, "show");

if (profileCollapsibleSection != undefined) {
  showToggler(profileCollapsingButton, profileCollapsibleSection, "show", "More", "Less");
}

;
document.addEventListener("scroll", scrollHide);
document.addEventListener("resize", scrollHide);

function scrollHide() {
  var secondScroll = window.pageYOffset;

  if (!navbar.classList.contains('show')) {
    if (lastScroll < secondScroll) {
      navbar.classList.add("hide");
    } else {
      navbar.classList.remove("hide");
    }
  }

  lastScroll = secondScroll;
}

if (age != undefined) {
  age.forEach(function (selectTag) {
    for (var i = 0; i < 90; i++) {
      var ageOtion = document.createElement('option');
      ageOtion.innerHTML = "".concat(i + 1);
      selectTag.append(ageOtion);
    }
  });
}

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 32.922082,
      lng: 130.623257
    },
    zoom: 16,
    disableDefaultUI: false
  });
  var marker = new google.maps.Marker({
    position: {
      lat: 32.922082,
      lng: 130.623257
    },
    map: map,
    title: "We Are Here",
    icon: "images/location(2).svg"
  });
}