# ScreenGrab-server

Take screengrabs of HTML elements or React components on your website

## Get Started

Fist log into https://screengrab.cloud and get your API Key from the dashboard

## Quick Start

### Install as a library in your project

```sh
npm install --save screengrab-server
```

```js
const server = require("screengrab-server")
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log('Server listening on ', PORT)
})
```

### OR Clone the repository

```sh
git clone https://github.com/imageapi-dev/screengrab-server
```

Install and start the server

```sh
npm install # install nodejs dependencies
cp .env.example .env # copy to .env
npm run start # start dev server
```

### Use `screengrab.js` to take screenshots

See: https://github.com/screengrab-cloud/screengrab.js

Import `screengrab.js` into your code and get screenshots from your dev server

```ts
import { ScreenGrab } from 'screengrab.js'

const screengrab = ScreenGrab({
  server: 'http://localhost:3031'
})

const image = await screengrab.url('https://memezoo.app').grab()

console.log('screengrab url', image.url)

```

To use the cloud hosted ScreenGrab.cloud

```ts
import { ScreenGrab } from 'screengrab.js'

const screengrab = ScreenGrab('api-key')

const image = await screengrab.url('https://memezoo.app').grab()

console.log('screengrab url', image.url)

```

For detailed information refer to https://docs.screengrab.cloud 