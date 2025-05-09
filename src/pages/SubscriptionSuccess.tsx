import axios from 'axios'
import React, { useEffect } from 'react'

const SubscriptionSuccess = () => {

  const params = new URLSearchParams(window.location.search)
  const paymentIntentId = params.get('session_id')

  useEffect(() => {
    if (paymentIntentId) {
      updatePaymentStatus()
    } else {
      console.error("No payment intent ID found in the URL.")
    }
  }, [])

  const updatePaymentStatus = async () => {
    const response = await axios.get(`https://movie-explorer-rorakshaykat2003-movie.onrender.com/api/v1/subscriptions/success?session_id=${paymentIntentId}`)
    console.log("Payment status updated:", response.data)
  }

  return (
    <div>
      Payment completed successfully! Thank you for your subscription.
    </div>
  )
}

export default SubscriptionSuccess
