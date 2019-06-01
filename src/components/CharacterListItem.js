import {
  ListItemAvatar,
  ListItem,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  Checkbox
} from "@material-ui/core";
import React from "react";

function CharacterListItem({ character, onCheckChange = null }) {
  const [checked, setChecked] = React.useState(false);

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={character.image} />
      </ListItemAvatar>
      <ListItemText primary={character.name} />
      <ListItemSecondaryAction>
        <Checkbox
          value={checked}
          onChange={props => {
            setChecked(props.target.checked);
            if (onCheckChange) {
              onCheckChange(props.target.checked);
            }
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default CharacterListItem;
