export const snilsSum = (input = ''): boolean => {
  const trimmed = input.replace(/[\s-]/g, '');
  const digits = trimmed
    .split('')
    .slice(0, 9)
    .map((x) => +x);
  const controlSum = +trimmed.slice(-2);
  const sum = digits.reduce((prev, curr, index) => prev + curr * (9 - index), 0);
  let computedSum = 0;
  if (sum < 100) computedSum = sum;
  else if (sum > 101) computedSum = sum % 101;

  return computedSum === controlSum;
};

export const snilsRepeat = (input = ''): boolean => {
  const trimmed = input.replace(/[\s-]/g, '');
  return !/(\d)\1\1/.test(trimmed.slice(0, 9));
};
