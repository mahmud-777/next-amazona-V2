
import Form from './Form'
import { Metadata } from 'next'

export const metadata : Metadata = {
    title: 'Place Order'
}
export default async function PlaceOrderPage() {
  return (
    <>
      <Form />
    </>
  )
}
