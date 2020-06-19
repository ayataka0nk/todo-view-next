import getConfig from 'next/config'

export const resolveApiPath = (apiPathname: string): string => {
  const { publicRuntimeConfig } = getConfig()
  const origin = publicRuntimeConfig.publicApiOrigin
  console.log('origin: ' + origin + ', apiPath: ' + apiPathname)
  const path = new URL(apiPathname, origin).toString()
  console.log('resolved path: ' + path)
  return path
}
