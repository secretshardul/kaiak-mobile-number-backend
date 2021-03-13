import { Context, logging, storage, PersistentMap } from 'near-sdk-as'

const DEFAULT_MESSAGE = 'Hello'
let map = new PersistentMap<string, string>("nanoAddressMap")

export function getNanoAddress(mobileNumber: string): string | null {
  return map.get(mobileNumber)
}

export function setNanoAddress(mobileNumber: string, nanoAddress: string): void {
  map.set(mobileNumber, nanoAddress)
}

export function getGreeting(accountId: string): string | null {
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}

export function setGreeting(message: string): void {
  const account_id = Context.sender

  // Use logging.log to record logs permanently to the blockchain!
  logging.log(
    // String interpolation (`like ${this}`) is a work in progress:
    // https://github.com/AssemblyScript/assemblyscript/pull/1115
    'Saving greeting "' + message + '" for account "' + account_id + '"'
  )

  storage.set(account_id, message)
}
