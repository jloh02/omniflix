function deepCopyWithSnakeCase(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopyWithSnakeCase(item));
  }

  const snakeCaseObj: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeCaseKey = key.replace(
        /[A-Z]/g,
        (match) => `_${match.toLowerCase()}`
      );
      snakeCaseObj[snakeCaseKey] = deepCopyWithSnakeCase(obj[key]);
    }
  }

  return snakeCaseObj;
}

export { deepCopyWithSnakeCase };
