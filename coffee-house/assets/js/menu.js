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

// window.addEventListener('load', () => {
//   getDataProducts();
//   createCards(coffee);
//   console.log('load');
//   if (document.body.clientWidth <= 768) {
//     console.log('less 768px');
//     refreshBtn.classList.add('refresh-visible');
//   }
// })

const createCards = (data, length) => {
  const menuItem = document.querySelectorAll('.menu-item');
  length = data.length;
  for (let i = 0; i < length; i++) {
    menuBody.insertAdjacentHTML('beforeend', `<div class="menu-item opacity"><div class="item-photo"><img src="/assets/images/menu/${data[i].name}.jpg" alt="${data[i].name}"></div><div class="item-description"><div><h3 class="item-title">${data[i].name}</h3><p class="item-content">${data[i].description}</p></div><span class="item-price">${data[i].price}</span></div></div>`);
  }
}

// const showCards = (data) => {
//   createCards(data);
// }
if (document.body.clientWidth === 768) {
  refreshBtn.classList.add('refresh-visible');
}

async function getDataProducts() {
    const response = await fetch(productsUrl);
    const data = await response.json();
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].category === 'coffee') {
        coffee.push(data[i]);
      } else if (data[i].category === 'tea'){
        tea.push(data[i]);
      } else if (data[i].category === 'dessert'){
        dessert.push(data[i]);
      }
    }
    createCards(coffee, length)
    switchTabs();
    window.addEventListener('resize', () => {
      if (document.body.clientWidth === 768) {
        console.log('768');
        refreshBtn.classList.add('refresh-visible');
        if (productsType.length <= 4) {
          console.log(productsType);
          refreshBtn.classList.remove('refresh-visible');
        }
        if (productsType.length > 4) {
          refreshBtn.classList.add('refresh-visible');
          length = 4;
          menuBody.replaceChildren(``);
          createCards(productsType, length);
        }
      }
      if (document.body.clientWidth === 769) {
        refreshBtn.classList.remove('refresh-visible');
        length = productsType.length;
        menuBody.replaceChildren(``);
        createCards(productsType, length);
      }
    })
}


const switchTabs = (data) => {
  tabs.forEach((item) => {
    item.addEventListener('click', () => {
      tabs.forEach((item) => {
        item.classList.remove('tab-active');
    });
      item.classList.add('tab-active');
      if (item.id === 'coffee') {
        data = coffee;
      }
      if (item.id === 'tea') {
        data = tea;
      }
      if (item.id === 'dessert') {
        data = dessert;
      }
      menuBody.replaceChildren(``);
      createCards(data, length);
  })
})

}

//switch menu list end
getDataProducts();









//products end