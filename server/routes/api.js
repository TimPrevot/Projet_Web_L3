const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {Client} = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '12345abcde',
    database: 'MV'
})

client.connect()

// const users = []

let songs = []

class Panier {
    constructor() {
        this.createdAt = new Date()
        this.updatedAt = new Date()
        this.articles = []
        this.totalPrice = 0
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

router.post('/disconnect', async (req, res) => {
    req.session.userId = undefined
    res.json({
        id: undefined,
        email: undefined
    })
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

// Récupération de l'utilisateur connecté
router.get('/me', async (req, res) => {
    if (typeof req.session.userId === 'undefined') {
        res.status(401).json({message: 'Utilisateur non connecté'})
        return
    }
    const result = await client.query({
        text: 'SELECT id, email, pseudo FROM users WHERE id=$1',
        values: [req.session.userId]
    })
    res.json(result.rows[0])
})

// Attribution d'un panier à l'utilisateur
router.use((req, res, next) => {
    if (typeof req.session.panier === 'undefined') {
        req.session.panier = new Panier()
    }
    next()
})

// Récupération de toutes les chansons
router.get('/songs', async (req, res) => {
    const result = await client.query({
        text: `SELECT * FROM songs`
    })
    songs = result.rows
    res.json(result.rows)
})

// Récupération du panier
router.get('/panier', (req, res) => {
    res.json(req.session.panier)
})

// Récupération du prix du panier
router.get('/panier/totalPrice', (req, res) => {
    res.json(req.session.panier.totalPrice)
})

// Ajout d'un article au panier
router.post('/panier', (req, res) => {
    if (typeof req.session.userId === 'undefined') {
        res.status(401).json({message: 'Utilisateur non connecté'})
        return
    }
    const articleId = parseInt(req.body.id)
    const articleExists = songs.find(a => a.id === articleId) !== undefined
    const articleIsAlreadyInPanier = req.session.panier.articles.find(a => a.id === articleId) !== undefined

    if (articleExists && !articleIsAlreadyInPanier) {
        req.session.panier.articles.push(songs.find(a => a.id === articleId))
        req.session.panier.totalPrice += songs[articleId - 1].prix
        res.json({id: articleId})
    } else {
        res.status(400).json({message: 'Invalid parameters'})
    }
})

// Suppression d'un article du panier
router.delete('/panier/:articleId', (req, res) => {
    if (typeof req.session.userId === 'undefined') {
        res.status(401).json({message: 'Vous devez être connecté pour ajouter au panier !'})
        return
    }
    const articleId = parseInt(req.params.articleId)
    const articleToRemove = req.session.panier.articles.find(a => a.id === articleId)
    if (articleToRemove === undefined) {
        res.status(400).json({message: 'Invalid parameters'})
    } else {
        const indexToDelete = req.session.panier.articles.findIndex(a => a.id === articleId)
        req.session.panier.articles.splice(indexToDelete, 1)
        req.session.panier.totalPrice -= articleToRemove.prix
        res.json(req.session.panier)
    }
})

module.exports = router
