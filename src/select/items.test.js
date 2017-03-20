import { getIdFromFile } from './items'
/* global describe it expect */
const file = {
  lastModified: 1481652283000,
  lastModifiedDate: new Date(),
  name: 'DecPg.pdf',
  size: 151195,
  type: 'application/pdf',
}
describe('getIdFromFile', () => {
  it('gets the filename and capitalizes it', () => {
    expect(getIdFromFile(file)).toBe('DECPG')
  })
})
