// Продукти (звичайно, можна зробити асинхронне завантаження з сервера)
const products = [
    { id: 1, name: 'Apple iPhone 12 128Gb Purple', price: 24499, image: 'https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/w/w/wwru_iphone12_q321_purple_pdp-image-1b_2.jpg/f_auto', description: 'Деталі продукту:' },
    { id: 2, name: 'Apple iPhone 12 128Gb Black', price: 24499, image: 'https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/a/p/apple_iphone_12_128gb_black_01.jpg/w_600', description: 'Деталі продукту:' },
    { id: 3, name: 'Apple iPhone 12 128Gb White', price: 24499, image: 'https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/a/p/apple_iphone_12_128gb_white_01.jpg/w_600', description: 'Деталі продукту:' },
];

const cart = [];
let totalPrice = 0;

function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} грн</p>
            <button onclick="addToCart(${product.id})">Додати в кошик</button>
            <button onclick="openProductDetails(${product.id})">Деталі</button>
        `;
        productList.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    totalPrice += product.price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((product, index) => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${product.name} - ${product.price} грн`;
        cartItem.innerHTML += `<button onclick="removeFromCart(${index})">Видалити</button>`;
        cartItems.appendChild(cartItem);
    });
    document.getElementById('total-price').textContent = totalPrice;
}

function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function openProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('product-modal');
    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Ціна: ${product.price} грн</p>
    `;
    modal.style.display = 'flex';
}

const modal = document.getElementById('product-modal');
const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', displayProducts);
