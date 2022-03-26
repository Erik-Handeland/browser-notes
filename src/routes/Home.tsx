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
import { addLocalItem } from "../typescript/storage";
import { getCurrentTab } from '../typescript/utils';

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
    const classes = useStyles();
    const { state, dispatch } = useContext(AppContext);
    const buttonEnabled = state.draft.buttonEnabled;
    const text = state.draft.text;
    const [textBox, setTextBox] = React.useState(text);
    const [tab, setTab] = React.useState<Tab>({ url: "", favicon: "" });

    const handleClick = (event: any) => {
        performAction(text);
    }

    useEffect(() => {
        getCurrentTab((tab) => {
            setTab(tab || { url: "", favicon: "" });
        })
    }, []);

    const performAction = async (text_note: string) => {
        const history = {
            id: Math.floor(Math.random()),
            text: text_note,
            date: new Date().getTime(),
        }

        addLocalItem(Storage.HISTORY, history);
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
        setTab({ url: textbox, favicon: tab.favicon }); // TODO if url is update to new domain, favicon will be invalid
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
                        }}
                        alt="Favicon"
                        src={tab.favicon}
                    />
                    <InputBase
                        sx={{ width: 440, height: 10, overflow: 'hidden', fontSize: '12px', textAlign: 'right', padding: 2 }}
                        onFocus={(e) =>
                            e.currentTarget.setSelectionRange(
                                e.currentTarget.value.length,
                                e.currentTarget.value.length
                            )}
                        value={tab.url}
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