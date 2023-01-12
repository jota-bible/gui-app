import parse from 'src/logic/parser/parser'

// const options = {
//   apocrypha: false,
//   translation: 'bw'
// }
function find(text) {
  return parse(text, ['pl'])
}

// TODO:
// Make sure the entire text is matched, <-- nice but what for? For example to normalize all the references in the text
// Make sure some of the text are not matched -<< not sure which
describe('Parser', () => {
  it('Chapter and verses', () => {
    expect(find('1M 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1J 2:3')).toStrictEqual([[61, 2, 3]])
    expect(find('1 M 2:3a')).toStrictEqual([[0, 2, 3]])
    expect(find('1 M 2:3-5')).toStrictEqual([[0, 2, 3, 5]])
    expect(find('1 M 2:3,5')).toStrictEqual([[0, 2, 3], [0, 2, 5]])
    expect(find('1 M 2,3-5')).toStrictEqual([[0, 2, 3, 5]])
    expect(find('1 M 2,3;5')).toStrictEqual([[0, 2, 3], [0, 2, 5]])
    expect(find('1 M 2,3.5')).toStrictEqual([[0, 2, 3], [0, 2, 5]])
    expect(find('aa 1 M 2,3 2 M 4:5 bb ')).toStrictEqual([[0, 2, 3], [1, 4, 5]])
    expect(find('1 M 2:3-5, 7-8')).toStrictEqual([[0, 2, 3, 5], [0, 2, 7, 8]])
    expect(find('Rodz. 1;2-3')).toStrictEqual([[0, 1, 2, 3]])

    expect(find('Jan 1:2, 1 Jan 1:2')).toStrictEqual([[42, 1, 2], [61, 1, 2]])
    expect(find('1 Jan 1:2, Jan 1:2')).toStrictEqual([[61, 1, 2], [42, 1, 2]])

    // Using first delimiter multiple times does nothing
    expect(find('1 M 2,3,4')).toStrictEqual([[0, 2, 3]])
    expect(find('1 M 2:3:4')).toStrictEqual([[0, 2, 3]])
  })

  it('Book', () => {
    expect(find('Ks Jozuego 2:3')).toStrictEqual([[5, 2, 3]])
    expect(find('Ks. Jozuego 2:3')).toStrictEqual([[5, 2, 3]])
    expect(find('Księga Jozuego 2:3')).toStrictEqual([[5, 2, 3]])
    expect(find('Ksiega Jozuego 2:3')).toStrictEqual([[5, 2, 3]])
    expect(find('Księgi Jozuego 2:3')).toStrictEqual([[5, 2, 3]])
    expect(find('Ksiegi Jozuego 2:3')).toStrictEqual([[5, 2, 3]])
    expect(find('Księdze Jozuego 2:3')).toStrictEqual([[5, 2, 3]])
    expect(find('Ksiedze Jozuego 2:3')).toStrictEqual([[5, 2, 3]])
  })

  it('Case insensitive', () => {
    expect(find('joz 2:3')).toStrictEqual([[5, 2, 3]])
  })

  it('Book with number', () => {
    expect(find('1 Ks Mojżeszowa 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Ks. Mojżeszowa 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Ksiega Mojżeszowa 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Księga Mojżeszowa 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Księgi Mojżeszowej 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Ksiegi Mojżeszowej 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Księdze Mojżeszowa 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Ksiedze Mojżeszowa 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('I Księga Mojżeszowa 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('Pierwsza Księga Mojżeszowa 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('Pierwszą Księgę Mojżeszową 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('W Pierwszej Księdze Mojżeszowej 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('W Pierwszej Ksiedze Mojżeszowej 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('II Księga Mojżeszowa 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Druga Księga Mojżeszowa 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Drugą Księgę Mojżeszową 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('W Drugiej Księdze Mojżeszowej 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('W Drugiej Ksiedze Mojżeszowej 2:3')).toStrictEqual([[1, 2, 3]])
  })

  it('Mojżeszowe', () => {
    expect(find('1 M 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Mo 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Moj 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Mojz 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Mojż 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Mojżesz 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Mojzesz 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Mojżesza 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Mojzesza 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Mojżeszowa 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Mojzeszowa 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Mojżeszową 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Mojzeszową 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Mojżeszowej 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1 Mojzeszowej 2:3')).toStrictEqual([[0, 2, 3]])

    expect(find('Rodz 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('Rodz. 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('Rodzaj 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('Rodzaj. 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('Rodzaju 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('Rdz 2:3')).toStrictEqual([[0, 2, 3]])

    expect(find('Wy 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Wy. 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Wyj 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Wyj. 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Wyjś 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Wyjś. 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Wyjs 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Wyjśc 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Wyjsc 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Wyjścia 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Wyjscia 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Wyjscia. 2:3')).toStrictEqual([[1, 2, 3]])

    expect(find('Kap 2:3')).toStrictEqual([[2, 2, 3]])
    expect(find('Kapł 2:3')).toStrictEqual([[2, 2, 3]])
    expect(find('Kapl 2:3')).toStrictEqual([[2, 2, 3]])
    expect(find('Kapłań 2:3')).toStrictEqual([[2, 2, 3]])
    expect(find('Kaplań 2:3')).toStrictEqual([[2, 2, 3]])
    expect(find('Kapłan 2:3')).toStrictEqual([[2, 2, 3]])
    expect(find('Kaplan 2:3')).toStrictEqual([[2, 2, 3]])
    expect(find('Kapłańska 2:3')).toStrictEqual([[2, 2, 3]])
    expect(find('Kaplanska 2:3')).toStrictEqual([[2, 2, 3]])

    expect(find('Licz 2:3')).toStrictEqual([[3, 2, 3]])
    expect(find('Liczb 2:3')).toStrictEqual([[3, 2, 3]])
    expect(find('Lb 2:3')).toStrictEqual([[3, 2, 3]])

    expect(find('Pow 2:3')).toStrictEqual([[4, 2, 3]])
    expect(find('Powt 2:3')).toStrictEqual([[4, 2, 3]])
    expect(find('Powtórzonego Prawa 2:3')).toStrictEqual([[4, 2, 3]])
    expect(find('Powtorzonego Prawa 2:3')).toStrictEqual([[4, 2, 3]])
  })

  it('Jozuego', () => {
    expect(find('Joz 2:3')).toStrictEqual([[5, 2, 3]])
    expect(find('Jozue 2:3')).toStrictEqual([[5, 2, 3]])
    expect(find('Jozuego 2:3')).toStrictEqual([[5, 2, 3]])
    expect(find('Jz 2:3')).toStrictEqual([[5, 2, 3]])
  })

  it('Sędziów', () => {
    expect(find('Sę 2:3')).toStrictEqual([[6, 2, 3]])
    expect(find('Se 2:3')).toStrictEqual([[6, 2, 3]])
    expect(find('Sęd 2:3')).toStrictEqual([[6, 2, 3]])
    expect(find('Sed 2:3')).toStrictEqual([[6, 2, 3]])
    expect(find('Sędz 2:3')).toStrictEqual([[6, 2, 3]])
    expect(find('Sedz 2:3')).toStrictEqual([[6, 2, 3]])
    expect(find('Sędziów 2:3')).toStrictEqual([[6, 2, 3]])
    expect(find('Sędziow 2:3')).toStrictEqual([[6, 2, 3]])
    expect(find('Sedziow 2:3')).toStrictEqual([[6, 2, 3]])
    expect(find('Sdz 2:3')).toStrictEqual([[6, 2, 3]])
  })

  it('Rut', () => {
    expect(find('Ru 2:3')).toStrictEqual([[7, 2, 3]])
    expect(find('Rut 2:3')).toStrictEqual([[7, 2, 3]])
  })

  it('Samuela', () => {
    expect(find('1 Sa 2:3')).toStrictEqual([[8, 2, 3]])
    expect(find('1 Sam 2:3')).toStrictEqual([[8, 2, 3]])
    expect(find('1 Samu 2:3')).toStrictEqual([[8, 2, 3]])
    expect(find('1 Samuel 2:3')).toStrictEqual([[8, 2, 3]])
    expect(find('1 Samuela 2:3')).toStrictEqual([[8, 2, 3]])

    expect(find('2 Sa 2:3')).toStrictEqual([[9, 2, 3]])
  })

  it('Królewska', () => {
    expect(find('1 Krl 2:3')).toStrictEqual([[10, 2, 3]])
    expect(find('1 Król 2:3')).toStrictEqual([[10, 2, 3]])
    expect(find('1 Krol 2:3')).toStrictEqual([[10, 2, 3]])
    expect(find('1 Królewska 2:3')).toStrictEqual([[10, 2, 3]])
    expect(find('1 Krolewska 2:3')).toStrictEqual([[10, 2, 3]])
    expect(find('1 Królewską 2:3')).toStrictEqual([[10, 2, 3]])
    expect(find('1 Królewskiej 2:3')).toStrictEqual([[10, 2, 3]])

    expect(find('2 Krl 2:3')).toStrictEqual([[11, 2, 3]])
  })

  it('Kronik', () => {
    expect(find('1 Krn 2:3')).toStrictEqual([[12, 2, 3]])
    expect(find('1 Kron 2:3')).toStrictEqual([[12, 2, 3]])
    expect(find('1 Kronik 2:3')).toStrictEqual([[12, 2, 3]])

    expect(find('2 Krn 2:3')).toStrictEqual([[13, 2, 3]])
  })

  it('Ezdrasza', () => {
    expect(find('Ezd 2:3')).toStrictEqual([[14, 2, 3]])
    expect(find('Ezdr 2:3')).toStrictEqual([[14, 2, 3]])
    expect(find('Ezdra 2:3')).toStrictEqual([[14, 2, 3]])
    expect(find('Ezdrasz 2:3')).toStrictEqual([[14, 2, 3]])
    expect(find('Ezdrasza 2:3')).toStrictEqual([[14, 2, 3]])
  })

  it('Nehemiasza', () => {
    expect(find('Ne 2:3')).toStrictEqual([[15, 2, 3]])
    expect(find('Neh 2:3')).toStrictEqual([[15, 2, 3]])
    expect(find('Nehe 2:3')).toStrictEqual([[15, 2, 3]])
    expect(find('Nehem 2:3')).toStrictEqual([[15, 2, 3]])
    expect(find('Nehemiasz 2:3')).toStrictEqual([[15, 2, 3]])
    expect(find('Nehemiasza 2:3')).toStrictEqual([[15, 2, 3]])
  })

  it('Estery', () => {
    expect(find('Est 2:3')).toStrictEqual([[16, 2, 3]])
    expect(find('Este 2:3')).toStrictEqual([[16, 2, 3]])
    expect(find('Ester 2:3')).toStrictEqual([[16, 2, 3]])
    expect(find('Estery 2:3')).toStrictEqual([[16, 2, 3]])
  })

  it('Joba', () => {
    expect(find('Job 2:3')).toStrictEqual([[17, 2, 3]])
    expect(find('Joba 2:3')).toStrictEqual([[17, 2, 3]])
    expect(find('Hio 2:3')).toStrictEqual([[17, 2, 3]])
    expect(find('Hiob 2:3')).toStrictEqual([[17, 2, 3]])
    expect(find('Hioba 2:3')).toStrictEqual([[17, 2, 3]])
  })

  it('Psalm', () => {
    expect(find('Ps 2:3')).toStrictEqual([[18, 2, 3]])
    expect(find('Psa 2:3')).toStrictEqual([[18, 2, 3]])
    expect(find('Psalm 2:3')).toStrictEqual([[18, 2, 3]])
    expect(find('Psalmy 2:3')).toStrictEqual([[18, 2, 3]])
    expect(find('Psalmem 2:3')).toStrictEqual([[18, 2, 3]])
    expect(find('Psalmu 2:3')).toStrictEqual([[18, 2, 3]])
    expect(find('Psalmie 2:3')).toStrictEqual([[18, 2, 3]])
    expect(find('Psalmowi 2:3')).toStrictEqual([[18, 2, 3]])
    expect(find('Psalmów 2:3')).toStrictEqual([[18, 2, 3]])
    expect(find('Psalmow 2:3')).toStrictEqual([[18, 2, 3]])
    expect(find('Psalmami 2:3')).toStrictEqual([[18, 2, 3]])
  })

  it('Przypowieści', () => {
    expect(find('Prz 2:3')).toStrictEqual([[19, 2, 3]])
    expect(find('Przy 2:3')).toStrictEqual([[19, 2, 3]])
    expect(find('Przyp 2:3')).toStrictEqual([[19, 2, 3]])
    expect(find('Przypow 2:3')).toStrictEqual([[19, 2, 3]])
    expect(find('Przypowieści 2:3')).toStrictEqual([[19, 2, 3]])
    expect(find('Przypowiesci 2:3')).toStrictEqual([[19, 2, 3]])
    expect(find('Przypowiesci Salomona 2:3')).toStrictEqual([[19, 2, 3]])

    expect(find('Przys 2:3')).toStrictEqual([[19, 2, 3]])
    expect(find('Przysłów 2:3')).toStrictEqual([[19, 2, 3]])
    expect(find('Przyslow 2:3')).toStrictEqual([[19, 2, 3]])
    expect(find('Przysłów Salomona 2:3')).toStrictEqual([[19, 2, 3]])
  })

  it('Pieśń nad Pieśniami', () => {
    expect(find('Pieśń nad Pieśniami 2:3')).toStrictEqual([[20, 2, 3]])
    expect(find('Pnp 2:3')).toStrictEqual([[20, 2, 3]])
  })

  it('Kaznodziei', () => {
    expect(find('Kaz 2:3')).toStrictEqual([[21, 2, 3]])
    expect(find('Kazn 2:3')).toStrictEqual([[21, 2, 3]])
    expect(find('Kaznodziei 2:3')).toStrictEqual([[21, 2, 3]])
    expect(find('Kaznodziei Salomona 2:3')).toStrictEqual([[21, 2, 3]])
    expect(find('Kazn. Salomona 2:3')).toStrictEqual([[21, 2, 3]])
    expect(find('Kz 2:3')).toStrictEqual([[21, 2, 3]])
    expect(find('Kzn 2:3')).toStrictEqual([[21, 2, 3]])

    expect(find('Koh 2:3')).toStrictEqual([[21, 2, 3]])
    expect(find('Kohel 2:3')).toStrictEqual([[21, 2, 3]])
    expect(find('Kohelet 2:3')).toStrictEqual([[21, 2, 3]])
    expect(find('Koheleta 2:3')).toStrictEqual([[21, 2, 3]])
  })

  it('Izajasz', () => {
    expect(find('Iz 2:3')).toStrictEqual([[22, 2, 3]])
    expect(find('Iza 2:3')).toStrictEqual([[22, 2, 3]])
    expect(find('Izaj 2:3')).toStrictEqual([[22, 2, 3]])
    expect(find('Izajasz 2:3')).toStrictEqual([[22, 2, 3]])
    expect(find('Izajasza 2:3')).toStrictEqual([[22, 2, 3]])
  })

  it('Jeremiasz', () => {
    expect(find('Jr 2:3')).toStrictEqual([[23, 2, 3]])
    expect(find('Jrm 2:3')).toStrictEqual([[23, 2, 3]])
    expect(find('Jer 2:3')).toStrictEqual([[23, 2, 3]])
    expect(find('Jerem 2:3')).toStrictEqual([[23, 2, 3]])
    expect(find('Jeremiasz 2:3')).toStrictEqual([[23, 2, 3]])
    expect(find('Jeremiasza 2:3')).toStrictEqual([[23, 2, 3]])
  })

  it('Treny', () => {
    expect(find('Tr 2:3')).toStrictEqual([[24, 2, 3]])
    expect(find('Tre 2:3')).toStrictEqual([[24, 2, 3]])
    expect(find('Tren 2:3')).toStrictEqual([[24, 2, 3]])
    expect(find('Treny 2:3')).toStrictEqual([[24, 2, 3]])
    expect(find('Trenach 2:3')).toStrictEqual([[24, 2, 3]])
    expect(find('Trenami 2:3')).toStrictEqual([[24, 2, 3]])
    expect(find('Trenom 2:3')).toStrictEqual([[24, 2, 3]])
    expect(find('Trenów 2:3')).toStrictEqual([[24, 2, 3]])
    expect(find('Trenow 2:3')).toStrictEqual([[24, 2, 3]])
  })

  it('Ezekiel', () => {
    expect(find('Eze 2:3')).toStrictEqual([[25, 2, 3]])
    expect(find('Ezech 2:3')).toStrictEqual([[25, 2, 3]])
    expect(find('Ezechiel 2:3')).toStrictEqual([[25, 2, 3]])
    expect(find('Ezechiela 2:3')).toStrictEqual([[25, 2, 3]])
    expect(find('Ezch 2:3')).toStrictEqual([[25, 2, 3]])
  })

  it('Daniel', () => {
    expect(find('Dn 2:3')).toStrictEqual([[26, 2, 3]])
    expect(find('Dan 2:3')).toStrictEqual([[26, 2, 3]])
    expect(find('Daniel 2:3')).toStrictEqual([[26, 2, 3]])
    expect(find('Daniela 2:3')).toStrictEqual([[26, 2, 3]])
  })

  it('Ozeasz', () => {
    expect(find('Oz 2:3')).toStrictEqual([[27, 2, 3]])
    expect(find('Oze 2:3')).toStrictEqual([[27, 2, 3]])
    expect(find('Ozeasz 2:3')).toStrictEqual([[27, 2, 3]])
    expect(find('Ozeasza 2:3')).toStrictEqual([[27, 2, 3]])
  })

  it('Joel', () => {
    expect(find('Joe 2:3')).toStrictEqual([[28, 2, 3]])
    expect(find('Joel 2:3')).toStrictEqual([[28, 2, 3]])
    expect(find('Joela 2:3')).toStrictEqual([[28, 2, 3]])
  })

  it('Amos', () => {
    expect(find('Am 2:3')).toStrictEqual([[29, 2, 3]])
    expect(find('Amo 2:3')).toStrictEqual([[29, 2, 3]])
    expect(find('Amos 2:3')).toStrictEqual([[29, 2, 3]])
    expect(find('Amosa 2:3')).toStrictEqual([[29, 2, 3]])
  })

  it('Abdiasz', () => {
    expect(find('Ab 2:3')).toStrictEqual([[30, 2, 3]])
    expect(find('Abd 2:3')).toStrictEqual([[30, 2, 3]])
    expect(find('Abdiasz 2:3')).toStrictEqual([[30, 2, 3]])
    expect(find('Abdiasza 2:3')).toStrictEqual([[30, 2, 3]])
  })

  it('Jonasz', () => {
    expect(find('Jon 2:3')).toStrictEqual([[31, 2, 3]])
    expect(find('Jona 2:3')).toStrictEqual([[31, 2, 3]])
    expect(find('Jonasz 2:3')).toStrictEqual([[31, 2, 3]])
    expect(find('Jonasza 2:3')).toStrictEqual([[31, 2, 3]])
  })

  it('Micheasz', () => {
    expect(find('Mi 2:3')).toStrictEqual([[32, 2, 3]])
    expect(find('Mich 2:3')).toStrictEqual([[32, 2, 3]])
    expect(find('Micheasz 2:3')).toStrictEqual([[32, 2, 3]])
    expect(find('Micheasza 2:3')).toStrictEqual([[32, 2, 3]])
  })

  it('Nahum', () => {
    expect(find('Na 2:3')).toStrictEqual([[33, 2, 3]])
    expect(find('Nah 2:3')).toStrictEqual([[33, 2, 3]])
    expect(find('Nahum 2:3')).toStrictEqual([[33, 2, 3]])
    expect(find('Nahuma 2:3')).toStrictEqual([[33, 2, 3]])
  })

  it('Habakuk', () => {
    expect(find('Ha 2:3')).toStrictEqual([[34, 2, 3]])
    expect(find('Hab 2:3')).toStrictEqual([[34, 2, 3]])
    expect(find('Habakuk 2:3')).toStrictEqual([[34, 2, 3]])
    expect(find('Habakuka 2:3')).toStrictEqual([[34, 2, 3]])
  })

  it('Sofoniasz', () => {
    expect(find('So 2:3')).toStrictEqual([[35, 2, 3]])
    expect(find('Sof 2:3')).toStrictEqual([[35, 2, 3]])
    expect(find('Sofo 2:3')).toStrictEqual([[35, 2, 3]])
    expect(find('Sofoniasz 2:3')).toStrictEqual([[35, 2, 3]])
    expect(find('Sofoniasza 2:3')).toStrictEqual([[35, 2, 3]])
  })

  it('Aggeusz', () => {
    expect(find('Ag 2:3')).toStrictEqual([[36, 2, 3]])
    expect(find('Agg 2:3')).toStrictEqual([[36, 2, 3]])
    expect(find('Aggeusz 2:3')).toStrictEqual([[36, 2, 3]])
    expect(find('Aggeusza 2:3')).toStrictEqual([[36, 2, 3]])
  })

  it('Zachariasz', () => {
    expect(find('Za 2:3')).toStrictEqual([[37, 2, 3]])
    expect(find('Zach 2:3')).toStrictEqual([[37, 2, 3]])
    expect(find('Zachariasz 2:3')).toStrictEqual([[37, 2, 3]])
    expect(find('Zachariasza 2:3')).toStrictEqual([[37, 2, 3]])
    expect(find('Zch 2:3')).toStrictEqual([[37, 2, 3]])
  })

  it('Malachiasz', () => {
    expect(find('Mal 2:3')).toStrictEqual([[38, 2, 3]])
    expect(find('Mala 2:3')).toStrictEqual([[38, 2, 3]])
    expect(find('Malach 2:3')).toStrictEqual([[38, 2, 3]])
    expect(find('Malachiasz 2:3')).toStrictEqual([[38, 2, 3]])
    expect(find('Malachiasza 2:3')).toStrictEqual([[38, 2, 3]])
  })

  it('Mateusz', () => {
    expect(find('Mt 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Mat 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Mateusz 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Mateusza 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Ew Mateusza 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Ew. Mateusza 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Ewan. Mateusza 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Ewang. Mateusza 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Ewangelia Mateusza 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Ewangelia Św. Mateusza 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Ewangelia Świętego Mateusza 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Ewangelia Swietego Mateusza 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Ewangelia Apostola Mateusza 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Ewangelia Apostola Mateusza 2:3')).toStrictEqual([[39, 2, 3]])
  })

  it('Marek', () => {
    expect(find('Mk 2:3')).toStrictEqual([[40, 2, 3]])
    expect(find('Mar 2:3')).toStrictEqual([[40, 2, 3]])
    expect(find('Mark 2:3')).toStrictEqual([[40, 2, 3]])
    expect(find('Marka 2:3')).toStrictEqual([[40, 2, 3]])
  })

  it('Łukasz', () => {
    expect(find('Łk 2:3')).toStrictEqual([[41, 2, 3]])
    expect(find('Łuk 2:3')).toStrictEqual([[41, 2, 3]])
    expect(find('Łukasz 2:3')).toStrictEqual([[41, 2, 3]])
    expect(find('Łukasza 2:3')).toStrictEqual([[41, 2, 3]])
  })

  it('Jan', () => {
    expect(find('Jn 2:3')).toStrictEqual([[42, 2, 3]])
    expect(find('Jan 2:3')).toStrictEqual([[42, 2, 3]])
    expect(find('Jana 2:3')).toStrictEqual([[42, 2, 3]])
  })

  it('Dzieje Apostolskie', () => {
    expect(find('Dz 2:3')).toStrictEqual([[43, 2, 3]])
    expect(find('Dzieje 2:3')).toStrictEqual([[43, 2, 3]])
    expect(find('Dz Ap 2:3')).toStrictEqual([[43, 2, 3]])
    expect(find('Dz. Ap. 2:3')).toStrictEqual([[43, 2, 3]])
    expect(find('Dzieje Apostolskie 2:3')).toStrictEqual([[43, 2, 3]])
  })

  it('Rzymian', () => {
    expect(find('Rz 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('Rzy 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('Rzym 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('Rzymian 2:3')).toStrictEqual([[44, 2, 3]])

    expect(find('List Rzymian 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('List Do Rzymian 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('List Św. Pawła Do Rzymian 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('List Sw. Pawla Do Rzymian 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('List Świętego Pawła Do Rzymian 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('List Swietego Pawla Do Rzymian 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('List Apostoła Pawla Do Rzymian 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('List Apost. Pawla Do Rzymian 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('List Ap. Pawla Do Rzymian 2:3')).toStrictEqual([[44, 2, 3]])
  })

  it('1 Koryntian', () => {
    expect(find('1 Kor 2:3')).toStrictEqual([[45, 2, 3]])
    expect(find('1 Kory 2:3')).toStrictEqual([[45, 2, 3]])
    expect(find('1 Korynt 2:3')).toStrictEqual([[45, 2, 3]])
    expect(find('1 Koryntian 2:3')).toStrictEqual([[45, 2, 3]])
  })

  it('2 Koryntian', () => {
    expect(find('2 Kor 2:3')).toStrictEqual([[46, 2, 3]])
    expect(find('2 Kory 2:3')).toStrictEqual([[46, 2, 3]])
    expect(find('2 Korynt 2:3')).toStrictEqual([[46, 2, 3]])
    expect(find('2 Koryntian 2:3')).toStrictEqual([[46, 2, 3]])
    expect(find('II List Koryntian 2:3')).toStrictEqual([[46, 2, 3]])
  })

  it('Galacjan', () => {
    expect(find('Ga 2:3')).toStrictEqual([[47, 2, 3]])
    expect(find('Gal 2:3')).toStrictEqual([[47, 2, 3]])
    expect(find('Gala 2:3')).toStrictEqual([[47, 2, 3]])
    expect(find('Galacjan 2:3')).toStrictEqual([[47, 2, 3]])
    expect(find('Galatów 2:3')).toStrictEqual([[47, 2, 3]])
    expect(find('Galatow 2:3')).toStrictEqual([[47, 2, 3]])
  })

  it('Efezjan', () => {
    expect(find('Ef 2:3')).toStrictEqual([[48, 2, 3]])
    expect(find('Efe 2:3')).toStrictEqual([[48, 2, 3]])
    expect(find('Efez 2:3')).toStrictEqual([[48, 2, 3]])
    expect(find('Efezjan 2:3')).toStrictEqual([[48, 2, 3]])
  })

  it('Filipian', () => {
    expect(find('Flp 2:3')).toStrictEqual([[49, 2, 3]])
    expect(find('Fili 2:3')).toStrictEqual([[49, 2, 3]])
    expect(find('Filip 2:3')).toStrictEqual([[49, 2, 3]])
    expect(find('Filipian 2:3')).toStrictEqual([[49, 2, 3]])
  })

  it('Kolosan', () => {
    expect(find('Kol 2:3')).toStrictEqual([[50, 2, 3]])
    expect(find('Kolo 2:3')).toStrictEqual([[50, 2, 3]])
    expect(find('Kolos 2:3')).toStrictEqual([[50, 2, 3]])
    expect(find('Kolosan 2:3')).toStrictEqual([[50, 2, 3]])
  })

  it('1 Tesaloniczan', () => {
    expect(find('1 Tes 2:3')).toStrictEqual([[51, 2, 3]])
    expect(find('1 Tesa 2:3')).toStrictEqual([[51, 2, 3]])
    expect(find('1 Tesal 2:3')).toStrictEqual([[51, 2, 3]])
    expect(find('1 Tesaloniczan 2:3')).toStrictEqual([[51, 2, 3]])
  })

  it('2 Tesaloniczan', () => {
    expect(find('2 Tes 2:3')).toStrictEqual([[52, 2, 3]])
    expect(find('2 Tesa 2:3')).toStrictEqual([[52, 2, 3]])
    expect(find('2 Tesal 2:3')).toStrictEqual([[52, 2, 3]])
    expect(find('2 Tesaloniczan 2:3')).toStrictEqual([[52, 2, 3]])
  })

  it('1 Timoteusza', () => {
    expect(find('1 Tm 2:3')).toStrictEqual([[53, 2, 3]])
    expect(find('1 Ty 2:3')).toStrictEqual([[53, 2, 3]])
    expect(find('1 Tym 2:3')).toStrictEqual([[53, 2, 3]])
    expect(find('1 Tymo 2:3')).toStrictEqual([[53, 2, 3]])
    expect(find('1 Tymot 2:3')).toStrictEqual([[53, 2, 3]])
    expect(find('1 Tymoteusz 2:3')).toStrictEqual([[53, 2, 3]])
    expect(find('1 Tymoteusza 2:3')).toStrictEqual([[53, 2, 3]])
  })

  it('2 Timoteusza', () => {
    expect(find('2 Tm 2:3')).toStrictEqual([[54, 2, 3]])
    expect(find('2 Ty 2:3')).toStrictEqual([[54, 2, 3]])
    expect(find('2 Tym 2:3')).toStrictEqual([[54, 2, 3]])
    expect(find('2 Tymo 2:3')).toStrictEqual([[54, 2, 3]])
    expect(find('2 Tymot 2:3')).toStrictEqual([[54, 2, 3]])
    expect(find('2 Tymoteusz 2:3')).toStrictEqual([[54, 2, 3]])
    expect(find('2 Tymoteusza 2:3')).toStrictEqual([[54, 2, 3]])
  })

  it('Tytus', () => {
    expect(find('Tyt 2:3')).toStrictEqual([[55, 2, 3]])
    expect(find('Tytus 2:3')).toStrictEqual([[55, 2, 3]])
    expect(find('Tytusa 2:3')).toStrictEqual([[55, 2, 3]])
  })

  it('Filemona', () => {
    expect(find('Fi 2:3')).toStrictEqual([[56, 2, 3]])
    expect(find('Fil 2:3')).toStrictEqual([[56, 2, 3]])
    expect(find('File 2:3')).toStrictEqual([[56, 2, 3]])
    expect(find('Filem 2:3')).toStrictEqual([[56, 2, 3]])
    expect(find('Filemon 2:3')).toStrictEqual([[56, 2, 3]])
    expect(find('Filemona 2:3')).toStrictEqual([[56, 2, 3]])
    expect(find('flm 2:3')).toStrictEqual([[56, 2, 3]])
  })

  it('Hebrajczyków', () => {
    expect(find('He 2:3')).toStrictEqual([[57, 2, 3]])
    expect(find('Heb 2:3')).toStrictEqual([[57, 2, 3]])
    expect(find('Hebr 2:3')).toStrictEqual([[57, 2, 3]])
    expect(find('Hebra 2:3')).toStrictEqual([[57, 2, 3]])
    expect(find('Hebraj 2:3')).toStrictEqual([[57, 2, 3]])
    expect(find('Hebrajcz 2:3')).toStrictEqual([[57, 2, 3]])
    expect(find('Hebrajczyków 2:3')).toStrictEqual([[57, 2, 3]])
    expect(find('Hebrajczykow 2:3')).toStrictEqual([[57, 2, 3]])
    expect(find('hbr 2:3')).toStrictEqual([[57, 2, 3]])
  })

  it('Jakuba', () => {
    expect(find('Jak 2:3')).toStrictEqual([[58, 2, 3]])
    expect(find('Jakub 2:3')).toStrictEqual([[58, 2, 3]])
    expect(find('Jakuba 2:3')).toStrictEqual([[58, 2, 3]])
    expect(find('jk 2:3')).toStrictEqual([[58, 2, 3]])
    expect(find('jkb 2:3')).toStrictEqual([[58, 2, 3]])
  })

  it('1 Piotra', () => {
    expect(find('1 Pi 2:3')).toStrictEqual([[59, 2, 3]])
    expect(find('1 Pio 2:3')).toStrictEqual([[59, 2, 3]])
    expect(find('1 Piotr 2:3')).toStrictEqual([[59, 2, 3]])
    expect(find('1 Piotra 2:3')).toStrictEqual([[59, 2, 3]])
    expect(find('1 p 2:3')).toStrictEqual([[59, 2, 3]])
    expect(find('1 pt 2:3')).toStrictEqual([[59, 2, 3]])
    expect(find('1 ptr 2:3')).toStrictEqual([[59, 2, 3]])
  })

  it('2 Piotra', () => {
    expect(find('2 Pi 2:3')).toStrictEqual([[60, 2, 3]])
    expect(find('2 Pio 2:3')).toStrictEqual([[60, 2, 3]])
    expect(find('2 Piotr 2:3')).toStrictEqual([[60, 2, 3]])
    expect(find('2 Piotra 2:3')).toStrictEqual([[60, 2, 3]])
    expect(find('2 pt 2:3')).toStrictEqual([[60, 2, 3]])
    expect(find('2 ptr 2:3')).toStrictEqual([[60, 2, 3]])
  })

  it('1 Jana', () => {
    expect(find('1 Jan 2:3')).toStrictEqual([[61, 2, 3]])
    expect(find('1 Jana 2:3')).toStrictEqual([[61, 2, 3]])
    expect(find('1 J 2:3')).toStrictEqual([[61, 2, 3]])
    expect(find('1 Jn 2:3')).toStrictEqual([[61, 2, 3]])
  })

  it('Judy', () => {
    expect(find('Judy 2:3')).toStrictEqual([[64, 2, 3]])
    expect(find('Jud 2:3')).toStrictEqual([[64, 2, 3]])
    expect(find('Ju 2:3')).toStrictEqual([[64, 2, 3]])
    expect(find('Jd 2:3')).toStrictEqual([[64, 2, 3]])
  })

  it('Objawienie', () => {
    expect(find('Apokalipsa 2:3')).toStrictEqual([[65, 2, 3]])
    expect(find('Apokal 2:3')).toStrictEqual([[65, 2, 3]])
    expect(find('Apok 2:3')).toStrictEqual([[65, 2, 3]])
    expect(find('Apo 2:3')).toStrictEqual([[65, 2, 3]])
    expect(find('Objawienie Św. Jana 2:3')).toStrictEqual([[65, 2, 3]])
    expect(find('Objawienie Jana 2:3')).toStrictEqual([[65, 2, 3]])
    expect(find('Objaw 2:3')).toStrictEqual([[65, 2, 3]])
    expect(find('Obj 2:3')).toStrictEqual([[65, 2, 3]])
    expect(find('Ob 2:3')).toStrictEqual([[65, 2, 3]])
  })

  it('Judyty', () => {
    expect(find('Judyty 2:3')).toStrictEqual([[66, 2, 3]])
    expect(find('Judyt 2:3')).toStrictEqual([[66, 2, 3]])
    expect(find('Jdt 2:3')).toStrictEqual([[66, 2, 3]])
  })

  it('Tobiasza', () => {
    expect(find('Tobiasza 2:3')).toStrictEqual([[67, 2, 3]])
    expect(find('Tobiasz 2:3')).toStrictEqual([[67, 2, 3]])
    expect(find('Tobia 2:3')).toStrictEqual([[67, 2, 3]])
    expect(find('Tobi 2:3')).toStrictEqual([[67, 2, 3]])
    expect(find('Tob 2:3')).toStrictEqual([[67, 2, 3]])
    expect(find('Tb 2:3')).toStrictEqual([[67, 2, 3]])
  })

  it('1 Machabejska', () => {
    expect(find('1 Machabejska 2:3')).toStrictEqual([[68, 2, 3]])
    expect(find('1 Machabej 2:3')).toStrictEqual([[68, 2, 3]])
    expect(find('1 Machab 2:3')).toStrictEqual([[68, 2, 3]])
    expect(find('1 Macha 2:3')).toStrictEqual([[68, 2, 3]])
    expect(find('1 Mach 2:3')).toStrictEqual([[68, 2, 3]])
    expect(find('1 Mac 2:3')).toStrictEqual([[68, 2, 3]])
    expect(find('1 Mch 2:3')).toStrictEqual([[68, 2, 3]])
  })

  it('Mądrości', () => {
    expect(find('Mądrości 2:3')).toStrictEqual([[70, 2, 3]])
    expect(find('Madrosci 2:3')).toStrictEqual([[70, 2, 3]])
    expect(find('Mądro 2:3')).toStrictEqual([[70, 2, 3]])
    expect(find('Mądr 2:3')).toStrictEqual([[70, 2, 3]])
    expect(find('Mdr 2:3')).toStrictEqual([[70, 2, 3]])
  })

  it('Mądrość Syracha', () => {
    expect(find('Mądrość Syracha 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('Madrosc Syracha 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('Mądr Syracha 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('Mąd Syracha 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('M Syracha 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('M. Syracha 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('M. Syrach 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('Syrach 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('Syra 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('Syr 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('Sy 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('Msr 2:3')).toStrictEqual([[71, 2, 3]])
  })

  it('Barucha', () => {
    expect(find('Barucha 2:3')).toStrictEqual([[72, 2, 3]])
    expect(find('Baruch 2:3')).toStrictEqual([[72, 2, 3]])
    expect(find('Baru 2:3')).toStrictEqual([[72, 2, 3]])
    expect(find('Bar 2:3')).toStrictEqual([[72, 2, 3]])
    expect(find('Ba 2:3')).toStrictEqual([[72, 2, 3]])
    expect(find('Br 2:3')).toStrictEqual([[72, 2, 3]])
  })
})
