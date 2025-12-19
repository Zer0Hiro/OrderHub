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
const cancelledTableBody = document.getElementById("ordersBodyCancelled");
const completedTableBody = document.getElementById("ordersBodyCompleted");
const orderBtn = document.getElementById("orderButton");
const simulateBtn = document.getElementById("simulateBtn");
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
openBtn.onclick = () => {
    popup.classList.add("fade-in");
    popup.style.display = "block";
    for (var i = 0; i < tables.length; i++) {
        tables[i].style.display = "none";
    }
    btnsDiv.style.display = "none";

}
closeBtn.onclick = () => {
    popup.style.display = "none";
    for (var i = 0; i < tables.length; i++) {
        tables[i].style.display = "";
    }
    btnsDiv.style.display = "flex";
    cleanForm();
}

orderBtn.onclick = () => validateForm();
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


    const newRow = document.importNode(rowTemplate.content, true);
    const cells = newRow.querySelectorAll('td');
    const row = newRow.querySelector("tr");
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
        address: null,
        paymentMethod: null,
        notes: null,
    };


    cells[0].textContent = timeString;
    cells[1].textContent = simOrder.provider;
    cells[2].textContent = orderId;
    cells[3].innerHTML = '<span class="statusPill statusPending">Pending</span>';

    const btns = cells[4].querySelectorAll("a");
    btns[0].href = "tel:" + simOrder.orderTel;
    btns[1].href = "sms:" + simOrder.orderTel;
    incomingTableBody.appendChild(newRow);

    //Filter Update
    filter();

    //Status Buttons
    statusBtn(cells, row, tempOrder);
}


//Create Order
function NewOrder() {
    const newRow = document.importNode(rowTemplate.content, true);
    const cells = newRow.querySelectorAll('td');
    const row = newRow.querySelector("tr");

    //Time stamp for order
    timeString = timeATM();

    // Generate order ID
    const orderId = "MAN-" + Date.now().toString().slice(-6);

    //Create order 
    const newOrder = {
        id: orderId,
        provider: "Manual",
        time: timeString,
        customer: orderName.value,
        phone: orderTel.value,
        items: orderItems.value,
        total: orderTotal.value,
        address: orderAddress.value,
        paymentMethod: orderPayment.value,
        notes: orderNotes.value,
    };

    cells[0].textContent = newOrder.time;
    cells[1].textContent = newOrder.provider;
    cells[2].textContent = newOrder.id;
    cells[3].textContent = newOrder.customer;
    cells[4].textContent = newOrder.items;
    cells[5].textContent = newOrder.total + "₪";
    cells[6].innerHTML = '<span class="statusPill statusPending">Pending</span>';


    const btns = cells[7].querySelectorAll("a");
    btns[0].href = "tel:" + orderTel.value;
    btns[1].href = "sms:" + orderTel.value;


    incomingTableBody.appendChild(newRow);
    popup.style.display = "none";
    for (var i = 0; i < tables.length; i++) {
        tables[i].style.display = "";
    }

    //Status Buttons
    statusBtn(cells, row, newOrder);

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

    //Check items is not empty
    if (orderItems.value == "") {
        alertms = alertms + "Please add any items\n";
    }

    //Check price of items
    const total = parseFloat(orderTotal.value);
    if (isNaN(total) || (total == 0 && orderItems.value.trim().length != 0)) {
        alertms = alertms + "Invalid Amount\n";
    }

    //Check payment method
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

//filter func
function filter() {
    let provider = filterProvider.value;
    let status = filterStatus.value;
    const tables = document.getElementsByClassName("orderBody");

    for (let j = 0; j < tables.length; j++) {
        const cells = tables[j].querySelectorAll("tr")
        for (let i = 0; i < cells.length; i++) {
            if ((cells[i].querySelectorAll("td")[1].innerHTML == provider || provider == 'all')
                && (cells[i].querySelectorAll("td")[3].textContent.toLowerCase() == status || status == 'all')) {
                cells[i].style.display = '';
            }
            else {
                cells[i].style.display = 'none';
            }
        }
    }
}

//Status Buttons
function statusBtn(cells, row, order) {
    //Completed Button
    let compbtn = cells[5].querySelector("#completedBtn");
    compbtn.style.display = "none";
    compbtn.onclick = () => {
        cells[3].innerHTML = '<span class="statusPill" id="statusCompleted">Completed</span>';
        cbtn.style.display = "none";
        completedTableBody.appendChild(row);

        filter();
    }
    //Accept Button
    let abtn = cells[5].querySelector("#acceptBtn");
    abtn.onclick = () => {
        cells[3].innerHTML = '<span class="statusPill" id="statusAccepted">Accepted</span>';
        abtn.style.display = "none";
        compbtn.style.display = "";
        filter();
    }
    //Cancel Button
    let cbtn = cells[5].querySelector("#cancelBtn");
    cbtn.onclick = () => {
        cells[3].innerHTML = '<span class="statusPill" id="statusCancelled">Cancelled</span>';
        abtn.style.display = "none";
        compbtn.style.display = "none";
        cancelledTableBody.appendChild(row);

        filter();
    }
    //More Details Button
    let detbtn = cells[5].querySelector("#moreBtn");
    detbtn.onclick = () => openOrderDeatil(row, order);
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

