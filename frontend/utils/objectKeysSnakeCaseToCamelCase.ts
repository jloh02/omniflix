// Convert an object's keys from snake case to camel case
// Used in conversion of return values from supabase functions to frontend interfaces
function objectKeysSnakeCaseToCamelCase(
  obj: Record<string, any>,
): Record<string, any> {
  const newObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      );
      newObj[camelCaseKey] = obj[key];
    }
  }

  return newObj;
}

export { objectKeysSnakeCaseToCamelCase };
