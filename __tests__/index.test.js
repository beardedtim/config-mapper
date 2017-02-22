const { Mapper } = require('../')



describe('Mapper', () => {
  it('should exist', () => {
    expect(typeof Mapper).toBe('function')
  })
  it('has an arity of 2', () => {
    expect(Mapper.length).toBe(2)
  })
  it('is a curried function', () => {
    const mapped1 = Mapper(1)
    expect(typeof mapped1).toBe('function')
    const mapped2 = mapped1(2)
    expect(typeof mapped2 !== 'function').toBe(true)
  })
  it('maps values from one object to another', () => {
    const truth = {
            docType: {
              resourceName: 'document_type_name',
              label: 'This is a label'
            }
          },
          input = {
            document_type_name: 'Document Name',
          },
          configured = Mapper(truth,input);
    expect(configured).toEqual({
      docType: {
        label: 'This is a label',
        value: 'Document Name'
      }
    })
  })
  it('works with multiple values passed by truth', () => {
    const configObject = {
            docType: {
              resourceName: 'dct',
              label: 'DOC TYPE',
              _id: 'maybe we need record _id somewhere? Any and all JSON-able values here!'
            }
          },
          dataObject = {
            dct: 'Doc Name',
            unNamedValue: {
              'True': true
            }
          },
          configured = Mapper(configObject,dataObject)
    expect(configured).toEqual({
      docType: {
        value: 'Doc Name',
        label: 'DOC TYPE',
        _id: 'maybe we need record _id somewhere? Any and all JSON-able values here!'
      },
      unNamedValue: {
        'True': true
      }
    })
  })
  it('works for multiple fields', () => {
    const config = {
            docType: {
              resourceName: 'docType',
            },
            docID: {
              resourceName: 'document_id',
            }
          },
          data = {
            docType: {
              type: 'Age of Aquarious'
            },
            document_id: '1234'
          },
          configured = Mapper(config,data)
    expect(configured).toEqual({
      docType: {
        value: {
          type: 'Age of Aquarious',
        }
      },
      docID: {
        value: '1234'
      }
    })
  })
  it('passes the readme example', () => {
    const config = {
      realName: {
        resourceName: 'name'
      },
      username: {
        resourceName: 'handle'
      }
    }

    const input = {
      handle: 'beardedtim',
      name: 'Tim',
      age: 28
    }
    const configured = Mapper(config, input)
    expect(configured).toEqual({
      realName: {
        value: 'Tim'
      },
      username: {
        value: 'beardedtim'
      },
      age: 28
    })
  })
})
