const express = require('express');
const { chromium } = require("playwright");
const router = express.Router();
const { sleep } = require('../utils/common')

router.post('/innerHTML', async (req, res) => {
  try {

    const json = req.body
    const viewportSize = json.viewportSize || { width: 1280, height: 1080 }
    const url = json.url
    const locator = json.locator
    const wait = json.wait

    console.log('request', json)

    const browser = await chromium.launch();
 
    const page = await browser.newPage();
    await page.setViewportSize(viewportSize);
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    if (wait) {
      await sleep(wait)
    }
    let innerHTML = ''
    if (locator) {
      innerHTML = await page.locator(locator).first().innerHTML()
    } else {
      innerHTML = await page.locator(locator).first().innerHTML()
    }
    await browser.close();

    const data = {
      innerHTML
    }

    console.log('resp', data)

    res.json({
      ok: true,
      data
    })
    
  } catch (error) {
    console.error('Error capturing html:', error);
    res.status(500).json({
      error: {
        message: error.message
      }
    });
  }
});

module.exports = router;