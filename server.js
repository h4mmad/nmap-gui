const { exec } = require("child_process");
const express = require('express')
const cors = require('cors');
const convert = require('xml-js');
const { json } = require("express");
const app = express()

app.use(cors());

app.get('/:host/:scanType', function (req, res) {
    console.log(req.params.scanType, req.params.host);

    console.log('Someone connected');
    exec(`nmap ${req.params.scanType} ${req.params.host} -oX scan.xml`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.send({ error: error });
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.send({ error: stderr });
            return;
        }
        const xml = require('fs').readFileSync('./scan.xml', 'utf8');
        let result = convert.xml2json(xml, { compact: true, spaces: 2 });
        result = JSON.parse(result);
        result['stdout'] = stdout;

        res.send(result);
        console.log(result);
    });
})

app.get('/:fullScanCommand', function (req, res) {
    console.log(req.params.fullScanCommand);

    console.log('Someone connected');
    exec(`fullScanCommand -oX scan.xml`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.send({ error: error });
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.send({ error: stderr });
            return;
        }
        const xml = require('fs').readFileSync('./scan.xml', 'utf8');
        let result = convert.xml2json(xml, { compact: true, spaces: 2 });
        result = JSON.parse(result);
        result['stdout'] = stdout;

        res.send(result);
        console.log(result);
    });
})

app.listen(6969)