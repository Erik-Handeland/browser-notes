import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AppBar, Box, createMuiTheme, Divider, IconButton, ThemeProvider, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {NoteAdd as NoteAddIcon, Folder as FolderIcon, Settings as SettingsIcon }  from '@mui/icons-material';
import { AppProvider } from './AppContext';
import { Storage } from './constants'
import { Home } from '../routes/Home';
import { Settings } from '../routes/Settings'
import Notes from "../routes/Notes";
import { getSyncItem } from '../typescript/storage';

import { DBConfig } from './DBConfig';
import { initDB } from 'react-indexed-db';
initDB(DBConfig);

// declare module '@mui/styles/defaultTheme' {
//     // eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
//     interface DefaultTheme extends Theme {}
// }

const useStyles = makeStyles(() => ({
    root: {
        boxShadow: "none",
    },
    content: {
        marginTop: 56,
        minHeight: 'calc(100vh - 56px)',
    },
    hoverStyle: {
        '&:hover': {
            transition: '0.15s',
            transform: 'scale(1.05)'
        },
        '&:active': {
            transition: '0.08s',
            opacity: 0.9,
            transform: 'scale(1.07)'
        },
        transition: '0.15s'
    },
    background: {
        bgColor: 'background.default',
    },
}));

export const App = () => {

    const [darkmode, setDarkmode] = useState(true);

    let { push } = useHistory();

    useEffect(() => {
        getSyncItem(Storage.THEME, (data) => {
            setDarkmode(data[Storage.THEME]);
        })
    }, []);

    const classes = useStyles();

    const theme = createMuiTheme({
        palette: {
            mode: darkmode ? 'dark' : 'light',
            primary: {
                main: darkmode ? '#FF8C00' : '#3f51b5',
            },
            secondary: {
                main: '#00acf5',
            },
        },
        typography: {
            h1: {
                fontSize: 36,
                fontWeight: 700,
            },
            h2: {
                fontSize: 24,
                fontWeight: 800,
            },
            h3: {
                fontSize: 14,
                fontWeight: 700,
                opacity: 0.7,
            },
            h4: {
                fontSize: 14,
                fontWeight: 500,
                opacity: 0.7,
                marginBottom: 12,
                paddingTop: 12,
            },
            subtitle2: {
                fontSize: 12,
                fontWeight: 400,
                opacity: 0.6,
            },
            body1: {
                fontSize: 15,
                lineHeight: 1.2,
                fontWeight: 500,
            },
            button: {
                fontSize: 14,
                textTransform: 'none',
                fontWeight: 600,
            },
        }
    });

    return (
        <ThemeProvider theme={theme}>
         <AppProvider>
            <>
            <div className={classes.background}>
                <AppBar sx={{bgcolor: 'background.default'}} className={classes.root} position="fixed" enableColorOnDark>
                    <Toolbar>
                        <img className={classes.hoverStyle} src={darkmode ? '/securebinlogo_dark.svg' : '/securebinlogo.svg'} alt="logo" onClick={() => { push('/home')}}/>
                        <div style={{marginLeft: 'auto'}}>
                            {<IconButton className={classes.hoverStyle} aria-label="Note" sx={{ mr: 1 }} disableRipple onClick={() => { push('/home')}}>
                            <NoteAddIcon />
                            </IconButton>}
                            <IconButton className={classes.hoverStyle} aria-label="Notes Folder" sx={{ mr: 1 }} disableRipple onClick={() => { push('/notes')}}>
                                <FolderIcon />
                            </IconButton>
                            <IconButton className={classes.hoverStyle} aria-label="Settings" disableRipple onClick={() => { push('/settings')}}>
                                <SettingsIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                    <Divider/>
                </AppBar>
            </div>
            <Box className={classes.content} sx={{bgcolor: 'background.default', color: 'text.primary'}}>
            <Switch >
                <Route path="/home">
                    <Home/>
                </Route>
                <Route path="/settings">
                    <Settings/>
                </Route>
                <Route path="/notes">
                    <Notes/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
            </Box>
            </>
         </AppProvider>
        </ThemeProvider>
    )
};
