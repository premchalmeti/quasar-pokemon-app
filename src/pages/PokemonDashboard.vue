<template>
  <q-page class="q-mx-lg container">
      <div class="row">
        <div class="col-2"></div>
        <div class="col">
          <q-search v-model="search"/>
        </div>
        <div class="col-2"></div>
      </div>
      <div class="q-mx-xl">
        <div class="min-container">
          <div class="text-center">
            <q-spinner v-if="loading" :size="50"/>
          </div>
          <div v-if='filteredPokemons.length > 0 && !loading'>
            <q-card v-for='pokemon in filteredPokemons' :key='pokemon.name' class="q-ma-md pokemon-card">
              <q-card-title class="q-pb-none">
                <span @click="gotoProfile(pokemon)" class="clickable">
                  {{pokemon.name|camelCase}}
                </span>
                <p class="text-muted">Pokemon</p>
              </q-card-title>
              <q-card-actions align='end'>
                <q-btn class="q-mr-sm" flat color='blue' label="View" @click="gotoProfile(pokemon)"></q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div v-if="filteredPokemons.length === 0 && !loading">
            <div class="text-center q-mt-xl">
              <h4 class="text-muted">No data found</h4>
            </div>
          </div>
        </div>
        <div class="text-center pagination-controls">
          <q-btn title="Go to Previous page" icon='chevron_left' round class="q-mx-md" color='blue' @click="fetchPokemons(prevUrl)" :disabled='!prevUrl'></q-btn>
          <q-btn title="Go to Next page" icon='chevron_right' round class="q-mx-md" color='blue' @click="fetchPokemons(nextUrl)" :disabled='!nextUrl'></q-btn>
        </div>
      </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  filters: {
    camelCase: function (val) {
      if (!val) {
        return ''
      }
      val = val.toString()
      return val.charAt(0).toUpperCase() + val.slice(1)
    }
  },
  data () {
    return {
      pokemons: [],
      loading: true,
      search: '',
      nextUrl: '',
      prevUrl: '',
      apiUrl: 'https://pokeapi.co/api/v2/pokemon/'
    }
  },
  created () {
    this.fetchPokemons(this.apiUrl)
  },
  methods: {
    gotoProfile (pokemon) {
      console.log(pokemon)
      this.$store.dispatch('example/setPokemon', pokemon)
      this.$router.push('/profile/')
    },
    fetchPokemons (url) {
      this.loading = true
      this.$axios.get(url)
        .then((response) => {
          this.pokemons = response.data.results
          this.prevUrl = response.data.previous
          this.nextUrl = response.data.next
          this.loading = false
        })
    }
  },
  computed: {
    filteredPokemons: function () {
      let re = new RegExp(this.search, 'i')
      return this.search ? this.pokemons.filter(p => p.name.search(re) >= 0) : this.pokemons
    }
  }
}
</script>

<style scoped>
.pokemon-card {
  min-width: 200px;
  display: inline-block;
}
.min-container {
  min-height: 30vh;
}
.text-muted {
  color: grey;
}
.clickable {
  cursor: pointer;
}
</style>
