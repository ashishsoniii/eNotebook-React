
const connectToMongo = require('./db');

const express = require('express')
connectToMongo();

const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json());

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))


app.listen(port, () => {
    console.log(`Inotebook listening at https://localhost:${port}`)
})