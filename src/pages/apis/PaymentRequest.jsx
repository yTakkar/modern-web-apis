import React, { useState } from 'react'
import Back from '../../components/Back'

const PaymentRequestApi = props => {
  const [errorMessage, setErrorMessage] = useState('')
  const [paymentResponse, setPaymentResponse] = useState({})
  const [paymentState, setPaymentState] = useState('')

  const getPaymentMethods = () => {
    const basicCardMethod = {
      supportedMethods: 'basic-card',
      data: {
        supportedNetworks: ['visa', 'mastercard'],
        supportedTypes: ['debit', 'credit']
      }
    }

    const googlePayMethod = {
      supportedMethods: 'https://google.com/pay',
      data: {
        environment: 'TEST',
        apiVersion: 2,
        apiVersionMinor: 0,
        merchantInfo: {
          merchantId: '8220-9128-5411',
          merchantName: 'Takkar'
        },
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["MASTERCARD", "VISA"]
          },
          // tokenizationSpecification: {
          //   type: 'PAYMENT_GATEWAY',
          //   parameters: {
          //     'gateway': 'example',
          //     'gatewayMerchantId': 'exampleGatewayMerchantId'
          //   }
          // }
        }]
      }
    }

    return [
      basicCardMethod,
      // googlePayMethod
    ];
  }

  const getPaymentDetails = () => {
    return {
      total: {
        label: 'Donation',
        amount: {
          currency: 'USD',
          value: '10'
        }
      },
      // displayItems: [{
      //   label: 
      // }]
    }
  }

  const getPaymentOptions = () => {
    return {
      requestPayerName: true,
      requestPayerEmail: true,
      // requestPayerPhone: true,
    };
  }

  const processPayment = () => {
    return new Promise(resolve => setTimeout(() => resolve(true), 2000))
  }

  const makePayment = async () => {
    try {
      const paymentRequest = new PaymentRequest(getPaymentMethods(), getPaymentDetails(), getPaymentOptions())

      let canMakePayment = Promise.resolve(true)

      if (paymentRequest.canMakePayment) {
        canMakePayment = paymentRequest.canMakePayment()
      }

      if (await canMakePayment) {
        const paymentResponse = await paymentRequest.show()
        const processedPayment = await processPayment()

        if (processedPayment) {
          paymentResponse.complete('success')
          setPaymentState('success')
        } else {
          paymentResponse.complete('fail')
          setPaymentState('fail')
        }

        console.log(paymentResponse);
        setPaymentResponse(paymentResponse)
      }

    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  return (
    <div>
      <Back/>
      <h3>PaymentRequest API</h3>
 
      <button onClick={makePayment}>Donate $10</button>
      <br/>

      {paymentState === 'success' 
        ? <i>Payment successfull</i> 
        : paymentState === 'fail' ? <i>Payment failed</i> : null}

      {paymentState === 'success' && <pre>
        {JSON.stringify(paymentResponse, undefined, 2)}
      </pre>}

      <div><b>{errorMessage}</b></div>
    </div>
  )
}

export default PaymentRequestApi;
