const Maker = require('../modules/Maker')
describe('Maker', () => {
  it('exists', () => {
    expect(typeof Maker).toBe('function')
  })
  it('is curriable', () => {
    const made0 = Maker()
    expect(typeof made0).toBe('function')
    const made1 = Maker({})
    expect(typeof made1).toBe('function')
    const made2 = Maker({},{})
    expect(typeof made2 !== 'function').toBe(true)
    expect(Maker()({})()()({})).toEqual(made2)
  })
  it('applies a function to the key on the input object from the config', () => {
    const isTim = name => name === 'Tim'
    const config = {
            name: isTim
          },
          input = {
            name: 'Tim',
            age: 28
          },
          configured = Maker(config,input)
    expect(configured).toEqual({
      name: true,
      age: 28
    })

    const config2 = {
            grantee: (grantee, key, obj) => {
              return grantee.slice(0,2)
            }
          },
          input2 = {
            grantee: [1,2,3,4,5]
          },
          configured2 = Maker(config2, input2)
    expect(configured2).toEqual({
      grantee: [1,2]
    })
  })
})
