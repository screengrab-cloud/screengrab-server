const server = require('./index')

// Start the server
const PORT = process.env.PORT || 3031;
server.listen(PORT, () => {
  console.log(`Server is running on `, `http://localhost:${PORT}`);
});