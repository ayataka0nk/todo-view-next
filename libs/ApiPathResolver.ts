import getConfig from 'next/config'

export const resolveApiPath = (apiPathname: string): string => {
  const { publicRuntimeConfig } = getConfig()
  const origin = publicRuntimeConfig.publicApiOrigin
  return new URL(apiPathname, origin).toString()
}
