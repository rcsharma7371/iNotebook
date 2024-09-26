const express = require('express')
const connectToDb = require("./db");
connectToDb();

const app = express();
const port = 3000;

app.use(express.json());
app.listen(port,()=>{
    console.log(`Server is listening on ${port}`)
})

//Available routes
app.use('/api/auth/',require('./routes/auth'));
app.use('/api/notes/',require('./routes/notes'));

app.get('/', (req, res)=> {
  res.send('Hello World')
})
