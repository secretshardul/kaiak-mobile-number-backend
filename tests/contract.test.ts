import assert from 'assert'
import * as nearAPI from 'near-api-js'
const {
    Near, Account, Contract, KeyPair,
    keyStores: { InMemoryKeyStore },
} = nearAPI
import * as credentials from '../dev-1615619158857-5968612.json'

const networkId = 'default'
const contractName = 'dev-1615619158857-5968612'
const nodeUrl = 'https://rpc.testnet.near.org'


const keyStore = new InMemoryKeyStore()
keyStore.setKey(networkId, contractName, KeyPair.fromString(credentials.private_key))

const near = new Near({
    networkId, nodeUrl,
    deps: { keyStore },
});


const contractMethods = {
    viewMethods: ['getGreeting'],
    changeMethods: ['setGreeting'],
}

interface GreetingContract extends nearAPI.Contract {
    setGreeting: Function,
    getGreeting: Function,
}
describe('Contract test', async () => {
    const account = await near.account(credentials.public_key)
    console.log('Got account', account)
    const contract = new Contract(account, contractName, contractMethods) as GreetingContract

    console.log('Contract', contract)

    it('Read greeting', async () => {
        const greeting = await contract.getGreeting({ accountId: account.accountId })
        console.log('Greeting', greeting)
    })

    it('Write greeting', async () => {
        const writeGreetingResponse = await contract.setGreeting({
            message: 'Hello'
        })
        console.log('Write response', writeGreetingResponse)

        assert(true, 'my error')
    })
})