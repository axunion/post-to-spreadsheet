// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _doPost() {
  const testEventData = {
    postData: {
      contents: JSON.stringify({
        type: "000000",
        recaptcha: "000000",
        inquiry: "1",
        reply: "1",
        name: "test",
      }),
    },
  } as unknown as GoogleAppsScript.Events.DoPost;

  const result = doPost(testEventData);
  Logger.log(result.getContent());
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _checkParameter() {
  const parameter = {
    name: "",
    email: "test@test.com",
    tel: "12345678901234567890",
  };

  const configs = [
    { name: "name", maxlength: 16, required: true },
    { name: "email", maxlength: 16, required: false },
    { name: "tel", maxlength: 16, required: false },
  ];

  Logger.log(checkParameter(parameter, configs));
}
