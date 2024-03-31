type RecaptchaResult = {
  success: true | false;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes": string[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function verifyRecaptcha(secret: string, response: string): RecaptchaResult {
  const URL = "https://www.google.com/recaptcha/api/siteverify";
  const responseObj = UrlFetchApp.fetch(URL, {
    method: "post",
    payload: { secret, response },
  });

  return JSON.parse(responseObj.getContentText());
}
