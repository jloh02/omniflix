const MIN_KEY_LENGTH = 2;
const CHARSET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const genString = (char: string, length?: number) => {
  if (!length || length < MIN_KEY_LENGTH) {
    length = MIN_KEY_LENGTH;
  }

  let result = "";
  for (let i = 0; i < length; i++) {
    result += char;
  }
  return result;
};

const genFirstLexoRank = (length?: number) => {
  return genString(CHARSET[0], length);
};

const genLastLexoRank = (length?: number) => {
  return genString(CHARSET[CHARSET.length - 1], length);
};

const balanceStrings = (a: string, b: string) => {
  while (a.length < b.length) a += CHARSET[0];
  while (b.length < a.length) b += CHARSET[0];
  return [a, b];
};

const getLexorankDiff = (a: string, b: string) => {
  [a, b] = balanceStrings(a, b);

  let powerMult = 1;
  let totalDiff = 0;

  for (let i = a.length - 1; i >= 0; i--) {
    if (a[i] !== b[i]) {
      const aIdx = CHARSET.indexOf(a[i]);
      const bIdx = CHARSET.indexOf(b[i]);
      totalDiff += (bIdx - aIdx) * powerMult;
    }
    powerMult *= CHARSET.length;
  }
  return totalDiff;
};

const getLexorank = (a: string, b: string) => {
  [a, b] = balanceStrings(a, b);

  let totalDiff = getLexorankDiff(a, b);

  if (totalDiff < 0) {
    throw new Error(
      `Lexorank difference between ${a} and ${b} is negative: ${totalDiff}`,
    );
  }

  if (totalDiff <= 1) {
    return a + CHARSET[Math.floor(CHARSET.length / 2)];
  }

  totalDiff = Math.floor(totalDiff / 2);
  let result = "";
  let carry = totalDiff;
  for (let i = a.length - 1; i >= 0; i--) {
    const sum = CHARSET.indexOf(a[i]) + carry;
    carry = Math.floor(sum / CHARSET.length);
    result = CHARSET[sum % CHARSET.length] + result;
  }
  if (carry !== 0) {
    throw new Error("Lexorank reduction error: carry is not 0, found " + carry);
  }
  return result;
};

export { genFirstLexoRank, genLastLexoRank, getLexorank, getLexorankDiff };
