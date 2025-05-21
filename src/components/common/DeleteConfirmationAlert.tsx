import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type DeleteConfirmationAlertProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    movieTitle?: string;
};

export default function DeleteConfirmationAlert({
    open,
    onClose,
    onConfirm,
    movieTitle,
}: DeleteConfirmationAlertProps) {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="delete-dialog-slide-description"
            PaperProps={{
                sx: {
                    background: 'linear-gradient(135deg, #18181c 60%, #2d1a1a 100%)',
                    color: '#fff',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.45)',
                }
            }}
        >
            <DialogTitle  sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700, fontFamily: 'Anton', letterSpacing: 1 }}>
                Delete Movie
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="delete-dialog-slide-description"
                    sx={{ color: 'rgba(255,255,255,0.85)' }}
                >
                    {`Are you sure you want to delete${movieTitle ? ` "${movieTitle}"` : ''}? This action cannot be undone.`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit" variant="outlined" sx={{
                    borderColor: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    '&:hover': {
                        borderColor: '#e23145',
                        background: 'rgba(255,255,255,0.05)'
                    }
                }}>
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained" sx={{
                    background: 'linear-gradient(90deg, #e23145 60%, #78121e 100%)',
                    color: '#fff',
                    boxShadow: '0 2px 8px 0 rgba(226,49,69,0.15)',
                    '&:hover': {
                        background: 'linear-gradient(90deg, #f04155 60%, #8a1523 100%)'
                    }
                }}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}