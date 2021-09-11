import { GetStaticPaths, GetStaticProps } from "next"
import { useSession } from "next-auth/client"
import { RichText } from 'prismic-dom';
import React, { useEffect } from "react";
import Head from "next/head";

import { getPrismicClient } from "../../../services/prismic"

import styles from '../post.module.scss'
import Link from "next/link";
import { useRouter } from "next/router";

interface NewsPreviewProps {
  post:{
    slug: string;
    title: string;
    content: string,
    updatedAt: string;
  }
}


export default function NewsPreview({post}: NewsPreviewProps){
  const [session] = useSession()
  const router = useRouter()


  useEffect(()=>{
      if(session?.activeSubscription){
        router.push(`/news/${post.slug}`)
      }
  },[session])


  return(
  <>
    <Head>
      <title>{post.title} | Agronews</title>
    </Head>
    
    <main className={styles.container} >
      <article className={styles.post} >
        <h1>{post.title}</h1>
        <time>{post.updatedAt}</time>
        <div 
        className={`${styles.postContent} ${styles.previewContent}`}
        dangerouslySetInnerHTML={{__html: post.content}}
        />



      <div className={styles.continueReading} >
      Want to continue reading?
      <Link href="/" >
        <a href="#">Subscribe Now!</a>
      </Link>
      </div>



      </article>
    </main>

  </>

  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  
  return {
    paths:[],
    fallback:'blocking'
  }
}


export const getStaticProps: GetStaticProps = async ({ params}) => {
  const { slug } = params
    

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('post', String(slug),{})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0,3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-US',{
      day:'2-digit',
      month:'long',
      year:'numeric'
    })
  }

  return {
    props:{
      post,
    }
  }
}