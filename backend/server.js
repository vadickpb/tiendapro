// const express = require('express')
// const dotenv = require('dotenv')
// const products = require('./data/products')

import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js';

import { notFound, errorMessage } from './middleware/errorMiddleware.js';


import productRoutes from './routes/productsRoutes.js'

const app = express()

connectDB()

dotenv.config()

app.get('/', (req, res) => {
    res.send('La API esta corriendo')
})

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorMessage)



const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`servidor corriendo en ${process.env.NODE_ENV} en el puerto ${PORT}`.yellow.bold))