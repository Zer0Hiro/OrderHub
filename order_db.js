const STORAGE_KEY = "orderHub_data"; // Key used to identify order data in the local storage

// Function for retrieving orders from local storage
function getOrdersFromStorage() {

    const dataStr = localStorage.getItem(STORAGE_KEY); // Retrieve the raw string from storage

    if (dataStr)
        return JSON.parse(dataStr); // If data exists, parse the JSON string and return the result

    else
        return []; // If no data exists, return an empty array.
}

// function for saving a new order by appending it to the existing list
function saveOrderToStorage(newOrder) {

    let currentOrders = getOrdersFromStorage(); // Load the current array of orders

    currentOrders.push(newOrder); // Add the new order to the array

    // Converts the updated array back to JSON and saves it to storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentOrders));
}

// Function for updating the status of an existing order
function updateOrderInStorage(updatedOrder) {

    let orders = getOrdersFromStorage();

    // Locate the order by its unique ID
    const index = orders.findIndex(order => order.id === updatedOrder.id);

    if (index !== -1) {
        orders[index].status = updatedOrder.status; // Updates the status

        // Converts the updated array back to JSON and saves it to storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
}

// Removes the data key from storage (resets everything)
function clearStorage() {
    localStorage.removeItem(STORAGE_KEY);
}