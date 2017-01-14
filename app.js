const restify = require('restify');
const config = require('./config');
const UserController = require('./app/controllers/UserController');
const GoodController = require('./app/controllers/GoodController');
const AddressController = require('./app/controllers/AddressController');

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
server.get('/user/code', UserController.sendVerifyCode);
server.get('/user/name/:username', UserController.getUserByName);
server.get('/user/mail', UserController.getUserByMail);
server.get('/user', UserController.getUser);
server.post('/user/password', UserController.updatePassword);
server.post('/user/avatar', UserController.updateAvatar);
server.post('/user/gender', UserController.updateGender);

//good
server.put('/good', GoodController.addGood);
server.get('/goods', GoodController.getGoods);

//address
server.put('/address', AddressController.addAddress);

server.listen(config.port, function () {
    console.log('%s listening at %s', server.name, server.url);
});