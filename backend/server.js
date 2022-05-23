// const express = require('express')
// const dotenv = require('dotenv')
// const products = require('./data/products')

import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js';
import products from './data/products.js'

const app = express()

connectDB()

dotenv.config()

app.get('/', (req, res) => {
    res.send('La API esta corriendo')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id )
    res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`servidor corriendo en ${process.env.NODE_ENV} en el puerto ${PORT}`.yellow.bold))