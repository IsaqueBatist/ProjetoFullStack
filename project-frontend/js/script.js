var products = [
  {
    id: 1,
    name: "Computador M1-TX",
    description: "Intel I7, 16GB, SSD 256, HD 1T",
    price: 4900,
    category: 1,
    promotion: true,
    new: true
  },
  {
    id: 2,
    name: "Computador M2-TX",
    description: "Intel I7, 32GB, SSD 512, HD 1T",
    price: 5900,
    category: 2,
    promotion: false,
    new: true
  },
  {
    id: 3,
    name: "Computador M1-T",
    description: "Intel I5, 16GB, HD 1T",
    price: 2900,
    category: 3,
    promotion: false,
    new: false
  },
];

var categories = [
  { id: 1, name: "Produção Própria" },
  { id: 2, name: "Nacional" },
  { id: 3, name: "Importado" }
];
function convertToNumber(string) {
  return string.replace(/\./g, '').replace(',', '.')
}
function addNewRow(prodct) {
  let table = document.getElementById('table')
  let {name} = categories[prodct.category-1]
  table.innerHTML += `
    <tr>
      <th scope="row">${prodct.id}</th>
      <td>${prodct.name}</td>
      <td class="d-none d-md-table-cell">${prodct.description}</td>
      <td>R$ ${Intl.NumberFormat({style: 'decimal', currency: 'BRL'}).format(prodct.price)}</td>
      <td>${name}</td>
      <td class="d-none d-md-table-cell">
        ${prodct.promotion? `<span class="badge text-bg-success me-1">P</span>` : ``}
        ${prodct.new? `<span class="badge text-bg-primary">L</span>`: ``}
      </td>
    </tr>
  `
}

loadProducts()

function loadProducts() {
  products.map((product) => addNewRow(product))
}

document.getElementById('formRegister').addEventListener('submit', function(event) {
  event.preventDefault()
  console.log(document.getElementById('checkboxNewProduct').checked)
  console.log(document.getElementById('checkboxPromotion').checked)
  let newProduct = {
    id: products.length+1,
    name: document.getElementById('inputName3').value,
    description: document.getElementById('inputDescription3').value,
    price: convertToNumber(document.getElementById('inputPrice3').value),
    category: document.getElementById("inputClass3").value,
    promotion: document.getElementById('checkboxPromotion').checked,
    new: document.getElementById('checkboxNewProduct').checked,
  }
  addNewRow(newProduct)
  products.push(newProduct)
  document.getElementById('formRegister').reset()
})


