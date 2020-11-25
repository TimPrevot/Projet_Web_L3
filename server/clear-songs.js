const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'abcd1234',
    database: 'Final_Projet_Web_L3'
})

client.connect()

async function run() {
    await client.query({
        text: `DROP TABLE if exists songs`
    })
    console.log('Chansons effacées')
    await client.query({
        text: `CREATE TABLE if NOT EXISTS songs(id SERIAL NOT NULL CONSTRAINT songs_pkey
                PRIMARY KEY, title TEXT, artist TEXT, time TEXT, src TEXT, prix INTEGER)`
    })
    console.log('Nouvelle table des chansons créée')
    client.end()
}

run()
