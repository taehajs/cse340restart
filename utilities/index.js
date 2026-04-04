const pool = require("../database");

async function buildClassificationList(selectedId) {
  try {
    const data = await pool.query("SELECT * FROM classification ORDER BY classification_name");
    let options = "";
    data.rows.forEach(row => {
      options += `<option value="${row.classification_id}" ${row.classification_id == selectedId ? "selected" : ""}>${row.classification_name}</option>`;
    });
    return `<select name="classification_id" id="classification_id">${options}</select>`;
  } catch (error) {
    console.error("Error building classification list:", error);
    return "";
  }
}

module.exports = { buildClassificationList };