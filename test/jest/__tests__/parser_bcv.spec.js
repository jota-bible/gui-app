import jota from 'src/logic/jota'
require('src/statics/bcv-parsers/full_bcv_parser')
const parser = new bcv_parser()

const options = {
  apocrypha: false,
  translation: 'bw'
}
function find(text) {
  return jota.searchReferences(text, parser, options)
}
describe('Jota', () => {
  it('parse', () => {
    expect(find('mt 3:4, mk  1,2')).toBe('Matt.3.4,Mark.1.2')
    expect(find('mr 1,2')).toBe('Mark.1.2')
    expect(find('phl 1,2')).toBe('Phil.1.2')
    expect(find('wyj 1,2')).toBe('Exod.1.2')
    expect(find('wyjścia 1,2')).toBe('Exod.1.2')
    expect(find('kapłańska 1,2')).toBe('Lev.1.2')
    expect(find('kapł 1,2')).toBe('Lev.1.2')
    expect(find('kap 1,2')).toBe('Lev.1.2')
    expect(find('2 sam 1,2')).toBe('2Sam.1.2')
    expect(find('2 samuel 1,2')).toBe('2Sam.1.2')
    expect(find('2 samuela 1,2')).toBe('2Sam.1.2')
    expect(find('II Samuela 1,2')).toBe('2Sam.1.2')
    expect(find('II Samuela 24:18-22')).toBe('2Sam.24.18-2Sam.24.22')
    // expect(find('II Samuela 24:18-22, 24')).toBe('2Sam.24.18-2Sam.24.22')
  })
})

// ${book} ${chapter}${separator}${start}-${end} ${translationUpperCase} "${textWithNewLines}"
