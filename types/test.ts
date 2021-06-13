import { getBinPath, getBinPathSync } from 'get-bin-path'

// Synchronous
const binPath: string | undefined = getBinPathSync()

// Asynchronous
;(async () => {
  const binPath: string | undefined = await getBinPath()
})()
