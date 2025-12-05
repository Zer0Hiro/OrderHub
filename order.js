//Popup
const ordersBodyActive = document.getElementById("ordersBodyActive");
const popup = document.getElementById("popup");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
//Form
const orderName = document.getElementById("orderName");
const orderTel = document.getElementById("orderTel");
const orderItems = document.getElementById("orderItems");
const orderAddress = document.getElementById("orderAddress");
const orderTotal = document.getElementById("orderTotal");
const orderPayment = document.getElementById("orderPayment");
const orderNotes = document.getElementById("orderNotes");
//Table
const rowTemplate = document.getElementById("orderRowTemplate");
const incomingTableBody = document.getElementById("ordersBodyActive");
const orderBtn = document.getElementById("orderButton");
const simulateBtn = document.getElementById("simulateBtn");
//Filters
const filterProvider = document.getElementById("providerFilter");
const filterStatus = document.getElementById("statusFilter");

//Empty Table
if (ordersBodyActive) ordersBodyActive.innerHTML = "";

//Popup
openBtn.onclick = () => popup.style.display = "block";
closeBtn.onclick = () => {
    popup.style.display = "none";
    cleanForm();
}
window.onclick = (event) => {
    if (event.target === popup) popup.style.display = "none";
};

orderBtn.onclick = () => NewOrder();
simulateBtn.onclick = () => simulateNewOrder();

//Clean Form
function cleanForm() {
    orderName.value = "";
    orderTel.value = "";
    orderItems.value = "";
    orderAddress.value = "";
    orderTotal.value = "";
    orderPayment.value = "";
    orderNotes.value = "";
}

//Time func
function timeATM() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    return time;
}

//Status Buttons
function statusBtn(cells) {
    //Completed Button
    let compbtn = cells[8].querySelector("#completedBtn");
    compbtn.style.display = "none";
    compbtn.onclick = () => {
        cells[6].innerHTML = '<span class="statusPill" id="statusCompleted">Completed</span>';
        cbtn.style.display = "none";
        filter();
    }
    //Accept Button
    let abtn = cells[8].querySelector("#acceptBtn");
    abtn.onclick = () => {
        cells[6].innerHTML = '<span class="statusPill" id="statusAccepted">Accepted</span>';
        abtn.style.display = "none";
        compbtn.style.display = "";
        filter();
    }
    //Cancel Button
    let cbtn = cells[8].querySelector("#cancelBtn");
    cbtn.onclick = () => {
        cells[6].innerHTML = '<span class="statusPill" id="statusCancelled">Cancelled</span>';
        abtn.style.display = "none";
        compbtn.style.display = "none";
        filter();
    }
}

//Simulate Order
function chooseRandomOrder(a) {
    // Returns a random order from list a.
    const randIndex = Math.floor(Math.random() * a.length); // Math.random() returns  a float between 0 to 1
    return a[randIndex];
}

function simulateNewOrder() {
    // adds a new simulated order to the incoming orders list
    let orders = [
        { provider: "Wolt", customer: "John", items: "Pizza: 2, Coke: 1", total: 89.50 },
        { provider: "Mishloha", customer: "Sarah", items: "Sushi Set: 1", total: 62.20 },
        { provider: "Tenbis", customer: "Adam", items: "Falafel: 3, Water: 2", total: 38.75 },
        { provider: "Wolt", customer: "Emily", items: "Pasta: 1, Salad: 1", total: 72.30 },
        { provider: "Mishloha", customer: "Daniel", items: "Burger: 2, Fries: 1", total: 96.90 },
        { provider: "Tenbis", customer: "Lior", items: "Shawarma: 1", total: 38.40 },
        { provider: "Wolt", customer: "Maya", items: "Sushi: 8 pcs", total: 48.60 },
        { provider: "Mishloha", customer: "Tom", items: "Steak Meal: 1", total: 135.75 },
        { provider: "Tenbis", customer: "Omer", items: "Sandwich: 2, Juice: 1", total: 52.50 },
        { provider: "Wolt", customer: "Noa", items: "Pad Thai: 1", total: 58.20 }
    ];


    const newRow = document.importNode(rowTemplate.content, true);
    const cells = newRow.querySelectorAll('td');
    const simOrder = chooseRandomOrder(orders);

    //Time stamp for order
    timeString = timeATM();

    let prefix = "";
    if (simOrder.provider == "Wolt") {
        prefix = "WO";
    }
    else if (simOrder.provider == "Mishloha") {
        prefix = "MS";
    }
    else if (simOrder.provider == "Tenbis") {
        prefix = "TB";
    }

    const orderId = prefix + "-" + Date.now().toString().slice(-6);

    cells[0].textContent = timeString;
    cells[1].textContent = simOrder.provider;
    cells[2].textContent = orderId;
    cells[3].textContent = simOrder.customer;
    cells[4].textContent = simOrder.items;
    cells[5].textContent = simOrder.total.toFixed(2) + "₪";
    cells[6].innerHTML = '<span class="statusPill" id="statusPending">Pending</span>';

    incomingTableBody.appendChild(newRow);

    //Filter Update
    filter();

    //Status Buttons
    statusBtn(cells);
}


//Create Order
function NewOrder() {
    const newRow = document.importNode(rowTemplate.content, true);
    const cells = newRow.querySelectorAll('td');

    //Time stamp for order
    timeString = timeATM();

    // Generate order ID
    const orderId = "MAN-" + Date.now().toString().slice(-6);

    cells[0].textContent = timeString;
    cells[1].textContent = "Manual";
    cells[2].textContent = orderId;
    cells[3].textContent = orderName.value;
    cells[4].textContent = orderItems.value;
    cells[5].textContent = orderTotal.value;
    cells[6].textContent = "Pending";


    incomingTableBody.appendChild(newRow);
    popup.style.display = "none";

    //Status Buttons
    statusBtn(cells);

    // Clear form fields
    cleanForm();

}

// Form Validation
function validateForm() {

    let alertms = "";
    //Check phone number 
    if (orderTel.value.trim().length != 10) {
        alertms = alertms + "Please enter 10 digits phone number\n";
    }

    //Check price of items
    const total = parseFloat(orderTotal.value);
    if ((typeof orderTotal.value === 'string') || (total == 0 && orderItems.value.trim().length != 0)) {
        alertms = alertms + "Invalid Amount\n";
    }

    if (orderPayment.value == "") {
        alertms = alertms + "Please select a payment method";
    }

    if (alertms != "") {
        alert(alertms);
    }

    else {
        NewOrder();
    }
}


function filter() {
    let provider = filterProvider.value;
    let status = filterStatus.value;
    const tables = document.getElementsByClassName("orderBody");

    for (let j = 0; j < tables.length; j++) {
        const cells = tables[j].querySelectorAll("tr")
        for (let i = 0; i < cells.length; i++) {
            if (provider == "all" && status == "all") {
                cells[i].style.display = '';
            }
            else if ((cells[i].querySelectorAll("td")[1].innerHTML == provider || provider == 'all')
                && (cells[i].querySelectorAll("td")[6].textContent.toLowerCase() == status || status == 'all')) {
                cells[i].style.display = '';
            }
            else {
                cells[i].style.display = 'none';
            }
        }
    }
}