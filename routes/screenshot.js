const express = require('express');
const { chromium } = require("playwright");
const fs = require('fs')

const router = express.Router();

const PORT = process.env.PORT
const HOST_URL = 'http://localhost:' + PORT

router.post('/create', async (req, res) => {
  try {

    const json = req.body
    const viewportSize = json.viewportSize || { width: 1280, height: 1080 }
    const url = json.url
    const locator = json.locator

    console.log('json', json)

    const browser = await chromium.launch();

    const imageName = 'test.png'
    const urlPath = `screenshot/${imageName}`
    const filePath = `public/${urlPath}`

    console.log('url', { url, id, path })
 
    const page = await browser.newPage();
    await page.setViewportSize(viewportSize);
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    if (locator) {
      await page.locator(locator).screenshot({ path: filePath });
    } else {
      await page.screenshot({ path: filePath });
    }
    await browser.close();

    const data = {
      url: `${HOST_URL}/${urlPath}`
    }

    res.json(data)
    
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;