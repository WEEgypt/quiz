var scriptProp = PropertiesService.getScriptProperties();
function intialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty("key", activeSpreadsheet.getId());
}
function fetchLatestData(sheet) {
  SpreadsheetApp.flush();
  return sheet.getDataRange().getValues();
}
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const spreadsheetId = scriptProp.getProperty("key");
    if (!spreadsheetId) {
      throw new Error(
        "Spreadsheet ID not found. Ensure `intialSetup` has been run."
      );
    }
    const doc = SpreadsheetApp.openById(spreadsheetId);
    const sheetName = e.parameter.sheetName;
    const agentID = e.parameter.agentID;
    Logger.log("Received parameters:", JSON.stringify(e.parameter));
    if (!sheetName) throw new Error("Missing parameter: sheetName");
    if (!agentID) throw new Error("Missing parameter: agentID");
    const sheet = doc.getSheetByName(sheetName);
    if (!sheet) throw new Error("Sheet not found: " + sheetName);
    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];
    const data = fetchLatestData(sheet);
    const agentIDIndex = headers.indexOf("agentID");
    Logger.log("Headers: " + headers);
    Logger.log("Data: " + JSON.stringify(data));
    let rowIndex = data.findIndex(
      (row, index) => index > 0 && row[agentIDIndex] == agentID
    );
    const newRow = headers.map((header) =>
      header === "timestamp" ? new Date() : e.parameter[header] || ""
    );
    if (rowIndex === -1) {
      sheet.appendRow(newRow);
      SpreadsheetApp.flush();
      Logger.log("Added new row for agentID: " + agentID);
    } else {
      rowIndex += 1;
      const existingRowData = sheet
        .getRange(rowIndex, 1, 1, newRow.length)
        .getValues()[0];
      const updatedRow = existingRowData.map(
        (value, idx) => newRow[idx] || value
      );
      sheet.getRange(rowIndex, 1, 1, updatedRow.length).setValues([updatedRow]);
      SpreadsheetApp.flush();
      Logger.log("Updated existing row for agentID: " + agentID);
    }
    return ContentService.createTextOutput(
      JSON.stringify({
        result: "success",
        row: rowIndex === -1 ? "New Row" : rowIndex,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error in doPost:", error);
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
