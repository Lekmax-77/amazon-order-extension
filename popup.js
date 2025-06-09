const menuView = document.getElementById("menu-view");
const productsView = document.getElementById("products-view");
const showProductsBtn = document.getElementById("show-products");
const backBtn = document.getElementById("back-button");
const productList = document.getElementById("product-list");

showProductsBtn.onclick = () => {
  productList.innerHTML = '<li>Chargement...</li>';
  menuView.style.display = "none";
  productsView.style.display = "block";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: () => {
          const productBlocks = document.querySelectorAll(".myo-list-orders-product-name-cell");
          const result = {};
          productBlocks.forEach(block => {
            const skuLine = Array.from(block.querySelectorAll("div"))
              .find(div => div.textContent.includes("SKU"));
            const qtyLine = Array.from(block.querySelectorAll("div"))
              .find(div => div.textContent.includes("Quantité"));

            if (skuLine && qtyLine) {
              const rawSKU = skuLine.textContent.split(":")[1].trim();
              const qty = parseInt(qtyLine.textContent.split(":")[1].trim(), 10) || 1;
              const baseSKU = rawSKU.slice(0, -4);
              result[baseSKU] = (result[baseSKU] || 0) + qty;
            }
          });
          return result;
        },
      },
      (res) => {
        const data = res[0]?.result || {};
        productList.innerHTML = "";

        if (Object.keys(data).length === 0) {
          productList.innerHTML = "<li>Aucun produit trouvé.</li>";
        } else {
          for (const [sku, qty] of Object.entries(data)) {
            const li = document.createElement("li");
            li.textContent = `${sku} x ${qty}`;
            productList.appendChild(li);
          }
        }
      }
    );
  });
};

backBtn.onclick = () => {
  menuView.style.display = "block";
  productsView.style.display = "none";
};
