<template>
  <q-page class="flex flex-center">
    <q-card class="q-px-lg pokemon-card">
      <q-card-title class="text-center">
        <div>
          <q-btn class="float-left" icon='arrow_back' flat dense round @click="gotoHome()">
          </q-btn>
          {{pokemonDetails.name|camelCase}}
        </div>
      </q-card-title>
      <q-card-separator></q-card-separator>
      <q-card-main>
        <div class="flex justify-around">
          <q-btn flat round icon="arrow_left" @click="decrementImage" class="arrow-btn"></q-btn>
          <q-spinner v-if="loading" :size="50"/>
          <img :src="currentImage" alt="Pokemon profile" class="profile-img" v-if="!loading">
          <q-btn flat round icon="arrow_right" @click="incrementImage" @keyup.right="incrementImage" class="arrow-btn"></q-btn>
        </div>
        <div class="text-center">
          <q-list class="q-pa-sm" no-border>
            <q-item>
              <q-item-main label="Height"></q-item-main>
              {{pokemonDetails.height}}
            </q-item>
            <q-item-separator />
            <q-item>
              <q-item-main label="Weight"></q-item-main>
              {{pokemonDetails.weight}}
            </q-item>
            <q-item-separator />
            <q-item>
              <div class="q-mr-lg">
                <q-item-main label="Moves"></q-item-main>
              </div>
              <div v-if='pokemonDetails.moves'>
                <q-chip color='blue' v-for='(moveDetail, $index) in pokemonDetails.moves.slice(0, 20)' :key='$index' class='q-ma-xs'>
                  {{moveDetail.move.name}}
                </q-chip>
              </div>
            </q-item>
            <q-item-separator />
            <q-item>
              <div class="q-mr-md">
                <q-item-main label="Abilities"></q-item-main>
              </div>
              <div>
                <q-chip color='blue' v-for='(abilityDetail, $index) in pokemonDetails.abilities' :key="$index" class='q-ma-xs'>
                  {{abilityDetail.ability.name}}
                </q-chip>
              </div>
            </q-item>
          </q-list>
        </div>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PokemonProfile',
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
      loading: true,
      pokemonDetails: {},
      currentImageIndex: 0
    }
  },
  created () {
    if (!this.selectedPokemon.name) {
      this.$router.push('/')
    }
    window.addEventListener('keyup', this.keypressHandler)
  },
  methods: {
    gotoHome () {
      this.$router.push('/')
    },
    keypressHandler (event) {
      switch (event.keyCode) {
        case 37:
          this.decrementImage()
          break
        case 39:
          this.incrementImage()
          break
      }
    },
    decrementImage () {
      if (this.currentImageIndex - 1 < 0) {
        let images = Object.values(this.pokemonDetails.sprites).filter(i => i && !(i instanceof Object))
        this.currentImageIndex = images.length - 1
      } else {
        this.currentImageIndex--
      }
    },
    incrementImage () {
      this.currentImageIndex++
    },
    fetchPokemonProfile (url) {
      this.loading = true
      this.$axios.get(url)
        .then((response) => {
          this.loading = false
          this.pokemonDetails = response.data
        })
    }
  },
  computed: {
    selectedPokemon: function () {
      let pokemon = this.$store.state.example.pokemon
      this.fetchPokemonProfile(pokemon.url)
      return pokemon
    },
    currentImage: function () {
      if (!this.pokemonDetails.sprites) {
        return null
      }
      let images = Object.values(this.pokemonDetails.sprites).filter(i => i && !(i instanceof Object))
      return images[this.currentImageIndex % images.length]
    }
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.keypressHandler)
  }
}
</script>

<style>
.pokemon-card {
  max-width: 60%;
}

.pokemon-card .loading {
  min-width: 500px;
}

.pokemon-card .profile-img {
  min-width: 200px;
  min-height: 200px;
}

.pokemon-card .arrow-btn {
  margin: auto;
}
</style>
