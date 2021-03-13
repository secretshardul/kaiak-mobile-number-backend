import getContract from '../src/near/Contract'

describe('Contract test', async () => {
    const contract = await getContract()

    it('Read greeting', async () => {
        const greeting = await contract.getGreeting({ accountId: contract.account.accountId })
        console.log('Greeting', greeting)
    })

    it('Write greeting', async () => {
        const writeGreetingResponse = await contract.setGreeting({
            message: 'GG'
        })
        console.log('Write response', writeGreetingResponse)
    })
})