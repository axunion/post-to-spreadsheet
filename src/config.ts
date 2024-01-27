interface Row {
  name: string;
  maxlength: number;
  required?: boolean;
}

interface Config {
  sheetName: string;
  dueDate: string;
  rows: Row[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const configs: Record<string, Config> = {
  "202402": {
    sheetName: "Data",
    dueDate: "2024-02-18",
    rows: [
      { name: "church", maxlength: 128, required: true },
      { name: "name", maxlength: 64, required: true },
      { name: "kana", maxlength: 64, required: true },
      { name: "generation", maxlength: 8, required: true },
      { name: "gender", maxlength: 8, required: true },
      { name: "status", maxlength: 8, required: true },
      { name: "party", maxlength: 8 },
    ],
  },

  "000000": {
    sheetName: "Data",
    dueDate: "2038/01/19 03:14:17",
    rows: [
      { name: "kind", maxlength: 8 },
      { name: "name", maxlength: 128, required: true },
      { name: "email", maxlength: 128, required: true },
      { name: "tel1", maxlength: 4 },
      { name: "tel2", maxlength: 4 },
      { name: "tel3", maxlength: 4 },
    ],
  },
};
