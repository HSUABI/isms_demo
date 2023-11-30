const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const loginRoute = require('./routes/login');
const mainRoute = require('./routes/main');
const uploadRoute = require('./routes/upload');

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRoute);
app.use('/main', mainRoute);
app.use('/upload', uploadRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
