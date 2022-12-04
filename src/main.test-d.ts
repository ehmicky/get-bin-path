import { expectAssignable, expectNotAssignable, expectType } from 'tsd'

import { getBinPath, getBinPathSync, BinaryOptions } from 'get-bin-path'

expectType<string | undefined>(await getBinPath())
expectType<string | undefined>(getBinPathSync())

expectAssignable<BinaryOptions>({})
await getBinPath({})
getBinPathSync({})
expectNotAssignable<BinaryOptions>(true)
// @ts-expect-error
await getBinPath(true)
// @ts-expect-error
getBinPathSync(true)
expectNotAssignable<BinaryOptions>({ unknown: true })
// @ts-expect-error
await getBinPath({ unknown: true })
// @ts-expect-error
getBinPathSync({ unknown: true })

expectAssignable<BinaryOptions>({ cwd: '/' })
getBinPathSync({ cwd: '/' })
await getBinPath({ cwd: '/' })
// @ts-expect-error
await getBinPath({ cwd: true })
// @ts-expect-error
getBinPathSync({ cwd: true })

expectAssignable<BinaryOptions>({ name: 'name' })
getBinPathSync({ name: 'name' })
await getBinPath({ name: 'name' })
// @ts-expect-error
await getBinPath({ name: true })
// @ts-expect-error
getBinPathSync({ name: true })
