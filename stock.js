function getProducts(){
    return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products){
    localStorage.setItem("products", JSON.stringify(products));
}

function addProduct(){
    const name = document.getElementById("productName").value;
    const price = Number(document.getElementById("productPrice").value);
    const qty = Number(document.getElementById("productQty").value);
    const category = document.getElementById("productCategory").value;

    if(!name || !price || !qty || !category) return alert("All fields required!");

    const products = getProducts();
    const id = products.length ? products[products.length-1].id +1 : 1;

    products.push({id, name, price, quantity: qty, category, sales: []});
    saveProducts(products);
    renderProducts();
}

// Render Table
function renderProducts(){
    const products = getProducts();
    const search = document.getElementById("searchProduct")?.value.toLowerCase() || "";
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";

    products.filter(p => p.name.toLowerCase().includes(search))
    .forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${p.price}</td>
          <td ${p.quantity<5 ? 'style="color:red"' : ''}>${p.quantity}</td>
          <td>${p.category}</td>
          <td>
            <button onclick="updateStock(${p.id},1)">+1</button>
            <button onclick="updateStock(${p.id},-1)">-1</button>
            <button onclick="deleteProduct(${p.id})">Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
    });
}

// Update stock
function updateStock(id, change){
    const products = getProducts();
    const p = products.find(x=>x.id===id);
    if(!p) return;

    p.quantity += change;
    if(p.quantity<0) p.quantity=0;

    if(change<0) p.sales.push({date:new Date().toISOString(), qty: Math.abs(change)});
    saveProducts(products);
    renderProducts();
}

// Delete product
function deleteProduct(id){
    let products = getProducts();
    products = products.filter(p=>p.id!==id);
    saveProducts(products);
    renderProducts();
}

// Initial render
if(document.querySelector("#productTable tbody")) renderProducts();
