import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useRef, useState } from 'react';
import { addSubscriptioApi } from '../services/api';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { plans } from '../constants/subscriptionPlans';


const Subscription = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null)

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const currentPlan = useSelector((state: RootState) => state.user.currentPlan || 'basic'); 

  const [selectedPlan, setSelectedPlan] = useState(currentPlan !== 'basic' ? currentPlan : 'gold');

  useEffect(() => {
    if(scrollRef.current){
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  },[])

  const handlePlanSelection = (planKey: string) => {
    if (planKey === 'basic') {
      setMessage("Basic is your default plan");
      return;
    }

    if (planKey === currentPlan) {
      setMessage("You're already subscribed to this plan");
      return;
    }

    setSelectedPlan(planKey);
    setMessage('');

    setTimeout(() => {
      document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isLoggedIn) {
      setMessage('Please log in to subscribe.');
      setLoading(false);
      return;
    }

    if (!stripe || !elements) {
      setMessage('Stripe is not loaded.');
      setLoading(false);
      return;
    }

    const data = await addSubscriptioApi(selectedPlan);

    if (data?.session_id) {
      await stripe.redirectToCheckout({ sessionId: data.session_id });
    } else {
      setMessage(data?.error || 'Subscription failed.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black/95 to-black text-white pb-12">
      <div ref={scrollRef} className="relative pt-16 pb-10 px-4 border-b border-gray-800/40">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-red-900/20 border border-red-800/30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-medium uppercase tracking-wider text-red-400">
              Upgrade your experience
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold font-anton tracking-wide mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose the Perfect Plan for You
          </motion.h1>

          <motion.p
            className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Get access to premium content with our flexible subscription options. Cancel anytime.
          </motion.p>
        </div>
      </div>


      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${selectedPlan === plan.key
                ? plan.key === 'gold'
                  ? 'ring-2 ring-yellow-500 shadow-xl shadow-yellow-900/10'
                  : plan.key === 'platinum'
                    ? 'ring-2 ring-gray-300 shadow-xl shadow-gray-500/10'
                    : 'ring-2 ring-red-500'
                : 'border border-gray-800 hover:border-gray-700'
                }`}
            >
              {plan.key === 'gold' && (
                <div className="absolute -top-3 -right-14 w-40 transform rotate-45 bg-yellow-600 text-center py-1 text-xs font-medium text-black">
                  MOST POPULAR
                </div>
              )}

              <div className={`${plan.color} px-7 py-6 relative backdrop-blur-sm`}>
                {plan.key === currentPlan && (
                  <span className="absolute top-0 left-0 bg-[#f02c49] text-white text-xs uppercase tracking-wider py-1 px-3 rounded-br-lg font-medium">
                    Current
                  </span>
                )}
                <div className="flex flex-col mb-2">
                  <h2 className={`text-xl font-bold ${plan.key === 'gold' ? 'text-yellow-400' :
                    plan.key === 'platinum' ? 'text-gray-200' : 'text-white'
                    }`}>
                    {plan.name}
                  </h2>

                  <div className="flex items-baseline mt-2">
                    <span className={`text-3xl font-bold ${plan.key === 'gold' ? 'text-yellow-400' :
                      plan.key === 'platinum' ? 'text-gray-200' : 'text-white'
                      }`}>
                      {plan.price === 0 ? 'Free' : `Rs.${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-sm text-gray-400 ml-1">/month</span>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 mt-2 font-medium">
                    {plan.key === 'basic' ? 'Essential streaming experience' :
                      plan.key === 'gold' ? 'Perfect for avid viewers' :
                        'The ultimate cinematic experience'}
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm px-7 py-6">
                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      {feature.available ? (
                        <CheckIcon className={`mr-3 ${plan.key === 'gold' ? 'text-yellow-400' :
                          plan.key === 'platinum' ? 'text-gray-300' : 'text-green-500'
                          }`} style={{ fontSize: '1.1rem' }} />
                      ) : (
                        <CloseIcon className="mr-3 text-gray-600" style={{ fontSize: '1.1rem' }} />
                      )}
                      <span className={`text-sm ${feature.available ? 'text-gray-200' : 'text-gray-500'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handlePlanSelection(plan.key)}
                  disabled={loading || plan.key === currentPlan || plan.key === 'basic'}
                  className={`w-full mt-8 py-3 rounded-lg font-semibold text-sm transition-all ${loading
                    ? 'bg-gray-700 cursor-wait'
                    : plan.key === currentPlan
                      ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed border border-gray-700'
                      : plan.key === 'basic'
                        ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed border border-gray-700'
                        : plan.key === 'gold'
                          ? selectedPlan === plan.key
                            ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black'
                            : 'bg-transparent border border-yellow-600/70 text-yellow-400 hover:bg-yellow-800/20'
                          : plan.key === 'platinum'
                            ? selectedPlan === plan.key
                              ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white'
                              : 'bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-700/30'
                            : selectedPlan === plan.key
                              ? 'bg-[#f02c49] text-white'
                              : 'bg-transparent border border-red-700/50 text-red-400 hover:bg-red-900/20'
                    }`}
                >
                  {
                    plan.key === 'basic' ? currentPlan === 'basic' ? 'Default Plan' : 'Included Free' : plan.key === currentPlan ? 'Current Plan' : selectedPlan === plan.key ? `Selected` : `Choose ${plan.name}`
                  }
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      {selectedPlan !== 'basic' && (
        <div id="payment-section" className="max-w-lg mx-auto px-4 py-8">
          <motion.div
            className="bg-gradient-to-b from-black/70 to-black/70 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="px-8 py-6 border-b border-gray-700/50 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Checkout</h3>
              <div className="flex items-center">
                <span className="text-xs font-medium text-gray-400 mr-2">Secure payment</span>
                <SecurityIcon className="text-gray-400" style={{ fontSize: '1rem' }} />
              </div>
            </div>

            <div className="px-8 py-6">
              <div className="bg-gray-900/50 rounded-xl p-5 mb-8 border border-gray-800/80">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <LocalOfferIcon className={`mr-3 ${selectedPlan === 'gold' ? 'text-yellow-500' :
                      selectedPlan === 'platinum' ? 'text-gray-300' : 'text-red-500'
                      }`} style={{ fontSize: '1.2rem' }} />
                    <div>
                      <h4 className="font-medium">
                        <span className="text-white">{plans.find(p => p.key === selectedPlan)?.name}</span>
                        <span className="text-gray-400"> Plan</span>
                      </h4>
                      <p className="text-xs text-gray-500">Monthly subscription</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">Rs.{plans.find(p => p.key === selectedPlan)?.price}</div>
                    <p className="text-xs text-gray-500">per month</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Billed monthly</span>
                    <span className="text-white">Rs.{plans.find(p => p.key === selectedPlan)?.price}/mo</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span className="text-white">Included</span>
                  </div>
                  <div className="pt-2 border-t border-gray-800 flex justify-between font-medium">
                    <span className="text-gray-300">Today's total</span>
                    <span className="text-white">Rs.{plans.find(p => p.key === selectedPlan)?.price}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <button
                  type="submit"
                  disabled={!stripe || loading || selectedPlan === currentPlan}
                  className={`w-full py-3.5 rounded-lg font-semibold text-center transition-all ${loading
                    ? 'bg-gray-700 cursor-wait'
                    : selectedPlan === currentPlan
                      ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                      : selectedPlan === 'gold'
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-400 hover:to-amber-500'
                        : selectedPlan === 'platinum'
                          ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white hover:from-gray-300 hover:to-gray-500'
                          : 'bg-[#f02c49] text-white hover:bg-[#e01c39]'
                    }`}
                >
                  {loading ? 'Processing...' : `Subscribe Now`}
                </button>

                {message && (
                  <div className="rounded-lg border border-[#f02c49]/20 bg-[#f02c49]/10 p-4 text-center">
                    <p className="text-[#f02c49] text-sm font-medium">{message}</p>
                  </div>
                )}

                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center">
                    <div className="h-px bg-gray-800 flex-grow"></div>
                    <span className="px-4 text-xs font-medium text-gray-500 uppercase">Secure Checkout</span>
                    <div className="h-px bg-gray-800 flex-grow"></div>
                  </div>

                  <div className="text-xs text-center text-gray-500">
                    <p>By continuing, you agree to our Terms of Use and Privacy Policy.</p>
                    <p className="mt-1">Your subscription will automatically renew each month until cancelled.</p>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Subscription;