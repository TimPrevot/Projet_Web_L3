const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'abcd1234',
    database: 'Final_Projet_Web_L3'
})

client.connect()

async function run () {
    await client.query({
        text: `CREATE TABLE if NOT EXISTS users (id INTEGER NOT NULL CONSTRAINT users_pkey PRIMARY KEY,
                pseudo TEXT, email TEXT, password TEXT)`
    })
    console.log('Table des utilisateurs créée')
    client.end()
}

run()
