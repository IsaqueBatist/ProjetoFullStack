$('#inputPrice3').mask('000.000.000.000.000,00', { reverse: true });

var categories = [];

function convertToNumber(string) {
  return string.replace(/\./g, '').replace(',', '.')
}
async function addNewRow(prodct) {
  let table = document.getElementById('table')
  let {name} = categories[prodct.idCategory-1]
  table.innerHTML += `
    <tr>
      <th scope="row">${prodct.id}</th>
      <td>${prodct.name}</td>
      <td class="d-none d-md-table-cell">${prodct.description}</td>
      <td>R$ ${Intl.NumberFormat({style: 'decimal', currency: 'BRL'}).format(prodct.price)}</td>
      <td>${name}</td>
      <td class="d-none d-md-table-cell">
        ${prodct.promotion? `<span class="badge text-bg-success me-1">P</span>` : ``}
        ${prodct.newProduct? `<span class="badge text-bg-primary">L</span>`: ``}
      </td>
    </tr>
  `
}


async function loadProducts() {
  const {data} = await axios.get('http://localhost:8080/products')
  await loadtCategories()
  data.map((p) => addNewRow(p))
}
async function loadtCategories(){
  const {data} = await axios.get(`http://localhost:8080/categories`)
  categories= data
  categories.map((cat) => document.getElementById('inputClass3').innerHTML += `<option value=${cat.id}>${cat.name}</option>`)
}
loadProducts()

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


