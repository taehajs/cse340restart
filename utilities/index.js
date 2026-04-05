const inventoryModel = require("../models/inventoryModel");

async function buildClassificationList(selectedId) {
  const data = await inventoryModel.getClassifications();
  let list = "";
  data.forEach(row => {
    list += `<option value="${row.classification_id}" ${row.classification_id == selectedId ? "selected" : ""}>${row.classification_name}</option>`;
  });
  return list;
}

function checkClassificationName(name) {
  return name && name.trim().length > 0;
}

function checkInventoryData(data) {
  const requiredFields = ["inv_make", "inv_model", "inv_year", "inv_price", "inv_color", "classification_id"];
  return requiredFields.every(field => data[field] && data[field].toString().trim() !== "");
}

module.exports = {
  buildClassificationList,
  checkClassificationName,
  checkInventoryData
};