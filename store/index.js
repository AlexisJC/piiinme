import { CID } from 'ipfs'
import { RemoteServiceAdd, RemoteServiceRm } from '@/helpers/ipfs'

export default {
  state: () => ({
    pins: [],
    services: []
  }),
  mutations: {
    setPins: (state, value) => state.pins = value,
    setServices: (state, value) => state.services = value
  },
  actions: {
    async pin ({ state, commit }, dapp) {
      this.$ipfs.pin.add(dapp.cid)
      for (const service of state.services) {
        const result = await RemoteServiceAdd(service, dapp)
        console.log(result)
      }
      const pins = [...state.pins]
      pins.push(dapp.cid)
      commit('setPins', pins)
      for await (const { cid, type } of this.$ipfs.pin.ls()) {
        console.log({ cid, type })
      }
    },
    async unpin ({ state, commit }, dapp) {
      this.$ipfs.pin.rm(new CID(dapp.cid))

      for (const service of state.services) {
        const result = await RemoteServiceRm(service, dapp)
        console.log(result)
      }

      const pins = [...state.pins]
      pins.splice(pins.indexOf(dapp.cid), 1)
      commit('setPins', pins)
      for await (const { cid, type } of this.$ipfs.pin.ls()) {
        console.log({ cid, type })
      }
    }
  }
}