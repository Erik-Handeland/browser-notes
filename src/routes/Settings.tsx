import React, { useEffect, useState } from "react";
import {
  Button, Card, Checkbox, List, ListItem, ListItemText,
  Typography
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { setSyncItem, getSyncItem, setLocalItem } from "../typescript/storage";
import { Storage } from "../app/constants";

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: 6,
    border: '1px solid',
    borderColor: 'rgba(170,170,170,0.25)',
    boxShadow: '0 0 7px 0 rgba(0,0,0,0.04)',
    marginBottom: 14,
  },
  pageHeading: {
    paddingLeft: 20,
    paddingTop: 20,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 14,
  },
  list: {
    padding: 20,
  },
  menuItem: {
    height: 10,
    boxShadow: "none"
  },
  select: {
    height: 32,
    marginBottom: 8,
    marginTop: 8,
  }
}));

export const Settings = () => {
  const classes = useStyles();
  const [CLOUD_SYNC, setSyncMode] = useState(false);
  const [THEME, setTheme] = useState(false);

  useEffect(() => {
    getSettings();
  }, []);

  function getSettings(): any {

    getSyncItem(Storage.CLOUD_SYNC, (data) => {
      setSyncMode(data[Storage.CLOUD_SYNC]);
    })

    getSyncItem(Storage.THEME, (data) => {
      setTheme(data[Storage.THEME]);
      //console.log("Getting theme", data[Storage.THEME])
    })
  }

  const deleteNotes = (e: any) => {
    setLocalItem(Storage.NOTES, []);
  }

  const themeHandler = (e: any) => {
    setSyncItem(Storage.THEME, !THEME);
    setTheme(!THEME);
  }

  return (
    <div>
      <Typography variant='h2' className={classes.pageHeading}>Settings</Typography>
      <List className={classes.list}>
        <Typography variant={'h4'}>Theme</Typography>
        <Card classes={{ root: classes.card }}>
          <ListItem>
            <ListItemText
              primary="Dark Mode" />
            <Checkbox checked={THEME} onChange={themeHandler} />
          </ListItem>
        </Card>

        <Typography variant={'h4'}>Sync Settings</Typography>
        <Card classes={{ root: classes.card }}>
          <ListItem>
            <ListItemText primary="Cloud Sync" />
            <Checkbox checked={CLOUD_SYNC} onChange={themeHandler} />
          </ListItem>
        </Card>

        <Typography variant={'h4'}>Reset</Typography>
        <Card classes={{ root: classes.card }}>
          <ListItem>
            <ListItemText
              primary="Delete all Notes" />
            <Button onClick={deleteNotes}>Delete</Button>
          </ListItem>
        </Card>

        <Typography variant={'h4'}>Attributions</Typography>
        <Typography variant={'h4'}>Edit icons created by Kiranshastry - Flaticon</Typography>
      </List>
    </div>
  )
}
