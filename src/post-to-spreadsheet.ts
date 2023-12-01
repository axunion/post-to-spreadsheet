// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doPost(
  e: GoogleAppsScript.Events.DoPost,
): GoogleAppsScript.Content.TextOutput {
  try {
    const formData = e.parameter;
    const name = formData.name;
    const email = formData.email;

    if (!name || !email) {
      throw new Error("Name and email are required.");
    }

    const ID = config.SPREADSHEET_ID;
    const NAME = config.SHEET_NAME;
    const sheet = SpreadsheetApp.openById(ID).getSheetByName(NAME);

    if (!sheet) {
      throw new Error(`Sheet "${NAME}" not found.`);
    }

    const timestamp = new Date();

    sheet.appendRow([timestamp, name, email]);

    return ContentService.createTextOutput("Done");
  } catch (error) {
    Logger.log(`Error: ${error.message}`);
    return ContentService.createTextOutput(`Error: ${error.message}`);
  }
}
