function chooseRandomOrder(a) {
    // Returns a random order from list a.
    const randIndex = Math.floor(Math.random() * a.length); // Math.random() returns  a float between 0 to 1
    return a[randIndex];
}

function simulateNewOrder() {
    // adds a new simulated order to the incoming orders list
    let orders = [
    { provider: "Wolt", ID: "WO-1389", customer: "John", items: "Pizza: 2, Coke: 1", total: 50 },
    { provider: "Mishloha", ID: "MS-1399", customer: "Leo", items: "Burger: 10", total: 500 }

    ]   
    const tableBody = document.getElementById("ordersBodyActive");
    const rowTemplate = document.getElementById("orderRowTemplate");
    const newRow = document.importNode(rowTemplate.content, true);
    const cells = newRow.querySelectorAll('td');
    const simOrder = chooseRandomOrder(orders);
    // get the curr time as a string: `timeString`
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });

    const orderId = simOrder.provider + "-" + Date.now().toString().slice(-6);
    
    cells[0].textContent = timeString;
    cells[1].textContent = simOrder.provider;
    cells[2].textContent = orderId;
    cells[3].textContent = simOrder.customer;
    cells[4].textContent = simOrder.items;
    cells[5].textContent = simOrder.total;
    cells[6].textContent = "Pending";

     tableBody.appendChild(newRow);


}
