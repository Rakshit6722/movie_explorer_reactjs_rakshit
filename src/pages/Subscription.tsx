import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { addSubscriptioApi } from '../services/api';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const plans = [
  {
    key: 'basic',
    name: 'Basic',
    price: 0,
    color: 'bg-gray-900',
    features: [
      { text: 'Access to free movies', available: true },
      { text: 'Standard Definition (480p)', available: true },
      { text: 'Watch on 1 device at a time', available: true },
      { text: 'Ad-free experience', available: false },
      { text: 'Download for offline viewing', available: false },
      { text: 'Premium content access', available: false },
    ]
  },
  {
    key: 'gold',
    name: 'Gold',
    price: 9.99,
    color: 'bg-gradient-to-br from-yellow-600/10 to-yellow-900/10',
    features: [
      { text: 'Access to free movies', available: true },
      { text: 'Full HD (1080p)', available: true },
      { text: 'Watch on 2 devices at a time', available: true },
      { text: 'Ad-free experience', available: true },
      { text: 'Download for offline viewing', available: false },
      { text: 'Premium content access', available: true },
    ]
  },
  {
    key: 'platinum',
    name: 'Platinum',
    price: 14.99,
    color: 'bg-gradient-to-br from-gray-600/10 to-gray-900/10',
    features: [
      { text: 'Access to free movies', available: true },
      { text: '4K Ultra HD + Dolby Atmos', available: true },
      { text: 'Watch on 4 devices at a time', available: true },
      { text: 'Ad-free experience', available: true },
      { text: 'Download for offline viewing', available: true },
      { text: 'Premium content access', available: true },
    ]
  },
];

const Subscription = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const currentPlan = 'basic';

  const handlePlanSelection = (planKey: string) => {
    if (planKey === currentPlan) {
      setMessage("You're already subscribed to this plan");
      setShowPayment(false);
      return;
    }
    
    setSelectedPlan(planKey);
    setShowPayment(true);
    setMessage('');
    
    setTimeout(() => {
      document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setMessage('Stripe is not loaded.');
      setLoading(false);
      return;
    }

    const data = await addSubscriptioApi(selectedPlan);
    console.log("response data", data)

    // if (data?.session_id) {
    //   await stripe.redirectToCheckout({ sessionId: data.session_id });
    // } else {
    //   setMessage(data?.error || 'Subscription failed.');
    // }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pb-20">
      <div className="relative py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-anton tracking-wide mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Upgrade your viewing experience with premium features and exclusive content
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.key} 
              className={`rounded-2xl p-6 md:p-8 border ${
                plan.key === currentPlan 
                  ? 'border-[#f02c49]' 
                  : plan.key === 'gold' 
                  ? 'border-yellow-600/30'
                  : plan.key === 'platinum'
                  ? 'border-blue-500/30'
                  : 'border-gray-700'
              } ${plan.color} relative h-full`}
            >
              {plan.key === currentPlan && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <div className="bg-[#f02c49] text-white text-xs uppercase tracking-wider py-1 px-4 rounded-full font-bold">
                    Current Plan
                  </div>
                </div>
              )}
              

              <div className="text-center mb-8 mt-4">
                <h3 className={`text-2xl font-bold mb-2 ${
                  plan.key === 'gold' ? 'text-yellow-400' : plan.key === 'platinum' ? 'text-blue-400' : 'text-white'
                }`}>
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold mb-1">
                  {plan.price === 0 ? (
                    <span>Free</span>
                  ) : (
                    <>
                      ${plan.price}
                      <span className="text-base text-gray-400 font-normal">/month</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  {plan.key === 'basic' ? 'Limited access' : plan.key === 'gold' ? 'Most popular' : 'Best value'}
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    {feature.available ? (
                      <CheckIcon className={`mr-2 mt-0.5 text-sm ${
                        plan.key === 'gold' ? 'text-yellow-400' : 
                        plan.key === 'platinum' ? 'text-blue-400' : 'text-green-500'
                      }`} fontSize="small" />
                    ) : (
                      <CloseIcon className="mr-2 mt-0.5 text-sm text-gray-500" fontSize="small" />
                    )}
                    <span className={feature.available ? 'text-sm' : 'text-sm text-gray-500'}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handlePlanSelection(plan.key)}
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-center transition-all ${
                  plan.key === currentPlan
                    ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                    : plan.key === 'gold'
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:opacity-90'
                    : plan.key === 'platinum'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:opacity-90'
                    : 'bg-[#f02c49] text-white hover:bg-[#e01c39]'
                }`}
              >
                {plan.key === currentPlan ? 'Current Plan' : `Get ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        {message && (
          <div className="mt-8 text-center">
            <p className="text-[#f02c49] font-semibold">{message}</p>
          </div>
        )}
      </div>


      {showPayment && (
        <div id="payment-section" className="max-w-lg mx-auto mt-16 px-4">
          <div className="bg-gray-800/70 rounded-2xl p-8 shadow-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Payment Details
            </h3>
            
            <div className="bg-black/30 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-400 mb-1">Selected Plan</p>
              <div className="flex justify-between items-center">
                <p className="font-bold">
                  {plans.find(p => p.key === selectedPlan)?.name || ''} Plan
                </p>
                <p className="font-bold">
                  ${plans.find(p => p.key === selectedPlan)?.price || 0}/month
                </p>
              </div>
            </div>
            
            <form onSubmit={handlePaymentSubmit}>
              <p className="text-sm text-gray-400 mb-2">Card Information</p>
              {/* <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <CardElement 
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#ffffff',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                    },
                  }} 
                />
              </div> */}
              
              <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full py-3 bg-gradient-to-r from-[#e23145] to-[#c41f33] text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                {loading ? 'Processing...' : 'Start Subscription'}
              </button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;