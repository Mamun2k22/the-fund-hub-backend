const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
// const MT5API = require('node-mt5-api');

// const mt5Client = new MT5API({
//   server: 'your_server_address',
//   port: 'your_server_port',
//   login: 'your_username',
//   password: 'your_password',
// });

// mt5Client.on('connect', () => {
//   console.log('Connected to MT5 API');
// });

// mt5Client.on('disconnect', () => {
//   console.log('Disconnected from MT5 API');
// });

// mt5Client.connect();

// // Example: Place a trade
// const tradeRequest = {
//     symbol: 'EURUSD',
//     action: 'OP_BUY',
//     volume: 0.1,
//     type: 'ORDER_TYPE_MARKET',
//   };
  
//   mt5Client.TradeRequest(tradeRequest).then((response) => {
//     console.log('Trade placed successfully:', response);
//   }).catch((error) => {
//     console.error('Error placing trade:', error);
//   });

//   app.get('/account', (req, res) => {
//     mt5Client.AccountInfo().then((accountInfo) => {
//       res.json(accountInfo);
//     }).catch((error) => {
//       console.error('Error fetching account information:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     });
//   });
  


// middle ware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://thefundedhub:T05wRpeSzqBfsEbn@cluster2.lu6c7sr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        const usersCollection = client.db('funded').collection('users');

        // post user details 
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            user.verified = false;
            const result = await usersCollection.insertOne(user);
            console.log(result);
            res.send(result);
        });

        // Get User  By Email
        app.get("/users", async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            res.send(result);
        });

    }

    finally {

    }
} run().catch(console.log);

app.get('/', (req, res) => {
    res.send('Server is Running');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
