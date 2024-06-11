type VerifyRecaptchaResult = {
  isValid: boolean;
  errors: string[];
};

type RecaptchaResponse = {
  success: true | false;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes": string[];
};

export function verifyRecaptcha(
  secret: string,
  recaptcha: string,
): VerifyRecaptchaResult {
  const url = "https://www.google.com/recaptcha/api/siteverify";
  const response = UrlFetchApp.fetch(url, {
    method: "post",
    payload: { secret, recaptcha },
  });
  const result: RecaptchaResponse = JSON.parse(response.getContentText());

  return {
    isValid: result.success && result.score > 0.5,
    errors: result["error-codes"],
  };
}
