const STORAGE_KEY = "orderData"; 

// Stringify helper function
function stringify(order) {
    return `{id='${order.id}', time='${order.time}', provider='${order.provider}', customer='${order.customer}', items='${order.items}', total='${order.total}', phone='${order.phone}', address='${order.address}', paymentMethod='${order.paymentMethod}', notes='${order.notes}', status='${order.status}'}`;
}

// Function for retrieving orders from local storage
function getOrdersFromStorage() {
    const rawStr = localStorage.getItem(STORAGE_KEY);

    if (!rawStr) return [];

    // Splits the rawStr into individual strings using a separator
    const orderStr = rawStr.split("|||");

    // Loops over every order string to convert it back into an object
    return orderStr.map(str => {
        // Turns the line into null if it's empty
        if (str.trim() === "") return null;

        // Create an empty object to hold data
        const orderObj = {};

        // ################### LOGIC ###################

        // pattern:
        // /           -> Start of pattern
        // ([a-zA-Z]+) -> Capture 1: The Key (letters only, e.g., "items")
        // ='          -> The separator (equals and open quote)
        // ([^']*)     -> Capture 2: The Value (grab everything until the next quote)
        // /g          -> Global flag (find ALL matches, not just the first one)

        // #################################################

        const pattern = /([a-zA-Z]+)='([^']*)'/g;
        const matches = str.matchAll(pattern);

        for (const i of matches) {
            const key = i[1]; // key becomes "id" (example)
            const val = i[2]; // val becomes "101"
            
            // Tells the object: "Create a property named 'id' and set it to '101'"
            orderObj[key] = val;
        }

        return orderObj;

      // Remove any empty entries created from " if (str.trim() === "") return null; "
    }).filter(item => item !== null);
}

function saveOrderToStorage(newOrder) {
    let currentOrders = getOrdersFromStorage();
    
    currentOrders.push(newOrder);
    
    // Glues all the order strings back together into one long string for storage
    const dataStr = currentOrders.map(order => stringify(order)).join("|||\n");

    // Updates storage
    localStorage.setItem(STORAGE_KEY, dataStr);
}

function updateOrderInStorage(updatedOrder) {
    let orders = getOrdersFromStorage();

    // Use findIndex to locate the order
    const index = orders.findIndex(order => order.id === updatedOrder.id);

    if (index !== -1) {
        orders[index].status = updatedOrder.status; 
        
        // Save back to storage using custom stringify
        const dataStr = orders.map(order => stringify(order)).join("|||\n");

        // Updates storage
        localStorage.setItem(STORAGE_KEY, dataStr);
    }
}

function clearStorage() {
    // ניקיון פסח
    localStorage.removeItem(STORAGE_KEY);
}

// .map() = applies a function for each element of an array, then returns a new array
// .join() = creates a string from an array.
// .split() = divides a string into sub-strings, and returns them in an array
// .trim() = removes whitespace from both ends of a string
// .matchAll() = finds every part of a string that matches a specific pattern