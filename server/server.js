const fetch = require('node-fetch');

let login_data = {
    username: "declint",
    password: "nada123"
};

async function fetchCookie()
{
    const res = await fetch('http://localhost:4567/api/v3/utilities/login', {
        method: 'POST',
        body: JSON.stringify(login_data),
        headers: { 'Content-Type': 'application/json' }});
    const data = await res.json();

    return res.headers.raw()['set-cookie'];
}

async function do_api_request(cookie_to_send){
    const url = 'http://localhost:4567/api'
    const opts = {
        headers: {
            cookie: cookie_to_send
        }
    };
    const res = await fetch(url, opts);
    const data = await res.json();//assuming data is json

    return data
}

async function getCookieAndTheData()
{
    const superkaka = await fetchCookie();
    console.log("Superkaka:");
    console.log(superkaka);

    const apireq = await do_api_request(superkaka);
    console.log("API Req:");
    console.log(apireq);
}

getCookieAndTheData();


