import * as express from 'express';
import {createServer} from 'https';
import * as compression from 'compression';
import * as console_stamp from 'console-stamp';
import * as path from "path";
import {readFileSync} from "fs";
import * as cors from "cors";

console_stamp(console, '[HH:MM:ss.l]');

import {conf} from './config/conf';

const app = express();
app.use(compression({filter: (req, res)=>{
        if (req.headers['x-no-compression']) {
            return false
        }

        return compression.filter(req, res)
    }}));
app.use(cors());
app.use(express.static(path.join(__dirname,conf.front)));

const httpsServer = createServer({
    key: readFileSync(conf.ssl.key),
    cert: readFileSync(conf.ssl.cert)
},app);

httpsServer.listen(conf.port, ()=> {
    console.log('Server is listening on port '+conf.port);
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname,conf.front,'index.html')));
