# ScreenGrab.js

Take screengrabs of HTML elements or React components on your website

## Get Started

Fist log into https://screengrab.cloud and get your API Key from the dashboard

## Quick Start

```ts
import { ScreenGrab } from 'screngrab.js'

const screengrab = ScreenGrab('api-key')

const image = await screengrab.url('https://memezoo.app').grab()

```

