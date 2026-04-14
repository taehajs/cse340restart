const pool = require("../database/db");

async function getNav() {
  try {
    const result = await pool.query(
      "SELECT * FROM classification ORDER BY classification_name"
    );

    let nav = `<ul>`;
    nav += `<li><a href='/inventory'>Home</a></li>`;

    result.rows.forEach(row => {
      nav += `
        <li>
          <a href="/inventory/type/${row.classification_id}">
            ${row.classification_name}
          </a>
        </li>`;
    });

    nav += `</ul>`;
    return nav;

  } catch (err) {
    console.error("NAV ERROR:", err);

    return `
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/inventory">Inventory</a></li>
        <li><a href="/account/login">My Account</a></li>
      </ul>
    `;
  }
}

async function buildClassificationList(selectedId = null) {
  try {
    const result = await pool.query(
      "SELECT * FROM classification ORDER BY classification_name"
    );

    let list = `<select name="classification_id" required>`;
    list += `<option value="">Choose Classification</option>`;

    result.rows.forEach(row => {
      list += `
        <option value="${row.classification_id}"
        ${selectedId == row.classification_id ? "selected" : ""}>
          ${row.classification_name}
        </option>`;
    });

    list += `</select>`;
    return list;

  } catch (err) {
    console.error("CLASS LIST ERROR:", err);
    return `<select name="classification_id"></select>`;
  }
}

function buildVehicleDetail(vehicle) {
  return `
    <div class="vehicle-detail">
      <h1>${vehicle.inv_make} ${vehicle.inv_model}</h1>
      <img src="${vehicle.inv_image}" alt="">
      <p>Year: ${vehicle.inv_year}</p>
      <p>Price: $${Number(vehicle.inv_price).toLocaleString()}</p>
      <p>Miles: ${Number(vehicle.inv_miles).toLocaleString()}</p>
      <p>Color: ${vehicle.inv_color}</p>
      <p>${vehicle.inv_description}</p>
    </div>
  `;
}

module.exports = {
  getNav,
  buildClassificationList,
  buildVehicleDetail
};