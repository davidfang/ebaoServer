const restify = require('restify');
const config = require('./config');
const UserController = require('./app/controllers/UserController');
const GoodController = require('./app/controllers/GoodController');
const AddressController = require('./app/controllers/AddressController');
const CommentController = require('./app/controllers/CommentController');
const CartController = require('./app/controllers/CartController');
const OrderController = require('./app/controllers/OrderController');

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
server.get('/user/name/:username', UserController.getByName);
server.get('/user/mail', UserController.getUserByMail);
server.get('/user', UserController.getUser);
server.post('/user/password', UserController.updatePassword);
server.post('/user/avatar', UserController.updateAvatar);
server.post('/user/gender', UserController.updateGender);

//good
server.put('/good', GoodController.add);
server.get('/goods', GoodController.getGoods);
server.get('/good', GoodController.getById);

//address
server.get('/addresses', AddressController.getAddresses);
server.put('/address', AddressController.add);
server.post('/address', AddressController.update);

//comment
server.get('/comment', CommentController.getByUserIdAndGoodId);
server.get('/comments', CommentController.getAllByGoodId);
server.put('/comment', CommentController.add);
server.post('/comment', CommentController.update);

//cart
server.get('/cart', CartController.getByUserIdAndGoodId);
server.get('/carts', CartController.getAllByUserId);
server.put('/cart', CartController.add);
server.post('/cart', CartController.update);

//order
server.put('/order', OrderController.add);

server.listen(config.port, function () {
    console.log('%s listening at %s', server.name, server.url);
});