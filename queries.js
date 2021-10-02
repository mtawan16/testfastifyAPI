const { Client } = require('pg');
require('dotenv').config()
const client = new Client({
    user: 'postgres',
    password: process.env.PASSWORD,
    host: 'localhost',
    port: 5432,
    database: process.env.DATABASE
})
client.connect().then(()=>{
    console.log(`success connect to database`)
},(error)=>{
    console.log(error)
})


const createUser = (request, response) => {
    const {id, name, age, email } = request.body;
    client.query(
        "INSERT INTO test (id, name, age, email) VALUES ($1, $2, $3)",
        [ name, age, email], (error, result) => {
            if (error) {
                throw error;
            }
            response.status(200).send({
                "id": id,
                "name": name,
                "age": age,
                "email": email
            });
        }
    );
};

module.exports={createUser};