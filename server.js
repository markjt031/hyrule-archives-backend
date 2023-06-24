require('dotenv').config()
const express=require('express')
const session=require('express-session')
const routes=require('./routes/index')

const app = express()
const cors = require("cors")
const PORT=process.env.PORT

const corsOptions ={
    origin: ['https://hyrule-archives-frontend.vercel.app', 'http://localhost:3000'],
    credentials:true,            
    optionSuccessStatus:200
}
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        sameSite: 'none',
        httpOnly: false,
        secure: true,
        expires: 60000
    }
}))
app.use(cors(corsOptions))

app.use('/', routes)


app.get('/', (req, res)=>{
    res.sendFile(__dirname +"/index.html")
})

app.use((req, res) => {res.status(404).json({message: "NOT A PROPER ROUTE"})})
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));