const app = require('./app');
const config = require('./config/config');
const PORT = config.app.port || 4000;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});