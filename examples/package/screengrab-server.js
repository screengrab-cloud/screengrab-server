const server = require("screengrab-server")
const PORT = process.env.PORT || 3031
server.listen(PORT, () => {
  console.log(`ScreenGrab server listening on http://localhost:${PORT}`)
})