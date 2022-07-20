const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

//Weather end point
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'provide a location'
        })
    }
    else{ 
        geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
            if(error)
                return res.send({error})
            forcast(latitude,longitude,(error,forcast_data)=>{
                if(error)
                    return res.send({error})
                //console.log(location)
                //console.log('Forcast: ',forcast_data)
                res.send({
                    forecast: forcast_data,location,
                    //location: 'Imphal'
                    address: location
                })
            })
        }) 
    }

    
})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        return  res.send({
            error: 'Search term not found!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})