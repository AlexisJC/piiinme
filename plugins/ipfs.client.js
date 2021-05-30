import ipfs from 'ipfs'

export default async function ({ app }, inject) {
  const instance = await ipfs.create()
  inject('ipfs', instance)
}