import Head from 'next/head'
import styles from './home.module.scss'
import { SubscribeButton } from './../components/SubscribeButton/index';

export default function Home() {
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
            <span>for $9 month!</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/assets/farmer.svg" alt="Woman farming" />
      </main>
    </>
  )
}
