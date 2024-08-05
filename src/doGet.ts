type GetResponse = {
  result: "done" | "error" | "expired";
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _doGet() {
  const e = { parameter: { type: "0" } };
  const result = doGet(e as unknown as GoogleAppsScript.Events.DoGet);
  console.log(result);
}

function doGet(
  e: GoogleAppsScript.Events.DoGet,
): GoogleAppsScript.Content.TextOutput {
  const response: GetResponse = { result: "done" };

  try {
    const type = e.parameter.type;

    if (!type) {
      throw new Error(`Invalid parameter.`);
    }

    const properties = PropertiesService.getScriptProperties().getProperties();
    const configSheetId = properties.SPREADSHEET_ID_CONFIG;

    if (!configSheetId) {
      throw new Error(`Invalid script properties.`);
    }

    const config = getConfig(configSheetId, type);

    if (new Date() > config.dueDate) {
      response.result = "expired";
    }
  } catch {
    response.result = "error";
  }

  return ContentService.createTextOutput(JSON.stringify(response));
}
