import Head from 'next/head';
import styles from './styles.module.scss'

export default function Posts() {
  return (
    <>
      <Head >
        <title>Posts | Agronews</title>
      </Head >

      <main className={styles.container}>
        <div className={styles.news}>
          <a href="">
            <time>13 de Fevereiro de 2002</time>
            <strong>Conselho aprova apoio de R$ 1,32 bilhão a cafeicultores afetados pela geada</strong>
            <p>Reserva ficará à disposição dos agentes financeiros após avaliação das perdas do café causadas nas regiões produtoras</p>
          </a>
          <a href="">
            <time>13 de Fevereiro de 2002</time>
            <strong>Conselho aprova apoio de R$ 1,32 bilhão a cafeicultores afetados pela geada</strong>
            <p>Reserva ficará à disposição dos agentes financeiros após avaliação das perdas do café causadas nas regiões produtoras</p>
          </a>
          <a href="">
            <time>13 de Fevereiro de 2002</time>
            <strong>Conselho aprova apoio de R$ 1,32 bilhão a cafeicultores afetados pela geada</strong>
            <p>Reserva ficará à disposição dos agentes financeiros após avaliação das perdas do café causadas nas regiões produtoras</p>
          </a>
        </div>
      </main>
    </>
  );
}