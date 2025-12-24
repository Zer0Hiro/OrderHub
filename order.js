//Popup
const ordersBodyActive = document.getElementById("ordersBodyActive");
const popup = document.getElementById("popup");
const newOrderBtn = document.getElementById("newOrderBtn");
const closeBtn = document.getElementById("closeBtn");
//Form
const formContent = document.getElementsByClassName("orderInput");
//Table
const rowTemplate = document.getElementById("orderRowTemplate");
const incomingTableBody = document.getElementById("ordersBodyActive");
const cancelledTableBody = document.getElementById("ordersBodyCancelled");
const completedTableBody = document.getElementById("ordersBodyCompleted");
const createOrderBtn = document.getElementById("createOrderBtn");
const simulateBtn = document.getElementById("simulateBtn");
const clearDataBtn = document.getElementById("clearDataBtn");
const tables = document.getElementsByClassName("tables");
const moreDetailsBtn = document.getElementById("moreBtn");
//Filters
const filterProvider = document.getElementById("providerFilter");
const filterStatus = document.getElementById("statusFilter");
//all tables
const main = document.getElementById("main");

//TABS
const incTable = document.getElementById("incTable");
const cancelledTable = document.getElementById("cancelledTable");
const completedTable = document.getElementById("completedTable");


//Empty Tables
if (ordersBodyActive) ordersBodyActive.innerHTML = "";
if (ordersBodyCancelled) ordersBodyCancelled.innerHTML = "";
if (ordersBodyCompleted) ordersBodyCompleted.innerHTML = "";


//Popup
newOrderBtn.onclick = () => changeDisplay(0);


closeBtn.onclick = () => changeDisplay(1);


//if state is 0 show popup, if 1 show main screen
function changeDisplay(state) {
    if (state) {
        popup.classList.add("fade-in");
        popup.style.display = "none";
        main.style.display = "";
        cleanForm();
    }
    else {
        popup.style.display = "block";
        main.style.display = "none"
    }
}
createOrderBtn.onclick = () => validateForm();
simulateBtn.onclick = () => simulateNewOrder();

clearDataBtn.onclick = () => {
    clearStorage(),
        location.reload();
}

//Clean Form
function cleanForm() {
    for (element of formContent) {
        element.value = "";
    }
}

