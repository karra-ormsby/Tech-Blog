const path = require('path');
const express = require('express');

const session = require('express-session');
// Import express-handlebars
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connection');
// Initializes Sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({  });

const sess = {
    secret: 'Super secret secret',
    cookie: {
        //expires in 10 minutes
        maxAge: 10 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// app.use(session(sess));

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on PORT 3001'));
});
