async function fetchProducts() {
    const response = await fetch('products.json');
    const data = await response.json();
}

function addToCart(product) {
}

function removeFromCart(productId) {
}