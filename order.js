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
closeBtn.onclick = () => popup.style.display = "none";

window.onclick = (e) => {
    if (e.target === popup) popup.style.display = "none";
};

//Create Order
function NewOrder(order) {
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
//    popup.style.display = "none";

    // Clear form fields
    orderName.value = "";
    orderTel.value = "";
    orderItems.value = "";
    orderAddress.value = "";
    orderTotal.value = "";
    orderPayment.value = "";
}