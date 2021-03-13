import { logging, PersistentMap } from 'near-sdk-as'

let map = new PersistentMap<string, string>("nanoAddressMap")

export function getNanoAddress(mobileNumber: string): string | null {
  return map.get(mobileNumber)
}

export function setNanoAddress(mobileNumber: string, nanoAddress: string): void {
  logging.log(
    'Saving address "' + nanoAddress + '" for number "' + mobileNumber + '"'
  )
  map.set(mobileNumber, nanoAddress)
}