function cleanTables() {
    incomingTableBody.innerHTML = "";
    cancelledTableBody.innerHTML = "";
    completedTableBody.innerHTML = "";
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


//Simulate Order
function chooseRandomOrder(a) {
    // Returns a random order from list a.
    const randIndex = Math.floor(Math.random() * a.length); // Math.random() returns  a float between 0 to 1
    return a[randIndex];
}

function simulateNewOrder() {
    // adds a new simulated order to the incoming orders list
    let orders = [
        { provider: "Wolt", customer: "John", items: "Pizza: 2, Coke: 1", total: 89.50, orderTel: "0505256442", address: "Dizengoff 50, Tel Aviv", payment: "Cash on delivery", lat: 32.0778, lon: 34.7738},
        { provider: "Mishloha", customer: "Sarah", items: "Sushi Set: 1", total: 62.20, orderTel: "0505256442", address: "Herzl 12, Rishon LeZion", payment: "Credit Card", lat: 31.9664, lon: 34.8025},
        { provider: "Tenbis", customer: "Adam", items: "Falafel: 3, Water: 2", total: 38.75, orderTel: "0505256442", address: "Jaffa Road 24, Jerusalem", payment: "Apple Pay", lat: 31.7801, lon: 35.2212},
        { provider: "Wolt", customer: "Emily", items: "Pasta: 1, Salad: 1", total: 72.30, orderTel: "0505256442", address: "Weizmann 10, Haifa", payment: "Credit Card", lat: 32.8055, lon: 35.0003},
        { provider: "Mishloha", customer: "Daniel", items: "Burger: 2, Fries: 1", total: 96.90, orderTel: "0505256442", address: "Bialik 7, Ramat Gan", payment: "Google Pay", lat: 32.0818, lon: 34.8143},
        { provider: "Tenbis", customer: "Lior", items: "Shawarma: 1", total: 38.40, orderTel: "0505256442", address: "Sokolov 45, Holon", payment: "Credit Card", lat: 32.0167, lon: 34.7794},
        { provider: "Wolt", customer: "Maya", items: "Sushi: 8 pcs", total: 48.60, orderTel: "0505256442", address: "Ben Gurion 100, Be'er Sheva", payment: "Apple Pay", lat: 31.2468, lon: 34.7937},
        { provider: "Mishloha", customer: "Tom", items: "Steak Meal: 1", total: 135.75, orderTel: "0505256442", address: "Rothschild 15, Tel Aviv", payment: "Cash on delivery", lat: 32.0632, lon: 34.7706},
        { provider: "Tenbis", customer: "Omer", items: "Sandwich: 2, Juice: 1", total: 52.50, orderTel: "0505256442", address: "Ahuza 88, Ra'anana", payment: "Credit Card", lat: 32.1833, lon: 34.8714},
        { provider: "Wolt", customer: "Noa", items: "Pad Thai: 1", total: 58.20, orderTel: "0505256442", address: "Hanassi 3, Herzliya", payment: "Google Pay", lat: 32.1648, lon: 34.8430},
        { provider: "Mishloha", customer: "Itay", items: "Loquat Cake: 1", total: 90.10, orderTel: "0505256442", address: "Hadekel 5, Ramat Yishai", payment: "Google Pay", lat: 32.7050, lon: 35.1660}
    ];

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

    //Create order 
    const tempOrder = {
        id: orderId,
        provider: simOrder.provider,
        time: timeString,
        customer: simOrder.customer,
        phone: simOrder.orderTel,
        items: simOrder.items,
        total: simOrder.total.toFixed(2),
        address: simOrder.address,
        paymentMethod: simOrder.payment || "",
        notes: "",
        lat: simOrder.lat,
        lon: simOrder.lon,
        status: "pending"
    };

    saveOrderToStorage(tempOrder); // Sends the new order to "saveOrderToStorage" in dn.js

    loadOrders();
}

//Create Order
function NewOrder() {
    //Time stamp for order
    timeString = timeATM();

    // Generate order ID
    const orderId = "MAN-" + Date.now().toString().slice(-6);

    // Random coords
    const randomLat = (Math.random() * (32.8 - 31.5) + 31.5).toFixed(4);
    const randomLon = (Math.random() * (35.5 - 34.75) + 34.75).toFixed(4);

    //Create order 
    const newOrder = {
        id: orderId,
        provider: "Manual",
        time: timeString,
        customer: formContent[0].value,
        phone: formContent[1].value,
        items: formContent[2].value,
        address: formContent[3].value,
        total: formContent[4].value,
        paymentMethod: formContent[5].value,
        notes: formContent[6].value,
        status: "pending"
    };


    saveOrderToStorage(newOrder); // Sends the new order to "saveOrderToStorage" in dn.js

    loadOrders();

    changeDisplay(1);

    // Clear form fields
    cleanForm();

}

// Form Validation
function validateForm() {

    let alertms = "";
    //Check phone number 
    if (formContent[1].value.trim().length != 10) {
        alertms = alertms + "Please enter 10 digits phone number\n";
    }

    //Check items is not empty
    if (formContent[2].value == "") {
        alertms = alertms + "Please add any items\n";
    }

    //Check price of items
    const total = parseFloat(formContent[4].value);
    if (isNaN(total) || (total < 0 && formContent[2].value.trim().length != 0)) {
        alertms = alertms + "Invalid Amount\n";
    }

    //Check payment method
    if (formContent[5].value == "") {
        alertms = alertms + "Please select a payment method";
    }

    if (alertms != "") {
        alert(alertms);
    }

    else {
        NewOrder();
    }
}

//Status Buttons
function statusBtn(cells, row, order) {
    //Completed Button
    let compbtn = cells[6].querySelector("#completedBtn");
    compbtn.style.display = order.status == "accepted" ? "" : "none";
    compbtn.onclick = () => statusBtnClick(order, "completed");
    //Accept Button
    let abtn = cells[6].querySelector("#acceptBtn");
    abtn.style.display = order.status == "pending" ? "" : "none";
    abtn.onclick = () => statusBtnClick(order, "accepted");
    //Cancel Button
    let cbtn = cells[6].querySelector("#cancelBtn");
    cbtn.style.display = (order.status == "completed" || order.status == "cancelled") ? "none" : "";
    cbtn.onclick = () => statusBtnClick(order, "cancelled");
    //More Details Button
    let detbtn = cells[0].querySelector("#moreBtn");
    detbtn.onclick = () => openOrderDeatil(row, order, cells);
}

function statusBtnClick(order, status) {
    order.status = status;
    updateOrderInStorage(order);
    loadOrders();
}

//Order details func
function openOrderDeatil(row, order, cells) {
    let btn = cells[0].querySelector("#moreBtn");
    //If already open, remove
    if (row.nextElementSibling?.classList.contains("orderDetailsRow")) {
        row.nextElementSibling.remove();
        btn.classList.remove("orderUnzipped");
        return;
    }

    btn.classList.add("orderUnzipped");
    const detailsRow = document.createElement("tr");
    detailsRow.className = "orderDetailsRow";

    const detailsPop = document.createElement("td");
    //get length of a row
    detailsPop.colSpan = row.children.length;
    detailsPop.innerHTML = `
    <div class="detailsWrapper fade-in">
        <div class="detailsCardsGrid">
            <div class="detailCard">
            <span class="detailLabel">CUSTOMER</span>
            <div class="detailContent">
                <div class="customerName">${order.customer}</div>
                <div class="customerPhone">${order.phone}</div>
                <div class="cardActions">
                <a href="tel:${order.phone}" class="cardActionBtn" title="Call">📞</a>
                <a href="sms:${order.phone}" class="cardActionBtn" title="Message">💬</a>
                </div>
            </div>
            </div>

            <div class="detailCard">
            <span class="detailLabel">DELIVERY</span>
            <div class="detailContent">
                <div>${order.address || "No address provided"}</div>
            </div>
            </div>

            <div class="detailCard">
            <span class="detailLabel">ORDER ITEMS</span>
            <div class="detailContent">
                <div>${order.items}</div>
            </div>
            </div>

            <div class="detailCard">
            <span class="detailLabel">PAYMENT</span>
            <div class="detailContent">
                <div class="totalPrice">${order.total} ₪</div>
                <div>${order.paymentMethod || "Platform payout"}</div>
            </div>
            </div>
        </div>

        <div style="margin: 15px 0; border-radius: 8px; overflow: hidden; border: 1px solid #eee;">
             <iframe 
                src="https://embed.waze.com/iframe?zoom=16&lat=${order.lat}&lon=${order.lon}&pin=1" 
                width="100%" 
                height="400" 
                style="border:none;">
            </iframe>
        </div>

        <div class="detailsNotesBox">
            <span class="noteLabel">Notes:</span>
            <span>${order.notes || "No special requests."}</span>
        </div>
    </div>
  `;

    detailsRow.appendChild(detailsPop);
    row.parentElement.insertBefore(detailsRow, row.nextElementSibling);
}

// tabs:
incTabBtn.onclick = () => chooseTable(incTable);

CancelTabBtn.onclick = () => chooseTable(cancelledTable);

CompTabBtn.onclick = () =>  chooseTable(completedTable);

function chooseTable(table)
{
    table.style.display = "block";
    for(var tables of [incTable, cancelledTable, completedTable])
    {
        if(tables != table) tables.style.display = "none";
    }
}



// Function for loading saved data from storage into the page
function loadOrders() {
    //you have to clean the tables to load them clean
    cleanTables();
    // Retrieves the data array from local storage
    const provider = filterProvider.value;
    const orders = getOrdersFromStorage().filter(order => (order.provider == provider || provider == "all"));

    orders.forEach(order => {

        // Uses the HTML row template
        const newRow = document.importNode(rowTemplate.content, true);
        const cells = newRow.querySelectorAll('td');
        const row = newRow.querySelector("tr");

        // Fills the cells with the saved order details
        cells[1].textContent = order.time;
        cells[2].textContent = order.provider;
        cells[3].textContent = order.id;

        // Defines preset for every status type
        const statusSettings = {
            pending: { html: '<span class="statusPill statusPending">Pending</span>', table: incomingTableBody },
            accepted: { html: '<span class="statusPill" id="statusAccepted">Accepted</span>', table: incomingTableBody },
            completed: { html: '<span class="statusPill" id="statusCompleted">Completed</span>', table: completedTableBody },
            cancelled: { html: '<span class="statusPill" id="statusCancelled">Cancelled</span>', table: cancelledTableBody }
        };

        // Grabs the correct settings based on the order status
        const currentSetting = statusSettings[order.status];

        // Applies the settings
        cells[4].innerHTML = currentSetting.html;
        const targetTable = currentSetting.table;

        // Contact buttons
        const btns = cells[5].querySelectorAll("a");
        btns[0].href = "tel:" + order.phone;
        btns[1].href = "https://wa.me/972" + order.phone.slice(1) + "?text=Where's my fucking burger?"; // slice removes the first digit
        btns[1].target = "_blank"; // opens whatsapp in a new tab

        // Status Buttons
        statusBtn(cells, row, order);

        // Inserts row into table
        targetTable.appendChild(newRow);
    });
}
// Loads locally stored data
loadOrders();