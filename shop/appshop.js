// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//open
cartIcon.onclick = () => {
    cart.classList.add("active");
};
//close
closeCart.onclick = () => {
    cart.classList.remove("active");
};

//cart js
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

//marking
function ready() {
    //remove cart item
    var removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    //Quantity
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //add to cart
    var addCart = document.getElementsByClassName("add-cart")
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartItemNames = cartContent.getElementsByClassName("cart-product-title");
    if (cartItemNames.length <= 0) {
        alert("คุณยังไม่มีสินค้าในตะกร้า");
        return;
    }

    alert("คำสั่งซื้อของคุณดำเนินการแล้ว");

    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updatetotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
// quantity  change
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatetotal();
}
// Add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
    console.log("helloTong");
}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            var quantity = document.getElementsByClassName("cart-quantity")[i];
            quantity.value = parseInt(quantity.value) + 1;
            updatetotal();
            return;
        }
    }


    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!--ลบสินค้า-->
    <i class='bx bxs-trash cart-remove'></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);

}

//Update
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("THB", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }

    if (cartBoxes.length <= 0) {
        total = 0;
    }



    document.getElementsByClassName("total-price")[0].innerText = "THB" + new Intl.NumberFormat().format(total);

}




/* 
<div class="contanier justify-content-center ">
    <div class="row">
    <div class="col-8 col-sm-8">
    <img src="${productImg}" alt="" class="cart-img">
    <div  class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}&emsp;<input type="number" value="1" class="cart-quantity"></div>    
    </div>
    <!--ลบสินค้า-->
    <i class='bx bxs-trash cart-remove'></i>
    <div>
    </div>
    </div>








class CartItem{
    constructor(name, desc, img, price){
        this.name = name
        this.desc = desc
        this.img=img
        this.price = price
        this.quantity = 1
   }
}

class LocalCart{
    static key = "cartItems"

    static getLocalCartItems(){
        let cartMap = new Map()
     const cart = localStorage.getItem(LocalCart.key)   
     if(cart===null || cart.length===0)  return cartMap
        return new Map(Object.entries(JSON.parse(cart)))
    }

    static addItemToLocalCart(id, item){
        let cart = LocalCart.getLocalCartItems()
        if(cart.has(id)){
            let mapItem = cart.get(id)
            mapItem.quantity +=1
            cart.set(id, mapItem)
        }
        else
        cart.set(id, item)
       localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
       updateCartUI()
        
    }

    static removeItemFromCart(id){
    let cart = LocalCart.getLocalCartItems()
    if(cart.has(id)){
        let mapItem = cart.get(id)
        if(mapItem.quantity>1)
       {
        mapItem.quantity -=1
        cart.set(id, mapItem)
       }
       else
       cart.delete(id)
    } 
    if (cart.length===0)
    localStorage.clear()
    else
    localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
       updateCartUI()
    }
}


const cartIcon = document.querySelector('.fa-cart-arrow-down')
const wholeCartWindow = document.querySelector('.whole-cart-window')
wholeCartWindow.inWindow = 0
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn')
addToCartBtns.forEach( (btn)=>{
    btn.addEventListener('click', addItemFunction)
}  )

function addItemFunction(e){
    const id = e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
    const img = e.target.parentElement.parentElement.previousElementSibling.src
    const name = e.target.parentElement.previousElementSibling.textContent
    const desc = e.target.parentElement.children[0].textContent
    let price = e.target.parentElement.children[1].textContent
    price = price.replace("Price: $", '')
    const item = new CartItem(name, desc, img, price)
    LocalCart.addItemToLocalCart(id, item)
 console.log(price)
}


cartIcon.addEventListener('mouseover', ()=>{
if(wholeCartWindow.classList.contains('hide'))
wholeCartWindow.classList.remove('hide')
})

cartIcon.addEventListener('mouseleave', ()=>{
    // if(wholeCartWindow.classList.contains('hide'))
    setTimeout( () =>{
        if(wholeCartWindow.inWindow===0){
            wholeCartWindow.classList.add('hide')
        }
    } ,500 )
    
    })

 wholeCartWindow.addEventListener('mouseover', ()=>{
     wholeCartWindow.inWindow=1
 })  
 
 wholeCartWindow.addEventListener('mouseleave', ()=>{
    wholeCartWindow.inWindow=0
    wholeCartWindow.classList.add('hide')
})  
 

function updateCartUI(){
    const cartWrapper = document.querySelector('.cart-wrapper')
    cartWrapper.innerHTML=""
    const items = LocalCart.getLocalCartItems()
    if(items === null) return
    let count = 0
    let total = 0
    for(const [key, value] of items.entries()){
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')
        let price = value.price*value.quantity
        price = Math.round(price*100)/100
        count+=1
        total += price
        total = Math.round(total*100)/100
        cartItem.innerHTML =
        `
        <img src="${value.img}"> 
                       <div class="details">
                           <h3>${value.name}</h3>
                           <p>${value.desc}
                            <span class="quantity">Quantity: ${value.quantity}</span>
                               <span class="price">Price: $ ${price}</span>
                           </p>
                       </div>
                       <div class="cancel"><i class="fas fa-window-close"></i></div>
        `
       cartItem.lastElementChild.addEventListener('click', ()=>{
           LocalCart.removeItemFromCart(key)
       })
        cartWrapper.append(cartItem)
    }

    if(count > 0){
        cartIcon.classList.add('non-empty')
        let root = document.querySelector(':root')
        root.style.setProperty('--after-content', `"${count}"`)
        const subtotal = document.querySelector('.subtotal')
        subtotal.innerHTML = `SubTotal: $${total}`
    }
    else
    cartIcon.classList.remove('non-empty')
}
document.addEventListener('DOMContentLoaded', ()=>{updateCartUI()})*/