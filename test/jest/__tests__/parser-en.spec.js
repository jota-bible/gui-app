import parse from 'src/logic/parser/parser'

// const options = {
//   apocrypha: false,
//   translation: 'bw'
// }
function find(text) {
  return parse(text, ['en'])
}

// TODO:
// Make sure the entire text is matched, <-- nice but what for? For example to normalize all the references in the text
// Make sure some of the text are not matched -<< not sure which
describe('Parser', () => {
  it('Chapter and verses', () => {
    expect(find('Gen 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('1J 2:3')).toStrictEqual([[61, 2, 3]])
    expect(find('Gen 2:3a')).toStrictEqual([[0, 2, 3]])
    expect(find('Gen 2:3-5')).toStrictEqual([[0, 2, 3, 5]])
    expect(find('Gen 2:3,5')).toStrictEqual([[0, 2, 3], [0, 2, 5]])
    expect(find('Gen 2,3-5')).toStrictEqual([[0, 2, 3, 5]])
    expect(find('Gen 2,3;5')).toStrictEqual([[0, 2, 3], [0, 2, 5]])
    expect(find('Gen 2,3.5')).toStrictEqual([[0, 2, 3], [0, 2, 5]])
    expect(find('aa Gen 2,3 Exo 4:5 bb ')).toStrictEqual([[0, 2, 3], [1, 4, 5]])
    expect(find('Gen 2:3-5, 7-8')).toStrictEqual([[0, 2, 3, 5], [0, 2, 7, 8]])
    expect(find('Gen. 1;2-3')).toStrictEqual([[0, 1, 2, 3]])

    expect(find('John 1:2, 1 John 1:2')).toStrictEqual([[42, 1, 2], [61, 1, 2]])
    expect(find('1 John 1:2, John 1:2')).toStrictEqual([[61, 1, 2], [42, 1, 2]])

    // Using first delimiter multiple times does nothing
    expect(find('Gen 2,3,4')).toStrictEqual([[0, 2, 3]])
    expect(find('Gen 2:3:4')).toStrictEqual([[0, 2, 3]])
  })

  it('Case insensitive', () => {
    expect(find('jos 2:3')).toStrictEqual([[5, 2, 3]])
  })

  it('Genesis', () => {
    expect(find('Gen 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('Gene 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('Genes 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('Genesis 2:3')).toStrictEqual([[0, 2, 3]])
    expect(find('Book of Genesis 2:3')).toStrictEqual([[0, 2, 3]])
  })

  it('Exodus', () => {
    expect(find('Ex 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Exo 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Exod 2:3')).toStrictEqual([[1, 2, 3]])
    expect(find('Exodus 2:3')).toStrictEqual([[1, 2, 3]])
  })

  it('Leviticus', () => {
    expect(find('Lev 2:3')).toStrictEqual([[2, 2, 3]])
    expect(find('Levi 2:3')).toStrictEqual([[2, 2, 3]])
    expect(find('Levit 2:3')).toStrictEqual([[2, 2, 3]])
    expect(find('Leviticus 2:3')).toStrictEqual([[2, 2, 3]])
  })

  it('Numbers', () => {
    expect(find('Num 2:3')).toStrictEqual([[3, 2, 3]])
    expect(find('Numb 2:3')).toStrictEqual([[3, 2, 3]])
    expect(find('Number 2:3')).toStrictEqual([[3, 2, 3]])
    expect(find('Numbers 2:3')).toStrictEqual([[3, 2, 3]])
  })

  it('Deuteronomy', () => {
    expect(find('Deu 2:3')).toStrictEqual([[4, 2, 3]])
    expect(find('Deut 2:3')).toStrictEqual([[4, 2, 3]])
    expect(find('Deuter 2:3')).toStrictEqual([[4, 2, 3]])
    expect(find('Deuteronomy 2:3')).toStrictEqual([[4, 2, 3]])
  })

  it('Joshua', () => {
    expect(find('Jos 2:3')).toStrictEqual([[5, 2, 3]])
    expect(find('Josh 2:3')).toStrictEqual([[5, 2, 3]])
    expect(find('Joshua 2:3')).toStrictEqual([[5, 2, 3]])
  })

  it('Judges', () => {
    expect(find('Jdg 2:3')).toStrictEqual([[6, 2, 3]])
    expect(find('Judg 2:3')).toStrictEqual([[6, 2, 3]])
    expect(find('Judges 2:3')).toStrictEqual([[6, 2, 3]])
  })

  it('Ruth', () => {
    expect(find('Ruth 2:3')).toStrictEqual([[7, 2, 3]])
    expect(find('Rut 2:3')).toStrictEqual([[7, 2, 3]])
    expect(find('Rt 2:3')).toStrictEqual([[7, 2, 3]])
  })

  it('Samuel', () => {
    expect(find('1 Samuel 2:3')).toStrictEqual([[8, 2, 3]])
    expect(find('1 Samu 2:3')).toStrictEqual([[8, 2, 3]])
    expect(find('1 Sam 2:3')).toStrictEqual([[8, 2, 3]])
  })

  it('Kings', () => {
    expect(find('1 Kings 2:3')).toStrictEqual([[10, 2, 3]])
    expect(find('1 King 2:3')).toStrictEqual([[10, 2, 3]])
    expect(find('1 Kgs 2:3')).toStrictEqual([[10, 2, 3]])
  })

  it('Chronicles', () => {
    expect(find('1 Chr 2:3')).toStrictEqual([[12, 2, 3]])
    expect(find('1 Chro 2:3')).toStrictEqual([[12, 2, 3]])
    expect(find('1 Chron 2:3')).toStrictEqual([[12, 2, 3]])
    expect(find('1 Chronic 2:3')).toStrictEqual([[12, 2, 3]])
    expect(find('1 Chronicle 2:3')).toStrictEqual([[12, 2, 3]])
    expect(find('1 Chronicles 2:3')).toStrictEqual([[12, 2, 3]])
    expect(find('1 Chn 2:3')).toStrictEqual([[12, 2, 3]])
  })

  it('Ezra', () => {
    expect(find('Ezra 2:3')).toStrictEqual([[14, 2, 3]])
    expect(find('Ezr 2:3')).toStrictEqual([[14, 2, 3]])
  })

  it('Nehemiah', () => {
    expect(find('Neh 2:3')).toStrictEqual([[15, 2, 3]])
    expect(find('Nehe 2:3')).toStrictEqual([[15, 2, 3]])
    expect(find('Nehem 2:3')).toStrictEqual([[15, 2, 3]])
    expect(find('Nehemiah 2:3')).toStrictEqual([[15, 2, 3]])
  })

  it('Esther', () => {
    expect(find('Est 2:3')).toStrictEqual([[16, 2, 3]])
    expect(find('Esth 2:3')).toStrictEqual([[16, 2, 3]])
    expect(find('Esther 2:3')).toStrictEqual([[16, 2, 3]])
  })

  it('Job', () => {
    expect(find('Job 2:3')).toStrictEqual([[17, 2, 3]])
  })

  it('Psalm', () => {
    expect(find('Ps 2:3')).toStrictEqual([[18, 2, 3]])
    expect(find('Psa 2:3')).toStrictEqual([[18, 2, 3]])
    expect(find('Psalm 2:3')).toStrictEqual([[18, 2, 3]])
    expect(find('Psalms 2:3')).toStrictEqual([[18, 2, 3]])
  })

  it('Proverbs', () => {
    expect(find('Pro 2:3')).toStrictEqual([[19, 2, 3]])
    expect(find('Prov 2:3')).toStrictEqual([[19, 2, 3]])
    expect(find('Proverb 2:3')).toStrictEqual([[19, 2, 3]])
    expect(find('Proverbs 2:3')).toStrictEqual([[19, 2, 3]])
  })

  it('Ecclesiastes', () => {
    expect(find('Ec 2:3')).toStrictEqual([[20, 2, 3]])
    expect(find('Ecc 2:3')).toStrictEqual([[20, 2, 3]])
    expect(find('Eccl 2:3')).toStrictEqual([[20, 2, 3]])
    expect(find('Eccles 2:3')).toStrictEqual([[20, 2, 3]])
    expect(find('Ecclesiastes 2:3')).toStrictEqual([[20, 2, 3]])
  })

  it('Song of Solomon', () => {
    expect(find('Song 2:3')).toStrictEqual([[21, 2, 3]])
    expect(find('Song of Solomon 2:3')).toStrictEqual([[21, 2, 3]])
  })

  it('Isaiah', () => {
    expect(find('Is 2:3')).toStrictEqual([[22, 2, 3]])
    expect(find('Isa 2:3')).toStrictEqual([[22, 2, 3]])
    expect(find('Isaiah 2:3')).toStrictEqual([[22, 2, 3]])
  })

  it('Jeremiah', () => {
    expect(find('Jer 2:3')).toStrictEqual([[23, 2, 3]])
    expect(find('Jerem 2:3')).toStrictEqual([[23, 2, 3]])
    expect(find('Jeremiah 2:3')).toStrictEqual([[23, 2, 3]])
  })

  it('Lamentations', () => {
    expect(find('Lam 2:3')).toStrictEqual([[24, 2, 3]])
    expect(find('Lamen 2:3')).toStrictEqual([[24, 2, 3]])
    expect(find('Lament 2:3')).toStrictEqual([[24, 2, 3]])
    expect(find('Lamentation 2:3')).toStrictEqual([[24, 2, 3]])
    expect(find('Lamentations 2:3')).toStrictEqual([[24, 2, 3]])
  })

  it('Ezekiel', () => {
    expect(find('Eze 2:3')).toStrictEqual([[25, 2, 3]])
    expect(find('Ezek 2:3')).toStrictEqual([[25, 2, 3]])
    expect(find('Ezekiel 2:3')).toStrictEqual([[25, 2, 3]])
  })

  it('Daniel', () => {
    expect(find('Dn 2:3')).toStrictEqual([[26, 2, 3]])
    expect(find('Dan 2:3')).toStrictEqual([[26, 2, 3]])
    expect(find('Daniel 2:3')).toStrictEqual([[26, 2, 3]])
  })

  it('Hosea', () => {
    expect(find('Hos 2:3')).toStrictEqual([[27, 2, 3]])
    expect(find('Hose 2:3')).toStrictEqual([[27, 2, 3]])
    expect(find('Hosea 2:3')).toStrictEqual([[27, 2, 3]])
  })

  it('Joel', () => {
    expect(find('Joe 2:3')).toStrictEqual([[28, 2, 3]])
    expect(find('Joel 2:3')).toStrictEqual([[28, 2, 3]])
  })

  it('Amos', () => {
    expect(find('Am 2:3')).toStrictEqual([[29, 2, 3]])
    expect(find('Amo 2:3')).toStrictEqual([[29, 2, 3]])
    expect(find('Amos 2:3')).toStrictEqual([[29, 2, 3]])
  })

  it('Obadiah', () => {
    expect(find('Oba 2:3')).toStrictEqual([[30, 2, 3]])
    expect(find('Obad 2:3')).toStrictEqual([[30, 2, 3]])
    expect(find('Obadiah 2:3')).toStrictEqual([[30, 2, 3]])
  })

  it('Jonah', () => {
    expect(find('Jon 2:3')).toStrictEqual([[31, 2, 3]])
    expect(find('Jona 2:3')).toStrictEqual([[31, 2, 3]])
    expect(find('Jonah 2:3')).toStrictEqual([[31, 2, 3]])
  })

  it('Micah', () => {
    expect(find('Mi 2:3')).toStrictEqual([[32, 2, 3]])
    expect(find('Mic 2:3')).toStrictEqual([[32, 2, 3]])
    expect(find('Micah 2:3')).toStrictEqual([[32, 2, 3]])
  })

  it('Nahum', () => {
    expect(find('Na 2:3')).toStrictEqual([[33, 2, 3]])
    expect(find('Nah 2:3')).toStrictEqual([[33, 2, 3]])
    expect(find('Nahum 2:3')).toStrictEqual([[33, 2, 3]])
  })

  it('Habakuk', () => {
    expect(find('Ha 2:3')).toStrictEqual([[34, 2, 3]])
    expect(find('Hab 2:3')).toStrictEqual([[34, 2, 3]])
    expect(find('Habakuk 2:3')).toStrictEqual([[34, 2, 3]])
    expect(find('Habakkuk 2:3')).toStrictEqual([[34, 2, 3]])
    expect(find('Hb 2:3')).toStrictEqual([[34, 2, 3]])
  })

  it('Zephaniah', () => {
    expect(find('Zep 2:3')).toStrictEqual([[35, 2, 3]])
    expect(find('Zeph 2:3')).toStrictEqual([[35, 2, 3]])
    expect(find('Zephan 2:3')).toStrictEqual([[35, 2, 3]])
    expect(find('Zephaniah 2:3')).toStrictEqual([[35, 2, 3]])
  })

  it('Haggai', () => {
    expect(find('Hag 2:3')).toStrictEqual([[36, 2, 3]])
    expect(find('Hagg 2:3')).toStrictEqual([[36, 2, 3]])
    expect(find('Haggai 2:3')).toStrictEqual([[36, 2, 3]])
    expect(find('Hg 2:3')).toStrictEqual([[36, 2, 3]])
  })

  it('Zechariah', () => {
    expect(find('Ze 2:3')).toStrictEqual([[37, 2, 3]])
    expect(find('Zech 2:3')).toStrictEqual([[37, 2, 3]])
    expect(find('Zechar 2:3')).toStrictEqual([[37, 2, 3]])
    expect(find('Zechariah 2:3')).toStrictEqual([[37, 2, 3]])
    expect(find('Zch 2:3')).toStrictEqual([[37, 2, 3]])
  })

  it('Malachi', () => {
    expect(find('Mal 2:3')).toStrictEqual([[38, 2, 3]])
    expect(find('Mala 2:3')).toStrictEqual([[38, 2, 3]])
    expect(find('Malach 2:3')).toStrictEqual([[38, 2, 3]])
    expect(find('Malachi 2:3')).toStrictEqual([[38, 2, 3]])
  })

  it('Matthew', () => {
    expect(find('Mt 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Mat 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Matt 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Matthew 2:3')).toStrictEqual([[39, 2, 3]])
    expect(find('Gospel of Matthew 2:3')).toStrictEqual([[39, 2, 3]])
  })

  it('Mark', () => {
    expect(find('Mk 2:3')).toStrictEqual([[40, 2, 3]])
    expect(find('Mar 2:3')).toStrictEqual([[40, 2, 3]])
    expect(find('Mark 2:3')).toStrictEqual([[40, 2, 3]])
  })

  it('Luke', () => {
    expect(find('Lk 2:3')).toStrictEqual([[41, 2, 3]])
    expect(find('Luk 2:3')).toStrictEqual([[41, 2, 3]])
    expect(find('Luke 2:3')).toStrictEqual([[41, 2, 3]])
  })

  it('John', () => {
    expect(find('J 2:3')).toStrictEqual([[42, 2, 3]])
    expect(find('Jn 2:3')).toStrictEqual([[42, 2, 3]])
    expect(find('Joh 2:3')).toStrictEqual([[42, 2, 3]])
    expect(find('John 2:3')).toStrictEqual([[42, 2, 3]])
  })

  it('Acts', () => {
    expect(find('Act 2:3')).toStrictEqual([[43, 2, 3]])
    expect(find('Acts 2:3')).toStrictEqual([[43, 2, 3]])
  })

  it('Rzymian', () => {
    expect(find('Ro 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('Rom 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('Romans 2:3')).toStrictEqual([[44, 2, 3]])

    expect(find('Letter to Romans 2:3')).toStrictEqual([[44, 2, 3]])
    expect(find('Epistle to Romans 2:3')).toStrictEqual([[44, 2, 3]])
  })

  it('1 Corinthians', () => {
    expect(find('1 Cor 2:3')).toStrictEqual([[45, 2, 3]])
    expect(find('1 Corin 2:3')).toStrictEqual([[45, 2, 3]])
    expect(find('1 Corinth 2:3')).toStrictEqual([[45, 2, 3]])
    expect(find('1 Corinthian 2:3')).toStrictEqual([[45, 2, 3]])
    expect(find('1 Corinthians 2:3')).toStrictEqual([[45, 2, 3]])
  })

  it('2 Corinthians', () => {
    expect(find('2 Cor 2:3')).toStrictEqual([[46, 2, 3]])
    expect(find('2 Corinth 2:3')).toStrictEqual([[46, 2, 3]])
    expect(find('2 Corinthian 2:3')).toStrictEqual([[46, 2, 3]])
    expect(find('2 Corinthians 2:3')).toStrictEqual([[46, 2, 3]])
    expect(find('II Letter Corinthians 2:3')).toStrictEqual([[46, 2, 3]])
  })

  it('Galatians', () => {
    expect(find('Ga 2:3')).toStrictEqual([[47, 2, 3]])
    expect(find('Gal 2:3')).toStrictEqual([[47, 2, 3]])
    expect(find('Gala 2:3')).toStrictEqual([[47, 2, 3]])
    expect(find('Galat 2:3')).toStrictEqual([[47, 2, 3]])
    expect(find('Galatian 2:3')).toStrictEqual([[47, 2, 3]])
    expect(find('Galatians 2:3')).toStrictEqual([[47, 2, 3]])
  })

  it('Ephesians', () => {
    expect(find('Eph 2:3')).toStrictEqual([[48, 2, 3]])
    expect(find('Ephe 2:3')).toStrictEqual([[48, 2, 3]])
    expect(find('Ephes 2:3')).toStrictEqual([[48, 2, 3]])
    expect(find('Ephesian 2:3')).toStrictEqual([[48, 2, 3]])
    expect(find('Ephesians 2:3')).toStrictEqual([[48, 2, 3]])
  })

  it('Philippians', () => {
    expect(find('Phi 2:3')).toStrictEqual([[49, 2, 3]])
    expect(find('Phil 2:3')).toStrictEqual([[49, 2, 3]])
    expect(find('Philip 2:3')).toStrictEqual([[49, 2, 3]])
    expect(find('Philipp 2:3')).toStrictEqual([[49, 2, 3]])
    expect(find('Philippian 2:3')).toStrictEqual([[49, 2, 3]])
    expect(find('Philippians 2:3')).toStrictEqual([[49, 2, 3]])
  })

  it('Colossians', () => {
    expect(find('Col 2:3')).toStrictEqual([[50, 2, 3]])
    expect(find('Colos 2:3')).toStrictEqual([[50, 2, 3]])
    expect(find('Coloss 2:3')).toStrictEqual([[50, 2, 3]])
    expect(find('Colossian 2:3')).toStrictEqual([[50, 2, 3]])
    expect(find('Colossians 2:3')).toStrictEqual([[50, 2, 3]])
  })

  it('1 Thessalonians', () => {
    expect(find('1 Thes 2:3')).toStrictEqual([[51, 2, 3]])
    expect(find('1 Thess 2:3')).toStrictEqual([[51, 2, 3]])
    expect(find('1 Thessal 2:3')).toStrictEqual([[51, 2, 3]])
    expect(find('1 Thessalonian 2:3')).toStrictEqual([[51, 2, 3]])
    expect(find('1 Thessalonians 2:3')).toStrictEqual([[51, 2, 3]])
  })

  it('1 Timothy', () => {
    expect(find('1 Tim 2:3')).toStrictEqual([[53, 2, 3]])
    expect(find('1 Timo 2:3')).toStrictEqual([[53, 2, 3]])
    expect(find('1 Timothy 2:3')).toStrictEqual([[53, 2, 3]])
  })

  it('Titus', () => {
    expect(find('Tit 2:3')).toStrictEqual([[55, 2, 3]])
    expect(find('Titus 2:3')).toStrictEqual([[55, 2, 3]])
  })

  it('Philemon', () => {
    expect(find('Phile 2:3')).toStrictEqual([[56, 2, 3]])
    expect(find('Philem 2:3')).toStrictEqual([[56, 2, 3]])
    expect(find('Philemon 2:3')).toStrictEqual([[56, 2, 3]])
    expect(find('phlm 2:3')).toStrictEqual([[56, 2, 3]])
  })

  it('Hebrews', () => {
    expect(find('He 2:3')).toStrictEqual([[57, 2, 3]])
    expect(find('Heb 2:3')).toStrictEqual([[57, 2, 3]])
    expect(find('Hebr 2:3')).toStrictEqual([[57, 2, 3]])
    expect(find('Hebrew 2:3')).toStrictEqual([[57, 2, 3]])
    expect(find('Hebrews 2:3')).toStrictEqual([[57, 2, 3]])
    expect(find('hbr 2:3')).toStrictEqual([[57, 2, 3]])
  })

  it('James', () => {
    expect(find('Jam 2:3')).toStrictEqual([[58, 2, 3]])
    expect(find('James 2:3')).toStrictEqual([[58, 2, 3]])
    expect(find('Jms 2:3')).toStrictEqual([[58, 2, 3]])
    expect(find('Jas 2:3')).toStrictEqual([[58, 2, 3]])
  })

  it('1 Peter', () => {
    expect(find('1 P 2:3')).toStrictEqual([[59, 2, 3]])
    expect(find('1 Pe 2:3')).toStrictEqual([[59, 2, 3]])
    expect(find('1 Pet 2:3')).toStrictEqual([[59, 2, 3]])
    expect(find('1 Peter 2:3')).toStrictEqual([[59, 2, 3]])
    expect(find('1 pt 2:3')).toStrictEqual([[59, 2, 3]])
    expect(find('1 ptr 2:3')).toStrictEqual([[59, 2, 3]])
  })

  it('1 Johna', () => {
    expect(find('1 J 2:3')).toStrictEqual([[61, 2, 3]])
    expect(find('1 Jo 2:3')).toStrictEqual([[61, 2, 3]])
    expect(find('1 Joh 2:3')).toStrictEqual([[61, 2, 3]])
    expect(find('1 John 2:3')).toStrictEqual([[61, 2, 3]])
    expect(find('1 Jn 2:3')).toStrictEqual([[61, 2, 3]])
  })

  it('Jude', () => {
    expect(find('Ju 2:3')).toStrictEqual([[64, 2, 3]])
    expect(find('Jud 2:3')).toStrictEqual([[64, 2, 3]])
    expect(find('Jude 2:3')).toStrictEqual([[64, 2, 3]])
    expect(find('Jd 2:3')).toStrictEqual([[64, 2, 3]])
  })

  it('Objawienie', () => {
    expect(find('Rev 2:3')).toStrictEqual([[65, 2, 3]])
    expect(find('Reve 2:3')).toStrictEqual([[65, 2, 3]])
    expect(find('Revel 2:3')).toStrictEqual([[65, 2, 3]])
    expect(find('Revelat 2:3')).toStrictEqual([[65, 2, 3]])
    expect(find('Revelation 2:3')).toStrictEqual([[65, 2, 3]])
  })

  it('Judith', () => {
    expect(find('Judith 2:3')).toStrictEqual([[66, 2, 3]])
    expect(find('Judi 2:3')).toStrictEqual([[66, 2, 3]])
    expect(find('Jdt 2:3')).toStrictEqual([[66, 2, 3]])
  })

  it('Tobith', () => {
    expect(find('Tobith 2:3')).toStrictEqual([[67, 2, 3]])
    expect(find('Tobi 2:3')).toStrictEqual([[67, 2, 3]])
    expect(find('Tob 2:3')).toStrictEqual([[67, 2, 3]])
    expect(find('Tb 2:3')).toStrictEqual([[67, 2, 3]])
  })

  it('1 Maccabees', () => {
    expect(find('1 Maccabees 2:3')).toStrictEqual([[68, 2, 3]])
    expect(find('1 Maccabee 2:3')).toStrictEqual([[68, 2, 3]])
    expect(find('1 Maccab 2:3')).toStrictEqual([[68, 2, 3]])
    expect(find('1 Macc 2:3')).toStrictEqual([[68, 2, 3]])
    expect(find('1 Mac 2:3')).toStrictEqual([[68, 2, 3]])
  })

  it('Wisdom', () => {
    expect(find('Wisdom 2:3')).toStrictEqual([[70, 2, 3]])
    expect(find('Wisd 2:3')).toStrictEqual([[70, 2, 3]])
    expect(find('Wis 2:3')).toStrictEqual([[70, 2, 3]])
    expect(find('Wsd 2:3')).toStrictEqual([[70, 2, 3]])
  })

  it('Sirah', () => {
    expect(find('Sirah 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('Sira 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('Sir 2:3')).toStrictEqual([[71, 2, 3]])
    expect(find('Si 2:3')).toStrictEqual([[71, 2, 3]])
  })

  it('Baruch', () => {
    expect(find('Baruch 2:3')).toStrictEqual([[72, 2, 3]])
    expect(find('Baru 2:3')).toStrictEqual([[72, 2, 3]])
    expect(find('Bar 2:3')).toStrictEqual([[72, 2, 3]])
    expect(find('Ba 2:3')).toStrictEqual([[72, 2, 3]])
    expect(find('Br 2:3')).toStrictEqual([[72, 2, 3]])
  })
})
