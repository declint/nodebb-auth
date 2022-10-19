const fetch = require('node-fetch');
const express = require('express')
const bodyParser = require('body-parser')
const RedisServer = require('redis-server');
const expresssession = require('express-session');
const cookieParser = require('cookie-parser')

var logger = require('morgan');
const app = express()

// Redis server
const redis_server = new RedisServer(6379);
redis_server.open((err) => {
  if (err === null) {
    console.log("Redis server started on port 6379")
}
});

//Redis store for express-session
let RedisStore = require("connect-redis")(expresssession)

//Setup redis connection
const { createClient } = require("redis")
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error)
redisClient.on("error", console.error)

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Set up our logger.
app.use(logger('dev'));

//Setup session management
const oneDay = 1000 * 60 * 60 * 24;
app.use(expresssession({
    name: "expresssession",
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: {
        maxAge: 60000, 
        httpOnly: false,
    },
    rolling: true,
    resave: true,
    store: new RedisStore({ client: redisClient }),
}));

//Store session
var globalsession = {};

async function loginAndFetchCookie(login_data)
{
    const res = await fetch('https://twin-dev.combient.com/api/v3/utilities/login', {
        method: 'POST',
        body: JSON.stringify(login_data),
        headers: { 'Content-Type': 'application/json' }
    });

    console.log(res.status)
    if (res.status != 200)
    {
        console.log(res.status)
        return ['bad-tasting-cookie']
    }

    const data = await res.json();
    console.log("🚀 ~ file: server.js ~ line 92 ~ data", data)

    //Store stuff to session
    globalsession.nodebb_user = await data
    globalsession.nodebb_cookie = res.headers.raw()['set-cookie']

    return res.headers.raw()['set-cookie'];
}

async function do_api_request(cookie_to_send){
    const url = 'https://twin-dev.combient.com/api/'
    const opts = {
        headers: {
            cookie: cookie_to_send
        }
    };
    const res = await fetch(url, opts);
    const data = await res.json();//assuming data is json
    return await data
}

app.post("/api/login", async (req, res) => { 
    globalsession = req.session;
    const superkaka = await loginAndFetchCookie(req.body);
    res.json({"superkaka": superkaka})
})

app.all("/api/gettwindemodata", async (req, res) => { 
    globalsession = req.session;
    console.log("🚀 ~ file: server.js ~ line 146 ~ app.post ~ globalsession", globalsession)    
    
    const sessionid = req.sessionID

    if (typeof globalsession.nodebb_cookie !== 'undefined')
    {
        //Do API Req from Twin
        const queryresult = await fetch('https://twin-dev.combient.com/api/topic/223', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                cookie: globalsession.nodebb_cookie,
              },
        });
    
        if (! queryresult.ok)
        {
            console.log(res.status)
            res.json({status:0, data: "Bad query"})
            return
        }
    
        const data = await queryresult;
        const datafromtwin = await data.json()
    
        res.json({
            status: 1, 
            data: datafromtwin, 
            nodebb_user: globalsession.nodebb_user.response,
            nodebb_cookie: globalsession.nodebb_cookie
        })
    }
    else
    {
        res.json({status: 0, data: "You are unknown, go away!"})
    }
})


app.listen(5000, () => {console.log("Server startad port 5000")})


