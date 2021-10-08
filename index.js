const fastify = require('fastify')({
    logger : true,
    ignoreTraillingSlash: true
});

// fastify.register(require('fastify-multipart'))
fastify.register(require('fastify-formbody'))

fastify.register(require('fastify-cors'), { 
    // put your options here
  })

const db = require('./queries');
const PORT = process.env.PORT || 3000;

fastify.get('/',(req,res)=>{
    res.send({hello:'world'})
});

fastify.get('/getusers',db.getUser);

fastify.post('/users',db.createUser);

fastify.post('/delusers',db.deleteUser);

const start = async () => {
    try{
        await fastify.listen(PORT,'0.0.0.0');
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    }
    catch(err){
        fastify.log.console.error(err);
        process.exit(1);
    }
};

start();