const nameButton = document.getElementById('nameSend')
const nameInput = document.getElementById('nameInput')
const productContainer = document.getElementById('productContainer')
const nameForm = document.getElementById('nameForm')
const customer = document.getElementById('customer')
const productsURL = 'https://store-7d250-default-rtdb.europe-west1.firebasedatabase.app/products.json'

async function getProducts(){
  const fetchProducts = await fetch(productsURL)
  const data = await fetchProducts.json()

  let productID = Object.keys(data)
  console.log(productID)

  for(let i = 0; i < productID.length; i++){
    const databaseURLpost = `https://store-7d250-default-rtdb.europe-west1.firebasedatabase.app/products/${productID[i]}.json`
    const fetchPost = await fetch(databaseURLpost)
    const postData = await fetchPost.json()

    console.log(postData.Image)
    let productImg = document.createElement('img')
    let productTitel = document.createElement('h3')
    let productPrice = document.createElement('p')
    let itemDiv = document.createElement('div')
    let itemButton = document.createElement('button')
    productImg.src = postData.Image
    productTitel.innerText = `${postData.titel}`
    productPrice.innerText = `Price: ${postData.price}`
    itemButton.innerText= "add to cart"
    productContainer.appendChild(itemDiv)
    itemDiv.appendChild(productTitel)
    itemDiv.appendChild(productPrice)
    itemDiv.appendChild(productImg)
    itemDiv.appendChild(itemButton)
  }
}

getProducts()

function getCookie(uname){
  let name = uname + "=";
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  console.log(ca)
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
  username = getCookie("Username")
  console.log(username)
  if(username != ""){
    let customerName = document.createElement('p')
    customerName.innerText = `Hello ` + username
    customer.appendChild(customerName)
    nameForm.classList.add('inactive')
  }
}


nameButton.addEventListener('click', (event)=>{
  // event.preventDefault()
  console.log('haaa')
  document.cookie = `Username=${nameInput.value}`
  
})
checkCustomerName()