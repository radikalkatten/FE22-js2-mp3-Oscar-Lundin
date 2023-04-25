const cartDiv = document.getElementById('cartt')
const clearCartBtn = document.getElementById('button')
const submitPurchase = document.getElementById('label')
let total = 0
let bingus = 250
let foog = 150
let diablo3 = 145
let mclaren = 50
let juan = 100
function myCart(){
  let item = localStorage
  let itemID = Object.values(item)

  let itemName = Object.keys(item)

  for(let i = 0; i < localStorage.length;){

    const cart = document.createElement('p')
    const pricee = document.createElement('p')
    pricee.innerText = `${itemID[i]}`
    cart.innerText = `${itemName[i]}`
    cartDiv.appendChild(pricee)
    cartDiv.appendChild(cart)

    identifyProduct(itemName[i], itemID[i])
    i++
  }
  const sumTotal = document.createElement('p')
  sumTotal.innerText = `Total: ${total}`
  cartDiv.appendChild(sumTotal)
}
myCart()
function identifyProduct(prod, amount){
  switch (prod){
    case 'bingus':
      total = total + bingus * amount;

    break;
    case 'diablo':
      total = total + diablo3 * amount
      

    break;
    case 'juan':
      total = total + juan * amount
      

    break;
    case 'mclaren':
      total = total + mclaren * amount
      
    break;
    case 'foog':
      total = total + foog * amount
     

    break;
    default:
      console.log('lul')

  }
 }

clearCartBtn.addEventListener('click', ()=>{localStorage.clear()})

async function buyNow(){
  let item = localStorage
  let itemID = Object.keys(item)
  let amount = Object.values(item)
  for(let i=0;i<item.length - 1; i++){
    let databaseURLget = `https://store-7d250-default-rtdb.europe-west1.firebasedatabase.app/products/${itemID[i]}.json`
    let data = await fetch(databaseURLget)
    let database = await data.json()
    
    // console.log(database)
    let stock = parseInt(database.stock)
    stock = stock - amount[i]
    const header = {
      "Content-type": "application/json; charset=UTF-8"
    }
    const bodyContent = {
      stock: `${stock}`
    };
    const init = {
      method: "PATCH", 
      body: JSON.stringify(bodyContent), 
      headers: header 
    };
    fetch(databaseURLget, init)
      .then(response => response.json())
      .then(data => console.log(data))
    
  }
  localStorage.clear()
}

submitPurchase.addEventListener('click', (event)=>{
  event.preventDefault()
  buyNow()
})