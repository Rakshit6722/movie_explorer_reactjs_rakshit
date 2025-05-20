import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { userNotificationApi } from '../../services/api';
import { setAllowNotifications } from '../../redux/slices/userSlice';
import { requestForToken } from '../../utils/fcm';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';


const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#65C466',
                opacity: 1,
                border: 0,
                ...theme.applyStyles('dark', {
                    backgroundColor: '#2ECA45',
                }),
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles('dark', {
                color: theme.palette.grey[600],
            }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles('dark', {
                opacity: 0.3,
            }),
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
        ...theme.applyStyles('dark', {
            backgroundColor: '#39393D',
        }),
    },
}));



export default function NotificationSlider() {

    const dispatch = useDispatch();

    const allowNotifications: boolean = useSelector((state: RootState) => state.user.allowNotifications);

    const [loading, setLoading] = React.useState(false)

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setLoading(true)
            try {
                const fcmToken = await requestForToken()
                if (fcmToken) {
                    const response = await userNotificationApi({ device_token: fcmToken, notifications_enabled: true })
                    if (response) {
                        dispatch(setAllowNotifications(true))
                        toast.success("Notifications enabled")
                    }
                }
            } catch (err: any) {
                toast.error(err?.message || "Couldn't enable notifications")
            } finally {
                setLoading(false)
            }
        } else {
            setLoading(true)
            try {
                const response = await userNotificationApi({ device_token: null, notifications_enabled: false })
                if (response) {
                    dispatch(setAllowNotifications(false))
                    toast.success("Notifications disabled")
                }
            } catch (err: any) {
                toast.error(err?.message || "Couldn't disable notifications")
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className="p-2 rounded-md bg-black hover:bg-[#0a0a0a] border border-[#1a1a1a] transition-colors duration-200 flex justify-between items-center">
            <Typography variant="body2" color="white"  className="font-sans" sx={{ fontSize: '1rem', fontWeight: 300 }}>
                Allow Notifications
            </Typography>
            <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} defaultChecked={allowNotifications} onChange={handleChange} />}
                label=""
            />
        </div>
    );
}