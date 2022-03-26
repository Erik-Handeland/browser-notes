import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../AppContext";
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import LockIcon from '@mui/icons-material/Lock';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InputBase from '@mui/material/InputBase';
import { MAX_TEXT_LENGTH, Action, Storage } from '../constants'
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { useHistory } from "react-router-dom";
import { addLocalItem, getSyncItem, getSyncItemAsync } from "../chrome/storage";

const useStyles = makeStyles((theme: Theme) => ({
  counterContainer: {
    margin: 15,
    marginTop: 10
  },
  counter: {
    fontSize: 11,
  },
  red: {
    color: 'red',
    fontWeight: 600
  },
  grey: {
    color: 'grey'
  },
  bottomSection: {
    display: 'flex',
  },
  hoverStyle: {
    '&:hover': {
      transition: '0.15s',
      transform: 'scale(1.02)'
    },
    '&:active': {
      transition: '0.08s',
      opacity: 0.9,
      tranresform: 'scale(1.035)'
    },
    transition: '0.15s'
  },
  large: {
    fontSize: '36px',
  },
  copybox: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 6,
    border: '1px solid',
    borderColor: 'rgba(170,170,170,0.25)',
    boxShadow: '0 0 7px 0 rgba(0,0,0,0.04)',
    marginTop: 20,
    marginBottom: 14,
  },
}));


const StyledMenu = styled((props) => (
  <Menu
    open={false} elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props} />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '8px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export function TextCounter(props: any) {
  let MAX = MAX_TEXT_LENGTH;
  const classes = useStyles();
  let safe = props.textLength < MAX

  return (
    <div className={classes.counterContainer}>
      {!safe && <ErrorIcon className={clsx(classes.red, classes.counter)} sx={{ mr: 0.5, mb: -0.25 }} />}
      <Typography className={clsx(safe ? classes.grey : classes.red, classes.counter)} variant={'body1'} >{props.textLength}/{MAX}</Typography>
    </div>
  );
}

export default function CustomizedMenus() {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const buttonEnabled = state.draft.buttonEnabled;
  const text = state.draft.text;
  const [textBox, setTextBox] = React.useState(text);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
  })

  const actionWrapper = async (e: any) => {
  }

  const performAction = async () => {
  
    if (true) {
      let res = "TEST 123"
      setTextBox(res);
      dispatch({
        type: Action.UPDATE_PLAINTEXT,
        payload: { text: res, buttonEnabled: buttonEnabled }
      });
    }
  }
  // @ts-ignore
  return (
    <>
      <div>
        <InputBase
          className={clsx(text.length < 30 && '24')}
          sx={{ width: 440, height: 464, overflow: 'hidden', fontSize: clsx(text.length < 350 ? '24px' : '16px'), textAlign: 'left', padding: 2 }}
          multiline
          autoFocus
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )}
          rows={clsx(text.length < 350 ? 13 : 20)}
          //onChange={checkTypeOfText}
          value={textBox}
          placeholder="Type or paste (⌘ + V) text you want to save here"
          inputProps={{ 'aria-label': 'Note window', 'height': '300px' }}
        />

        <Divider />
        <Box className={classes.bottomSection}>
          <TextCounter textLength={text.length} />
          <Card
            className={classes.hoverStyle}
            style={{ minWidth: 100, textAlign: 'center', backgroundColor: '#1D6BC6', margin: 15, borderRadius: 50, marginLeft: 'auto' }}>
            <ListItemButton sx={{ ml: 1, flex: 1, height: 40, textAlign: 'center', fontWeight: 800 }}
              onClick={actionWrapper}
              aria-controls={open ? 'Select type of action' : undefined}
              aria-haspopup="true"
              disabled={!buttonEnabled}
              aria-expanded={open ? 'true' : undefined}
            >
              <IconButton sx={{ p: '10px', opacity: 0.85 }} onClick={handleClick} disableRipple
                aria-label="encryption/decryption options">
                <KeyboardArrowDownIcon />
              </IconButton>
            </ListItemButton>

          </Card>
        </Box>
      </div>
    </>
  );
}
      function setDarkmode(arg0: any) {
          throw new Error("Function not implemented.");
      }

