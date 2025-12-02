const ordersBodyActive = document.getElementById("ordersBodyActive");
const popup = document.getElementById("popup");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const orderName = document.getElementById("orderName");
const orderTel = document.getElementById("orderTel");
const orderItems = document.getElementById("orderItems");
const orderAddress = document.getElementById("orderAddress");
const orderTotal = document.getElementById("orderTotal");
const orderPayment = document.getElementById("orderPayment");


//Empty Table
if (ordersBodyActive) ordersBodyActive.innerHTML = "";

//Popup
openBtn.onclick = () => popup.style.display = "block";
closeBtn.onclick = () => {
    popup.style.display = "none";
    cleanForm();
}
window.onclick = (e) => {
    if (e.target === popup) popup.style.display = "none";
};

//Clean Form
function cleanForm()
{
    orderName.value = "";
    orderTel.value = "";
    orderItems.value = "";
    orderAddress.value = "";
    orderTotal.value = "";
    orderPayment.value = "";
}

//Create Order
function NewOrder() {
    const tableBody = document.getElementById("ordersBodyActive");
    const rowTemplate = document.getElementById("orderRowTemplate");
    
    const newRow = document.importNode(rowTemplate.content, true);
    const cells = newRow.querySelectorAll('td');
    
    
    // Generate current time
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    // Generate order ID
    const orderId = "MAN-" + Date.now().toString().slice(-6);
    
    cells[0].textContent = timeString;
    cells[1].textContent = "Manual";
    cells[2].textContent = orderId;
    cells[3].textContent = orderName.value;
    cells[4].textContent = orderItems.value;
    cells[5].textContent = orderTotal.value;
    cells[6].textContent = "Pending";
    
    
    tableBody.appendChild(newRow);
    popup.style.display = "none";
    
    // Clear form fields
    cleanForm();
}

// Form Validation
function validateForm() {

    var alertms = '';
    if(orderTel.value.trim().length !== 10){
        alertms = alertms + "Please enter 10 digits phone number\n";
    }

    if(orderTotal.value == 0 && orderItems.value.trim().length !== 0) {
        alertms = alertms + "False Amount";
    }

    if(alertms != ''){
        alert(alertms);
    }

    else {NewOrder();}
}


function chooseRandomOrder(a) {
    // Returns a random order from list a.
    const randIndex = Math.floor(Math.random() * a.length); // Math.random() returns  a float between 0 to 1
    return a[randIndex];
}

function simulateNewOrder() {
    // adds a new simulated order to the incoming orders list
    let orders = [
    { provider: "Wolt", customer: "John", items: "Pizza: 2, Coke: 1", total: 50 },
    { provider: "Mishloha", customer: "Leo", items: "Burger: 10", total: 500 }

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


    let prefix = "";
    if(simOrder.provider === "Wolt") {
        prefix = "WO";
    }
    else if (simOrder.provider === "Mishloha") {
        prefix = "MS";
    }
    else if(simOrder.provider === "TenBis") {
        prefix = "TB";
    }

    const orderId = prefix + "-" + Date.now().toString().slice(-6);
    
    cells[0].textContent = timeString;
    cells[1].textContent = simOrder.provider;
    cells[2].textContent = orderId;
    cells[3].textContent = simOrder.customer;
    cells[4].textContent = simOrder.items;
    cells[5].textContent = simOrder.total;
    //cells[6].textContent = "Pending";
    cells[6].querySelector('.status-pill').textContent = "Pending";
    cells[6].querySelector('.status-pill').style.backgroundColor = "yellow";
    tableBody.appendChild(newRow);

}