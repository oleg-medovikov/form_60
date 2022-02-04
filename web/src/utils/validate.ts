export const validateSNILS = (snils = '') => {
  let error = '';
  const trimmed = snils.replace(/[\s-]/g, '');
  const isFormatValid = /^[0-9]{11}$/.test(trimmed);
  if (!isFormatValid) {
    error = 'СНИЛС должен состоять из 11 цифр';
  } else if (/(\d)\1\1/.test(trimmed.slice(0, 9))) {
    error = 'Цифра не может повторяться более двух раз подряд';
  } else {
    const digits = trimmed.split('').slice(0, 9);
    const sum = digits.reduce((prev, curr, index) => prev + +curr * (9 - index), 0);
    let controlSum = 0;
    if (sum < 100) {
      controlSum = sum;
    } else if (sum > 101) {
      controlSum = sum % 101;
    }
    if (controlSum === parseInt(trimmed.slice(-2), 10)) {
      error = '';
    } else {
      error = 'Неверное контрольное число';
    }
  }

  return {
    isValid: error === '',
    error,
  };
};
