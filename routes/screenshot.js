const express = require('express');
const { chromium } = require("playwright");
const router = express.Router();

const HOST_URL = process.env.HOST_URL

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
 
    const page = await browser.newPage();
    await page.setViewportSize(viewportSize);
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    if (locator) {
      await page.locator(locator).first().screenshot({ path: filePath });
    } else {
      await page.screenshot({ path: filePath });
    }
    await browser.close();

    const data = {
      url: `${HOST_URL}/${urlPath}`
    }

    console.log('data', data)

    res.json({
      ok: true,
      data
    })
    
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    res.status(500).json({
      error: {
        message: error.message
      }
    });
  }
});

module.exports = router;