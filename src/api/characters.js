import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/character/";

export default {
  /**
   * Busca por characters na API
   * @param {String} email
   */
  async findCharacters(name = "", page = 1) {
    const { data } = await axios.get(API_URL, {
      params: {
        name,
        page
      }
    });
    return data;
  }
};
