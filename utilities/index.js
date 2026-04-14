const invModel = require("../models/inventoryModel");

async function getNav() {
  try {
    const data = await invModel.getClassifications();

    let nav = "<ul>";
    nav += '<li><a href="/">Home</a></li>';

    data.rows.forEach(row => {
      nav += `<li>
        <a href="/inventory/type/${row.classification_id}">
          ${row.classification_name}
        </a>
      </li>`;
    });

    nav += "</ul>";
    return nav;
  } catch (err) {
    return "<ul><li><a href='/'>Home</a></li></ul>"; // 🔥 fallback
  }
}

async function buildClassificationList() {
  try {
    const data = await invModel.getClassifications();

    let list = '<select name="classification_id">';
    data.rows.forEach(row => {
      list += `<option value="${row.classification_id}">
        ${row.classification_name}
      </option>`;
    });
    list += "</select>";

    return list;
  } catch (err) {
    return "<select></select>";
  }
}

module.exports = {
  getNav,
  buildClassificationList,
};