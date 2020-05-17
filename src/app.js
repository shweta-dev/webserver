const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')


const app = express()
const port = process.env.PORT || 8000 
// Define paths for Express config
console.log(__dirname)
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
        name: 'Shweta Agarwal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shweta Agarwal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Shweta Agarwal'
    })
})

app.get('/weather', (req, res) => {
   
    if(!req.query.address)
    {
        return res.send({
            error: 'Please provide the address'
        })
    }
   
    geocode(req.query.address , (error,{latitude,longitude}={})=> {
        if(error){
        return res.send({Error: error})
        }
        forecast( latitude,longitude, (error, forecast) => {
            if(error)
             return res.send({Error: error})
             res.send({
                forecast: forecast,
                address : req.query.address
                })
          })
    
    })


})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Shweta Agarwal',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Shweta Agarwal',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})