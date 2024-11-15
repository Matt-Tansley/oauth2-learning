import express from "express"
import axios from "axios"
import cors from "cors"
import 'dotenv/config'

const app = express()
app.use(cors({
    credentials: true,
    origin: true
}))

app.get("/oauth/redirect", (req, res) => {
    axios({
        method: "POST",
        url: `${process.env.GITHUB_URL}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`,
        headers: {
            Accept: "application/json",
        },
    }).then((response) => {
        res.redirect(
            `http://localhost:5174?access_token=${response.data.access_token}`
        )
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Listenting at port ${process.env.PORT}`)
})