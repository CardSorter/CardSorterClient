import L from '../localization/LocalizedText';

/**
 * Get the number of the onth and returns its name.
 * @param {Number} month the month number 1-12.
 * @return {String} the name of the month.
 */
export default function toString(month) {
  switch (month) {
    case 1: return L.text.january;
    case 2: return L.text.february;
    case 3: return L.text.march;
    case 4: return L.text.april;
    case 5: return L.text.may;
    case 6: return L.text.june;
    case 7: return L.text.july;
    case 8: return L.text.august;
    case 9: return L.text.september;
    case 10: return L.text.october;
    case 11: return L.text.november;
    default: return L.text.december;
  };
}
