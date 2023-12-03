// eslint-disable-next-line @typescript-eslint/no-unused-vars
function verifyRecaptcha(recaptcha: string): boolean {
  const URI = "https://www.google.com/recaptcha/api/siteverify";
  const SECRET_KEY = "";

  const responseObj = UrlFetchApp.fetch(URI, {
    method: "post",
    payload: {
      secret: SECRET_KEY,
      response: recaptcha,
    },
  });

  const responseData = JSON.parse(responseObj.getContentText());

  if (!responseData.success) {
    Logger.log(`Error: ${responseData["error-codes"].join(", ")}`);
  }

  return responseData.success;
}
