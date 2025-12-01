const ordersBodyActive = document.getElementById("ordersBodyActive");
const popup = document.getElementById("popup");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
<<<<<<< HEAD
const orderName = document.getElementById("name");
const orderTel = document.getElementById("tel");
=======
const orderName = document.getElementById("orderName");
const orderTel = document.getElementById("orderTel");
>>>>>>> b29371c0698bee237d929d92886a3789c8ee92c5
const orderItems = document.getElementById("orderItems");
const orderAddress = document.getElementById("orderAddress");
const orderTotal = document.getElementById("orderTotal");
const orderPayment = document.getElementById("orderPayment");

<<<<<<< HEAD

=======
//Random Orders
function chooseRandomOrder(a) {
    // Returns a random order from list a.
    const randIndex = Math.floor(Math.random() * a.length); // Math.random() returns  a float between 0 to 1
    return a[randIndex];
}

let orders = [
    { Provider: "Wolt", ID: "WO-1389", Customer: "John", items: { Pizza: 2, Coke: 2}, Total: 50, Status: "pending" },
    { Provider: "Mishloha", ID: "MS-1399", Customer: "John", items: { Burger: 1}, Total: 500, status: "pending" }


]
>>>>>>> b29371c0698bee237d929d92886a3789c8ee92c5

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

<<<<<<< HEAD
//Create Order
function NewOrder(order) {
    const tableBody = document.getElementById("ordersBodyActive");
    const rowTemplate = document.getElementById("orderRowTemplate");

    const newRow = document.importNode(rowTemplate.content, true);
    const cells = newRow.querySelectorAll('td');

    cells[0].textContent = "";
    cells[1].textContent = "Manual";
    cells[2].textContent = "";
    cells[3].textContent = orderName.value;
    cells[4].textContent = orderItems.value;
    cells[5].textContent = orderTotal.value;
    cells[6].textContent = "Pending";


    tableBody.appendChild(newRow);
    popup.style.display = "none";

=======
//Clean Form
function cleanForm()
{
>>>>>>> b29371c0698bee237d929d92886a3789c8ee92c5
    orderName.value = "";
    orderTel.value = "";
    orderItems.value = "";
    orderAddress.value = "";
    orderTotal.value = "";
    orderPayment.value = "";
<<<<<<< HEAD


=======
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
    if(trim(orderTel).length != 10) {
        alertms = alertms + "Please enter 10 digits phone number\n";
    }

    if(orderTotal == 0 && trim(orderItems).length != 0) {
        alertms = alertms + "False Amount";
    }

    if(alertms != ''){
        alert(alertms);
    }

    else {NewOrder();}
>>>>>>> b29371c0698bee237d929d92886a3789c8ee92c5
}