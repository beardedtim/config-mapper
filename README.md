# Config Mapper

> One final schema to bind them

## Usage

```
yarn add @beardedtim/config-mapper


```

## Mapper

```
Mapper : Object -> Object -> Object
const Mapper = (config, input) => Object
```

The `config` object must look like the following:

```
const config = {
  [FINAL_KEY_NAME_DESIRED]: {
    resourceName: [KEY_NAME_ON_INPUT_DATA],
    {...otherValues}
  }
}
```

- Each key on the `config` object is the key that we desire on the output object.
- Each key MUST have a `resourceName` and that is to be set to the key on the input object that we want to map to the config key.
- We can pass in any other values that this configured object needs.

The `input` object can be any object with any keys. The following is an example of using this function:

```
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

const configured = Mapped(config, input)

configured === ({
    realName: {
      value: 'Tim'
    },
    username: {
      value: 'beardedtim'
    },
    age: 28
})
```

## Maker

```
Maker : Object -> Object -> Object
const Maker = (config, input) => Object
```

The `config` object should look like this:

```
{
  [KEY_WE_WANT_TO_AFFECT]: [FUNCTION_TO_MODIFY_VALUE_AS_NEEDED]
}
```

The function called will be passed the following values:

- `input[key]` : The value of the input object at the given key.
- `key` : The key we are currently dealing with.
- `input` : The input object we were given this value from.

The `input` object should look like this:

```
{
  [KEY_WE_WANT_TO_AFFECT]: [VALUE_WE_WANT_TO_MODIFY]
}
```

The following is an example of using the Maker function. Suppose that we have data coming into a function that we want to make sure is valid ( we could `try/catch` our Maker calls and ensure validation or we can truncate text if it is too long coming in as a prop ) for the component/routine/class/et al we are using the input from.

```
const config = {
  donorIDs: list => list.slice(0,5)
}

const input = {
  donorIDs: [1,2,3,4,5,6,7,8,9,10]
}

const configured = Maker(config,input)

const configured === ({
    donorIDs: [1,2,3,4,5]
})
```
