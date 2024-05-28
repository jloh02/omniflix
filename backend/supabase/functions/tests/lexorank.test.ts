import "https://deno.land/std@0.224.0/dotenv/load.ts";
import {
  assertAlmostEquals,
  assertEquals,
} from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { getLexorankDiff } from "../_shared/lexorank.ts";
import { getLexorank } from "../_shared/lexorank.ts";
import { genFirstLexoRank } from "../_shared/lexorank.ts";
import { genLastLexoRank } from "../_shared/lexorank.ts";

const NUM_MID_TEST = 100;
const MAX_LEN_STR = 5;

const testGetLexorankDiff = () => {
  // Single digit updates
  assertEquals(0, getLexorankDiff("aa", "aa"));
  assertEquals(1, getLexorankDiff("aa", "ab"));
  assertEquals(2, getLexorankDiff("aa", "ac"));

  // Test charset range
  assertEquals(61, getLexorankDiff("0", "z"));

  // Test second digit
  assertEquals(62, getLexorankDiff("A0", "B0"));
  assertEquals(62 * 2, getLexorankDiff("A0", "C0"));
  assertEquals(62 * 3, getLexorankDiff("A0", "D0"));
  assertEquals(62 * 4, getLexorankDiff("A0", "E0"));

  // Test third digit with other letters
  assertEquals(62 * 62 * 1, getLexorankDiff("A0aa", "A1aa"));
  assertEquals(62 * 62 * 2, getLexorankDiff("A0aa", "A2aa"));
  assertEquals(62 * 62 * 3, getLexorankDiff("A0aa", "A3aa"));
};

const CHARSET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function genStr() {
  let result = "";
  const length = Math.floor(Math.random() * MAX_LEN_STR + 1);
  for (let i = 0; i < length; i++) {
    result += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
  }
  return result;
}

function getLexoOrderedStringPair() {
  const a = genStr();
  const b = genStr();
  const diff = getLexorankDiff(a, b);
  return diff > 0 ? [a, b] : [b, a];
}

const testLexorankMiddleRandom = () => {
  for (let i = 0; i < NUM_MID_TEST; i++) {
    const [a, b] = getLexoOrderedStringPair();
    const middle = getLexorank(a, b);
    const diffA = getLexorankDiff(a, middle);
    const diffB = getLexorankDiff(middle, b);
    assertAlmostEquals(diffA, diffB, 1);
  }
};

const testLexorankMissingBeforeAfter = () => {
  //Test missing before
  for (let i = 0; i < NUM_MID_TEST; i++) {
    const b = genStr();
    const a = genFirstLexoRank(b.length);
    const middle = getLexorank(a, b);
    const diffA = getLexorankDiff(a, middle);
    const diffB = getLexorankDiff(middle, b);
    assertAlmostEquals(diffA, diffB, 1);
  }

  //Test missing after
  for (let i = 0; i < NUM_MID_TEST; i++) {
    const a = genStr();
    const b = genLastLexoRank(a.length);
    const middle = getLexorank(a, b);
    const diffA = getLexorankDiff(a, middle);
    const diffB = getLexorankDiff(middle, b);
    assertAlmostEquals(diffA, diffB, 1);
  }

  //Test missing both
  for (let i = 0; i < MAX_LEN_STR; i++) {
    const a = genFirstLexoRank(i);
    const b = genLastLexoRank(i);
    const middle = getLexorank(a, b);
    const diffA = getLexorankDiff(a, middle);
    const diffB = getLexorankDiff(middle, b);
    assertAlmostEquals(diffA, diffB, 1);
  }
};

Deno.test("getLexorankDiff", testGetLexorankDiff);
Deno.test("getLexorank", testLexorankMiddleRandom);
Deno.test(
  "getLexorank with missing parameters",
  testLexorankMissingBeforeAfter,
);
