class Form60 {
  constructor(selector) {
    this.form = document.querySelector(selector);
    this.inputSNILS = this.form.querySelector('.js-input-snils');
    this.inputID = this.form.querySelector('.js-input-id');
    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    Maska.create('.js-input-snils', { mask: '###-###-### ##' });
  }

  handleSubmit(e) {
    e.preventDefault();

    const snils = this.inputSNILS.value.replace(/[- ]/g, '');
    const isValid = this.validateSNILS(snils);
    const id = this.inputID.value;

    if (isValid) {
      const formData = new FormData();
      formData.append('snils', snils);
      formData.append('id', id);
      fetch('/', { method: 'POST', body: formData });
    }
  }

  setInputError(message = '') {
    this.error = message;

    if (message === '') {
      this.inputSNILS.classList.remove('form__input--invalid');
    } else {
      this.inputSNILS.classList.add('form__input--invalid');
    }
    this.inputSNILS.nextElementSibling.textContent = message;
  }

  validateSNILS(snils = '') {
    const isFormatValid = /^[0-9]{11}$/.test(snils);
    if (!isFormatValid) {
      this.setInputError('СНИЛС должен состоять из 11 цифр');
    } else if (/(\d)\1\1/.test(snils.slice(0, 9))) {
      this.setInputError('Цифра не может повторяться более двух раз подряд');
    } else {
      const digits = snils.split('').slice(0, 9);
      const sum = digits.reduce((prev, next, index) => prev + next * (9 - index), 0);
      let controlSum = 0;
      if (sum < 100) {
        controlSum = sum;
      } else if (sum > 101) {
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
