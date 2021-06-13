import { getBinPath, getBinPathSync } from 'get-bin-path'

const binPath: string | undefined = getBinPathSync()

const runAsync = async function () {
  const binPath: string | undefined = await getBinPath()
}

runAsync()
