function chooseRandomOrder(a) {
    // Returns a random order from list a.
    const randIndex = Math.floor(Math.random() * a.length); // Math.random() returns  a float between 0 to 1
    return a[randIndex];
}



function simulateNewOrder() {
    let orders = [
    { Provider: "Wolt", ID: "WO-1389", customer: "John", items: { Pizza: 2, Coke: 2}, sotal: 50, status: "pending" },
    { Provider: "Mishloha", ID: "MS-1399", customer: "John", items: { Burger: 1}, sotal: 500, status: "pending" }

    ]   
    const newOrder = chooseRandomOrder(orders);
    NewOrder(newOrder);
}
