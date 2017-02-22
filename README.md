# Config Mapper

> One final schema to bind them

## Usage

```
yarn add @beardedtim/config-mapper


```

## Mapper

This is the only method so far and has the following signature:

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
