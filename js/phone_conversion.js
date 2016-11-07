var phoneConversion = {
  init: function() {
    $('#phone-conversion').submit( (e) => { this.convert(e); });
  },

  /* ***
   * Main conversion function
   */
  convert: function(e) {
    e.preventDefault();

    // Convert inputted phone number to just digits.
    this.getDigits();

    // If the inputted number is not a phone number, do nothing else.
    if (!this.isReal()) { return false; }

    // We have a real phone number! Display the formatted version.
    this.displayFormatted();
  },

  /* ***
   * Parse the inputted phone number and save just the digits.
   */
  getDigits: function() {
    let rawPhone = $('#phone').val();
    this.phone = rawPhone.match(/\d/g).join('');

    this.countryCode = this.hasCountryCode();
  },

  /* ***
   * Determine if phone number includes a US country code.
   */
  hasCountryCode: function() {
    if (this.phone.length === 11 && this.phone.substr(0, 1) == '1') {
      // Truncate the country code.
      this.phone = this.phone.substr(1, 10);

      // Save country code.
      return '1';
    }

    return false;
  },

  /* ***
   * Determine if the phone number is a real phone number. If not, display errors.
   */
  isReal: function() {
    // US phone numbers are 10 digits long.
    if (this.phone.length === 10) { return true; }

    // Otherwise, this is not a valid phone number.
    this.display('<pre>' + this.phone + '</pre>');
    return false;

  },

  /* ***
   * Assemble the formatted phone number
   */
  displayFormatted: function() {
    let href = this.getHref();
    let display = this.getDisplay();
    let label = this.getLabel();
    this.display('<pre>&lt;a href="tel:' + href + '" aria-label="' + label + '"&gt;' + display + '&lt;/a&gt;</pre>');
  },

  /* ***
   * Assemble the phone number used in the tel: href
   */
  getHref: function() {
    return '1-' + this.phone.substr(0, 3) + '-' + this.phone.substr(3, 3) + '-' + this.phone.substr(6, 4);
  },

  /* ***
   * Assemble the phone number that is displayed to the user
   */
  getDisplay: function() {
    let display = '';

    if (this.countryCode) {
      display += '1 ';
    }

    display += '(' + this.phone.substr(0, 3) + ') ' + this.phone.substr(3, 3) + '-' + this.phone.substr(6, 4);
    return display;
  },

  /* ***
   * Assemble the phone number used for the ARIA label
   */
  getLabel: function() {
    let label = '';

    if (this.countryCode) {
      label += '1. ';
    }

    label += this.phone.substr(0, 3).match(/\d/g).join(' ') + '. ';  // Area code
    label += this.phone.substr(3, 3).match(/\d/g).join(' ') + '. ';  // Exchange
    label += this.phone.substr(6, 4).match(/\d/g).join(' ');  // Rest of the number

    return label;
  },

  /* ***
   * Utility function to display things in the results section.
   */
  display: function(html) {
    $('#phone-result').html(html);
  }
};

phoneConversion.init();
