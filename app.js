const express = require('express');
const keys = require('./config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Set static fodler
app.use(express.static(`${__dirname}/public`));


//Index route
app.get('/', (req, res) => {
    res.render('index', {
        stripePublishableKey: keys.stripePublishableKey
    });
});

app.get('/success', (req, res) => {
    res.render('success');
});

app.get('/moreinfo', (req, res) => {
    res.render('moreinfo');
});

//CCGB Link
app.get('/ccgb', (req, res) => {
    res.render('ccgb', {
        stripePublishableKey: keys.stripePublishableKey
    });
});

//charge route
app.post('/charge', (req, res) => {
    console.log(req.body);
    const amount = 2000;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Walletblocker',
        currency: 'usd',
        customer: customer.id
    }))
    .then(charge => res.render('success'));
});

app.post('/charge2', (req, res) => {
    console.log(req.body);
    const amount = 3000;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Walletblocker',
        currency: 'usd',
        customer: customer.id
    }))
    .then(charge => res.render('success'));
});

//CCGB Charge Routes
app.post('/charge3', (req, res) => {
    console.log(req.body);
    const amount = 1999;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Walletblocker',
        currency: 'usd',
        customer: customer.id
    }))
    .then(charge => res.render('success'));
});

app.post('/charge4', (req, res) => {
    console.log(req.body);
    const amount = 2999;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Walletblocker',
        currency: 'usd',
        customer: customer.id
    }))
    .then(charge => res.render('success'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
