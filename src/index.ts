import express from 'express'

const app = express()

app.post('/auth', (req, res) => {
    res.send('ok')
})

const port = Number(process.env.PORT || 3000)
app.listen(port, () => {
    console.log('Express server started on port: ' + port);
});
