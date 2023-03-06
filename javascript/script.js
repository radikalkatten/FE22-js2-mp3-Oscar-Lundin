const nameButton = document.getElementById('nameSend')
const nameInput = document.getElementById('nameInput')
const productContainer = document.getElementById('productContainer')

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
    productImg.src = postData.Image
    productTitel.innerText = `${postData.titel}`
    productPrice.innerText = `Price: ${postData.price}`
    productContainer.appendChild(itemDiv)
    itemDiv.appendChild(productTitel)
    itemDiv.appendChild(productPrice)
    itemDiv.appendChild(productImg)
  }
}

getProducts()