const header = document.querySelector(".header");
const scrollThreshold = parseFloat(
  getComputedStyle(document.documentElement).fontSize,
);

window.addEventListener("scroll", () => {
  if (window.scrollY > scrollThreshold) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const sections = document.querySelectorAll("section[id], main header[id]");
const navLinks = document.querySelectorAll(".header nav a");

function getVisiblePercentage(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const visibleTop = Math.max(0, rect.top);
  const visibleBottom = Math.min(windowHeight, rect.bottom);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  return visibleHeight / rect.height;
}

function updateActiveNav() {
  let maxVisibility = 0;
  let mostVisibleSection = null;

  sections.forEach((section) => {
    const visibility = getVisiblePercentage(section);
    if (visibility > maxVisibility) {
      maxVisibility = visibility;
      mostVisibleSection = section;
    }
  });

  if (mostVisibleSection) {
    const id = mostVisibleSection.getAttribute("id");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      }
    });
  }
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("resize", updateActiveNav);
updateActiveNav();

const contactLink = document.querySelector('a[href="#contact"]');
const contactFooterLink = document.querySelector("a.contact-footer-link");
const contactModal = document.getElementById("contact-modal");
const closeModal = document.querySelector(".modal-close");

const openContactModal = (e) => {
  e.preventDefault();
  contactModal.classList.add("active");
  document.body.style.overflow = "hidden";
};

contactLink.addEventListener("click", openContactModal);

closeModal.addEventListener("click", () => {
  contactModal.classList.remove("active");
  document.body.style.overflow = "";
});

contactModal.addEventListener("click", (e) => {
  if (e.target === contactModal) {
    contactModal.classList.remove("active");
    document.body.style.overflow = "";
  }
});
