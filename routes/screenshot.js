const express = require('express');
const { chromium } = require("playwright");
const fs = require('fs')

const router = express.Router();

router.get('/:slug', async (req, res) => {
  try {

    const slug = req.params.slug
    const id = slug?.slice(slug?.lastIndexOf('-') + 1).replace('.png', '')

    if (!id) throw new TypeError('id parameter required')

    const browser = await chromium.launch();

    const path = `public/screenshot/${slug}`
    const host = 'https://memezoo.app'
    const url = host + "/memes/image?id=" + id

    console.log('url', { url, id, path })
 
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 1080 });
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    await page.locator('.meme-image').screenshot({ path });
    await browser.close();

    const stream = fs.createReadStream(path)

    res.setHeader('Content-Type', 'image/png')
    stream.pipe(res)
    
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;