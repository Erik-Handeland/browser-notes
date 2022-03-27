import React, { useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Card, ListItemAvatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getLocalItem } from '../typescript/storage';
import { Storage } from '../app/constants'
import moment from "moment";
import { printDateInCorrectFormat } from "../typescript/utils";
import clsx from "clsx";
import FolderIcon from '@mui/icons-material/Folder';
import NoteDialog from "./templates/Dialog";


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
    icon: {
        fontSize: 80,
        width: '100%',
        color: 'green',
        margin: 20,
    },
    grey: {
        color: 'grey',
    },
    center: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },

}));


export default function Notes() {
    const [note, setNote] = React.useState([]);
    const classes = useStyles();
    let lastLastDate = 0;
    //TODO Add moment JS to calculate time

    useEffect(() => {
        getLocalItem(Storage.NOTES, (data) => {
            setNote(data[Storage.NOTES]);
        })
    }, []);

    return (
        <>
            {/* @ts-ignore */}
            {!note && !note?.length ? (
                <div className={classes.center}>
                    <FolderIcon className={clsx(classes.icon, classes.grey)} />
                    <Typography variant={'h2'}>No Notes</Typography>
                </div>
            ) :
                (
                    <Typography variant='h2' className={classes.pageHeading}>Notes</Typography>
                )
            }
            <List className={classes.list} >
                {note?.reverse().map((item: any, index: number) => {
                    let showitem = false;
                    if (item.date - lastLastDate > 43200) {
                        lastLastDate = item.date;
                        showitem = true;
                    }
                    return (
                        <>
                            {showitem && (<Typography variant='h4'>{moment(item.date).format('MMMM D, YYYY')}</Typography>)}
                            <Card classes={{ root: classes.card }}>
                                <ListItem key={item?.url}>

                                    <ListItemAvatar>
                                        <Avatar alt="Favicon" src={item?.favicon} />
                                    </ListItemAvatar>

                                    <ListItemText primary={item?.url}
                                        secondary={
                                            <React.Fragment>
                                                <Typography>
                                                    {printDateInCorrectFormat(item.date)}
                                                </Typography>
                                                <Typography>
                                                    {item?.text}
                                                </Typography>
                                            </React.Fragment>
                                        } />
                                    <NoteDialog TAB={item}/>
                                </ListItem>
                            </Card>
                        </>
                    )
                })}
            </List>
        </>
    );
}
