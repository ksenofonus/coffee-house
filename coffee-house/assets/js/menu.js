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

const createCards = (data) => {
  const productBody = document.createElement('div');
  productBody.classList.add('product-body');
  menuBody.prepend(productBody);
  productBody.classList.add('opacity');
  for (let i = 0; i < data.length; i++) {
    productBody.insertAdjacentHTML('beforeend', `<div class="menu-item"><div class="item-photo"><img src="/assets/images/menu/${data[i].name}.jpg" alt="${data[i].name}"></div><div class="item-description"><div><h3 class="item-title">${data[i].name}</h3><p class="item-content">${data[i].description}</p></div><span class="item-price">${data[i].price}</span></div></div>`);
  }
  // console.log(productBody);
  console.log(productBody.clientHeight, menuBody.clientHeight);
  if (document.body.offsetWidth <= 768) {
    productBody.style.height = 1092 + 'px';
  }
  refreshBtn.addEventListener('click', () => {
    // const productBody = document.querySelector('.product-body');
    console.log(productBody);
    productBody.style.height = productBody.clientHeight + 544 + 'px';
  })
}


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
}

//switch menu list start
const switchTabs = (productBody) => {
  tabs.forEach((item) => {
    item.addEventListener('click', () => {
      tabs.forEach((item) => {
        item.classList.remove('tab-active');
    });
      item.classList.add('tab-active');
      switch (item.id) {
        case 'coffee':
          menuBody.replaceChildren(``);
          createCards(coffee);
          break;
        case 'tea':
          menuBody.replaceChildren(``);
          createCards(tea);
          break;
        case 'dessert':
          menuBody.replaceChildren(``);
          createCards(dessert);
          break;
      }
      if (productBody.clientHeight <= menuBody.clientHeight) {
        refreshBtn.style.display = 'none';
      }
      if (productBody.clientHeight > menuBody.clientHeight && document.clientwidth === 768) {
        refreshBtn.style.display = 'flex';
      }
  })
})

}

//switch menu list end
getDataProducts();
switchTabs();




//refresh button start



const checkSize = () => {
  if (document.clientWidth <= 768) {
    refreshBtn.style.display = 'flex';
  }
}



//refresh button end

window.addEventListener('load', (productBody) => {
  console.log('load');
  
  
})



//products end