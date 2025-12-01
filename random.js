function chooseRandomOrder(a) {
    // Returns a random order from list a.
    const randIndex = Math.floor(Math.random() * a.length); // Math.random() returns  a float between 0 to 1
    return a[randIndex];
}

let orders = [
    { Provider: "Wolt", ID: "WO-1389", Customer: "John", items: { Pizza: 2, Coke: 2}, Total: 50, Status: "pending" },
    { Provider: "Mishloha", ID: "MS-1399", Customer: "John", items: { Burger: 1}, Total: 500, status: "pending" }


]

function getCurrTime() {
    // Returns the current time. Format : "HH:MM"
    const time = new Date();

    let hour = time.getHours();
    let minute = time.getMinutes();

    if (hour < 10) {
    hour = "0" + hour;
    }
    if (minute < 10) {
    minute = "0" + minute;
    }
    return hour + ":" + minute;
}

