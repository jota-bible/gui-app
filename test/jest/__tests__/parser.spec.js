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
  it('formats passage caption', () => {
    expect(find('mk 1,2')).toBe('Mark.1.2')
    expect(find('mr 1,2')).toBe('Mark.1.2')
    expect(find('phl 1,2')).toBe('Phil.1.2')
  })
})
