<template>
  <h1 class="display-1" v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>¿Quién es este pokémon?</h1>

    <PokemonPicture style="margin-top: 25px" :pokemonId="pokemon.id" :showPokemon="showPokemon" />

    <PokemonOptions style="margin-top: 25px" :pokemons="pokemonArr" @selection="checkAnswer" />

    <h2>Puntuación = {{ counter }}</h2>

    <template v-if="showAnswer" class="fade-in">
      <h3 class="text-muted">{{ message }}</h3>
      <button @click="newGame" class="btn btn-outline-primary">Nuevo juego</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture";
import PokemonOptions from "@/components/PokemonOptions";
import getPokemonOptions from "@/helpers/getPokemonOptions";

export default {
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
      counter: 0,
    };
  },
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(selectedId) {
      this.showPokemon = true;
      this.showAnswer = true;

      if (this.pokemon.id === selectedId) {
        this.message = `Corecto! era ${this.pokemon.name} !`;
        this.counter++;
      } else {
        this.message = `Oops!, el correcto era ${this.pokemon.name} !`;
      }
    },
    newGame() {
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemon = null;
      this.mixPokemonArray();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>
