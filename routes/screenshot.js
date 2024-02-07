const express = require('express');
const { chromium } = require("playwright");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { sleep } = require('../utils/common')

const HOST_URL = process.env.HOST_URL

router.post('/create', async (req, res) => {
  try {

    const json = req.body
    const viewportSize = json.viewportSize || { width: 1280, height: 1080 }
    const url = json.url
    const locator = json.locator
    const wait = json.wait

    console.log('json', json)

    const browser = await chromium.launch();

    const uid = uuidv4()
    const imageName = `${uid}.png`
    const urlPath = `screenshot/${imageName}`
    const filePath = `public/${urlPath}`
 
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
      await page.locator(locator).first().screenshot({ path: filePath });
    } else {
      innerHTML = await page.locator('body').first().innerHTML()
      await page.screenshot({ path: filePath });
    }
    await browser.close();

    const data = {
      url: `${HOST_URL}/${urlPath}`,
      innerHTML
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