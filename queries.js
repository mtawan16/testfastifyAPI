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

const getUser = async (request, response) => {
    var data = await client.query("SELECT * FROM datarcp");
    response.send(data['rows'])
};

const createUser = (request, response) => {
    const config = request.body;
    // console.log(config)
    // console.log(config.config)
    client.query(
        "INSERT INTO datarcp(config) VALUES($1)", [ config.config ], 
        (error, result) => {
            if (error) {
                throw error;
            }
            response.status(200).send({
                "config": config,
            });
        }
    );
    response.send(config)
};

const deleteUser = (request, response) => {
    const config = request.body;
    // console.log(config)
    // console.log(config.config)
    client.query(
        `DELETE FROM datarcp WHERE config='${config.config}'`, 
        (error, result) => {
            if (error) {
                throw error;
            }
            response.status(200).send({
                "config": config,
            });
        }
    );
    response.send(config)
};

module.exports={createUser,deleteUser,getUser};