// Convert the first letter of all keys to lower case
const objectKeysToLowerCase = (obj: object) => {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      `${k.charAt(0).toLowerCase()}${k.substring(1)}`,
      v,
    ]),
  );
};

export { objectKeysToLowerCase };
