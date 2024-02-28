'use strict';
// burger start
const burgerBtn = document.querySelector('.header-burger');
const headerMenu = document.querySelector('.menu-wrapper');
const header = document.querySelector('.header');
const navItem = document.querySelectorAll('.header_menu-item');
const inactiveLink = document.querySelector('.link-container');

const toggleBurger = () => {
  headerMenu.classList.toggle('header_menu__active');
  burgerBtn.classList.toggle('burger-active');
  document.querySelector('body').classList.toggle('no-scroll');
}
burgerBtn.addEventListener('click', () => toggleBurger());

navItem.forEach((item) => {
  item.addEventListener('click', () => {
    toggleBurger();
  })
})

inactiveLink.addEventListener('click', () => {
  toggleBurger();
})

// burger end


//products start

const tabs = document.querySelectorAll('.tabs-item');
const productsUrl = '../assets/js/products.json';
let coffee = [];
let tea = [];
let dessert = [];
const coffeeBtn = tabs[0];
const teaBtn = tabs[1];
const dessertBtn = tabs[2];
const menuBody = document.querySelector('.menu-container');
const refreshBtn = document.querySelector('.refresh');
let productsType = coffee;
let id = 0;
let length = 4;
let wmatch = window.matchMedia("(max-width: 768px)");

const checkBtn = () => {
  if (document.body.clientWidth <= 768) {
    if (productsType.length <= 4) {
      refreshBtn.classList.remove('refresh-visible');
    }
    if (productsType.length <= 4) {
      refreshBtn.classList.add('refresh-visible');
    }
  }
  
  if (document.body.clientWidth > 768) {
    refreshBtn.classList.remove('refresh-visible');
  }
}
checkBtn();

const checkProduct = () => {
  if (id === 0) {
    productsType = coffee;
  }
  if (id === 1) {
    productsType = tea;
  }
  if (id === 2) {
    productsType = dessert;
  }
}

const wchange = () => {
  wmatch.addEventListener('change', (event) => {
    checkProduct();
  if (event.matches) {
    checkBtn();
    // refreshBtn.classList.add('refresh-visible');
    menuBody.replaceChildren('');
    createCards(productsType);
  } else {
    refreshBtn.classList.remove('refresh-visible');
    menuBody.replaceChildren('');
    createCards(productsType);
  }})
}



wchange();

const createCards = (products) => {
  if (document.body.clientWidth <= 768) {
    length = 4;
  }
  if (document.body.clientWidth > 768) {
    length = productsType.length;
  }
  for (let i = 0; i < length; i++) {
    menuBody.insertAdjacentHTML('beforeend', `<div class="menu-item opacity"><div class="item-photo"><img src="/assets/images/menu/${products[i].name}.jpg" alt="${products[i].name}"></div><div class="item-description"><div><h3 class="item-title">${products[i].name}</h3><p class="item-content">${products[i].description}</p></div><span class="item-price">${products[i].price}</span></div></div>`);
  }
}

async function getDataProducts() {
    const response = await fetch(productsUrl);
    const data = await response.json();
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].category === 'coffee') {
        coffee.push(data[i]);
        length = coffee.length;
      } else if (data[i].category === 'tea'){
        tea.push(data[i]);
        length = tea.length;
      } else if (data[i].category === 'dessert'){
        dessert.push(data[i]);
        length = dessert.length;
      }
    }
    checkProduct();
    checkBtn();
    createCards(productsType);
}


const switchTabs = (productsType) => {
  tabs.forEach((item) => {
    item.addEventListener('click', () => {
      tabs.forEach((item) => {
        item.classList.remove('tab-active');
    });
      item.classList.add('tab-active');
      if (item.id === 'coffee') {
        productsType = coffee;
        id = 0;
      }
      if (item.id === 'tea') {
        productsType = tea;
        id = 1;
      }
      if (item.id === 'dessert') {
        productsType = dessert;
        id = 2;
      }
      menuBody.replaceChildren(``);
      createCards(productsType);
      checkBtn();
  })
})

}
switchTabs(productsType);

//switch menu list end


getDataProducts();

// const resize = () => {
//   window.addEventListener('resize', () => {
//   checkSize();
//   })
// }








// resize();


//products end