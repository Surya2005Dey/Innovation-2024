document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/index.html') {
        fetch('http://localhost:5000/api/books')
            .then(response => response.json())
            .then(data => {
                const bookList = document.getElementById('book-list');
                data.forEach(book => {
                    const bookItem = document.createElement('div');
                    bookItem.classList.add('book-item');
                    bookItem.innerHTML = `
                        <h3>${book.title}</h3>
                        <p>by ${book.author}</p>
                        <p>Genre: ${book.genre}</p>
                        <button onclick="addToCart('${book._id}')">Add to Cart</button>
                    `;
                    bookList.appendChild(bookItem);
                });
            });
    } else if (window.location.pathname === '/cart.html') {
        fetch('http://localhost:5000/api/cart')
            .then(response => response.json())
            .then(data => {
                const cartList = document.getElementById('cart-list');
                data.forEach(book => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.innerHTML = `
                        <h3>${book.title}</h3>
                        <p>by ${book.author}</p>
                        <button onclick="removeFromCart('${book._id}')">Remove</button>
                    `;
                    cartList.appendChild(cartItem);
                });
            });
    } else if (window.location.pathname === '/search.html') {
        // Search functionality
    }
});

function addToCart(bookId) {
    fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    });
}

function removeFromCart(bookId) {
    fetch(`http://localhost:5000/api/cart/${bookId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload(); // Reload page to reflect changes
    });
}

function searchBooks() {
    const query = document.getElementById('search-query').value;
    fetch(`http://localhost:5000/api/books/filter?title=${query}`)
        .then(response => response.json())
        .then(data => {
            const searchResults = document.getElementById('search-results');
            searchResults.innerHTML = '';
            data.forEach(book => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('book-item');
                resultItem.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>by ${book.author}</p>
                    <p>Genre: ${book.genre}</p>
                    <button onclick="addToCart('${book._id}')">Add to Cart</button>
                `;
                searchResults.appendChild(resultItem);
            });
        });
}
