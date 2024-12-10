import { fibonacci } from "./utils";

describe("fibonacci", () => {
  test("should return an empty array for iterations <= 0", () => {
    expect(fibonacci(0)).toEqual([]);
    expect(fibonacci(-1)).toEqual([]);
  });

  test("should return [0] for iterations = 1", () => {
    expect(fibonacci(1)).toEqual([0]);
  });

  test("should return the correct sequence for iterations = 2", () => {
    expect(fibonacci(2)).toEqual([0, 1]);
  });

  test("should return the correct sequence for iterations = 5", () => {
    expect(fibonacci(5)).toEqual([0, 1, 1, 2, 3]);
  });

  test("should return the correct sequence for iterations = 10", () => {
    expect(fibonacci(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });
});
