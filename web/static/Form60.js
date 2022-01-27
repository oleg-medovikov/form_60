class Form60 {
  constructor(selector) {
    this.form = document.querySelector(selector);
    this.input = this.form.querySelector('.js-input-snils');
    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    Maska.create('.js-input-snils', { mask: '###-###-### ##' });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { value } = this.input;
    const trimmedValue = value.replace(/[- ]/g, '');
    const isValid = this.validateSNILS(trimmedValue);

    if (isValid) {
      // TODO Submit form
    }
  }

  setInputError(message = '') {
    this.error = message;

    if (message === '') {
      this.input.classList.remove('form__input--invalid');
    } else {
      this.input.classList.add('form__input--invalid');
    }
    this.input.nextElementSibling.textContent = message;
  }

  validateSNILS(snils = '') {
    const isFormatValid = snils.length === 11 && /^[0-9]{11}$/.test(snils);
    if (!isFormatValid) {
      this.setInputError('СНИЛС должен состоять из 11 цифр');
    } else {
      const digits = snils.split('').slice(0, 8);
      const sum = digits.reduce((prev, next, index) => prev + next * (9 - index), 0);
      let controlSum = 0;
      if (sum < 100) {
        controlSum = sum;
      } else if (sum >= 101) {
        controlSum = parseInt(sum % 101);
      }
      if (controlSum === parseInt(snils.slice(-2))) {
        this.setInputError('');
        return true;
      } else {
        this.setInputError('Неверное контрольное число');
        return false;
      }
    }
  }
}
