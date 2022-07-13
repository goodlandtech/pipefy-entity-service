import express from 'express'
import 'dotenv/config'
import entity from "./entity"

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

app.post('/publish-entity', (req, res) => {
    console.log(req.body)
    // execute main function
    console.log("executed main funciton")
    res.send("funciton Executed")
})

app.listen(port, () => {
    console.log(`Server is runing on port${port}`)
})