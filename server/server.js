const fetch = require('node-fetch');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

let temp_login_data = {
    username: "declint",
    password: "nada123"
};

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

async function loginAndFetchCookie(login_data)
{
    const res = await fetch('http://localhost:4567/api/v3/utilities/login', {
        method: 'POST',
        body: JSON.stringify(login_data),
        headers: { 'Content-Type': 'application/json' }});

    console.log(res.status)
    if (res.status != 200)
    {
        console.log(res.status)
        return ['bad-tasting-cookie']
    }

    const data = await res.json();

    return res.headers.raw()['set-cookie'];
}

async function do_api_request(cookie_to_send){
    const url = 'http://localhost:4567/api/'
    const opts = {
        headers: {
            cookie: cookie_to_send
        }
    };
    const res = await fetch(url, opts);
    const data = await res.json();//assuming data is json

    return data
}

async function getCookieAndTheData(login_data)
{
    const superkaka = await loginAndFetchCookie(login_data);
    console.log("Superkaka:");
    console.log(superkaka);

/*    const apireq = await do_api_request(superkaka);
    console.log("API Req:");
    console.log(apireq);*/
}
getCookieAndTheData(temp_login_data);

app.post("/api/login", async (req, res) => { 
    const superkaka = await loginAndFetchCookie(req.body);
    console.log("POST Superkaka:");
    console.log(superkaka);

    console.log(req.body)

    res.json({"superkaka": superkaka})
})

app.get("/api", (req, res) => {
    res.json({"users":["user1", "user2", "Mattias"]})

})

app.listen(5000, () => {console.log("Server startad port 5000")})

