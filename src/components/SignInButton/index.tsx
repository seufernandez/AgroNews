import { FaGoogle } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

import { signIn, signOut, useSession } from 'next-auth/client'


export function SignInButton() {
  const [session] = useSession()

  // console.log(session)


  return (
    session ? ( 
      <button
        type="button"
        className={styles.signInButton}
        onClick={() => signOut()}
      >
        <FaGoogle />
        {session.user.name}
        < FiX color="#737380" className={styles.closeIcon} />
      </button >
    ) : (
      <button
        type="button"
        className={styles.signInButton}
        onClick={() => signIn('google')}
      >
        <FaGoogle color="#58BB48" />
        SignIn with Google
      </button>
    )


  )
}