const pg = require('pg')
const client = new pg.Client ('postgres://localhost/pets_database')


const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/api/pets', async (req, res, next) => {
    try {
        const SQL = `
            SELECT *
            FROM pets
        `
        const response = await client.query(SQL)
        console.log(response.rows)
        res.send(response.rows)
       

    } catch (error) {
       

    }
})


const init = async () => {
    await client.connect ()
    console.log ("connected to database")


const SQL = `
    DROP TABLE IF EXISTS pets;
    CREATE TABLE pets(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        is_favorite BOOLEAN
        
    );
    INSERT INTO pets (name) VALUES ('Oliver');
    INSERT INTO pets (name, is_favorite) VALUES ('Max', true);
    INSERT INTO pets (name) VALUES ('Leo');
    INSERT INTO pets (name) VALUES ('Jack');
`
await client.query(SQL)
console.log("table created")

const port = 3000
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

}


init ()