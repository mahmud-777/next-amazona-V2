'use client'
import CheckoutSteps from '@/components/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';
import { useRouter } from 'next/navigation'
import { useEffect, useState} from 'react'
import ClientProviders from './../../../components/ClientProviders';

function Form() {
    const router = useRouter();
    const { savePaymentMethod, paymentMethod, shippingAddress} = useCartService()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

    
    useEffect(() => {
        if(!shippingAddress.address){
            return router.push('/shipping')
        }
        setSelectedPaymentMethod(paymentMethod || 'PayPal')
    },[paymentMethod, router, shippingAddress.address])
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        savePaymentMethod(selectedPaymentMethod)
        router.push('/place-order')
    }

  return (
    <div>
        <CheckoutSteps current={2} />      
        <div className=' max-w-sm mx-auto card bg-base-300 my-4'>
            <div className=' card-body'>
                <h1 className=' card-title'>Payment Method</h1>
                <form onSubmit={handleSubmit}>
                    {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
                        <div key={payment}>
                            <label className=' label cursor-pointer'>
                                <span className='label-text'>{payment}</span>
                            </label>
                            <input 
                              type="radio" name="paymentMethod" id="" 
                              className='radio'
                              value={payment}
                              checked={selectedPaymentMethod === payment}
                              onChange={() => setSelectedPaymentMethod(payment)}                            
                            />
                        </div>
                    ))}
                    <div className='my-2'>
                        <button type="submit" className=' btn btn-primary w-full'>
                            Next
                        </button>
                    </div>
                    <div className='my-2'>
                        <button 
                          type="submit" 
                          className=' btn btn-primary w-full'
                          onClick={() => router.back()}
                        >
                            Back
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </div>
  )
}

export default Form

