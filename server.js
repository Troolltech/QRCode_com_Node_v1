const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const qrcode = require('qrcode');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())

app.post('/qrcode', (req, res) => {
    const {url} = req.body
    qrcode.toDataURL(url, (err, src) => {
        res.status(200).json({url: src})
    })
})

app.listen(port);