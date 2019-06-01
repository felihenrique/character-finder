import charactersApi from "../../api/characters";
import { Map, List } from "immutable";
import createActionCreator from "../createActionCreator";

const initialState = new Map({
  characters: [],
  loading: false,
  totalPages: 0,
  total: 0,
  page: 0,
  selectedCharacters: new List()
});

export const addCharacter = createActionCreator("characters/ADD_CHARACTER");
export const removeCharacter = createActionCreator(
  "characters/REMOVE_CHARACTER"
);
export const clearCharacters = createActionCreator(
  "characters/CLEAR_CHARACTERS"
);
const changeCharacters = createActionCreator("characters/CHANGE_CHARACTERS");
const changeTotalPages = createActionCreator("characters/CHANGE_TOTAL_PAGES");
const changeTotal = createActionCreator("characters/CHANGE_TOTAL");
const changePage = createActionCreator("characters/CHANGE_PAGE");
const setLoading = createActionCreator("characters/SET_LOADING");

/**
 * Action - Busca por characters na API
 */
export function searchCharacters(name = "", page = 1) {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const characters = await charactersApi.findCharacters(name, page);
      dispatch(changeCharacters(characters.results));
      dispatch(changePage(page));
      dispatch(changeTotalPages(characters.info.pages));
      dispatch(changeTotal(characters.info.count));
    } catch (err) {
      dispatch(changeCharacters([]));
    }
    dispatch(setLoading(false));
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case changeCharacters.toString():
      return state.set("characters", action.payload);
    case changePage.toString():
      return state.set("page", action.payload);
    case changeTotal.toString():
      return state.set("total", action.payload);
    case changeTotalPages.toString():
      return state.set("totalPages", action.payload);
    case setLoading.toString():
      return state.set("loading", action.payload);
    case addCharacter.toString():
      return state.set(
        "selectedCharacters",
        state.get("selectedCharacters").push(action.payload)
      );
    case removeCharacter.toString():
      return state.set(
        "selectedCharacters",
        state.get("selectedCharacters").filter(c => c.id !== action.payload.id)
      );
    default:
      return state;
  }
}
