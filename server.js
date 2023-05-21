require('dotenv').config()
const express=require('express');
const routes=require('./routes/index')

const app = express();
const cors = require("cors");
const PORT=process.env.PORT

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use('/', routes)


app.get('/', (req, res)=>{
    res.send('Testing')
})

app.use((req, res) => {res.status(404).json({message: "NOT A PROPER ROUTE"})})
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));