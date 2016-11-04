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
  },

  /* ***
   * Determine if the phone number is a real phone number. If not, display errors.
   */
  isReal: function() {
    if (this.phone.length != 10) {
      this.display('<pre>' + this.phone + '</pre>');
      return false;
    }

    return true;
  },

  /* ***
   * Assemble the formatted phone number
   */
  displayFormatted: function() {
    let display = this.getDisplay();
    let label = this.getLabel();
    this.display('<pre>&lt;a href="tel:' + this.phone + '" aria-label="' + label + '"&gt;' + display + '&lt;/a&gt;</pre>');
  },

  /* ***
   * Assemble the phone number that is displayed to the user
   */
  getDisplay: function() {
    return '(' + this.phone.substr(0, 3) + ') ' + this.phone.substr(3, 3) + '-' + this.phone.substr(6, 4);
  },

  /* ***
   * Assemble the phone number used for the ARIA label
   */
  getLabel: function() {
    let areaCode = this.phone.substr(0, 3).match(/\d/g).join(' ');
    let exchange = this.phone.substr(3, 3).match(/\d/g).join(' ');
    let number   = this.phone.substr(6, 4).match(/\d/g).join(' ');

    return areaCode + '. ' + exchange + '. ' + number;
  },

  /* ***
   * Utility function to display things in the results section.
   */
  display: function(html) {
    $('#phone-result').html(html);
  }
};

phoneConversion.init();
