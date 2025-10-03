'use client'
import { useEffect, useState } from 'react'
import { client } from '@/utils/client'  // resolves to src/utils/client.ts
import abi from '@/abi.json'              // resolves to src/abi.json

const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export default function Home() {
  const [msg, setMsg] = useState('Loading...')
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const data = await client.readContract({
          address,
          abi,
          functionName: 'getMessage', // or 'message'
        })
        setMsg(String(data))
      } catch (e: any) {
        setErr(e.message ?? 'Failed to read contract')
      }
    })()
  }, [])

  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',fontFamily:'system-ui'}}>
      <div style={{padding:'1.5rem',border:'1px solid #ddd',borderRadius:12}}>
        <h1>Vandy Blockchain dApp</h1>
        <p style={{opacity:.7}}>Sepolia • Viem • Next.js</p>
        <div style={{marginTop:12}}>
          {err ? <>❌ {err}</> : <>✨ Contract says: <b>{msg}</b></>}
        </div>
      </div>
    </main>
  )
}
