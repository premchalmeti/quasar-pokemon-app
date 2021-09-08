<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row">
    <q-btn
      flat
      class='q-my-md q-ml-md'
      round
      @click="leftDrawerOpen = !leftDrawerOpen"
      aria-label="Menu"
    >
      <q-icon name="menu" />
    </q-btn>
    <img src="statics/pokemon-dark.png" alt="Pokemon logo" width="120px" height="100px" @click="gotoHome()" class="clickable">
    </div>
    <!-- <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Quasar App
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header> -->

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>
          <div class="text-right">
            <q-btn outline round icon="arrow_back" @click="leftDrawerOpen=false"></q-btn>
          </div>
        </q-list-header>
        <q-item @click.native="gotoHome()">
          <q-item-side icon="list" />
          <q-item-main label="Pokemons" sublabel="Dashboard" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    gotoHome () {
      this.leftDrawerOpen = false
      this.$router.push('/')
    }
  }
}
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
