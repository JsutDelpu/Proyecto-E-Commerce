const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
let iconCart = document.getElementById('lg-bag');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProdctHTML = document.querySelector('.listProduct');
let listProdctHTMLN = document.querySelector('.listProductN');
let listProdctHTMLF = document.querySelector('.listProductF');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector("#lg-bag span")
/* let hiddenInv = document.getElementById('hidden') */
let invState = document.querySelector('.listProduct');
let invStateN = document.querySelector('.listProductN');
let invStateF = document.querySelector('.listProductF');
let shownInv = document.getElementById('shown');
let featured = document.getElementById('featured');
let bnew = document.getElementById('bnew');
let toPay = document.querySelector("body div div.total span")


let listProdcs = [];
let carts = [];

let mobileCart = document.querySelector("#mobile a i")
let mobileCartSpan = document.querySelector("#mobile a span")

mobileCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})


if (bar) {
    bar.addEventListener('click', ()=> {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', ()=> {
        nav.classList.remove('active');
    })
}

const addDataToHTML = () => {
    if(listProdcs.length > 0){
        if(invState==shownInv && listProdctHTML!=null){
            listProdcs.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.dataset.id =product.id
                newProduct.innerHTML = `
                    <img src="${product.image}" alt="Imagen del Producto">
                    <span>${product.brand}</span>
                    <h4>${product.name}</h4>
                    <div class="precio">$${product.precio}</div>
                    <button class="addCart">Añadir al Carrito</button>
                    `;
                    listProdctHTML.appendChild(newProduct);
            })
        }
        
    }
}


const addFeaturedToHTML = () => {
    if(listProdcs.length > 0){
        if(invStateF==featured && listProdctHTMLF!=null){
            listProdcs.slice(8, 16).forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.dataset.id =product.id
                newProduct.innerHTML = `
                    <img src="${product.image}" alt="Imagen del Producto">
                    <span>${product.brand}</span>
                    <h4>${product.name}</h4>
                    <div class="precio">$${product.precio}</div>
                    <button class="addCart">Añadir al Carrito</button>
                    `;
                    listProdctHTMLF.appendChild(newProduct);
            })
        }
        
    }
}


const addBnewToHTML = () => {
    if(listProdcs.length > 0){
        if(invStateN==bnew && listProdctHTMLN!=null){
            listProdcs.slice(0, 8).forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.dataset.id =product.id
                newProduct.innerHTML = `
                    <img src="${product.image}" alt="Imagen del Producto">
                    <span>${product.brand}</span>
                    <h4>${product.name}</h4>
                    <div class="precio">$${product.precio}</div>
                    <button class="addCart">Añadir al Carrito</button>
                    `;
                    listProdctHTMLN.appendChild(newProduct);
            })
        }
        
    }
}

listProdctHTML.addEventListener('click', (event) =>{
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

if(listProdctHTMLF!=null){
    listProdctHTMLF.addEventListener('click', (event) =>{
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let product_id = positionClick.parentElement.dataset.id;
            addToCart(product_id);
        }
    })
}

if(listProdctHTMLN!=null){
    listProdctHTMLN.addEventListener('click', (event) =>{
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let product_id = positionClick.parentElement.dataset.id;
            addToCart(product_id);
        }
    })
}


const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToTmemory();
}

const addCartToTmemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProdcs.findIndex((value) => value.id == cart.product_id);
            let info = listProdcs[positionProduct];
            newCart.innerHTML = `
            <div class="image">
                    <img src="${info.image}" alt="Producto">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
                    $${info.precio * cart.quantity}
                </div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
        listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
    mobileCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})

const changeQuantity = (product_id, type) =>{
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id)
    if(positionItemInCart >= 0){
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;
        
            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if(valueChange > 0){
                    carts[positionItemInCart].quantity = valueChange;
                }else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToTmemory();
    addCartToHTML();
}

const initApp = () => {
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        listProdcs = data;
        addDataToHTML();
        addFeaturedToHTML();
        addBnewToHTML();

        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}

initApp()