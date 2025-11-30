const ordersBodyActive = document.getElementById("ordersBodyActive");

if (ordersBodyActive) ordersBodyActive.innerHTML = "";

const popup = document.getElementById("popup");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.onclick = () => popup.style.display = "block";
closeBtn.onclick = () => popup.style.display = "none";

window.onclick = (e) => {
    if (e.target === popup) popup.style.display = "none";
};