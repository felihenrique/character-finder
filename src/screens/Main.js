import {
  CssBaseline,
  Typography,
  Card,
  CardContent,
  TextField,
  List,
  Grid,
  IconButton,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import Toolbar from "../components/Toolbar";
import { connect } from "react-redux";
import debounce from "../utils/debounce";
import store from "../store";
import {
  searchCharacters,
  addCharacter,
  removeCharacter
} from "../store/ducks/characters";
import CharacterListItem from "../components/CharacterListItem";
import LoadingCover from "../components/LoadingCover";
import Search from "@material-ui/icons/Search";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  searchField: {
    width: "100%"
  }
}));

function Main({
  characters,
  loading,
  dispatch,
  totalPages,
  total,
  page,
  selectedCharacters
}) {
  useEffect(() => {
    dispatch(searchCharacters());
  }, [dispatch]);
  const classes = useStyles();
  const [searchName, setSearchName] = React.useState("");
  return (
    <>
      {loading ? <LoadingCover /> : null}
      <CssBaseline />
      <Toolbar
        color="primary"
        title={`Rick and morty character finder`}
        position="relative"
      />
      {selectedCharacters.length > 0 ? (
        <Toolbar
          color="default"
          title={
            <>
              {`${selectedCharacters.length} selected`}{" "}
              <Button align="right" variant="contained" color="primary">
                Send to mail
              </Button>
            </>
          }
          position="fixed"
        />
      ) : null}
      <Toolbar
        color="default"
        position="fixed"
        elevation={0}
        style={{ top: "auto", bottom: 0 }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              InputProps={{ startAdornment: <Search /> }}
              placeholder="Type to find characters"
              className={classes.searchField}
              value={searchName}
              onChange={props => {
                setSearchName(props.target.value);
                searchCharactersDebounced(props.target.value, 1);
              }}
            />
          </Grid>
          <Grid item md={6} xs={12} align="center">
            <IconButton
              disabled={page === 1 || loading}
              onClick={() => {
                dispatch(searchCharacters(searchName, page - 1));
              }}
            >
              <KeyboardArrowLeft />
            </IconButton>
            {page} / {totalPages} ({total})
            <IconButton
              disabled={page === totalPages || loading}
              onClick={() => {
                dispatch(searchCharacters(searchName, page + 1));
              }}
            >
              <KeyboardArrowRight />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
      <Card>
        <CardContent>
          <Typography variant="h6">Find characters</Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Select characters to send to email.
          </Typography>
          <List>
            {characters.map(character => (
              <CharacterListItem
                key={character.id}
                character={character}
                onCheckChange={checked =>
                  dispatch(
                    checked
                      ? addCharacter(character)
                      : removeCharacter(character)
                  )
                }
              />
            ))}
          </List>
          {characters.length === 0 ? (
            <Typography variant="body1" style={{ marginTop: 10 }}>
              No results
            </Typography>
          ) : null}
          <div style={{ height: 30 }} />
        </CardContent>
      </Card>
    </>
  );
}

const searchCharactersDebounced = debounce((name, page) => {
  store.dispatch(searchCharacters(name, page));
}, 300);

function mapStateToProps(state) {
  return {
    characters: state.characters.get("characters"),
    loading: state.characters.get("loading"),
    totalPages: state.characters.get("totalPages"),
    page: state.characters.get("page"),
    total: state.characters.get("total"),
    selectedCharacters: state.characters.get("selectedCharacters").toJS()
  };
}

export default connect(mapStateToProps)(Main);
