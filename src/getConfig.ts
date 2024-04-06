type Config = {
  dueDate: Date;
  rows: ConfigRow[];
};

type ConfigRow = {
  name: string;
  maxlength: number;
  required: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getConfig(sheetId: string, sheetName: string): Config {
  const ss = SpreadsheetApp.openById(sheetId);
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error(`Config not found.`);
  }

  const data = sheet.getDataRange().getValues();

  return {
    dueDate: data[0][0],
    rows: data.slice(2).map((row) => ({
      name: row[0].toString(),
      maxlength: typeof row[1] === "number" ? row[1] : 0,
      required: Boolean(row[2]),
    })),
  };
}
