// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _doPost() {
  const testEventData = {
    parameter: {
      type: "000000",
      name: "test",
      email: "test@test.com",
    },
  } as unknown as GoogleAppsScript.Events.DoPost;

  const result = doPost(testEventData);
  Logger.log(result.getContent());
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _checkParameter() {
  const parameter = {
    name: "test",
    email: "test@test.com",
  };

  Logger.log(checkParameter(parameter, configs["202402"].rows));
}
