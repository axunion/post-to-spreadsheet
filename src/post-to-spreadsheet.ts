interface PostResponse {
  status: "done" | "error";
  error?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doPost(
  e: GoogleAppsScript.Events.DoPost,
): GoogleAppsScript.Content.TextOutput {
  const response: PostResponse = { status: "done" };

  try {
    const timestamp = Date.now();
    const parameter = e.parameter;
    const type = parameter.type;
    const recaptcha = parameter.recaptcha;
    const config = configs[type];

    Logger.log(`${timestamp} ${JSON.stringify(parameter)}`);

    if (!config) {
      throw new Error(`Invalid type "${type}"`);
    }

    if (timestamp > new Date(config.expiryDate).getTime()) {
      throw new Error(`This form has expired.`);
    }

    const { values, errors } = checkParameter(parameter, config.rows);

    if (errors.length > 0) {
      throw new Error(`Invalid Parameter "${errors.join('", "')}"`);
    }

    const prop = PropertiesService.getScriptProperties().getProperties();
    const verifyResult = verifyRecaptcha(prop.RECAPTCHA_SECRET, recaptcha);

    if (!verifyResult.success) {
      const errorCodes = verifyResult["error-codes"];
      throw new Error(`reCAPTCHA verification failed."\n"${errorCodes}`);
    }

    const id = prop[`SPREADSHEET_ID_${type}`];
    const name = config.sheetName;
    const sheet = SpreadsheetApp.openById(id).getSheetByName(name);

    if (!sheet) {
      throw new Error(`Sheet "${name}" not found.`);
    }

    sheet.appendRow([timestamp, ...values]);
  } catch (error) {
    Logger.log(`Error: ${error.message}`);
    response.status = "error";
    response.error = error.message;
  }

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
