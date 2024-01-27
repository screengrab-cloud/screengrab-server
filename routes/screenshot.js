const express = require('express');
const { chromium } = require("playwright");

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {

    const id = req.params.id

    if (!id) throw new TypeError('id parameter required')

    const browser = await chromium.launch();

    const path = `public/screenshots/memezoo-meme-${id}.png`
    const host = 'https://memezoo.app'
 
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 1080 });
    await page.goto(host + "/memes/image?id=" + id);
    await page.waitForLoadState('networkidle');
    await page.locator('.meme-image').screenshot({ path });
    await browser.close();
    res.json({
      data: {
        url: path
      }
    })
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;