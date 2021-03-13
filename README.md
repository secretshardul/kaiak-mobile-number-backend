# Near setup
- Compile and deploy contract

    ```sh
    cd contract
    node compile.js --debug
    near dev-deploy build/debug/greeter.wasm
    ```

- Initialize contract in frontend

    ```js
    const contractName = 'mycontract.testnet' // contract or account name
    window.contract = await new Contract(window.walletConnection.account(), contractName, {
        viewMethods: ['getGreeting'],
        changeMethods: ['setGreeting'],
    })
    ```

- Write to contract

    ```js
    await window.contract.setGreeting({
      message: 'hello world'
    })
    ```

- Read from contract

    ```js
    currentGreeting = await contract.getGreeting({ accountId: window.accountId })
    ```

# Twilio verification
1. Send OTP
    ```sh
    curl 'https://verify.twilio.com/v2/Services/VA4777f711dc9cf933c305e3fb223d7bae/Verifications' -X POST \
    --data-urlencode 'To=+919619477301' \
    --data-urlencode 'Channel=sms' \
    -u key:key
    ```

2. Verify on server
    ```sh
    curl 'https://verify.twilio.com/v2/Services/VA4777f711dc9cf933c305e3fb223d7bae/VerificationCheck' -X POST \
    --data-urlencode 'To=+919619477301' \
    --data-urlencode 'Channel=sms' \
    --data-urlencode 'Code=703356' \
    -u key:key
    ```