/**
 * Get the number of the month and returns its name.
 * @param month the month number 0-11.
 * @param translations The use translations object (to extract the texts)
 * @return the name of the month.
 */
export default function toString(month: number | undefined, translations: any) {
  if (!month) {
    return "";
  }

  switch (month) {
    case 0: return translations("january");
    case 1: return translations("february");
    case 2: return translations("march");
    case 3: return translations("april");
    case 4: return translations("may");
    case 5: return translations("june");
    case 6: return translations("july");
    case 7: return translations("august");
    case 8: return translations("september");
    case 9: return translations("october");
    case 10: return translations("november");
    default: return translations("december");
  }
}
