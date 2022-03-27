import React, { useEffect, useContext } from "react";
import { AppContext, Tab } from "../app/AppContext";
import Divider from '@mui/material/Divider';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { MAX_TEXT_LENGTH, Action, Storage } from '../app/constants'
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { getCurrentTab } from '../typescript/utils';
import { useIndexedDB } from 'react-indexed-db';

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
    urlSection: {
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


export const Home = () => {
    const [run, setRun] = React.useState(true); // added cause useEffect was running multiple times
    const classes = useStyles();
    const { state, dispatch } = useContext(AppContext);
    const buttonEnabled = state.draft.buttonEnabled;
    const text = state.draft.text;
    const [textBox, setTextBox] = React.useState(text);
    const [TAB, setTab] = React.useState<Tab>({ url: "", favicon: "" });
    const db = useIndexedDB(Storage.NOTES);

    const handleClick = (event: any) => {
        performAction();
    }

    useEffect(() => {
        getCurrentTab((tab) => {
            setTab(tab || { url: "", favicon: "" });
        })
    }, []);

    // populate textbox with current note
    useEffect(() => {
        if (run && TAB.url !== "") {
            db.getByIndex('url', TAB.url).then(res => {
                console.log("res: ",res)
                setTextBox(res?.text || "");
            })
            setRun(false)
        }

    }, [db, run, TAB]);


    const performAction = async () => {
        var note = {
            url: TAB.url,
            favicon: TAB.favicon,
            text: textBox,
            date: new Date().getTime(),
        }

        // addLocalItem(Storage.NOTES, note); // old local storage, switch to indexedDB

        db.getByIndex('url', TAB.url).then(res => {
            if (res) { // url already exists, update
                note = Object.assign(res, note) // package adds id to object, so we must add it
                db.update(note).then(event => {
                    // updated
                });
            } else {
                db.add(note).then(
                    event => {
                        //console.log('ID Generated: ', event.valueOf());
                        // successfully added to DB
                    },
                    error => { // Error occured try to update instead
                        console.log(error);
                    }
                );
            }
        });
    }

    const updateNoteText = (e: any) => {
        let textbox = e.target.value || "";
        let buttonEnabled = false;
        if (textbox.length <= MAX_TEXT_LENGTH) {
            buttonEnabled = true
        }
        setTextBox(textbox);
        dispatch({ type: Action.UPDATE_TEXT, payload: { text: textbox, buttonEnabled: buttonEnabled } });
    };

    const updateUrlText = (e: any) => {
        let textbox = e.target.value || "";
        setTab({ url: textbox, favicon: TAB.favicon }); // TODO if url is update to new domain, favicon will be invalid
        dispatch({ type: Action.UPDATE_TEXT, payload: { text: textbox, buttonEnabled: buttonEnabled } }); //TODO add url to payload
    };


    // @ts-ignore
    return (
        <>
            <div>
                <Box className={classes.urlSection}>
                    <Box
                        component="img"
                        sx={{
                            height: 32,
                            width: 32,
                            pl: 2,
                        }}
                        alt="Favicon"
                        src={TAB.favicon}
                    />
                    <InputBase
                        sx={{ width: 440, height: 10, overflow: 'hidden', fontSize: '12px', textAlign: 'right', padding: 2 }}
                        onFocus={(e) =>
                            e.currentTarget.setSelectionRange(
                                e.currentTarget.value.length,
                                e.currentTarget.value.length
                            )}
                        onChange={updateUrlText}
                        value={TAB.url}
                        inputProps={{ 'aria-label': 'Note window', 'height': '300px' }}
                    />
                </Box>
                <Divider />

                <InputBase
                    className={clsx(text.length < 30 && '24')}
                    sx={{ width: 440, height: 440, overflow: 'hidden', fontSize: clsx(text.length < 350 ? '24px' : '16px'), textAlign: 'left', padding: 2 }}
                    multiline
                    autoFocus
                    onFocus={(e) =>
                        e.currentTarget.setSelectionRange(
                            e.currentTarget.value.length,
                            e.currentTarget.value.length
                        )}
                    rows={clsx(text.length < 350 ? 13 : 20)}
                    onChange={updateNoteText}
                    value={textBox}
                    placeholder="Type or paste (⌘ + V) text you want to save here"
                    inputProps={{ 'aria-label': 'Note window', 'height': '300px' }}
                />

                <Divider />
                <Box className={classes.bottomSection}>
                    <TextCounter textLength={text.length} />

                    <IconButton className={classes.hoverStyle} aria-label="Save" disableRipple onClick={handleClick}
                        style={{ minWidth: 20, margin: 15, borderRadius: 50, marginLeft: 'auto' }} >
                        <SaveIcon />
                        {/* if no change, leave grey, after altered text set to black/white some kind of highlighted color maybe blue */}
                    </IconButton>
                </Box>
            </div>
        </>
    );
}