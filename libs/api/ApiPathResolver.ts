import { URL } from 'url'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const resolveApiPath = (apiPathname: string): string => {
  const origin = publicRuntimeConfig.apiOrigin
  return new URL(apiPathname, origin).toString()
}
