import express from 'express'
import twilio from 'twilio'
require('dotenv').config()

const app = express()
app.use(express.urlencoded())

const accountSid = process.env.TWILIO_ACCOUNT_SID!
console.log('Account ID', accountSid)
const authToken = process.env.TWILIO_AUTH_TOKEN!
const client = twilio(accountSid, authToken)

app.post('/auth', async (req, res) => {
    try {
        console.log('Body', req.body)
        const { phoneNumber } = req.body
        console.log('Phone number', phoneNumber)
        if(typeof(phoneNumber) === 'string') {
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

app.post('/verify', async (req, res) => {
    const { phoneNumber, otp, address } = req.body
    if (
        typeof (phoneNumber) === 'string' &&
        typeof (otp) === 'string'
        ) {
        const verificationCheck = await client.verify.services(process.env.SERVICE_ID!)
            .verificationChecks
            .create({ to: phoneNumber, code: otp })

        console.log('OTP verification status', verificationCheck)

        const {status} = verificationCheck
        if(status === 'approved') {

            res.send(201)
        } else {
            res.send(422)
        }


    } else {
        res.send(422)
    }
})
const port = Number(process.env.PORT || 3000)
app.listen(port, () => {
    console.log('Express server started on port: ' + port);
})
