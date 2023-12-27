const express = require('express')
const connectDB = require("./Connectdb/connect")
const router = require('./Routes/handler')
const bodyParser = require('body-parser')

// Port
const port = 2500

// Intialise App
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Get Request
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})

// Post Request
app.post('/about', (req,res)=>{
    res.send('Post request')
})
app.patch('/patch', (req,res)=>{
    res.send('Patch request')
})
app.delete('/delete', (req,res)=>{
    res.send('Delete request')
})

app.use("/api/v1", router)



const start = async()=>{
    try {
        await connectDB();
        console.log("Success")
        app.listen(port, () =>{
            console.log(`app running on ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
