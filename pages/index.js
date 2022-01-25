import { useWeb3React } from '@web3-react/core'
import { useEffect, useCallback } from 'react'
import { connector } from '../config/web3'
import styles from '../styles/Home.module.css'

export default function Home() {
  const {
    activate,
    active,
    deactivate,
    error,
    account,
    chainId 
  } = useWeb3React()

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', true)
  }, [activate])

  const disconnect = () => {
    deactivate()
    localStorage.removeItem('prepreviouslyConnected')
  }

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') {
      connect()
    }
  }, [connect])

  if (error) {
    return <p>Error al conectar</p>
  }

  return (
    <div className={styles.container}>
      <h1>Web3 Example!</h1>
      {
        active
          ? <>
              <button onClick={disconnect}>Disconnect Wallet</button>
              <p>
                Your are connected to network {chainId} <br/>
                Your account is: {account}
              </p>
            </>
          : <button onClick={connect}>Connect Wallet</button>
      }
    </div>
  )
}
