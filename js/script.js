const navbar = document.getElementById("navbar");
const mobileTrigger = document.getElementById("mobileTrigger");
const navMenu = document.getElementById("navMenu");
const menuIcon = document.getElementById("menuIcon");

if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

if (mobileTrigger && navMenu && menuIcon) {
  mobileTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-xmark");
    } else {
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }
  });

  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !mobileTrigger.contains(e.target)) {
      navMenu.classList.remove("active");
      if (menuIcon.classList.contains("fa-xmark")) {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      }
    }
  });
}

const navLinks = document.querySelectorAll(".nav-item a, nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("active");
    }
    if (menuIcon && menuIcon.classList.contains("fa-xmark")) {
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }
  });
});

