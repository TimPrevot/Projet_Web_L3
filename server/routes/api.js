/* eslint-disable */
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Client } = require('pg')
const songs = require('../data/articles')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'abcd1234',
    database: 'Final_Projet_Web_L3'
})

client.connect()

const users = []

class Panier {
    constructor () {
        this.createdAt = new Date()
        this.updatedAt = new Date()
        this.articles = []
    }
}

// Login
router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const result = await client.query({
        text: `SELECT * FROM users WHERE email = $1`,
        values: [email]
    })
    if (result.rows.length === 0) {
        res.status(401).json({
            message: 'user doesnt exist'
        })
        return
    }
    const user = result.rows[0]

    if (await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id
        res.json({
            id: user.id,
            email: user.email
        })
    } else {
        res.status(401).json({
            message: 'bad password'
        })
        return
    }
})

// Register
router.post('/register', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const pseudo = req.body.pseudo
    const result = await client.query({
        text: `SELECT * FROM users WHERE email = $1`,
        values: [email]
    })
    if (result.rows.length > 0) {
        res.status(401).json({
            message: 'user already exists'
        })
        return
    }
    const hash = await bcrypt.hash(password, 10)
    await client.query({
        text: `INSERT INTO users (email, password, pseudo) VALUES ($1, $2, $3)`,
        values: [email, hash, pseudo]
    })
    res.send('ok')
})

// Attribution d'un panier à l'utilisateur
router.use((req, res, next) => {
    if(typeof req.session.panier === 'undefined') {
        req.session.panier = new Panier()
    }
    next()
})

// Récupération de tous les articles
router.get('/songs', async (req, res) => {
    res.json(req.session.songs)
})

// Récupération du panier
router.get('/panier', (req, res) => {
    res.json(req.session.panier)
})

// Ajout d'un article au panier
router.post('/panier', (req, res) => {
    if (typeof req.session.userId === 'undefined') {
        res.status(401).json({ message: 'Utilisateur non connecté' })
        return
    }
    const articleId = parseInt(req.body.id)
    const articleExists = songs.find(a => a.id === articleId) !== undefined
    const articleIsAlreadyInPanier = req.session.panier.articles.find(a => a.id === articleId) !== undefined

    if (articleExists && !articleIsAlreadyInPanier) {
        req.session.panier.articles.push(songs.find)
        res.json({ id: articleId })
    } else {
        res.status(400).json({ message: 'Invalid parameters' })
    }
})

// Suppression d'un article du panier
router.delete('/panier/:articleId', (req, res) => {
    if (typeof req.session.userId === 'undefined') {
        res.status(401).json({ message: 'Vous devez être connecté pour ajouter au panier !' })
        return
    }
    const articleId = parseInt(req.params.articleId)
    const articleToRemove = req.session.panier.articles.find(a => a.id === articleId)
    if (articleToRemove === undefined) {
        res.status(400).json({ message: 'Invalid parameters' })
    } else {
        const indexToDelete = req.session.panier.articles.findIndex(a => a.id === articleId)
        req.session.panier.articles.splice(indexToDelete, 1)
        res.json(req.session.panier)
    }
})

module.exports = router
