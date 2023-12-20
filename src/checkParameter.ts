interface CheckResult {
  values: string[];
  errors: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkParameter(
  parameter: Record<string, string>,
  acceptedRows: Row[],
): CheckResult {
  const values: string[] = [];
  const errors: string[] = [];

  for (const row of acceptedRows) {
    const label = row.label;
    const pattern = row.pattern;
    const maxLength = row.maxLength;
    const required = row.required;
    const value = parameter[label];

    if (required && (value === undefined || value === "")) {
      errors.push(`"${label}" is required.`);
    } else if (value !== undefined) {
      if (maxLength && value.length > maxLength) {
        errors.push(`"${label}" is too long.`);
      } else if (!pattern.test(value)) {
        errors.push(`"${label}" is invalid.`);
      }
    }

    values.push(value || "");
  }

  return { values, errors };
}
