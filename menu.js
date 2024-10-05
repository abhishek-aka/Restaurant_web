let cart = {};

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    let totalItems = 0; // Variable to track the total number of items
    cartItemsContainer.innerHTML = ''; // Clear current items

    let totalBill = 0; // Initialize the total bill

    

    for (let item in cart) {
        if (cart[item].quantity > 0) {
            const itemDiv = document.createElement('div');
    
            // Create div elements for name, quantity, unit price, and total item price
            const nameDiv = document.createElement('div');
            const quantityDiv = document.createElement('div');
            const unitPriceDiv = document.createElement('div');
            const totalPriceDiv = document.createElement('div');


            
    
            // Make sure the price is treated as a number
            const unitPrice = parseFloat(cart[item].price);
    
            // Calculate total price for this item (quantity * unit price)
            const totalItemPrice = cart[item].quantity * unitPrice;
    
            // Set content for each div
            nameDiv.innerHTML = `<span style="color: blue;">Name:</span> ${cart[item].name}`;
            quantityDiv.innerHTML = `<span style="color: blue;">Quantity:</span> ${cart[item].quantity}`;
            unitPriceDiv.innerHTML = `<span style="color: blue;">Unit Price:</span> ${unitPrice.toFixed(2)}`;
            totalPriceDiv.innerHTML = `<span style="color: #B8860B;">Total Price RS :</span> ${totalItemPrice.toFixed(2)}`; // Display total price for item
    
            // Append to itemDiv in order, so they are displayed in a column
            itemDiv.appendChild(nameDiv);
            itemDiv.appendChild(quantityDiv);
            itemDiv.appendChild(unitPriceDiv);
            itemDiv.appendChild(totalPriceDiv);
    
            // Add some margin or style if needed (optional)
            itemDiv.style.marginBottom = "15px"; // Space between items
    
            // Append the item div to the cartItemsContainer
            cartItemsContainer.appendChild(itemDiv);
    
            // Update the total items count
            totalItems += cart[item].quantity;
    
            // Add the item's total price to the total bill
            totalBill += totalItemPrice;
        }
    }
    
    // Display the total bill at the end
    const totalBillDiv = document.createElement('div');
    totalBillDiv.textContent = `Total Bill: ${totalBill.toFixed(2)}`; // Display the total bill
    totalBillDiv.style.fontWeight = 'bold'; // Make the total bill bold
    totalBillDiv.style.marginTop = "20px"; // Add some margin on top
    totalBillDiv.style.color = "blue"; // Add some margin on top
    
    // Append the total bill to the cartItemsContainer
    cartItemsContainer.appendChild(totalBillDiv);

    // Update cart count in header
    cartCount.textContent = totalItems;
}

// Add event listeners for add and remove buttons
document.querySelectorAll('.card').forEach((card, index) => {
    const itemName = card.querySelector('h3').textContent;
    const itemPrice = card.querySelector('p').textContent.replace('RS ', ''); // Remove 'RS ' prefix for price
    
    const plusButton = card.querySelector('.cart-add');
    const minusButton = card.querySelector('.cart-minus');

    // Initialize cart item if it doesn't exist
    if (!cart[itemName]) {
        cart[itemName] = {
            name: itemName,
            price: parseFloat(itemPrice), // Ensure the price is treated as a number
            quantity: 0
        };
    }

    // Add item to the cart
    plusButton.addEventListener('click', () => {
        cart[itemName].quantity += 1;
        updateCartDisplay(); // Update the cart display after adding
    });

    // Remove item from the cart
    minusButton.addEventListener('click', () => {
        if (cart[itemName].quantity > 0) {
            cart[itemName].quantity -= 1;
            updateCartDisplay(); // Update the cart display after removing
        }
    });
});
