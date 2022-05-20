var express = require('express');
var router = express.Router();

/* POST users listing. */
router.post('/', async function(req, res, next) {

  try {
    const CHAINID='1001'
    const ACCESSKEYID='KASK2LA55N028G74BXGWHD4T'
    const SECRET_ACCESSKEY='fYTDD988PQFNpPb9uZHQgPuRoUALhvyWAP-8ZUgw'

    const feePayer = "0xe59D6Be9DeE69d2ea721B0Ef5dD26f24BAdd5273"

    const CaverExtKAS = require('caver-js-ext-kas')

    const caver = new CaverExtKAS(CHAINID, ACCESSKEYID, SECRET_ACCESSKEY)

    const senderRawTransaction = req.body.senderRawTransaction;
    // console.log("senderRawTransaction: "+senderRawTransaction)

    const contractInstance = await caver.transaction.feeDelegatedSmartContractExecution.decode(senderRawTransaction)
    // console.log("contractInstance: ")
    // console.dir(contractInstance)

    const signedTransaction = await caver.wallet.signAsFeePayer(feePayer, contractInstance)
    // const signedTransaction = await caver.wallet.signAsGlobalFeePayer(contractInstance)
    // console.log("signedTransaction: ")
    // console.dir(signedTransaction)

    const rawTx = signedTransaction.getRLPEncoding()
    // console.log("rawTx: "+rawTx)

    const result = await caver.rpc.klay.sendRawTransaction(rawTx)
      // .once('receipt', async (receipt) => {
      //   console.log(receipt)
      //   return receipt
      // })
      // .once('error', (error) => {
      //   console.log(error)
      //   return error
      // })
    console.log(result)
    res.send(result)




    // const result = await caver.kas.wallet.createAccount()

    // const enableGlobalFeePayer = true
    // // const userFeePayer = {
    // //     krn: "krn:1001:wallet:6abd742e-05d0-416e-af7b-2e29f80abc18:feepayer-pool:CodeColosseum",
    // //     address: "0xe59D6Be9DeE69d2ea721B0Ef5dD26f24BAdd5273"
    // // }
    // const options = new caver.kas.kip7.feePayerOptions(enableGlobalFeePayer/*, userFeePayer*/)

    // const result = await caver.kct.kip7.deploy({
    //     name: 'FeePayerTest3',
    //     symbol: 'GFPT',
    //     decimals: 0,
    //     initialSupply: '100000000000000000000',
    //     alias: "GlobalFeePayerTestToken",
    //     options: options
    // }, "0x538C26A2f0468b05a724252b300e3e223227ce63")

    // balance(계약주소, 계정주소)
    // const result = await caver.kas.kip7.balance('0x9c8F806A0097528908E7B98144E871F13038Bf89', '0x538C26A2f0468b05a724252b300e3e223227ce63')
    // console.log(parseInt(result.balance, 16))

    // transfer(계약주소, from소유자, to, 양)
    // const result = await caver.kas.kip7.transfer('0x174d09887b5e7870768743b8fa1eaa95c95988a1', '0x538C26A2f0468b05a724252b300e3e223227ce63', '0xaa95289A2c8479d4A028C6F6740E374e59Fd26C8', '50000000000000000000')

    // updateContractOptions(계약주소, 옵션)
    // const enableGlobalFeePayer = true
    // const userFeePayer = {
    //     "krn": "krn:1001:wallet:6abd742e-05d0-416e-af7b-2e29f80abc18:feepayer-pool:CodeColosseum",
    //     "address": "0xe59D6Be9DeE69d2ea721B0Ef5dD26f24BAdd5273"
    // }
    // const options = new caver.kas.kip7.feePayerOptions(enableGlobalFeePayer, userFeePayer)
    // const result = await caver.kas.kip17.updateContractOptions('0x9a2b2db4740284213f40a27c96fca917052de596', options)
    //     .then(res => {
    //         console.log(res)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    
    // getContract(계약주소)
    // const result = await caver.kas.kip7.getContract('0x9c8F806A0097528908E7B98144E871F13038Bf89')

    // transferFrom(계약주소, spender, 소유자, to, 양)
    // const addressOrAlias = '0x174d09887b5e7870768743b8fa1eaa95c95988a1'
    // const spender = "0x02B57F90DC5eBf90fDf3A00797b95CA05BB04850"
    // const owner = '0x538C26A2f0468b05a724252b300e3e223227ce63'
    // const to = '0xaa95289A2c8479d4A028C6F6740E374e59Fd26C8'
    // const result = await caver.kas.kip7.transferFrom(
    //     addressOrAlias,
    //     spender,
    //     owner,
    //     to,
    //     50)
    //     .then(res => {
    //         console.log(res)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

    // allowance(계약주소, owner, spender)
    // const result = await caver.kas.kip7.allowance('0x174d09887b5e7870768743b8fa1eaa95c95988a1', '0x538C26A2f0468b05a724252b300e3e223227ce63', '0x02B57F90DC5eBf90fDf3A00797b95CA05BB04850')

    // approve(계약주소, owner, spender, 양)
    // const result = await caver.kas.kip7.approve('0x174d09887b5e7870768743b8fa1eaa95c95988a1', '0xaa95289A2c8479d4A028C6F6740E374e59Fd26C8', '0x02B57F90DC5eBf90fDf3A00797b95CA05BB04850', 50)
    //     .then(res => {
    //         console.log(res)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })


    // 서버에서 트렌젝션 데이터 만들려면
    // const kip7 = caver.kct.kip7.create('0x174d09887b5e7870768743b8fa1eaa95c95988a1')
    // const result = kip7.methods.transfer('0x538C26A2f0468b05a724252b300e3e223227ce63', '500000000000').encodeABI()


    // console.log(result)
    // res.send(result)

  } catch (error) {
      console.log("error", error)
      res.send(error)
  }

});

module.exports = router;
