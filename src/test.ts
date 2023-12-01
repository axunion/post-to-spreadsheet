// eslint-disable-next-line @typescript-eslint/no-unused-vars
function test() {
  const testEventData = {
    parameter: {
      name: "test",
      email: "test@test.com",
    },
  } as unknown as GoogleAppsScript.Events.DoPost;

  const result = doPost(testEventData);
  Logger.log(result.getContent());
}
