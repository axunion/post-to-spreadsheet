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
    const name = row.name;
    const maxlength = row.maxlength;
    const required = row.required;
    const value = parameter[name];

    if (required && (value === undefined || value === "")) {
      errors.push(`"${name}" is required.`);
    } else if (value !== undefined) {
      if (maxlength && value.length > maxlength) {
        errors.push(`"${name}" is too long.`);
      }
    }

    values.push(value || "");
  }

  return { values, errors };
}
