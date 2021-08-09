import styles from './styles.module.scss';
import { useSession, signIn } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import toast from 'react-hot-toast';

interface SubscribeButtonProps {
  priceId: string
}


export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession()

  async function handleSubscribe() {
    if (!session) {
      signIn('google')
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