const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8081;

app.use(cors({ origin: 'http://localhost:8081' }));

app.use(bodyParser.json()); // application/json content-type
app.use(bodyParser.urlencoded({ extended: true }));
// requests of application/x-www-form-urlencoded content-type

const db = require('./models');
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.');
// });
db.sequelize.sync();
// Import routing
require('./routes/script.routes')(app);

app.listen(PORT, () => console.log(`Running on ${PORT}...`));
