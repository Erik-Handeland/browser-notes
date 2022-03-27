import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { setSyncItem, getSyncItem, addLocalItem } from "../../typescript/storage";
import { Storage } from "../../app/constants";
import { Avatar, Box, Card, Divider, IconButton, InputBase, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { printDateInCorrectFormat } from '../../typescript/utils';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
    dialog: {
        width: '440',
    },
}));



export default function NoteDialog(props: any) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [textBox, setTextBox] = React.useState(props.TAB.text);
    const [url, setURL] = React.useState(props.TAB.url);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const history = {
            url: url,
            favicon: props.TAB.favicon,
            text: textBox,
            date: new Date().getTime(),
        }
        addLocalItem(Storage.HISTORY, history);

        setOpen(false);
        // TODO on close refresh history view
    };

    const handelDelete = () => {
        setOpen(false);
    };

    const updateNoteText = (e: any) => {
        let text = e.target.value || "";
        setTextBox(text);
    };

    const updateUrlText = (e: any) => {
        let text = e.target.value || "";
        setURL(text);
    };

    return (
        <div>
            <IconButton color="primary" aria-label="View Note" onClick={handleClickOpen}>
                <InfoOutlinedIcon />
            </IconButton>

            <Dialog open={open} onClose={handleSave} >
                <DialogTitle sx={{
                    width: 320,
                }}>
                    <Typography variant={'h3'}>Note: {props.TAB.url}</Typography>
                    {/* TODO url pretty */}
                </DialogTitle>
                <Divider />

                <DialogContent sx={{
                    pt: 0,
                }}>

                    <ListItem key={""}>
                        <ListItemAvatar>
                            <Avatar alt="Favicon" src={props.TAB.favicon} />
                        </ListItemAvatar>

                        <ListItemText primary={
                            <InputBase
                                sx={{ overflow: 'hidden', fontSize: '12px', width: '100%' }}
                                onFocus={(e) =>
                                    e.currentTarget.setSelectionRange(
                                        e.currentTarget.value.length,
                                        e.currentTarget.value.length
                                    )}
                                onChange={updateUrlText}
                                value={url}
                            />
                        }
                            secondary={printDateInCorrectFormat(props.TAB.date)} />
                    </ListItem>
                    <Divider />

                    <InputBase
                        className={clsx(props.TAB.text.length < 30 && '24')}
                        sx={{ overflow: 'hidden', fontSize: clsx(props.TAB.text.length < 320 ? '16px' : '12px'), width: '100%'}}
                        multiline
                        autoFocus
                        onFocus={(e) =>
                            e.currentTarget.setSelectionRange(
                                e.currentTarget.value.length,
                                e.currentTarget.value.length
                            )}
                        rows={clsx(props.TAB.text.length < 320 ? 12 : 20)}
                        onChange={updateNoteText}
                        value={textBox}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handelDelete}>Delete</Button>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                    {/* TODO have delete on left side, Delete, Save         Cancel */}
                </DialogActions>
            </Dialog>
        </div>
    );
}