const fs = require('fs');
const pause = require('connect-pause');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// response objects
const POST_REGISTER_RESPONSE = {"flash":"Thanks for registering!"};
const POST_LOGIN_RESPONSE = {"id": "4291", "accountname": "henkigek", "thirdparty": false};
const POST_CHANGE_PROFILE_RESPONSE = {"flash":"Your changes have been saved.","accountname":"Arno ZZZZ","email":"blablabla@gmail.com"};
const POST_CHANGE_PROFILE_NOTIFICATION_RESPONSE = {"flash":"Your changes have been saved.","publicfollow":true,"alerts":true};
const POST_ORDER_RESPONSE = {};

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Define custom routes (routes.json)
var routes = JSON.parse(fs.readFileSync('routes.json'));
server.use(jsonServer.rewriter(routes));

server.use((req, res, next) => {
  if (req.method === 'POST') {

    // login response for non openid users
    if (req.url === '/login') {
      res.status(200).jsonp(POST_LOGIN_RESPONSE);
      res.end();
    } else if (req.url === '/order') {

      // response for ordering post
      res.status(200).jsonp(POST_ORDER_RESPONSE);
      res.end();

    } else if (req.url === '/api/auth/register') {
      // reponse for registering non open id users
      res.status(200).jsonp(POST_REGISTER_RESPONSE);
      res.end();
    } else if (req.url === '/api/profile/credentials') {
      // reponse for changing user profile
      res.status(200).jsonp(POST_CHANGE_PROFILE_RESPONSE);
      res.end();
    } else if (req.url === '/api/profile/preferences') {
      // reponse for changing user profile
      res.status(200).jsonp(POST_CHANGE_PROFILE_NOTIFICATION_RESPONSE);
      res.end();
    }


  } else {
    next()
  }

});

server.use(router);

server.listen(3004, () => {
  console.log('JSON Server is running');
});
