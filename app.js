const express = require('express');
const session = require('express-session');
const compression = require('compression');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const loginRoute = require('./routes/login');
const mainRoute = require('./routes/main');
const uploadRoute = require('./routes/upload');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(cors());
app.use(compression());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  // ejs에서 session 접근 가능하도록 설정
  res.locals.session = req.session;
  next();
});

app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRoute);
app.use('/login', loginRoute);
app.use('/upload', uploadRoute);

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
