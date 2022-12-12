(function () {
  "use strict";

  const addForm = document.getElementById("add-form");
  const addModal = document.getElementById("add-modal");
  const closeModalEl = document.getElementById("close-modal");
  const productsList = document.getElementById("products-section");
  const addButtons = document.getElementsByClassName("add_button");
  const removeItemEl = document.getElementById("remove-item");

  Array.from(addButtons).forEach(function (e) {
    e.addEventListener("click", showAddModal);
  });

  async function getProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products/");

      const values = await response.json();

      values.products.forEach((item) =>
        renderProduct({
          title: item.title,
          thumbnail: item.thumbnail,
          description: item.description,
          price: item.price,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  function renderProduct(product) {
    productsList.insertAdjacentHTML(
      "beforeend",
      `<section class="products-section" id="products-section">
      <div id="delete-item" class="products-section-item">
        <div class="products-section-item__thumb">
          <img src="${product.thumbnail}" alt="${product.title}" />
        </div>
        <div class="products-section-item__content">
          <div class="products-section-item__headings">
            <h3 class="products-section-item__title">
            ${product.title}
            </h3>
    
            <p class="products-section-item__description">
            ${product.description}
            </p>
          </div>
    
          <span class="products-section-item__price">
            ${product.price}€
          </span>
          <div id="remove-item" class="products-section-item__remove">
            <img src="./assets/icons/remove.svg" style="width:15px" alt="Remove Item" />
          </div>
        </div>
      </div>
      </section>`
    );
  }
  function showAddModal() {
    addModal.classList.add("add_modal--shown");
  }

  closeModalEl.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
      closeModal();
    }
  });

  function closeModal() {
    addModal.classList.remove("add_modal--shown");
    addForm.reset();
  }

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    productsList.insertAdjacentHTML(
      "beforeend",
      `<section class="products-section" id="products-section">
      <div id="delete-item" class="products-section-item">
        <div class="products-section-item__thumb">
          <img src="./assets/images/1.png" alt="Item Thumbnail" />
        </div>
        <div class="products-section-item__content">
          <div class="products-section-item__headings">
            <h3 class="products-section-item__title">
            ${formData.get("title")}
            </h3>
    
            <p class="products-section-item__description">
            ${formData.get("description")}
            </p>
          </div>
    
          <span class="products-section-item__price">
            ${formData.get("price")}€
          </span>
          <div id="remove-item" class="products-section-item__remove">
            <img src="./assets/icons/remove.svg" style="width:15px" alt="Remove Item" />
          </div>
        </div>
      </div>
      </section>`
    );

    addModal.classList.remove("add_modal--shown");

    addForm.reset();
  });
  removeItemEl.addEventListener("click", deleteItem);

  function deleteItem() {
    location.reload();
  }
  getProducts();
})();
