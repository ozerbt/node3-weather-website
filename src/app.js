const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

console.log(__dirname)

const app = express();


// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set("view engine", "hbs")
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title:"Weather",
        name: "Behcet Ozer"
    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Behcet Ozer'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'How do I see the current weather for my location?',
        title: 'Help',
        name: 'Behcet Ozer'
    })
})


app.get('/weather', (req, res) => {
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
         }
    forecast(latitude, longitude, (error, forecastData) => {
        if(error){
            return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
    })
    })
})
})



app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
// app.com
// app.com/help
// app.om/about

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        message:'Help article not found',
        name: 'Behcet Ozer'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title:'404',
        message: 'Page not found',
        name: 'Behcet Ozer'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000.')
})