interface Row {
  label: string;
  pattern: RegExp;
  maxLength?: number;
  required?: boolean;
}

interface Config {
  sheetName: string;
  expiryDate: string;
  rows: Row[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const configs: Record<string, Config> = {
  "202505": {
    sheetName: "Data",
    expiryDate: "2025/03/31",
    rows: [
      {
        label: "name",
        pattern: INPUT_PATTERNS.ANY,
        maxLength: 128,
        required: true,
      },
      { label: "kind", pattern: /a|b|c/ },
    ],
  },

  "202402": {
    sheetName: "Data",
    expiryDate: "2024/01/31",
    rows: [
      {
        label: "name",
        pattern: INPUT_PATTERNS.ANY,
        maxLength: 128,
        required: true,
      },
      { label: "kind", pattern: /a|b|c/ },
    ],
  },

  "000000": {
    sheetName: "Data",
    expiryDate: "2038/01/19 03:14:17",
    rows: [
      { label: "kind", pattern: /a|b|c/ },
      {
        label: "name",
        pattern: INPUT_PATTERNS.ANY,
        maxLength: 128,
        required: true,
      },
      { label: "email", pattern: INPUT_PATTERNS.EMAIL, required: true },
      { label: "tel1", pattern: INPUT_PATTERNS.NUMERIC },
      { label: "tel2", pattern: INPUT_PATTERNS.NUMERIC },
      { label: "tel3", pattern: INPUT_PATTERNS.NUMERIC },
    ],
  },
};
