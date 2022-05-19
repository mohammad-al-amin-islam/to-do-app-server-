const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
// vLCM22RPfgbeRJ6H



const uri = "mongodb+srv://todoUser:vLCM22RPfgbeRJ6H@cluster0.eukmj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run() {
    try {
        await client.connect();
        const collection = client.db("todolist").collection("list");

        app.post('/todolist', async (req, res) => {
            const data = req.body;
            const result = await collection.insertOne(data);
            res.send(result);
        })
        app.get('/todolist', async (req, res) => {
            const query = {}
            const result = await collection.find(query).toArray();
            res.send(result);
        })
        app.delete('/todolist/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await collection.deleteOne(query);
            res.send(result);
        })
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);










app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})