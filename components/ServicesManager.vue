<template>
  <v-row>
    <v-col cols="12" class="pa-5">
      <v-list two-line subheader transition>
        <v-subheader v-if="!services.length" class="text-center">
          Add your prefered pinning services!
        </v-subheader>
        <v-slide-x-transition group>
          <template v-for="(service, index) in services">
            <v-list-item :key="service.name">
              <v-list-item-icon>
                <v-icon>mdi-pinterest</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ service.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ service.count }} pins
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action @click="deleteService(index)">
                <v-btn icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>   
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="'divider_' + service.name"></v-divider>
          </template>
        </v-slide-x-transition>
        <v-list-item>
          <v-btn block @click="adding = true" light color="white">New</v-btn>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col cols="12">
      <v-slide-y-transition>
        <v-card v-if="adding" class="mx-3" light>
          <v-card-title>
            New pinning service
          </v-card-title>
          <v-card-text>
            <v-select :items="presets" item-text="presetId" v-model="form" return-object></v-select>
            <v-text-field 
              v-if="form.presetId === 'Custom'"
              v-model="form.name"
              label="Name"
              hint="Friendly name to identify service"
            ></v-text-field>
            <v-text-field 
              v-if="form.presetId === 'Custom'" 
              v-model="form.api" 
              label="API"
              hint="Endpoint address, look at the service documentation"
            ></v-text-field>
            <v-textarea 
              v-model="form.key" 
              label="KEY"
              hint="API Key with pinning permissions"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="addService" text>Connect</v-btn>
          </v-card-actions>
        </v-card>
      </v-slide-y-transition>
      
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from 'vuex'
import { RemoteServiceLs } from '@/helpers/ipfs'

export default {
  data: () => ({
    adding: false,
    services: [],
    presets: [
      { presetId: 'Pinata', name: 'Pinata', api: 'https://api.pinata.cloud/psa', key: '' },
      { presetId: 'Infura (Beta)', name: 'Infura', api: 'https://ipfs.infura.io:5001/api/v0', key: '' },
      { presetId: 'Custom', name: '', api: '', key: '' }
    ],
    form: {
      presetId: 'Custom',
      name: '',
      api: '',
      key: ''
    }
  }),
  methods: {
    ...mapMutations([
      'setServices'
    ]),
    async addService () {
      const result = await RemoteServiceLs(this.form)
      this.services.push({
        ...this.form,
        count: result.count
      })
      this.setServices([...this.services])
      this.adding = false
      this.form.name = ''
      this.form.api = ''
      this.form.key = ''
    },
    async deleteService (index) {
      this.services.splice(index, 1)
      this.setServices([...this.services])
    }
  },
}
</script>