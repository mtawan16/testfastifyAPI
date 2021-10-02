const fastify = require('fastify')({
    logger : true,
    ignoreTraillingSlash: true
});
const db = require('./queries');
const PORT = process.env.PORT || 3000;

fastify.get('/',(req,res)=>{
    res.send({hello:'world'})
});

fastify.post('/users',db.createUser);

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