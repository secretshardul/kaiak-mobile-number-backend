import express from 'express'
import twilio from 'twilio'
require('dotenv').config()

const app = express()
const accountSid = process.env.TWILIO_ACCOUNT_SID!
console.log('Account ID', accountSid)
const authToken = process.env.TWILIO_AUTH_TOKEN!
const client = twilio(accountSid, authToken)

app.post('/auth', async (req, res) => {
    try {
        const { phoneNumber } = req.query
        console.log('Phone number', phoneNumber)
        if(phoneNumber && typeof(phoneNumber) == 'string') {
            const verification = await client.verify.services(process.env.SERVICE_ID!)
                .verifications
                .create({ to: phoneNumber, channel: 'sms' })

            console.log('Verification status', verification.status)
            res.send(verification.status)
        } else {
            res.sendStatus(422)
        }

    } catch(error) {
        res.send(error)
    }
})

const port = Number(process.env.PORT || 3000)
app.listen(port, () => {
    console.log('Express server started on port: ' + port);
})
