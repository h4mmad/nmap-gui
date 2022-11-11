const { exec } = require("child_process");
const express = require('express')
const cors = require('cors');
const convert = require('xml-js');
const app = express()

app.use(cors());

app.get('/:host', function (req, res) {

    console.log('Someone connected');
    exec(`nmap -oX scan.xml -Pn -F ${req.params.host}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.send(error);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.send(stderr);
            return;
        }

        const xml = require('fs').readFileSync('./scan.xml', 'utf8');
        const result = convert.xml2json(xml, { compact: true, spaces: 2 });
        
        console.log(result);
        res.send(stdout);
        console.log(stdout);
    });
})

app.listen(6969)