import getContract from '../src/near/Contract'

describe('Contract test', async () => {
    const contract = await getContract()

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
