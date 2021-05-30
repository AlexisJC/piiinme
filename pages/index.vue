<template>
  <v-scroll-y-transition tag="v-row" group mode="out-in">
    <v-col cols="12" class="my-10" key="title">
      <h1 class="text-h4 white--text font-weight-bold" style="font-family: 'Poppins', sans-serif!important;">
        Help to host the open web!
      </h1>
    </v-col>
    <v-col cols="12" key="search">
      <v-text-field dark v-model="search" prepend-inner-icon="mdi-file-search" placeholder="Search CID, name, description..." filled></v-text-field>
    </v-col>
    <v-col tag="v-col" cols="12" md="4" v-for="dapp in dappsFiltered" :key="dapp.slug">
          <v-card>
            <v-card-title>
              <span>{{ dapp.title }}</span>
              <v-spacer></v-spacer>
              <v-btn :href="'https://ipfs.io/ipfs/' + dapp.cid" target="_blank" icon>
                <v-icon color="secondary">mdi-open-in-new</v-icon>
              </v-btn>
              
            </v-card-title>
            <v-card-text>
              {{ dapp.description }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <template>
                <v-btn v-if="!dapp.isPined" @click="pin(dapp)" outlined color="secondary">
                  <v-icon left>mdi-pin</v-icon>
                  Pin
                </v-btn>
                <v-btn v-else text @click="unpin(dapp)">
                  <v-icon left>mdi-pin-off</v-icon>
                  Unpin
                </v-btn>
              </template>
            </v-card-actions>
          </v-card>
        </v-col>
  </v-scroll-y-transition>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  async asyncData ({ $content }) {
    const dapps = await $content('dapps').fetch()
    return { dapps }
  },
  data: () => ({
    search: ''
  }),
  computed: {
    ...mapState([
      'pins'
    ]),
    dappsWithMetadata () {
      return this.dapps.map(dapp => ({
        ...dapp,
        isPined: this.pins.includes(dapp.cid)
      }))
    },
    dappsFiltered () {
      if (this.search === '') {
        return this.dappsWithMetadata
      }
      return this.dappsWithMetadata.filter(dapp => dapp.cid === this.search)
    }
  },
  methods: {
    ...mapActions([
      'pin',
      'unpin'
    ])
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
</style>