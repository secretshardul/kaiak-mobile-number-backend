import * as nearAPI from 'near-api-js'
const {
    Near, Contract, KeyPair,
    keyStores: { InMemoryKeyStore },
} = nearAPI
import * as credentials from './dev-1615619158857-5968612.json'

const networkId = 'default'
const contractName = 'dev-1615619158857-5968612'
const nodeUrl = 'https://rpc.testnet.near.org'

export interface NanoAddressContract extends nearAPI.Contract {
    getNanoAddress: Function,
    setNanoAddress: Function,
}

export default async function getContract() {
    // Initialize Near
    const keyStore = new InMemoryKeyStore()
    await keyStore.setKey(networkId, contractName, KeyPair.fromString(credentials.private_key))

    const near = new Near({
        networkId, nodeUrl,
        deps: { keyStore },
    })

    const account = await near.account(credentials.account_id)

    // Initialize contract
    return new Contract(account, contractName, {
        viewMethods: ['getNanoAddress'],
        changeMethods: ['setNanoAddress'],
    }) as NanoAddressContract
}
