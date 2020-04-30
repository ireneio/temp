# @meepshop/locale-parser

This package is used to parse the locales files.

## Usage

`root-folder` can be a package name or the path to the locales folder. For example, you can use `@meepshop/store` or `../store/src/public/locales`.

#### `translate <root-folder>`

Use to translate the null value in the locale files with google translation. If file does not exist, it will generate a new locale file and translate the value from `en_US`.

#### `find-null <root-folter>`

Use to check the null value in the locale files.

#### `check-keys <root-folder>`

Use to check the keys in the locale files. In each language, the keys of the locale files should be consistent.

#### `generate <root-folder> -o <path-to-output-folder>``

This command will collect the locale files and generate a file in the output folder.

- `-t`, `--types`: This option can be `json` or `csv`. The default value is `json`.

#### `copy <root-folder> -r <path-to-reference-zh_TW-file>`

This command will copy the locale files when the value in `zh_TW` can be found in the reference `zh_TW` files.

## Add a new locale

- Add the new locale to [here](./src/constants), and the value of the new locale must be a google translate url.
- Use `grep -rin es_ES --exclude=**/node_modules/** --exclude=**/.next/** --exclude=**/__generated__/** --exclude=**/lib/** --exclude=**/coverage/** --exclude=**/.git/** .` to find the files which should be added the new locales.
- Check `{{key}}` in the locale files.

## Add a new command

Add a new function to [here](./src/utils/getOptions).

- `rootFolder`: the locale folder
- `filename`: the locale filename
- `localeKey`: the key of [LOCALES](./src/constants)

#### `options`

Give the options to `beforeAll`. You can parse the command by `commander` and give this to the resolve.

#### `beforeAll(rootFolder: string, filename: string, enUSLocale: LocaleType, options: {})`

This function will run before parsing the all languages.

- `enUSLocale`: the locale in `en_US/<filename>`
- `options`: the `options` from the `getOptions`

#### `beforeEach(rootFolder: string, filename: string, localeKey: keyof typeof LOCALES)`

This function will run before parsing the each language.

#### `run(keyChaining: string[], str: string | null, existingStr: string | null | undefined, localeKey: keyof typeof LOCALES)`

This function is used to parse the locale, and give a new value to the current key.

- `keyChaining`: the key chaining of this locale value
- `str`: the `en_US` value by `keyChaining`
- `existingStr` the `localeKey` value by `keyChaining`

For example:

```js
// en_US
{
  a: {
    b: {
      c: 'value1',
    }
  },
}

// zh_TW
{
  a: {
    b: {
      c: 'value2',
    }
  },
}

/** argument
 * keyChaining: ['a, 'b', 'c']
 * str: 'value1'
 * existingStr: 'value2'
 * localeKey: 'zh_TW'
 */
```

#### `afterEach(localeKey: keyof typeof LOCALES, locale: LocaleType, localeFilePath: string)`

This function will run after parsing the each language.

- `locale`: the result of parsing
- `localeFilePath`: the output file path

#### `afterAll(rootFolder: string, filename: string)`

This function will run after parsing the all languages.

#### `end()`

Before closing the program, the program will run this function.
