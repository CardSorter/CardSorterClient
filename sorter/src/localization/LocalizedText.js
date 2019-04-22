import enUS from './en-us';

/**
 * Holds the proper localized text for usage in the UI.
 */
class LocalizedText {
  /**
   *
   * @param {String} locale supported locales:
   * - 'en-us' : English - United States
   */
  initialize(locale) {
    switch (locale) {
      default: {
        this.text = enUS;
      }
    }
  }
};

export default new LocalizedText();
