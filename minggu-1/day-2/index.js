// import http from 'http'

// const server = http.createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('Hello World')
//     res.end()

// })
// .listen(3000);

import http from 'http'
import { hello } from './hello.js'
import moment from 'moment'


// const server = http.createServer((req, res) => {
//     const url = req.url;
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'application/json');
//     if (url === '/tsaqif') {
//         res.write("tsaqif muwaffaq")
//     }
//     if (url === '/hanif') {
//         res.write("hanif mufadhdhal")
//     }
//      if (url === '/egi') {
//         res.write("egi maulana fikri")
//     }
//     if (url === '/ronaldo') {
//         res.write("cristiano ronaldo")
//     }
//      if (url === '/yusuf') {
//         res.write("yusuf ramadhani")
//     }
//     if (url === '/faqih') {
//         res.write("abdurrahman faqih")
//     }
//      if (url === '/mutiara') {
//         res.write("mutiara haya afifah")
//     }
//     if (url === '/faza') {
//         res.write("faza fityan")
//     }
//      if (url === '/raska') {
//         res.write("damara raska")
//     }
//     if (url === '/vian') {
//         res.write("vian nathan")
//     }

//     res.end();

// })

const server = http.createServer((req, res) => {
    const url = req.url;
    let responseText = '';
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    switch(url) {
        case '/tsaqif':
            responseText = 'tsaqif muwaffaq';
            break;
        case '/hanif':
            responseText = 'hanif mufadhdhal';
            break;
        case '/egi':
            responseText = 'egi maulana fikri';
            break;
        case '/ronaldo':
            responseText = 'cristiano ronaldo';
            break;
        case '/yusuf':
            responseText = 'yusuf ramadhani';
            break;
        case '/faqih':
            responseText = 'abdurrahman faqih';
            break;
        case '/mutiara':
            responseText = 'mutiara haya afifah';
            break;
        case '/faza':
            responseText = 'faza fityan';
            break;
        case '/raska':
            responseText = 'damara raska';
            break;
        case '/vian':
            responseText = 'vian nathan';
            break;
        default:}
    
    res.write(responseText);
    res.end();
});


const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);
});