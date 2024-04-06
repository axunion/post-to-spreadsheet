type RecaptchaResult = {
  success: true | false;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes": string[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function verifyRecaptcha(secret: string, recaptcha: string): RecaptchaResult {
  const url = "https://www.google.com/recaptcha/api/siteverify";
  const response = UrlFetchApp.fetch(url, {
    method: "post",
    payload: { secret, recaptcha },
  });

  return JSON.parse(response.getContentText());
}
