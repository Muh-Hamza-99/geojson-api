const storeForm = document.getElementById("store-form");
const storeID = document.getElementById("store-ID");
const storeAddress = document.getElementById("store-address");

storeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!storeID.value || !storeAddress.value) return;
    const sendData = { storeID, address: storeAddress };
    try {
        const response = await fetch("/api/v1/stores", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sendData) });
        if (response.status === 400) throw Error("Store already exists!");
        alert("Store added!");
        window.location.href = "/index.html";
    } catch (error) { alert(error); return; };
});