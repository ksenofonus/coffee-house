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


async function getDataProducts() {
    const response = await fetch(productsUrl);
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].category === 'coffee') {
        coffee.push(data[i]);
      } else if (data[i].category === 'tea'){
        tea.push(data[i]);
      } else if (data[i].category === 'dessert'){
        dessert.push(data[i]);
      }
    }
    createCards(coffee);
    console.log(coffee, tea, dessert);
}

const menuBody = document.querySelector('.menu-container');

const createCards = (data) => {
  for (let i = 0; i < data.length; i++) {
    menuBody.insertAdjacentHTML('beforeend', `<div class="menu-item"><div class="item-photo"><img src="/assets/images/menu/${data[i].name}.jpg" alt="${data[i].name}"></div><div class="item-description"><div><h3 class="item-title">${data[i].name}</h3><p class="item-content">${data[i].description}</p></div><span class="item-price">${data[i].price}</span></div></div>`);
  }
}
// const showMenu = (data) => {
//   coffeeBtn.addEventListener('click', )
// }
//switch menu list start
const switchTabs = () => {
  tabs.forEach((item) => {
    item.addEventListener('click', () => {
      tabs.forEach((item) => {
        item.classList.remove('tab-active');
    });
      item.classList.add('tab-active');
      if (item.classList.contains('coffee')) {
        console.log('coffee');
        menuBody.replaceChildren(``);
        createCards(coffee);
      } else if (item.classList.contains('tea')){
        console.log('tea');
        menuBody.replaceChildren(``);
        createCards(tea);
      } else if (item.classList.contains('dessert')){
        console.log('dessert');
        menuBody.replaceChildren(``);
        createCards(dessert);
    }
  })
})
}


//switch menu list end
switchTabs();
getDataProducts();




//products end