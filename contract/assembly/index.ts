import { logging, PersistentMap, context } from 'near-sdk-as'

const map = new PersistentMap<string, string>("nanoAddressMap")
const NOT_OWNER_ERROR = 'Permission denied, sender must be the owner'

export function getNanoAddress(mobileNumber: string): string | null {
  return map.get(mobileNumber)
}

export function setNanoAddress(mobileNumber: string, nanoAddress: string): void {
  const sender = context.sender
  const contractName = context.contractName
  logging.log(
    'Sender: "' + sender + '", contract address: "' + contractName + '"'
  )
  assert(sender == contractName, NOT_OWNER_ERROR)

  logging.log(
    'Saving address "' + nanoAddress + '" for number "' + mobileNumber + '"'
  )
  map.set(mobileNumber, nanoAddress)
}
