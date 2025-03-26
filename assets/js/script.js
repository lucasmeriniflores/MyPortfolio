'use strict';

// Função para alternar classe "active"
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Testimonials
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Custom Select
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

const filterItems = document.querySelectorAll("[data-filter-item]");

const normalizeText = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const filterFunc = function (selectedValue) {
  let normalizedSelected = normalizeText(selectedValue);

  filterItems.forEach(item => {
    let normalizedCategory = normalizeText(item.dataset.category);
    if (normalizedSelected === "todos" || normalizedSelected === normalizedCategory) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// Formulário de Contato
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", function () {
    formBtn.disabled = !form.checkValidity();
  });
});

// Mapeamento dos botões para os atributos data-page
const pageMap = {
  "Sobre": "about",
  "Carreira": "resume",
  "Portfólio": "portfolio",
  "Certificados": "blog",
  "Contato": "contact"
};

// Navegação entre páginas
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const selectedPage = pageMap[this.innerHTML.trim()];
    
    pages.forEach(page => {
      page.classList.toggle("active", page.dataset.page === selectedPage);
    });
    
    navigationLinks.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
    
    window.scrollTo(0, 0);
  });
});
