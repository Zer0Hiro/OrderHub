//Popup
const ordersBodyActive = document.getElementById("ordersBodyActive");
const popup = document.getElementById("popup");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
//Form
const formContent = document.getElementsByClassName("orderInput");
//Table
const rowTemplate = document.getElementById("orderRowTemplate");
const incomingTableBody = document.getElementById("ordersBodyActive");
const cancelledTableBody = document.getElementById("ordersBodyCancelled");
const completedTableBody = document.getElementById("ordersBodyCompleted");
const orderBtn = document.getElementById("orderButton");
const simulateBtn = document.getElementById("simulateBtn");
const clearDataBtn = document.getElementById("clearDataBtn");
const tables = document.getElementsByClassName("tables");
const moreDetailsBtn = document.getElementById("moreBtn");
//Filters
const filterProvider = document.getElementById("providerFilter");
const filterStatus = document.getElementById("statusFilter");

//Empty Tables
if (ordersBodyActive) ordersBodyActive.innerHTML = "";
if (ordersBodyCancelled) ordersBodyCancelled.innerHTML = "";
if (ordersBodyCompleted) ordersBodyCompleted.innerHTML = "";


//Popup
openBtn.onclick = () => changeDisplay(0);
    

closeBtn.onclick = () => changeDisplay(1);
    

//if state is 0 show popup, if 1 show main screen
function changeDisplay(state)
{
    if(state)
    {
        popup.style.display = "none";
        for (var i = 0; i < tables.length; i++) {
            tables[i].style.display = "";
        }
        btnsDiv.style.display = "flex";
        cleanForm();
    }
    else {
        popup.style.display = "block";
        for (var i = 0; i < tables.length; i++) {
            tables[i].style.display = "none";
        }
        btnsDiv.style.display = "none";
    }
}
orderBtn.onclick = () => validateForm();
simulateBtn.onclick = () => simulateNewOrder();

clearDataBtn.onclick = () => {
    clearStorage(),
    location.reload();
}

//Clean Form
function cleanForm() {
    for(element of formContent)
    {
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
        { provider: "Wolt", customer: "John", items: "Pizza: 2, Coke: 1", total: 89.50, orderTel: "0505256442" },
        { provider: "Mishloha", customer: "Sarah", items: "Sushi Set: 1", total: 62.20, orderTel: "0505256442" },
        { provider: "Tenbis", customer: "Adam", items: "Falafel: 3, Water: 2", total: 38.75, orderTel: "0505256442" },
        { provider: "Wolt", customer: "Emily", items: "Pasta: 1, Salad: 1", total: 72.30, orderTel: "0505256442" },
        { provider: "Mishloha", customer: "Daniel", items: "Burger: 2, Fries: 1", total: 96.90, orderTel: "0505256442" },
        { provider: "Tenbis", customer: "Lior", items: "Shawarma: 1", total: 38.40, orderTel: "0505256442" },
        { provider: "Wolt", customer: "Maya", items: "Sushi: 8 pcs", total: 48.60, orderTel: "0505256442" },
        { provider: "Mishloha", customer: "Tom", items: "Steak Meal: 1", total: 135.75, orderTel: "0505256442", orderTel: "0505256442" },
        { provider: "Tenbis", customer: "Omer", items: "Sandwich: 2, Juice: 1", total: 52.50, orderTel: "0505256442" },
        { provider: "Wolt", customer: "Noa", items: "Pad Thai: 1", total: 58.20, orderTel: "0505256442" }
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
        address: "",
        paymentMethod: "",
        notes: "",
        status: "pending"
    };

    saveOrderToStorage(tempOrder); // Sends the new order to "saveOrderToStorage" in dn.js

    cleanTables();
    loadOrders();

}

