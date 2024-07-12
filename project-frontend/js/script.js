$('#inputPrice3').mask('000.000.000.000.000,00', { reverse: true });

let categories = [];

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
  document.getElementById('table').innerHTML = ''
  const {data} = await axios.get('http://localhost:8080/products')
  await loadtCategories()
  data.map((p) => addNewRow(p))
}
async function loadtCategories(){
  const {data} = await axios.get(`http://localhost:8080/categories`)
  categories= data
  categories.map((cat) => document.getElementById('inputClass3').innerHTML += `<option value=${cat.id}>${cat.name}</option>`)
}
async function postProduct(data){
  await axios.post("http://localhost:8080/products", data)
}
loadProducts()

document.getElementById('formRegister').addEventListener('submit', function(event) {
  event.preventDefault()
  let newProduct = {
    name: document.getElementById('inputName3').value,
    description: document.getElementById('inputDescription3').value,
    price: convertToNumber(document.getElementById('inputPrice3').value),
    idCategory: document.getElementById("inputClass3").value,
    promotion: document.getElementById('checkboxPromotion').checked,
    newProduct: document.getElementById('checkboxNewProduct').checked,
  }
  postProduct(newProduct)
  loadProducts()
  document.getElementById('formRegister').reset()
})


