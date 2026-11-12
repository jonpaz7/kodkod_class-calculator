// Add one object per operation. See README.md for the operation contract.

 export const operations = [
  {
    id: "factorial",
    label: "Factorial",
    symbol: "n!",
    arity: 1,
    contributor: "nch22522",
    execute: (n) => {
      if (!Number.isInteger(n) || n < 0) {
        throw new Error("Factorial requires a non-negative integer");
      }
      if (n > 170) {
        throw new Error("Number too large (Infinity)");
      }
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      return result;
    },
  },

];
