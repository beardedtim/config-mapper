const { curry } = require('ramda')

/**
 * Maps values from one object to the
 * boilerplate of another
//  *
//  * EXAMPLE:
//  *
//  *  config = {
//  *    [FINAL_CONFIGUED_KEY]: {
//  *        resourceName: [KEY_NAME_ON_INCOMING_DATA],
//  *        {...optionalProperties} // label, rowId, etc
//  *    }
//  *  }
//  *
//  *  input = {
//  *    [KEY_NAME_ON_INCOMING_DATA]: [ANY_VALUE]
//  *  }
//  *
//  *  Mapped(config,input) =>
//  *  { [FINAL_CONFIGUED_KEY]: { value: [ANY_VALUE], {...optionalProperties} } }
//  *
//  *
//  * If need be, we can flatten this out but this way we can pass any props that
//  * the object might need to fulfill its purpose.
//  *
//  * @param {Object} config - an object following the above schema
//  * @param {Object} input - an object to configure
//  * @return {Object} - an object configured by config and given values by input
//  */
// // Mapper : Object -> Object -> Object
const Mapper = curry((config, input) => {
  // We grab all of the keys that the config
  // object has. These are the keys that we
  // want on the final object
  const configKeys = Object.keys(config)
  // Now we grab all of the incoming keys that
  // we should be listening for. resourceName
  // value is going to match against the input
  // object's keys.
  const resourceNames = configKeys.map( key => config[key].resourceName )
  // Now that we have all we need to start mapping,
  // we get all of the keys from input and then
  // create a new object asking the config if it
  // has asked to change any keys.
  return Object.keys(input).reduce((final, key) => {
    // Find the given key inside of the known
    // resourceName aliases that we have
    const keyIndex = resourceNames.indexOf(key)
    // If we have an index > -1
    if(~keyIndex){
      // Grab the key the config object wants
      // to name this value
      const mappedKey = configKeys[keyIndex]
      // Grab any additional props from the config
      // object to assign to this value
      const { resourceName, ...props } = config[mappedKey]
      // Set the returned object's value to be
      // an object with the original value and
      // and of the extra values we wanted to pass
      final[mappedKey] = {
        value: input[key],
        ...props
      }
    } else {
      // If the config object has not asked to
      // rewrite the input key, just assing it
      // to the returned object as is.
      final[key] = input[key]
    }
    // Return either the
    return final
  },{})
})

module.exports = Mapper
