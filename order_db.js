const STORAGE_KEY = "orderData";

// This function turns locally stored data strings into an array of objects, and returns it.
function getOrdersFromStorage() {
    // Grabs existing data string stored in localStorage
    const dataStr = localStorage.getItem(STORAGE_KEY);
    
    // Converts the data string into an array of objects (if a data exists), and returns it
    if (dataStr)
        return JSON.parse(dataStr);
    
    // Returns an empty array if else.
    else
        return [];
}

// This function adds a new order to the existing data
function saveOrderToStorage(newOrder) {
    
    // Loads up existing data
    let currentData = getOrdersFromStorage();

    // Adds the new order to the data string
    currentData.push(newOrder);

    // Saves the newly pushed order into the existing data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
}

// Updates the status of orders
function updateOrderInStorage(updatedOrder) {

    // Loads up existing data
    let orders = getOrdersFromStorage();

    // Locates the index that matches the id of the order we want to update
    let index = orders.findIndex(order => order.id === updatedOrder.id);

    // Updates the status of said index
    if (index != -1) {
        orders[index].status = updatedOrder.status;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
}

// This function deletes locally stored data by removing the storage key
function clearStorage() {
    
    // ניקיון פסח
    localStorage.removeItem(STORAGE_KEY);
}