const pool = require("../database");


async function getNav() {
  try {
    const data = await pool.query(
      "SELECT * FROM classification ORDER BY classification_name"
    );

    let nav = "<ul>";
    nav += "<li><a href='/inventory'>Home</a></li>";

    data.rows.forEach(row => {
      nav += `<li><a href="/inventory/type/${row.classification_id}">
        ${row.classification_name}
      </a></li>`;
    });

    nav += "</ul>";
    return nav;

  } catch (err) {
    console.error(err);
    return "<ul><li>Home</li></ul>";
  }
}


async function buildClassificationList(selectedId = null) {
  const data = await pool.query(
    "SELECT * FROM classification ORDER BY classification_name"
  );

  let list = `<select name="classification_id" required>`;
  list += `<option value="">Choose Classification</option>`;

  data.rows.forEach(row => {
    list += `<option value="${row.classification_id}"
      ${selectedId == row.classification_id ? "selected" : ""}>
      ${row.classification_name}
    </option>`;
  });

  list += `</select>`;
  return list;
}


function buildVehicleDetail(vehicle) {
  return `
    <div class="vehicle-detail">
      <h1>${vehicle.inv_make} ${vehicle.inv_model}</h1>

      <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">

      <p>Year: ${vehicle.inv_year}</p>
      <p>Price: $${Number(vehicle.inv_price).toLocaleString("en-US")}</p>
      <p>Mileage: ${Number(vehicle.inv_miles).toLocaleString("en-US")}</p>
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