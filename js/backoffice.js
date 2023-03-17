const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");
console.log("SELECTED ID: ", selectedId);

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0NDAxZGY4MWI0MjAwMTM5YjI4OTMiLCJpYXQiOjE2NzkwNDg3MzMsImV4cCI6MTY4MDI1ODMzM30.xg_LO_bdxHmp_yherrycWh8hogQ71JXa8tONbiwqUoI';


window.onload = async () => {
    const row = document.getElementById("selected");
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + selectedId, {
            headers: {
                Authorization: "Bearer " + API_KEY
            }
        });
        const selectedProduct = await response.json();

        if (selectedProduct) {

            let form = document.getElementById("pForm")

            form.classList.add("d-none");

            const col = document.createElement("div")
            col.className = "col"
            col.innerHTML = ` 
        <div class="card mb-4 shadow-sm" >
        <img src="${selectedProduct.imageUrl}" alt="Picture" id="img-card-${selectedProduct._id}">
                <div class="card-body">
                    <h5 class="card-title">${selectedProduct.brand} ${selectedProduct.name} </h5>
                    <p class="card-text">${selectedProduct.description}</p>
                    <p class="card-text">Price: ${selectedProduct.price}€</p>
                    <button type="button" class="btn btn-primary" id="btnEdit-${selectedProduct._id}">Edit</button>
                    <button type="button" class="btn btn-secondary" id="btnDelete-${selectedProduct._id}">Delete</button>
                  
                </div>
            </div>  
            `

            row.appendChild(col);



            const btnEdit = col.querySelector(`#btnEdit-${selectedProduct._id}`)
            btnEdit.addEventListener('click', () => {

            });

            const btnDelete = col.querySelector(`#btnDelete-${selectedProduct._id}`)
            btnDelete.addEventListener('click', async () => {
                deleteProduct(selectedProduct._id);


            });

        }



    } catch (error) {
        console.log(error);
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + API_KEY
            }
        });
        if (response.ok) {
            console.log("Product deleted successfully!");
            const row = document.getElementById("selected");
            row.remove();
        } else {
            console.log("Error deleting product!");
        }
    } catch (error) {
        console.log(error);
    }
}