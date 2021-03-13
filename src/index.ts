import express from 'express'
import twilio from 'twilio'
import getContract, { NanoAddressContract } from './near/Contract'
require('dotenv').config()

const app = express()
app.use(express.urlencoded())

const accountSid = process.env.TWILIO_ACCOUNT_SID!
console.log('Account ID', accountSid)
const authToken = process.env.TWILIO_AUTH_TOKEN!
const client = twilio(accountSid, authToken)

let contract: NanoAddressContract | undefined = undefined

app.post('/verify', async (req, res) => {
    try {
        console.log('Body', req.body)
        const { mobileNumber } = req.body
        console.log('Phone number', mobileNumber)
        if(typeof(mobileNumber) === 'string') {
            const verification = await client.verify.services(process.env.SERVICE_ID!)
                .verifications
                .create({ to: mobileNumber, channel: 'sms' })

            const status = verification.status
            console.log('Verification status', status)

            if (status === 'pending') {
                res.sendStatus(200)

            } else {
                res.sendStatus(500)
            }

        } else {
            res.sendStatus(422)
        }

    } catch(error) {
        res.send(error)
    }
})

app.post('/save', async (req, res) => {
    if(!contract) {
        return res.sendStatus(503)
    }
    const { mobileNumber, otp, nanoAddress } = req.body
    if (
        typeof (mobileNumber) === 'string' &&
        typeof (otp) === 'string'
        ) {
        const verificationCheck = await client.verify.services(process.env.SERVICE_ID!)
            .verificationChecks
            .create({ to: mobileNumber, code: otp })

        console.log('OTP verification status', verificationCheck)

        const { status } = verificationCheck
        if(status === 'approved') {
            try {
                await contract.setNanoAddress({ mobileNumber, nanoAddress })
                res.sendStatus(201)

            } catch(error) {
                console.error(error)
                res.sendStatus(500)
            }

        } else {
            res.sendStatus(422)
        }


    } else {
        res.sendStatus(422)
    }
})

const port = Number(process.env.PORT || 3000)
app.listen(port, async () => {
    console.log('Express server started on port: ' + port)
    contract = await getContract()
})
