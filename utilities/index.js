const pool = require("../database/db");
const jwt = require("jsonwebtoken");

async function getNav() {
  try {
    const result = await pool.query(
      "SELECT * FROM classification ORDER BY classification_name"
    );

    let nav = `<ul>`;
    nav += `<li><a href="/">Home</a></li>`;
    nav += `<li><a href="/inventory">Inventory</a></li>`;

    if (result.rows.length) {
      result.rows.forEach(row => {
        nav += `
          <li>
            <a href="/inventory/type/${row.classification_id}">
              ${row.classification_name}
            </a>
          </li>`;
      });
    }

    nav += `<li><a href="/account/login">My Account</a></li>`;
    nav += `</ul>`;

    return nav;

  } catch (err) {
    console.error("NAV ERROR:", err);
    return `<ul><li><a href="/">Home</a></li></ul>`;
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
        ${Number(selectedId) === Number(row.classification_id) ? "selected" : ""}>
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

function buildVehicleDetail(vehicle, loggedIn = false) {
  return `
    <div class="vehicle-detail">

      <img src="${vehicle.inv_image}" 
           alt="${vehicle.inv_make} ${vehicle.inv_model}">

      <h1>${vehicle.inv_make} ${vehicle.inv_model}</h1>

      <p>$${parseFloat(vehicle.inv_price).toLocaleString()}</p>

      <ul>
        <li>Year: ${vehicle.inv_year}</li>
        <li>Miles: ${vehicle.inv_miles}</li>
        <li>Color: ${vehicle.inv_color}</li>
      </ul>

      <p>${vehicle.inv_description}</p>

      ${
        loggedIn
          ? `
        <form method="post" action="/account/favorite">
          <input type="hidden" name="inv_id" value="${vehicle.inv_id}">
          <button type="submit">❤️ Add to Favorites</button>
        </form>
      `
          : `<p><a href="/account/login">Login to save favorites</a></p>`
      }

    </div>
  `;
}

function buildVehicleDetail(vehicle) {
  return `
    <div class="vehicle-detail">

      <div class="vehicle-image">
        <img src="${vehicle.inv_image}" 
             alt="${vehicle.inv_make} ${vehicle.inv_model}">
      </div>

      <div class="vehicle-info">
        <h1>${vehicle.inv_make} ${vehicle.inv_model}</h1>

        <p class="price">
          $${parseFloat(vehicle.inv_price).toLocaleString("en-US")}
        </p>

        <ul>
          <li><strong>Year:</strong> ${vehicle.inv_year}</li>
          <li><strong>Mileage:</strong> ${parseFloat(vehicle.inv_miles).toLocaleString("en-US")}</li>
          <li><strong>Color:</strong> ${vehicle.inv_color}</li>
        </ul>

        <p class="desc">${vehicle.inv_description}</p>
      </div>

    </div>
  `;
}

function checkJWTToken(req, res, next) {
  if (req.cookies.jwt) {
    jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.locals.loggedIn = false;
        return next();
      }
      res.locals.loggedIn = true;
      res.locals.accountData = decoded;
      next();
    });
  } else {
    res.locals.loggedIn = false;
    next();
  }
}

function checkEmployee(req, res, next) {
  if (
    res.locals.loggedIn &&
    res.locals.accountData.account_type !== "Client"
  ) {
    return next();
  }
  return res.redirect("/account/login");
}

module.exports = {
  getNav,
  buildClassificationList,
  buildVehicleDetail,
  checkJWTToken,
  checkEmployee 
};