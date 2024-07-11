import { getConfig } from "./getConfig";
import { validateParameters } from "./validateParameters";
import { verifyRecaptcha } from "./verifyRecaptcha";

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

    const properties = PropertiesService.getScriptProperties().getProperties();
    const secret = properties.RECAPTCHA_SECRET;
    const configSheetId = properties[`SPREADSHEET_ID_CONFIG`];

    if (!secret || !configSheetId) {
      throw new Error(`Invalid script properties.`);
    }

    const config = getConfig(configSheetId, type);
    const date = new Date();

    if (date > new Date(config.dueDate)) {
      throw new Error(`This form has expired.`);
    }

    const checkResult = validateParameters(parameter, config.rows);

    if (checkResult.errors.length > 0) {
      const error = checkResult.errors.join(", ");
      throw new Error(`Invalid Parameter: ${error}`);
    }

    const recaptchaResult = verifyRecaptcha(secret, recaptcha);

    if (!recaptchaResult.isValid) {
      const error = recaptchaResult["error-codes"].join(" ");
      throw new Error(`reCAPTCHA verification failed. ${error}`);
    }

    const ss = SpreadsheetApp.openById(config.sheetId);
    const sheet = ss.getSheetByName("Data");

    if (!sheet) {
      throw new Error(`Sheet not found.`);
    }

    sheet.appendRow([date, ...checkResult.values]);
  } catch (error) {
    response.result = "error";
    response.error = error.message;
  }

  return ContentService.createTextOutput(JSON.stringify(response));
}
