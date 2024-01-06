interface Response {
  status: "done" | "error";
  error?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doPost(
  e: GoogleAppsScript.Events.DoPost,
): GoogleAppsScript.Content.TextOutput {
  const response: Response = { status: "done" };

  try {
    const timestamp = Date.now();
    const parameter = e.parameter;
    const config = configs[parameter.type];

    Logger.log(`${timestamp} ${JSON.stringify(parameter)}`);

    if (!parameter.recaptcha) {
      throw new Error(`reCAPTCHA is required.`);
    } else if (!config) {
      throw new Error(`Invalid type.`);
    } else if (timestamp > new Date(config.expiryDate).getTime()) {
      throw new Error(`This form has expired.`);
    }

    const { values, errors } = checkParameter(parameter, config.rows);

    if (errors.length > 0) {
      throw new Error(`Invalid Parameter "${errors.join('", "')}"`);
    }

    const props = PropertiesService.getScriptProperties().getProperties();
    const secret = props.RECAPTCHA_SECRET;
    const sheetId = props[`SPREADSHEET_ID_${parameter.type}`];

    if (!secret || !sheetId) {
      throw new Error(`Invalid script properties.`);
    }

    const verifyResult = verifyRecaptcha(secret, parameter.recaptcha);

    if (!verifyResult.success) {
      const errorCodes = verifyResult["error-codes"];
      throw new Error(`reCAPTCHA verification failed."\n"${errorCodes}`);
    }

    const spreadSheet = SpreadsheetApp.openById(sheetId);
    const sheet = spreadSheet.getSheetByName(config.sheetName);

    if (!sheet) {
      throw new Error(`Sheet not found.`);
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
