const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
	const quote = getRandomElement(quotes);
	res.send({ quote: quote });
});

app.get('/api/quotes', (req, res, next) => {
	const person = req.query.person;

	if (person) {
		const newArray = quotes.filter(quote => quote.person === person);
		res.send({ quotes: newArray });
	}

	res.send({ quotes: quotes });
});

app.post('/api/quotes', (req, res, next) => {
	const quoteText = req.query.quote;
	const quotePerson = req.query.person;

	if (quoteText && quotePerson) {
		const newQuote = req.query;
		quotes.push(newQuote);
		res.send({ quote: newQuote });
	} else {
		res.status(400).send();
	}
});

app.listen(PORT);
