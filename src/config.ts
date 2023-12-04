interface Row {
  label: string;
  pattern: RegExp;
  maxLength?: number;
  required?: boolean;
}

interface Item {
  sheetName: string;
  expiryDate: string;
  rows: Row[];
}

interface Config {
  [key: string]: Item;
}

const anyPattern = /(?:^\S+$)|(?:^\S.*\S$)/;
const telPattern = /^[0-9]{3,4}$/;
const emailPattern =
  /^[a-zA-Z0-9.!#$%&\\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const config: Config = {
  "202505": {
    sheetName: "Data",
    expiryDate: "2025/03/31",
    rows: [
      { label: "name", pattern: anyPattern, maxLength: 128, required: true },
      { label: "kind", pattern: /a|b|c/ },
    ],
  },

  "202402": {
    sheetName: "Data",
    expiryDate: "2024/01/31",
    rows: [
      { label: "name", pattern: anyPattern, maxLength: 128, required: true },
      { label: "kind", pattern: /a|b|c/ },
    ],
  },

  "000000": {
    sheetName: "Data",
    expiryDate: "2038/01/19 03:14:17",
    rows: [
      { label: "kind", pattern: /a|b|c/ },
      { label: "name", pattern: anyPattern, maxLength: 128, required: true },
      { label: "email", pattern: emailPattern, required: true },
      { label: "tel1", pattern: telPattern },
      { label: "tel2", pattern: telPattern },
      { label: "tel3", pattern: telPattern },
    ],
  },
};
