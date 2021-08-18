import styles from './styles.module.scss';
import { useSession, signIn } from 'next-auth/client';
import { api } from '../../services/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

import { getStripeJs } from '../../services/stripe-js';

interface SubscribeButtonProps {
  priceId: string
}


export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      signIn('google')
      return
    }
 
    if(session.activeSubscription){
      router.push('/news')

      return
    }
 
    //Criando a CheckoutSession
    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({ sessionId })
      
    } catch (err) {
      toast.error(err.message)
    }


  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  )
}