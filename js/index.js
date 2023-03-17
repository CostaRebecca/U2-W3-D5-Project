const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0NDAxZGY4MWI0MjAwMTM5YjI4OTMiLCJpYXQiOjE2NzkwNDg3MzMsImV4cCI6MTY4MDI1ODMzM30.xg_LO_bdxHmp_yherrycWh8hogQ71JXa8tONbiwqUoI'

window.onload = async () => {

    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
            headers: {
                Authorization: "Bearer " + API_KEY
            }
        });

        const product = await response.json();

        //console.log(product);


        showProduct(product);

    } catch (error) {
        console.log(error);
    }

}

function showProduct(product) {
    if (product) {

        let row = document.querySelector('.container-fluid .row');
        row.innerHTML = '';

        for (let i = 0; i < product.length; i++) {


            const col = document.createElement("div")
            col.className = "col-md-4"
            col.innerHTML = ` 
            <div class="card mb-4 shadow-sm" >
            <img src="${product[i].imageUrl}" alt="Picture" id="img-card-${product[i]._id}">
                    <div class="card-body">
                        <h5 class="card-title">${product[i].brand} ${product[i].name} </h5>
                        <p class="card-text">${product[i].description}</p>
                        <p class="card-text">Price: ${product[i].price}€</p>
                        <button type="button" class="btn btn-primary" id="btnEdit-${product[i]._id}">Edit</button>
                        <button type="button" class="btn btn-secondary" id="btnDetails-${product[i]._id}">View product details</button>
                    </div>
                </div>  
                `


            const btnEdit = col.querySelector(`#btnEdit-${product[i]._id}`)
            btnEdit.addEventListener('click', () => {
                const id = product[i]._id;
                window.location.assign(`backoffice.html?id=${id}`);
            });

            const btnDetails = col.querySelector(`#btnDetails-${product[i]._id}`)
            btnDetails.addEventListener('click', () => {
                const id = product[i]._id;
                window.location.assign(`details.html?id=${id}`);
            });


            row.appendChild(col);

        }
    }
}
