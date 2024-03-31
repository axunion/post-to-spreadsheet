type Response = {
  result: "done" | "error";
  error?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doPost(
  e: GoogleAppsScript.Events.DoPost,
): GoogleAppsScript.Content.TextOutput {
  const response: Response = { result: "done" };

  try {
    const parameter = JSON.parse(e.postData.contents);
    const type = parameter.type;
    const recaptcha = parameter.recaptcha;

    if (!type || !recaptcha) {
      throw new Error(`Invalid parameter.`);
    }

    const props = PropertiesService.getScriptProperties().getProperties();
    const secret = props.RECAPTCHA_SECRET;
    const configSheetId = props[`SPREADSHEET_ID_CONFIG`];
    const sheetId = props[`SPREADSHEET_ID_${type}`];

    if (!secret || !configSheetId || !sheetId) {
      throw new Error(`Invalid script properties.`);
    }

    const config = getConfig(configSheetId, type);
    const date = new Date();

    if (date > new Date(config.dueDate)) {
      throw new Error(`This form has expired.`);
    }

    const { values, errors } = checkParameter(parameter, config.rows);

    if (errors.length > 0) {
      throw new Error(`Invalid Parameter: "${errors.join('", "')}"`);
    }

    const recaptchaResult = verifyRecaptcha(secret, recaptcha);

    if (!recaptchaResult.success) {
      const errorCodes = recaptchaResult["error-codes"];
      throw new Error(`reCAPTCHA verification failed."\n"${errorCodes}`);
    }

    const ss = SpreadsheetApp.openById(sheetId);
    const sheet = ss.getSheetByName("Data");

    if (!sheet) {
      throw new Error(`Sheet not found.`);
    }

    sheet.appendRow([date, ...values]);
  } catch (error) {
    Logger.log(`Error: ${error.message}`);
    response.result = "error";
    response.error = error.message;
  }

  return ContentService.createTextOutput(JSON.stringify(response));
}
