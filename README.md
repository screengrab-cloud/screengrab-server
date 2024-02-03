# ScreenGrab-server

Take screengrabs of HTML elements or React components on your website

## Get Started

Fist log into https://screengrab.cloud and get your API Key from the dashboard

## Quick Start

Clone the repository

```sh
git clone https://github.com/imageapi-dev/screengrab-server
```

Install and start the server

```sh
npm install # install nodejs dependencies
cp .env.example .env # copy to .env
npm run start # start dev server
```

Import ScreenGrab.js into your code and get screenshots from your dev server

```ts
import { ScreenGrab } from 'screngrab.js'

const screengrab = ScreenGrab({
  server: 'http://localhost:3031'
})

const image = await screengrab.url('https://memezoo.app').grab()

console.log('screengrab url', image.url)

```

To use the cloud hosted ScreenGrab.cloud

```ts
import { ScreenGrab } from 'screngrab.js'

const screengrab = ScreenGrab('api-key')

const image = await screengrab.url('https://memezoo.app').grab()

console.log('screengrab url', image.url)

```

For detailed information refer to https://docs.screengrab.cloud 