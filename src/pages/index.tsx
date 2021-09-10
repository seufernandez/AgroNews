import Head from 'next/head'
import { GetStaticProps } from 'next'

import { SubscribeButton } from './../components/SubscribeButton/index';

import styles from './home.module.scss'
import { stripe } from '../services/stripe';


interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}


export default function Home({ product }: HomeProps) {

  return (
    <>
      <Head>
        <title>Home | AgroNews</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.heroContent}>
          <span>👋🤠Welcome partner!</span>
          <h1>News about <span>Agriculture World</span> every day.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month!</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/assets/farmer.svg" alt="Woman farming" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1JJ102FSQTaIPRym5fYSJQdh', {
    expand: ['product']
  })

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price.unit_amount / 100)

  const product = {
    priceId: price.id,
    amount: formattedPrice.slice(0, 2)//in case of price change or cent added (your captalist), set this again haha
  }



  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24 // 24 hours

  }


}
