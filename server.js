const express = require('express');
const fs = require('fs')
const path = require('path')
const hbs = require('hbs')

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = console.log(`${now}: ${req.method} ${req.url}`)
	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log')
		}
	})
	next();
})

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})



app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		name: 'Jawann',
		likes: [
			'Dancing',
			'Eating'
		],
	})
})

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	})
})

app.get('/help', (req, res) => {
	res.sendFile((__dirname + './help.html'))
})

app.get('/json', (req, res) => {
	res.sendFile((__dirname + './data.json'))
})

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'unable to handle request'
	})
})

app.listen(3000, () => {
	console.log('Go to 3000!')
});

