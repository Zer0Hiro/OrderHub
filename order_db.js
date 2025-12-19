const STORAGE_KEY = "orderData"; 

// Stringify helper function
function stringify(order) {
    return `{id='${order.id}', provider='${order.provider}', customer='${order.customer}', items='${order.items}', total='${order.total}', phone='${order.phone}', address='${order.address}', paymentMethod='${order.paymentMethod}', notes='${order.notes}', status='${order.status}'}`;
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

        // Remove '{' and '}'
        const cleanStr = str.trim().replace("{", "").replace("}", "");
        
        // Split by the comma-space separator defined in stringify
        const pairs = cleanStr.split(", ");
        
        // Create an empty object to hold data
        const orderObj = {};

        // ################### IGNORE THIS ###################

        // 1. str:       "{id='MAN-101', provider='Wolt'}"
        //                    ↓ (removes {})
        // 2. cleanStr:  "id='MAN-101', provider='Wolt'"
        //                    ↓ (splits by ", ")
        // 3. pairs:     [ "id='MAN-101'", "provider='Wolt'" ]
        
        // 4. Loop Logic:
        //    • Item 1: "id='MAN-101'"    -> split("='") -> key="id", val="MAN-101"       -> orderObj: { id: "MAN-101" }
        //    • Item 2: "provider='Wolt'" -> split("='") -> key="provider", val="Wolt"    -> orderObj: { id: "MAN-101", provider: "Wolt" }

        // ###################################################

        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];
            
            // Splits a pair into key and value
            const parts = pair.split("='");
            const key = parts[0];
            let val = parts[1];

            if (key && val) {
                // Removes the last ' from the value
                val = val.slice(0, -1);
                
                // Adds the data to said object
                orderObj[key] = val;
            }
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
// .slice() = extracts a section of a string based on a start and end index
// .replace() = searches for a specific value and returns a new string where that value is replaced
// .trim() = removes whitespace from both ends of a string