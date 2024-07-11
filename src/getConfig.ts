type Config = {
  dueDate: Date;
  sheetId: string;
  rows: ConfigRow[];
};

export type ConfigRow = {
  name: string;
  maxlength: number;
  required: boolean;
};

export function getConfig(sheetId: string, sheetName: string): Config {
  const ss = SpreadsheetApp.openById(sheetId);
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error(`Config not found.`);
  }

  const data = sheet.getDataRange().getValues();

  return {
    dueDate: data[0][0],
    sheetId: data[1][0],
    rows: data.slice(3).map((row) => ({
      name: row[0] as string,
      maxlength: parseInt(row[1]) || 0,
      required: Boolean(row[2]),
    })),
  };
}
