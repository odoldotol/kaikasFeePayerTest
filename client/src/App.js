import './App.css';
import axios from 'axios';

const cocoAddr = "0x538C26A2f0468b05a724252b300e3e223227ce63"
const contractAddr = "0x174d09887b5e7870768743b8fa1eaa95c95988a1"
const amount = '500000000000'
const decimal = 0

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={ async ()=>{
          const isInstalled = await window.klaytn.isKaikas
          console.log(isInstalled)
          const accounts = await window.klaytn.enable();
          console.log(accounts)
          // const network = await window.klaytn.networkVersion
          // console.log(network)
          // const account = await window.klaytn.selectedAddress
          // console.log(account)
          const instanceFPTT = new window.caver.klay.KIP7(contractAddr)
          const tokenBalance = await instanceFPTT.balanceOf(accounts[0])
          if (tokenBalance.toNumber() < amount) {
            alert("소유한 토큰이 부족합니다.")
            return
          }
        }}>인증테스트</button>
        
        <button onClick={ async ()=>{
          const accounts = await window.klaytn.enable();
          // const account = await window.klaytn.selectedAddress;
          const account = accounts[0]
          // const balance = await window.caver.klay.getBalance(account);
          const instanceFPTT = new window.caver.klay.KIP7(contractAddr)
          // const tokenname = await instanceFPTT.name()
          const tokenBalance = await instanceFPTT.balanceOf(account)
          // const isMinter = await instanceFPTT.isMinter(account)
          // const allowance = await instanceFPTT.allowance(account,globalFeePayer)
          const data = window.caver.klay.abi.encodeFunctionCall(
            {
              constant: false,
              inputs: [{ internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'value', type: 'uint256' }],
              name: 'transfer',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            [
              cocoAddr,
              window.caver.utils
                .toBN(amount)
                .mul(window.caver.utils.toBN(Number(`1e${decimal}`)))
                .toString()
            ]
          )

          console.log(data)

          const signedTransaction = await window.caver.klay.signTransaction({
            type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
            from: account,
            to: contractAddr,
            data,
            gas: '300000'
          })
          // console.log(signedTransaction)

          const senderRawTransaction = signedTransaction.rawTransaction
          
          axios.post('http://localhost:4000/users/', {
            senderRawTransaction: senderRawTransaction,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }}>토큰전송</button>
      </header>
    </div>
  );
}

export default App;
