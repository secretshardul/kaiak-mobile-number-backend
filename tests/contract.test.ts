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

    it('Write address', async () => {
        const saveAddressResp = await contract.setNanoAddress({
            mobileNumber: '1234',
            nanoAddress: 'gg address'
        })
        console.log('Write address response', saveAddressResp)
    })

    it('Read address', async () => {
        const address = await contract.getNanoAddress({ mobileNumber: '1234' })
        console.log('Nano Address', address)
    })


})