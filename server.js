const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const webhookUrl = 'https://discord.com/api/webhooks/1264594485531377786/rnnvUASuWnqOHAKpsVUPzNDtxbqpLmiLwdgKnA_emZUuBNF1HLN9oejAcWWruAakXVWH';

app.use(express.static('public'));

app.get('/track', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    // Send IP to Discord webhook
    axios.post(webhookUrl, {
        content: `New visit from IP: ${userIp}`
    })
    .then(() => {
        res.send('IP has been sent to Discord.');
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Failed to send IP.');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
