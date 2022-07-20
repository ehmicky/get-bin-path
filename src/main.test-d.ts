import {
  expectError,
  expectAssignable,
  expectNotAssignable,
  expectType,
} from 'tsd'

import { getBinPath, getBinPathSync, BinaryOptions } from './main.js'

expectType<string | undefined>(await getBinPath())
expectType<string | undefined>(getBinPathSync())

expectAssignable<BinaryOptions>({})
await getBinPath({})
getBinPathSync({})
expectNotAssignable<BinaryOptions>(true)
expectError(await getBinPath(true))
expectError(getBinPathSync(true))
expectNotAssignable<BinaryOptions>({ unknown: true })
expectError(await getBinPath({ unknown: true }))
expectError(getBinPathSync({ unknown: true }))

expectAssignable<BinaryOptions>({ cwd: '/' })
getBinPathSync({ cwd: '/' })
await getBinPath({ cwd: '/' })
expectError(await getBinPath({ cwd: true }))
expectError(getBinPathSync({ cwd: true }))

expectAssignable<BinaryOptions>({ name: 'name' })
getBinPathSync({ name: 'name' })
await getBinPath({ name: 'name' })
expectError(await getBinPath({ name: true }))
expectError(getBinPathSync({ name: true }))
