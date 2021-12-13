import { shallowMount } from "@vue/test-utils";
import PokemonPicture from "@/components/PokemonPicture";

describe("PokemonPicture component", () => {
  test("Debe hacer match con el snapshot", () => {
    const wrapper = shallowMount(PokemonPicture, { props: { pokemonId: 1, showPokemon: false } });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Debe mostrar la imagen oculta y el pokemon nº 100", () => {
    const wrapper = shallowMount(PokemonPicture, { props: { pokemonId: 100, showPokemon: false } });

    const [img1, img2] = wrapper.findAll("img");

    expect(img1.exists()).toBeTruthy();
    expect(img2).toBe(undefined);
    expect(img1.classes("hidden-pokemon")).toBeTruthy();
    expect(img1.attributes("src")).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg"
    );
  });

  test("Debe mostrar el pokemon si showPokemon:true", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: true,
      },
    });

    const img1 = wrapper.find("img");

    expect(img1.exists()).toBeTruthy();
    expect(img1.classes("hidden-pokemon")).toBe(true);
    expect(img1.classes("fade-in")).toBe(false);
  });
});
