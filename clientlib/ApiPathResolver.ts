import getConfig from 'next/config'

export const resolveApiPathClient = (apiPathname: string): string => {
  const { publicRuntimeConfig } = getConfig()
  const origin = publicRuntimeConfig.publicApiOrigin
  return new URL(apiPathname, origin).toString()
}
