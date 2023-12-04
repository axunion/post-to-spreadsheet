interface CheckResponse {
  values: string[];
  errors: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkParameter(
  parameter: Record<string, string>,
  acceptedRows: Row[],
): CheckResponse {
  const values: string[] = [];
  const errors: string[] = [];

  for (const accepted of acceptedRows) {
    const label = accepted.label;
    const pattern = accepted.pattern;
    const maxLength = accepted.maxLength;
    const required = accepted.required;
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
