const invModel = require("../models/inventoryModel");

async function getNav() {
  const data = await invModel.getClassifications();

  let nav = "<ul>";
  nav += '<li><a href="/">Home</a></li>';

  data.rows.forEach(row => {
    nav += `<li><a href="/inventory/type/${row.classification_id}">${row.classification_name}</a></li>`;
  });

  nav += "</ul>";
  return nav;
}

async function buildClassificationList() {
  const data = await invModel.getClassifications();

  let list = '<select name="classification_id">';
  data.rows.forEach(row => {
    list += `<option value="${row.classification_id}">${row.classification_name}</option>`;
  });
  list += "</select>";

  return list;
}

module.exports = {
  getNav,
  buildClassificationList,
};