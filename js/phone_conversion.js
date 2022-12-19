var phoneConversion = {
  init: function() {
    $('#phone-conversion').submit( (e) => { this.convert(e); });
  },

  /* ***
   * Main conversion function
   */
  convert: function(e) {
    e.preventDefault();

    // Reset object variables.
    this.country = 'error';
    this.hasUsCode = null;

    // Convert inputted phone number to just digits.
    this.getDigits();
    this.checkValidity();

    // We have a real phone number! Display the formatted version.
    switch (this.country) {
      case 'us':
        this.displayFormattedUs();
        break;
      case 'qatar':
        this.displayFormattedQatar();
        break;
      default:
        this.displayError();
    }
  },

  /* ***
   * Parse the inputted phone number and save just the digits.
   */
  getDigits: function() {
    let rawPhone = $('#phone').val();
    this.phone = rawPhone.match(/\d/g).join('');
  },

  /* ***
   * Determine if the phone number is a real phone number. If not, display errors.
   */
  checkValidity: function() {
    // US phone without country code.
    if (this.phone.length === 10) {
      this.country = 'us';
      return true;
    }

    // US phone with country code.
    if (this.phone.length === 11 && this.phone.substr(0,1) == '1') {
      this.country = 'us';
      this.hasUsCode = true;
      this.phone = this.phone.substr(1, 10);
      return true;
    }

    // Qatar phone
    if (this.phone.length === 11 && this.phone.substr(0, 3) == '974') {
      this.country = 'qatar';
      return true;
    }

    // Otherwise, this is not a valid phone number.
    return false;
  },

  /* ***
   * Assemble the formatted phone number for US phone numbers.
   */
  displayFormattedUs: function() {
    let href = '1-' + this.phone.substr(0, 3) + '-' + this.phone.substr(3, 3) + '-' + this.phone.substr(6, 4);

    let display = '';
    if (this.hasUsCode) { display += '+1 '; }
    display += '(' + this.phone.substr(0, 3) + ') ' + this.phone.substr(3, 3) + '-' + this.phone.substr(6, 4);

    let label = '';
    if (this.hasUsCode) { label += '1. '; }
    label += this.phone.substr(0, 3).match(/\d/g).join(' ') + '. ';  // Area code
    label += this.phone.substr(3, 3).match(/\d/g).join(' ') + '. ';  // Exchange
    label += this.phone.substr(6, 4).match(/\d/g).join(' ');  // Rest of the number

    this.display('<a href="tel:' + href + '" aria-label="' + label + '">' + display + '</a>');
  },

  /* ***
   * Assemble the formatted phone number for Qatar phone numbers.
   */
  displayFormattedQatar: function() {
    let href = '+' + this.phone;

    let display = '+' + this.phone.substr(0, 3) + ' ' + this.phone.substr(3, 3) + ' ' + this.phone.substr(6, 5);

    let label = '';
    label += this.phone.substr(0, 3).match(/\d/g).join(' ') + '. ';  // Area code
    label += this.phone.substr(3, 3).match(/\d/g).join(' ') + '. ';  // Exchange
    label += this.phone.substr(6, 5).match(/\d/g).join(' ');  // Rest of the number

    this.display('<a href="tel:' + href + '" aria-label="' + label + '">' + display + '</a>');
  },

  /* ***
   * Display error version of phone number.
   */
  displayError: function() {
    this.display('Not a valid phone number. :-(', false);
  },

  /* ***
   * Utility function to display things in the results section.
   */
  display: function(html, select=true) {
    // Update tab display.
    $('.tabs li').removeClass('active');
    $('#' + this.country).addClass('active');

    // Display the formatted phone number.
    $('#phone-result').val(html);

    if (select) {
      $('#phone-result').select();
    }
  }
};

phoneConversion.init();
