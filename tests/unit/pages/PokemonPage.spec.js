import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from "../mocks/pokemons.mock";

describe("PokemonPage Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  test("Debe hacer match con el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot;
  });

  test("Debe llamar mixPokemonArray al montar", () => {
    const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, "mixPokemonArray");
    shallowMount(PokemonPage);

    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  test("Debe hacer match con el snapshot cuando cargan los pokemons", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
          counter: 0,
        };
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Debe de mostrar los componentes de PokemonPicture y PokemonOptions", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
          counter: 0,
        };
      },
    });
    const picture = wrapper.find("pokemon-picture-stub");
    const options = wrapper.find("pokemon-options-stub");

    expect(picture.exists()).toBeTruthy();
    expect(picture.attributes("pokemonid")).toBe("1");

    expect(options.exists()).toBeTruthy();
    expect(options.attributes("pokemons")).toBeTruthy();
  });

  test("Pruebas con checkAnswer()", async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
          counter: 0,
        };
      },
    });

    await wrapper.vm.checkAnswer(1);

    expect(wrapper.find("h3").exists()).toBeTruthy();
    expect(wrapper.vm.showPokemon).toBeTruthy();
    expect(wrapper.find("h3").text()).toBe(`Corecto! era ${pokemons[0].name} !`);

    await wrapper.vm.checkAnswer(3);
    expect(wrapper.vm.message).toBe(`Oops!, el correcto era ${pokemons[0].name} !`);
  });
});
