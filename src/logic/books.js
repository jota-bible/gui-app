/**
 * Books meta data, like names and chapter count.
 * TODO: This should be bound to bible translations. BCV parser does it.
 */

export const osis = ['Gen', 'Exod', 'Lev', 'Num', 'Deut', 'Josh', 'Judg', 'Ruth', '1Sam', '2Sam', '1Kgs', '2Kgs', '1Chr', '2Chr', 'Ezra', 'Neh', 'Esth', 'Job', 'Ps', 'Prov', 'Eccl', 'Song', 'Isa', 'Jer', 'Lam', 'Ezek', 'Dan', 'Hos', 'Joel', 'Amos', 'Obad', 'Jonah', 'Mic', 'Nah', 'Hab', 'Zeph', 'Hag', 'Zech', 'Mal', 'Matt', 'Mark', 'Luke', 'John', 'Acts', 'Rom', '1Cor', '2Cor', 'Gal', 'Eph', 'Phil', 'Col', '1Thess', '2Thess', '1Tim', '2Tim', 'Titus', 'Phlm', 'Heb', 'Jas', '1Pet', '2Pet', '1John', '2John', '3John', 'Jude', 'Rev', 'Jdt', 'Tob', '1Macc', '2Macc', 'Wis', 'Sir', 'Bar']

const fullEnglish = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation']

const fullPolish = ['Rodzaju', 'Wyjścia', 'Kapłańska', 'Liczb', 'Powtórzonego Prawa', 'Jozuego', 'Sędziów', 'Rut', '1 Samuela', '2 Samuela', '1 Królewska', '2 Królewska', '1 Kronik', '2 Kronik', 'Ezdrasza', 'Nehemiasza', 'Estery', 'Hioba', 'Psalmy', 'Przypowieści', 'Pieśń nad Pieśniami', 'Kaznodziei', 'Izajasza', 'Jeremiasza', 'Lamentacje', 'Ezechiela', 'Daniela', 'Ozeasza', 'Joela', 'Amosa', 'Abdiasza', 'Jonasza', 'Micheasza', 'Nahuma', 'Habakuka', 'Sofoniasza', 'Aggeusza', 'Zachariasza', 'Malachiasza', 'Mateusza', 'Marka', 'Łukasza', 'Jana', 'Dzieje Apostolskie', 'List do Rzymian', '1 List do Koryntian', '2 List do Koryntian', 'List do Galatów', 'List do Efezjan', 'List do Filipian', 'List do Kolosan', '1 List do Tesaloniczan', '2 List do Tesaloniczan', '1 List do Tymoteusza', '2 List do Tymoteusza', 'List do Tytusa', 'List do Filemona', 'List do Hebrajczyków', 'List Jakuba', '1 List Piotra', '2 List Piotra', '1 List Jana', '2 List Jana', '3 List Jana', 'List Judy', 'Objawienie Jana']

const bookAbbreviations = ['1 Moj', '2 Moj', '3 Moj', '4 Moj', '5 Moj', 'Joz', 'Sdz', 'Rut', '1 Sam', '2 Sam', '1 Krl', '2 Krl', '1 Krn', '2 Krn', 'Ezd', 'Ne', 'Est', 'Job', 'Ps', 'Prz', 'Kz', 'Pnp', 'Iz', 'Jr', 'Tr', 'Ez', 'Dn', 'Oz', 'Jl', 'Am', 'Ab', 'Jon', 'Mi', 'Na', 'Ha', 'So', 'Ag', 'Za', 'Ml', 'Mt', 'Mr', 'Łk', 'J', 'Dz', 'Rz', '1 Kor', '2 Kor', 'Ga', 'Ef', 'Flp', 'Kol', '1 Tes', '2 Tes', '1 Tm', '2 Tm', 'Tt', 'Flm', 'Hbr', 'Jk', '1 P', '2 P', '1 J', '2 J', '3 J', 'Jud', 'Obj', 'Jdt', 'Tob', '1Ma', '2Ma', 'Mdr', 'Syr', 'Bar']

const chapterCount = [50, 40, 27, 36, 34, 24, 21, 4, 31, 24, 22, 25, 29, 36, 10, 13, 10, 42, 150, 31, 12, 8, 66, 52, 5, 48, 12, 14, 3, 9, 1, 4, 7, 3, 3, 3, 2, 14, 3, 28, 16, 24, 21, 28, 16, 16, 13, 6, 6, 4, 4, 5, 3, 6, 4, 3, 1, 13, 5, 5, 3, 5, 1, 1, 1, 22]

const books = window.books = {
  bookAbbreviations,
  chapterCount,
  fullEnglish,
  fullPolish,
  osis,
}
export default books
