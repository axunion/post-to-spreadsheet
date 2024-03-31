type CheckResult = {
  values: string[];
  errors: string[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkParameter(
  parameter: Record<string, string | string[]>,
  acceptedRows: ConfigRow[],
): CheckResult {
  const values: string[] = [];
  const errors: string[] = [];

  for (const { name, maxlength, required } of acceptedRows) {
    const value = parameter[name];

    if (typeof value === "string") {
      if (required && value === "") {
        errors.push(`"${name}" is required.`);
      } else if (value.length > maxlength) {
        errors.push(`"${name}" is too long.`);
      } else {
        values.push(value);
      }
    } else if (Array.isArray(value)) {
      if (required && value.length === 0) {
        errors.push(`"${name}" is required.`);
      } else if (value.some((v) => typeof v !== "string")) {
        errors.push(`"${name}" contains non-string elements.`);
      } else {
        values.push(value.join(","));
      }
    }
  }

  return { values, errors };
}
