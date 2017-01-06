const restify = require('restify');
const config = require('./config');
const UserController = require('./app/controllers/UserController');
const GoodController = require('./app/controllers/GoodController');

const server = restify.createServer({
    name: 'ebao-react-native-app'
});

server.use(restify.fullResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get(/^\/((.*)(\.)(.+))*$/, restify.serveStatic(
    {
        directory: 'public',
        default: "index.html"
    })
);

//user
server.put('/user', UserController.register);
server.get('/user', UserController.checkRegisterInfo);

//good
server.put('/good', GoodController.createGood);
server.get('/goods', GoodController.getGoods);

server.listen(config.port, function () {
    console.log('%s listening at %s', server.name, server.url);
});