const songs = require('./data/articles.js')
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '12345abcde',
    database: 'MV'
})

client.connect()

async function run () {
    await client.query({
        text: `CREATE TABLE if NOT EXISTS songs(id SERIAL NOT NULL CONSTRAINT songs_pkey
                PRIMARY KEY, title TEXT, artist TEXT, time TEXT, src TEXT, prix INTEGER)`
    })
    console.log('Table des chansons créée')

    for (const song of songs) {
        await client.query({
            text: `INSERT INTO songs(id, title, artist, time, src, prix) VALUES ($1, $2, $3, $4, $5, $6)`,
            values: [song.id, song.title, song.artist, song.time, song.src, song.prix]
        })
    }
    console.log('Importation des chansons terminée')
    client.end()
}

run()
