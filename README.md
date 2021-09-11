# stone-cli

CLI+Server for [stone css's](https://github.com/barelyhuman/stone) I/O operations

## About

A cli that currently works with the [`CSSWebIOAdaptor`](https://github.com/barelyhuman/stone/blob/dev/src/adaptors/css-web-io.js) of stone. This enables the adaptor to send through various forms of requests for the server to handle io with. Making it a little more generic and not tool dependent.

## Installation

```bash
  npm install @barelyhuman/stone-cli
  #or
  yarn add @barelyhuman/stone-cli
```

## Usage/Examples

```sh

  $ stone-cli [flags]

    > flags
     -p --port Change the port the server run's on (default: ${DEFAULT_PORT})


```

## Contributing

Contributions are always welcome!

Follow the general github flow of Fork => PR, make sure that you let the authors know about the issue you pick to avoid overlaps.

## Authors

- [@barelyhuman](https://www.github.com/barelyhuman)

## Support

For support, email ahoy@barelyhuman.dev

## License

[MIT](https://choosealicense.com/licenses/mit/)
