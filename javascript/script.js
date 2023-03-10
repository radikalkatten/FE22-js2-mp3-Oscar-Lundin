import anime from '../node_modules/animejs/lib/anime.es.js';
import '../node_modules/jQuery/dist/jquery.min.js'
const nameButton = document.getElementById('nameSend')
const nameInput = document.getElementById('nameInput')
const productContainer = document.getElementById('productContainer')
const nameForm = document.getElementById('nameForm')
const bodycount = document.getElementById('bodycount')
const customer = document.getElementById('customer')
const productsURL = 'https://store-7d250-default-rtdb.europe-west1.firebasedatabase.app/products.json'
let bingus = 0
let diablo3 = 0
let mclaren = 0
let foog = 0
let juan = 0
let total = bingus + diablo3 + mclaren + foog + juan
bodycount.innerText = `${total}`

let x = 0


async function getProducts(){
  const fetchProducts = await fetch(productsURL)
  const data = await fetchProducts.json()

  let productID = Object.keys(data)

  for(let i = 0; i < productID.length; i++){
    const databaseURLpost = `https://store-7d250-default-rtdb.europe-west1.firebasedatabase.app/products/${productID[i]}.json`
    const fetchPost = await fetch(databaseURLpost)
    const postData = await fetchPost.json()
    let stockAmount = postData.stock
 
    let productImg = document.createElement('img')
    let productTitel = document.createElement('h3')
    let productPrice = document.createElement('p')
    let itemDiv = document.createElement('div')
    let itemButton = document.createElement('button')
    let removeButton = document.createElement('button')
    let stock = document.createElement('p')
    productImg.src = postData.Image
    productTitel.innerText = `${postData.titel}`
    productPrice.innerText = `Price: ${postData.price}`
    itemButton.innerText= "add to cart"
    removeButton.innerText= "remove from cart"
    stock.innerText = `Remaining: ${stockAmount}`
    productContainer.appendChild(itemDiv)
    itemDiv.appendChild(productTitel)
    itemDiv.appendChild(productPrice)
    itemDiv.appendChild(productImg)
    itemDiv.appendChild(itemButton)
    itemDiv.appendChild(stock)
    itemDiv.appendChild(removeButton)
    removeButton.classList.add('inactive')
    itemButton.addEventListener('click', () => {
      if(stockAmount <= 0){
        stockAmount = 0
      }else{
        checkProduct(productID[i])

        removeButton.classList.remove('inactive')

        stockAmount = stockAmount - 1
        stock.innerText = `Remaining: ${stockAmount}`

      }
    })
    removeButton.addEventListener('click', ()=>{
      removeProduct(productID[i])
  
      stockAmount = stockAmount + 1
      stock.innerText = `Remaining: ${stockAmount}`
      if(stockAmount == postData.stock){
        removeButton.classList.add('inactive')
      }
    })

  }
}

getProducts()
function checkProduct(prod){
  switch (prod){
    case 'bingus':
      bingus = bingus + 1;
      pushCart(prod, bingus)

    break;
    case 'diablo':
      diablo3 = diablo3 + 1;
      pushCart(prod, diablo3)

    break;
    case 'juan':
      juan = juan + 1;
      pushCart(prod, juan)

    break;
    case 'mclaren':
      mclaren = mclaren + 1;
      pushCart(prod, mclaren)

    break;
    case 'foog':
      foog = foog + 1;
      pushCart(prod, foog)

    break;
    default:
      console.log('lul')

  }
}

function removeProduct(prod){
  switch (prod){
    case 'bingus':
      bingus = bingus - 1;
      pushCart(prod, bingus)

    break;
    case 'Diablo 3 eternal':
      diablo3 = diablo3 - 1;
      pushCart(prod, diablo3)

    break;
    case 'juan':
      juan = juan - 1;
      pushCart(prod, juan)

    break;
    case 'Mclaren f1 team':
      mclaren = mclaren - 1;
      pushCart(prod, mclaren)

    break;
    case 'Lord foog':
      foog = foog - 1;
      pushCart(prod, foog)

    break;
    default:
      console.log('lul')

  }
}
function getCookie(uname){
  let name = uname + "=";
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')

  for(let i = 0; i <ca.length;i++){
    let c = ca[i]
    while (c.charAt(0) == ' '){
      c = c.substring(1)
    }
    if(c.indexOf(name) == 0){
      return c.substring(name.length, c.length)
    }
  }
  return "";
}
function checkCustomerName(){
  const username = getCookie("Username")

  if(username != ""){
    let customerName = document.createElement('p')
    customerName.innerText = `Hello ` + username
    customer.appendChild(customerName)
    nameForm.classList.add('inactive')
  }
}


async function postName(n){
  const databaseURLpost = "https://store-7d250-default-rtdb.europe-west1.firebasedatabase.app/customers/.json"
  const header = {
    "Content-type": "application/json; charset=UTF-8"
  }


  const bodyContent = {
    "name": `${n}`,
  }
  const init = {
    method: "post",
    body: JSON.stringify(bodyContent),
    headers: header,
  }
  fetch(databaseURLpost, init)
    .then(response => response.json())
    .then((data) => {
      const identify = data.name
      document.cookie = `ID = ${identify}`
    });
          
}



function pushCart(product, number){
  total = bingus + diablo3 + mclaren + foog + juan
  bodycount.innerText = `${total}`

  if(product == localStorage.key(product)){
    localStorage.setItem(`${product}`, `${number}`)
  }else{
    localStorage.setItem(`${product}`, `${number}`)
  }


  x++
}


nameButton.addEventListener('click', (event)=>{
  event.preventDefault()

  postName(nameInput.value)
  document.cookie = `Username=${nameInput.value}`

  checkCustomerName()
})
checkCustomerName()

$("#nameSend").click(function (event) {
  event.preventDefault();
  $('.lds-ring').css('visibility', 'initial');


  setTimeout(function() {
    $('.lds-ring').css('visibility', 'hidden');
    $('#nameSend')
  }, 1000);
});


const animationInfo = {
  targets: 'h1',
  keyframes: [
      { translateY: '100px', translateX: '100px', backgroundColor: ' hsl(271, 76%, 53%)'},
      { translateY: '200px', translateX: '50px',  backgroundColor: ' hsl(171, 76%, 53%)' },
      { translateY: '0px', translateX: '0px',  backgroundColor: ' hsl(50, 76%, 53%)' }
  ],
 delay: 1000,
  duration:1000,
}

anime(animationInfo);