//Create Order
function NewOrder() {
    //Time stamp for order
    timeString = timeATM();

    // Generate order ID
    const orderId = "MAN-" + Date.now().toString().slice(-6);

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

    cleanTables();
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
    if (isNaN(total) || (total == 0 && formContent[2].value.trim().length != 0)) {
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
    let compbtn = cells[8].querySelector("#completedBtn");
    compbtn.style.display = order.status == "accepted" ? "" : "none";
    compbtn.onclick = () => statusBtnClick(order, "completed");
    //Accept Button
    let abtn = cells[8].querySelector("#acceptBtn");
    abtn.style.display = order.status == "pending" ? "" : "none";
    abtn.onclick = () => statusBtnClick(order, "accepted");
    //Cancel Button
    let cbtn = cells[8].querySelector("#cancelBtn");
    cbtn.style.display = (order.status == "completed" || order.status == "cancelled") ? "none" : "";
    cbtn.onclick = () => statusBtnClick(order, "cancelled");    
    //More Details Button
    let detbtn = cells[8].querySelector("#moreBtn");
    detbtn.onclick = () => openOrderDeatil(row, order);
}

function statusBtnClick(order, status) {
    order.status = status;
    updateOrderInStorage(order);

    cleanTables();
    loadOrders();
}

//Order details func
function openOrderDeatil(row, order) {
    //If already open, remove
    if (row.nextElementSibling?.classList.contains("orderDetailsRow")) {
        row.nextElementSibling.remove();
        return;
    }

    const detailsRow = document.createElement("tr");
    detailsRow.className = "orderDetailsRow";

    const detailsPop = document.createElement("td");
    //get length of a row
    detailsPop.colSpan = row.children.length;
    detailsPop.innerHTML = `
    <div class="orderDetailsPop fade-in">
      <div class="orderDetailHeader">
        <div>
          <h3>Order ${order.id}</h3>
          <p class="uppertext">${order.provider} • ${order.time}</p>
          </div>
          <button type="button" id="closeDetails">×</button>
      </div>
      <div class="orderDetailsGrid">
        <div>
          <span class="label">Customer</span>
          <span class="uppertext">${order.customer}</span>
        </div>
        <div>
          <span class="label">Phone</span>
          <span>${order.phone}</span>
        </div>
        <div>
          <span class="label">Delivery address</span>
          <span class="uppertext">${order.address ?? "Not provided"}</span>
        </div>
        <div>
          <span class="label">Items</span>
          <span class="uppertext">${order.items}</span>
        </div>
        <div>
          <span class="label">Total</span>
          <span>${order.total + "₪"}</span>
        </div>
        <div>
          <span class="label">Payment</span>
          <span>${order.paymentMethod ?? "Platform payout"}</span>
        </div>
      </div>
      <div class="orderDetailsNotes">
        <strong>Special notes:</strong>
        <p>${order.notes ?? "No special requests."}</p>
      </div>
    </div>
  `;

    detailsRow.appendChild(detailsPop);
    row.parentElement.insertBefore(detailsRow, row.nextElementSibling);

    const clsBtn = detailsPop.querySelector("#closeDetails");
    clsBtn.onclick = () => detailsRow.remove();
}

// tabs:
incTabBtn.onclick = () => {
    incTable.style.display = "block";
    cancelledTable.style.display = "none";
    completedTable.style.display = "none";
}

CancelTabBtn.onclick = () => {
    incTable.style.display = "none";
    cancelledTable.style.display = "block";
    completedTable.style.display = "none";
}

CompTabBtn.onclick = () => {
    incTable.style.display = "none";
    cancelledTable.style.display = "none";
    completedTable.style.display = "block";
}

// Function for loading saved data from storage into the page
function loadOrders() {

    // Retrieves the data array from local storage
    const provider = filterProvider.value;
    const orders = getOrdersFromStorage().filter(order => (order.provider == provider || provider == "all")); 

    orders.forEach(order => {

        // Uses the HTML row template
        const newRow = document.importNode(rowTemplate.content, true);
        const cells = newRow.querySelectorAll('td');
        const row = newRow.querySelector("tr");

        // Fills the cells with the saved order details
        cells[0].textContent = order.time;
        cells[1].textContent = order.provider;
        cells[2].textContent = order.id;
        cells[3].textContent = order.customer;
        cells[4].textContent = order.items;
        cells[5].textContent = order.total + "₪";

        // Defines preset for every status type
        const statusSettings = {
            pending: { html: '<span class="statusPill statusPending">Pending</span>', table: incomingTableBody },
            accepted: { html: '<span class="statusPill" id="statusAccepted">Accepted</span>', table: incomingTableBody },
            completed: { html: '<span class="statusPill" id="statusCompleted">Completed</span>', table: completedTableBody },
            cancelled: { html: '<span class="statusPill" id="statusCancelled">Cancelled</span>', table: cancelledTableBody } };

        // Grabs the correct settings based on the order status
        const currentSetting = statusSettings[order.status];

        // Applies the settings
        cells[6].innerHTML = currentSetting.html;
        const targetTable = currentSetting.table;

        // Contact buttons
        const btns = cells[7].querySelectorAll("a");
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
