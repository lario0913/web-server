const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lario'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Page',
        name: 'Lario'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        title: 'Help Page',
        name: 'Lario'
    })
})
 
app.get('/weather', (req, res) => {

    if (!req.query.address){
    return res.send({error : 'You need to provide an address to forecast'})
    }

    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({error: error})
        }
    
        forecast(latitude, longitude, (error, {weather}={}) => {
            if(error){
                return res.send({error:error})
            }
            
            res.send({
                location: location,
                weather: weather
            })
            
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('errorPage.hbs', {
        title: '404',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('errorPage.hbs', {
        title: '404',
        error: 'Page not found'
    })
})



app.listen('3000')