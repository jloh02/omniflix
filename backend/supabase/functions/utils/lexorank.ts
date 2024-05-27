const MIN_KEY_LENGTH = 2;
const WORDLIST =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const genString = (length: number, char: string) => {
  if (!length || length < MIN_KEY_LENGTH) {
    length = MIN_KEY_LENGTH;
  }

  let result = "";
  for (let i = 0; i < length; i++) {
    result += char;
  }
  return result;
};

const genFirstLexoRank = (length: number) => {
  return genString(length, WORDLIST[0]);
};

const genLastLexoRank = (length: number) => {
  return genString(length, WORDLIST[WORDLIST.length - 1]);
};

const getLexorankDiff = (a: string, b: string) => {
  while (a.length < b.length) a += WORDLIST[0];
  while (b.length < a.length) b += WORDLIST[0];

  let powerMult = 1;
  let totalDiff = 0;
  const diffArr = [];

  for (let i = a.length - 1; i >= 0; i--) {
    if (a[i] !== b[i]) {
      const aIdx = WORDLIST.indexOf(a[i]);
      const bIdx = WORDLIST.indexOf(b[i]);
      totalDiff += (bIdx - aIdx) * powerMult;
      diffArr.push(bIdx - aIdx);
    }
    powerMult *= WORDLIST.length;
  }
  return totalDiff;
};

const getLexorank = (a: string, b: string) => {
  let totalDiff = getLexorankDiff(a, b);
  if (totalDiff <= 1) {
    return a + WORDLIST[Math.floor(WORDLIST.length / 2)];
  }

  totalDiff = Math.floor(totalDiff / 2);
  let result = "";
  let carry = totalDiff;
  while (carry > 0) {
    for (let i = a.length - 1; i >= 0; i--) {
      const sum = WORDLIST.indexOf(a[i]) + carry;
      carry = Math.floor(sum / WORDLIST.length);
      result = WORDLIST[sum % WORDLIST.length] + result;
    }
  }
  return result;
};

export { genFirstLexoRank, genLastLexoRank, getLexorank, getLexorankDiff };
