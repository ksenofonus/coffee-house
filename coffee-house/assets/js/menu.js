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
let length = productsType.length;
const wmatch = window.matchMedia("(max-width: 768px)");
let i = 0;
const menuItem = document.querySelectorAll('.menu-item');

//modal start
const createModal = (products, i) => {
  document.body.classList.add('no-scroll');
  document.body.insertAdjacentHTML('afterbegin', `<div class="back"></div>
    <div class="modal">
        <div class="item-photo"><img src="/assets/images/menu/${products[i].name}.jpg" alt="${products[i].name}"></div>
        <div class="item-description">
          <div class="item_name">
            <h3 class="item-title">${products[i].name}</h3>
          <p class="item content">${products[i].description}</p>
          </div>
          <div class="prop size">
            <p class="prop_title">Size</p>
            <div class="prop_tabs">
              <button class="prop_btn prop_btn__active">
                <div class="prop_icon">${Object.keys(productsType[i].sizes)[0].toUpperCase()}</div>
                <div class="prop_value">${products[i].sizes.s.size}</div>
              </button>
              <button class="prop_btn">
                <div class="prop_icon">${Object.keys(productsType[i].sizes)[1].toUpperCase()}</div>
                <div class="prop_value">${products[i].sizes.m.size}</div>
              </button>
              <button class="prop_btn">
                <div class="prop_icon">${Object.keys(productsType[i].sizes)[2].toUpperCase()}</div>
                <div class="prop_value">${products[i].sizes.l.size}</div>
              </button>
            </div>
          </div>
          <div class="prop additives">
            <p class="prop_title">Additives</p>
            <div class="prop_tabs">
              <button class="prop_btn">
                <div class="prop_icon">1</div>
                <div class="prop_value">${products[i].additives[0].name}</div>
              </button>
              <button class="prop_btn">
                <div class="prop_icon">2</div>
                <div class="prop_value">${products[i].additives[1].name}</div>
              </button>
              <button class="prop_btn">
                <div class="prop_icon">3</div>
                <div class="prop_value">${products[i].additives[2].name}</div>
              </button>
            </div>
          </div>
          <div class="total">
            <h3 class="total_title">Total:</h3>
            <div class="total_sum">$${products[i].price}</div>
          </div>
          <div class="alert">
           <div class="alert_icon">
            </div>
            <p class="alert_text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
          </div>
          <button class="close_btn">Close</button>
        </div></div>`);
  
  closeModal();
  chooseSize(products, i);
  chooseAdd();
}
const closeModal = () => {
  const back = document.querySelector('.back');
  const modal = document.querySelector('.modal');
  const closeModal = document.querySelector('.close_btn');
  back.addEventListener('click', () => {
    back.remove();
    modal.remove();
    document.body.classList.remove('no-scroll');
  })
  closeModal.addEventListener('click', () => {
    back.remove();
    modal.remove();
    document.body.classList.remove('no-scroll');
  })
}

const chooseSize = (products, i) => {
  const sizeBtns = document.querySelectorAll('.size .prop_btn');
  const sizeName = document.querySelectorAll('.prop_icon');
  let sizePrice;
  for (let x = 0; x < 3; x++) {
      sizeBtns[x].addEventListener('click', () => {
        sizeBtns.forEach((size) => {
          size.classList.remove('prop_btn__active');
        })
      sizeBtns[x].classList.add('prop_btn__active');
      for (let key in products[i].sizes) {
        if (key === sizeName[x].textContent.toLowerCase()){
          sizePrice = Number(products[x].sizes[key]["add-price"]);
          calcSum(products, i, sizePrice);
        };
      }
      })
  }
  return sizePrice;
}

const calcSum = (products, i, price) => {
  const total = document.querySelector('.total_sum');
  let sum;
  sum = (parseFloat(products[i].price) + price).toFixed(2);
  console.log(sum);
  total.innerHTML = `$${sum}`;
}


const chooseAdd = () => {
  const addBtns = document.querySelectorAll('.additives .prop_btn');
  addBtns.forEach((add) => {
    add.addEventListener('click', () => {
      addBtns.forEach((add) => {
        add.classList.remove('prop_btn__active');
      })
      add.classList.add('prop_btn__active');
    })
  })
}


//modal end

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
  return (productsType);
}


const checkWidth = () => {
  if (document.body.clientWidth <= 768) {
    length = 4;
  }
  if (document.body.clientWidth > 768) {
    length = productsType.length;
  }
  return length;
}

const checkBtn = () => {
  checkProduct();
  if (document.body.clientWidth <= 768) {
    if (productsType.length <= 4) {
      refreshBtn.classList.remove('refresh-visible');
    }
    if (productsType.length > 4) {
      refreshBtn.classList.add('refresh-visible');
    }
  }
  if (document.body.clientWidth > 768) {
    refreshBtn.classList.remove('refresh-visible');
  }
}
checkBtn();

const wchange = () => {
  wmatch.addEventListener('change', (event) => {
  if (event.matches) {
    checkProduct();
    checkBtn();
    checkWidth();
    refreshBtn.classList.add('refresh-visible');
    menuBody.replaceChildren('');
    createCards(productsType, 0, length);
  } else {
    checkProduct();
    console.log(productsType);
    checkWidth();
    refreshBtn.classList.remove('refresh-visible');
    length = productsType.length;
    createCards(productsType, 4, length);
  }})
}
wchange();

const createCards = (products, i, length) => {
  for (i; i < length; i++) {
    menuBody.insertAdjacentHTML('beforeend', `<div class="menu-item opacity"><div class="item-photo"><img src="/assets/images/menu/${products[i].name}.jpg" alt="${products[i].name}"></div><div class="item-description"><div><h3 class="item-title">${products[i].name}</h3><p class="item-content">${products[i].description}</p></div><span class="item-price">${products[i].price}</span></div></div>`);
  }
  const menuItem = document.querySelectorAll('.menu-item');

  menuItem.forEach((item) => {
    item.addEventListener('click', () => {
      let j = Array.from(menuItem).indexOf(item);
      createModal(products, j);
    });
    })
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
    checkWidth();
    createCards(productsType, 0, length);
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
      checkProduct();
      menuBody.replaceChildren(``);
      checkWidth();
      createCards(productsType, 0, length);
      checkBtn();
  })
})

}
switchTabs(productsType);

//switch menu list end


getDataProducts();

//refresh button start

//refresh button end
refreshBtn.addEventListener('click', () => {
  checkProduct();
  length = productsType.length;
  createCards(productsType, 4, length);
  refreshBtn.classList.remove('refresh-visible');
})
//products end

