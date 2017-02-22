const { curry } = require('ramda')

/**
 * Applies a function to a given key
 *
 *  EXAMPLE:
 *
 *    config = {
 *      name: str => str === 'Tim'
 *    },
 *    input = {
 *      name: 'Tim'
 *    }
 *    result = {
 *      name: true
 *    }
 *
 *    config = {
 *      comments: topFive
 *    },
 *    input = {
 *      comments: [1,2,3,4,5,6,7,8,9,10]
 *    }
 *    result = {
 *      comments: [1,2,3,4,5]
 *    }
 *
 *    config = {
 *      name: (name, key, obj) => {
 *          const fullName = `${name} ${obj.lastName}`
 *          return fullName
 *      }
 *    },
 *    input = {
 *      name: 'Tim',
 *      lastName: 'Roberts'
 *    }
 *    result = {
 *      name: 'Tim Roberts',
 *      lastName: Roberts
 *    }
 *
 * @param {Object} config - { [KEY_WE_WANT_TO_AFFECT]: [FUNCTION_TO_MODIFY_VALUE_AS_NEEDED] }
 * @param {Object} input - { [KEY_WE_WANT_TO_AFFECT]: [VALUE_WE_WANT_TO_CHANGE] }
 * @return {Object} result - { [KEY_WE_WANT_TO_AFFECT]: [VALUE_RETURNED_BY_FUNCTION]}
 */
const Maker = curry((config, input) => {
 const configKeys = Object.keys(config)
 return Object.keys(input)
    .reduce((final, key) => {
      const configIndex = configKeys.indexOf(key)
      if(~configIndex){
        final[key] = config[key].call(null, input[key], key, input)
      } else {
        final[key] = input[key]
      }
      return final
    },{})
})

module.exports = Maker
