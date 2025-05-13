import React, { Component } from 'react'
import Box from '@mui/material/Box';
import coverImage from '../../assets/images/coverImage5.jpg'
import { Button, Card, CircularProgress, TextField, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginApi, registerApi, userNotificationApi } from '../../services/api';
import { toast } from 'react-toastify';
import WithRouter from '../hoc/WithRouter';
import SaveIcon from '@mui/icons-material/Save';
import { setCurrentPlan, setToken, setUser } from '../../redux/slices/userSlice';
import { requestForToken } from '../../utils/fcm';
import logo from '../../assets/images/movieExplorerLogoNew.png'
import {motion} from 'framer-motion';

type AuthTemplateProps = {
    type: 'login' | 'register',
    navigate: (path: string) => void,
    dispatch: (action: any) => void,
}

type AuthTemplateState = {
    formData: {
        firstname: string,
        lastname: string,
        email: string,
        number: string,
        password: string,
        confirmpassword: string
    },
    errors: {
        firstnammeError: string,
        lastnameError: string,
        emailError: string,
        numberError: string,
        passwordError: string,
        confirmpasswordError: string
    },
    showPassword: boolean,
    showConfirmPassword: boolean,
    setLoading: boolean
}

class AuthTemplate extends Component<AuthTemplateProps, AuthTemplateState> {

    constructor(props: AuthTemplateProps) {
        super(props)
        this.state = {
            formData: {
                firstname: '',
                lastname: '',
                email: '',
                number: '',
                password: '',
                confirmpassword: ''
            },
            errors: {
                firstnammeError: '',
                lastnameError: '',
                emailError: '',
                numberError: '',
                passwordError: '',
                confirmpasswordError: ''
            },
            showPassword: false,
            showConfirmPassword: false,
            setLoading: false
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = e.target

        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [id]: value
            },
            errors: {
                ...prevState.errors,
                [`${id}Error`]: ''
            }
        }))
    }

    isValid = (formData: any) => {
        let isValid = true
        const errorObj = {
            firstnammeError: '',
            lastnameError: '',
            emailError: '',
            numberError: '',
            passwordError: '',
            confirmpasswordError: ''
        }

        if (this.props.type === 'register') {
            if (formData.firstname === '') {
                errorObj.firstnammeError = 'First name is required'
                isValid = false
            }
            if (formData.lastname === '') {
                errorObj.lastnameError = 'Last name is required'
                isValid = false
            }
            if (formData.number === '') {
                errorObj.numberError = 'Phone number is required'
                isValid = false
            }
            if (formData.confirmpassword === '') {
                errorObj.confirmpasswordError = 'Confirm password is required'
                isValid = false
            }
            if (formData.password !== formData.confirmpassword) {
                errorObj.confirmpasswordError = 'Password and confirm password do not match'
                isValid = false
            }
            if (!/\S+@\S+\.\S+/.test(formData.email)) {
                errorObj.emailError = 'Email is invalid'
                isValid = false
            }
            if (formData.password.length < 6) {
                errorObj.passwordError = 'Password must be at least 6 characters long'
                isValid = false
            } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(formData.password) === false) {
                errorObj.passwordError = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                isValid = false
            }
        }

        if (formData.email === '') {
            errorObj.emailError = 'Email is required'
            isValid = false
        }


        if (formData.password === '') {
            errorObj.passwordError = 'Password is required'
            isValid = false
        }


        this.setState({
            errors: errorObj,

        })
        return isValid
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { formData } = this.state
        const isValid = this.isValid(formData)

        if (!isValid) {
            return
        }

        this.setState((prevState) => ({
            setLoading: !prevState.setLoading
        }))

        const { firstname,
            lastname,
            email,
            password,
            number
        } = this.state.formData

        if (this.props.type === 'login') {
            try {
                const response = await loginApi({ email, password })

                if (response?.status === 200) {
                    this.props.dispatch(setUser(response?.data?.user))
                    this.props.dispatch(setToken(response?.data?.token))
                    this.props.dispatch(setCurrentPlan(response?.data?.user?.active_plan))
                    localStorage.setItem("token", response?.data?.token)
                    this.props.navigate('/')
                    const fcmToken = await requestForToken()
                    if (fcmToken) {
                        await userNotificationApi({
                            device_token: fcmToken,
                            notifications_enabled: true
                        })
                    }
                    toast.success('Login Successfull')
                }
            } catch (err: any) {
                toast.error(err?.message ?? 'Something went wrong, please try again!')
            }
        } else if (this.props.type === 'register') {
            try {
                const response = await registerApi({
                    email,
                    first_name: firstname,
                    last_name: lastname,
                    password,
                    mobile_number: number
                })

                if (response?.status === 201) {
                    this.props.navigate('/login')
                    toast.success("User Created Successfully")
                }
            } catch (err: any) {
                toast.error(err?.message || "Something went wrong, please try again")
            }

        }

        this.setState({
            formData: {
                firstname: '',
                lastname: '',
                email: '',
                number: '',
                password: '',
                confirmpassword: ''
            }
        })


        this.setState((prevState) => ({
            setLoading: !prevState.setLoading
        }))
    }

    render() {

        const { type } = this.props
        const { formData, errors, showPassword, showConfirmPassword } = this.state

        return (
            <Box sx={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
            }}>

                <NavLink
                    to="/"
                    className="absolute top-8 left-8 z-30 flex items-center transition-all duration-300 hover:-translate-y-0.5"
                    style={{ textDecoration: 'none' }}
                >
                    <div className="glass-effect flex items-center gap-3.5 px-4 py-2.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl hover:shadow-[#e23145]/10 hover:border-white/20">
                        <div className="relative">
                            <img
                                src={logo}
                                alt="Movie Explorer"
                                className="h-14 w-auto object-contain"
                                style={{
                                    filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))'
                                }}
                            />
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#e23145]/10 to-transparent rounded-full blur-sm opacity-70 -z-10"></div>
                        </div>

                        <div className="h-10 w-px bg-gradient-to-b from-white/5 via-white/15 to-white/5"></div>

                        <div className="pl-1">
                            <span className="text-white font-medium text-xl tracking-wide flex flex-col">
                                <span className="font-bold text-[22px] leading-none bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                                    Movie
                                </span>
                                <span className="text-[#e23145] font-semibold">Explorer</span>
                            </span>
                        </div>
                    </div>
                </NavLink>

                <Box sx={{
                    position: 'absolute',
                    inset: '0',
                    zIndex: '0'
                }}>
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f02c48]/55 via-black/85 to-black/90" />
                </Box>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        zIndex: '20',
                        width: '100%',
                        maxWidth: '24rem',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '0.5rem',
                        borderColor: 'rgb(255 255 255 / 0.2)',
                        backgroundColor: 'rgb(255 255 255 / 0.2)',
                        boxShadow: '0 0 0.5rem rgb(255 255 255 / 0.2)',
                        padding: '2rem',
                        backdropFilter: 'blur(0.5rem)',
                        WebkitBackdropFilter: 'blur(0.5rem)',
                    }}>
                        <div data-testid="mainHeading" className='mb-6'>
                            <Typography variant="h4" gutterBottom sx={{ color: 'white', fontSize: '1.5rem', lineHeight: '1.5rem', marginBottom: '0.5rem', fontFamily: 'Anton' }}>
                                {type === 'login' ? 'Sign In' : type === 'register' ? 'Create Account' : ''}
                            </Typography>
                            <div className="h-1 w-12 bg-[#f02c48] rounded-full"></div>
                        </div>

                        <form onSubmit={this.handleSubmit} className='space-y-4'>
                            {
                                type === 'login' && (
                                    <>
                                        <TextField
                                            id="email"
                                            label="Email"
                                            variant="outlined"
                                            value={formData.email}
                                            onChange={this.handleChange}
                                            fullWidth
                                            InputProps={{
                                                style: {
                                                    color: 'white',
                                                }
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color: 'rgba(255, 255, 255, 0.6)',
                                                }
                                            }}
                                            placeholder="Enter your email"
                                            sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '0.5rem',
                                                backdropFilter: 'blur(8px)',
                                                WebkitBackdropFilter: 'blur(8px)',
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#f02c48',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#f02c48',
                                                    },
                                                    input: {
                                                        color: 'white',
                                                        '::placeholder': {
                                                            color: 'rgba(255, 255, 255, 0.6)',
                                                        }
                                                    }
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'rgba(255, 255, 255, 0.6)',
                                                    '&.Mui-focused': {
                                                        color: '#f02c48',
                                                    }
                                                }
                                            }}
                                        />
                                        {
                                            errors.emailError && (
                                                <span className='text-red-500 text-sm'>{errors.emailError}</span>
                                            )
                                        }

                                        <div className='relative'>
                                            <TextField
                                                id="password"
                                                label="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                variant="outlined"
                                                value={formData.password}
                                                onChange={this.handleChange}
                                                fullWidth
                                                InputProps={{
                                                    style: {
                                                        color: 'white',
                                                    }
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: 'rgba(255, 255, 255, 0.6)',
                                                    }
                                                }}
                                                placeholder="Enter your password"
                                                sx={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '0.5rem',
                                                    backdropFilter: 'blur(8px)',
                                                    WebkitBackdropFilter: 'blur(8px)',
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#f02c48',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#f02c48',
                                                        },
                                                        input: {
                                                            color: 'white',
                                                            '::placeholder': {
                                                                color: 'rgba(255, 255, 255, 0.6)',
                                                            }
                                                        }
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'rgba(255, 255, 255, 0.6)',
                                                        '&.Mui-focused': {
                                                            color: '#f02c48',
                                                        }
                                                    }
                                                }}
                                            />
                                            <div>
                                                {
                                                    showPassword ? (
                                                        <VisibilityOffIcon data-testid="visibility-icon"
                                                            className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                                                            sx={{
                                                                color: 'rgba(255, 255, 255, 0.6)',
                                                                '&:hover': {
                                                                    color: '#f02c48',
                                                                }
                                                            }}
                                                            onClick={() => this.setState({ showPassword: !showPassword })}
                                                        />
                                                    ) : (
                                                        <VisibilityIcon data-testid="visibility-icon"
                                                            className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                                                            sx={{
                                                                color: 'rgba(255, 255, 255, 0.6)',
                                                                '&:hover': {
                                                                    color: '#f02c48',
                                                                }
                                                            }}
                                                            onClick={() => this.setState({ showPassword: !showPassword })}
                                                        />
                                                    )
                                                }

                                            </div>
                                        </div>
                                        {
                                            errors.passwordError && (
                                                <span className='text-red-500 text-sm'>{errors.passwordError}</span>
                                            )
                                        }
                                    </>
                                )
                            }

                            {
                                type === 'register' && (
                                    <div className='flex flex-col gap-3'>

                                        <div className='flex flex-col sm:flex-row gap-3'>
                                            <div className='flex-1'>
                                                <TextField
                                                    id="firstname"
                                                    label="First Name"
                                                    variant="outlined"
                                                    value={formData.firstname}
                                                    onChange={this.handleChange}
                                                    fullWidth
                                                    size="small"
                                                    InputProps={{
                                                        style: { color: 'white' }
                                                    }}
                                                    InputLabelProps={{
                                                        style: {
                                                            color: 'rgba(255, 255, 255, 0.6)',
                                                            fontSize: '0.85rem'
                                                        }
                                                    }}
                                                    placeholder="Enter your first name"
                                                    sx={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                        borderRadius: '0.5rem',
                                                        backdropFilter: 'blur(8px)',
                                                        WebkitBackdropFilter: 'blur(8px)',
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                                            '&:hover fieldset': { borderColor: '#f02c48' },
                                                            '&.Mui-focused fieldset': { borderColor: '#f02c48' },
                                                            input: {
                                                                color: 'white',
                                                                '::placeholder': { color: 'rgba(255, 255, 255, 0.6)' }
                                                            }
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: 'rgba(255, 255, 255, 0.6)',
                                                            '&.Mui-focused': { color: '#f02c48' }
                                                        }
                                                    }}
                                                />
                                                {errors.firstnammeError && (
                                                    <div className='text-red-500 text-xs mt-1 h-4'>{errors.firstnammeError}</div>
                                                )}
                                            </div>
                                            <div className='flex-1'>
                                                <TextField
                                                    id="lastname"
                                                    label="Last Name"
                                                    onChange={this.handleChange}
                                                    value={formData.lastname}
                                                    variant="outlined"
                                                    fullWidth
                                                    size="small"
                                                    InputProps={{
                                                        style: { color: 'white' }
                                                    }}
                                                    InputLabelProps={{
                                                        style: {
                                                            color: 'rgba(255, 255, 255, 0.6)',
                                                            fontSize: '0.85rem'
                                                        }
                                                    }}
                                                    placeholder="Enter your last name"
                                                    sx={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                        borderRadius: '0.5rem',
                                                        backdropFilter: 'blur(8px)',
                                                        WebkitBackdropFilter: 'blur(8px)',
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                                            '&:hover fieldset': { borderColor: '#f02c48' },
                                                            '&.Mui-focused fieldset': { borderColor: '#f02c48' },
                                                            input: {
                                                                color: 'white',
                                                                '::placeholder': { color: 'rgba(255, 255, 255, 0.6)' }
                                                            }
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: 'rgba(255, 255, 255, 0.6)',
                                                            '&.Mui-focused': { color: '#f02c48' }
                                                        }
                                                    }}
                                                />
                                                {errors.lastnameError && (
                                                    <div className='text-red-500 text-xs mt-1 h-4'>{errors.lastnameError}</div>
                                                )}
                                            </div>
                                        </div>


                                        <div>
                                            <TextField
                                                id="email"
                                                label="Email"
                                                variant="outlined"
                                                onChange={this.handleChange}
                                                value={formData.email}
                                                fullWidth
                                                size="small"
                                                InputProps={{
                                                    style: { color: 'white' }
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: 'rgba(255, 255, 255, 0.6)',
                                                        fontSize: '0.85rem'
                                                    }
                                                }}
                                                placeholder="Enter your email"
                                                sx={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '0.5rem',
                                                    backdropFilter: 'blur(8px)',
                                                    WebkitBackdropFilter: 'blur(8px)',
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                                        '&:hover fieldset': { borderColor: '#f02c48' },
                                                        '&.Mui-focused fieldset': { borderColor: '#f02c48' },
                                                        input: {
                                                            color: 'white',
                                                            '::placeholder': { color: 'rgba(255, 255, 255, 0.6)' }
                                                        }
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'rgba(255, 255, 255, 0.6)',
                                                        '&.Mui-focused': { color: '#f02c48' }
                                                    }
                                                }}
                                            />
                                            {errors.emailError && (
                                                <div className='text-red-500 text-xs mt-1 h-4'>{errors.emailError}</div>
                                            )}
                                        </div>


                                        <div>
                                            <TextField
                                                id="number"
                                                label="Phone Number"
                                                variant="outlined"
                                                onChange={this.handleChange}
                                                value={formData.number}
                                                fullWidth
                                                size="small"
                                                InputProps={{
                                                    style: { color: 'white' }
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: 'rgba(255, 255, 255, 0.6)',
                                                        fontSize: '0.85rem'
                                                    }
                                                }}
                                                placeholder="Enter your phone number"
                                                sx={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '0.5rem',
                                                    backdropFilter: 'blur(8px)',
                                                    WebkitBackdropFilter: 'blur(8px)',
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                                        '&:hover fieldset': { borderColor: '#f02c48' },
                                                        '&.Mui-focused fieldset': { borderColor: '#f02c48' },
                                                        input: {
                                                            color: 'white',
                                                            '::placeholder': { color: 'rgba(255, 255, 255, 0.6)' }
                                                        }
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'rgba(255, 255, 255, 0.6)',
                                                        '&.Mui-focused': { color: '#f02c48' }
                                                    }
                                                }}
                                            />
                                            {errors.numberError && (
                                                <div className='text-red-500 text-xs mt-1 h-4'>{errors.numberError}</div>
                                            )}
                                        </div>


                                        <div className='flex flex-col sm:flex-row gap-3'>
                                            <div className='flex-1'>
                                                <div className='relative'>
                                                    <TextField
                                                        id="password"
                                                        label="Password"
                                                        variant="outlined"
                                                        onChange={this.handleChange}
                                                        value={formData.password}
                                                        type={showPassword ? "text" : "password"}
                                                        fullWidth
                                                        size="small"
                                                        InputProps={{
                                                            style: { color: 'white' }
                                                        }}
                                                        InputLabelProps={{
                                                            style: {
                                                                color: 'rgba(255, 255, 255, 0.6)',
                                                                fontSize: '0.85rem'
                                                            }
                                                        }}
                                                        placeholder="Enter your password"
                                                        sx={{
                                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                            borderRadius: '0.5rem',
                                                            backdropFilter: 'blur(8px)',
                                                            WebkitBackdropFilter: 'blur(8px)',
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                                                '&:hover fieldset': { borderColor: '#f02c48' },
                                                                '&.Mui-focused fieldset': { borderColor: '#f02c48' },
                                                                input: {
                                                                    color: 'white',
                                                                    '::placeholder': { color: 'rgba(255, 255, 255, 0.6)' }
                                                                }
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                color: 'rgba(255, 255, 255, 0.6)',
                                                                '&.Mui-focused': { color: '#f02c48' }
                                                            }
                                                        }}
                                                    />
                                                    {showPassword ? (
                                                        <VisibilityOffIcon
                                                            className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm' // Adjusted position and size
                                                            sx={{
                                                                color: 'rgba(255, 255, 255, 0.6)',
                                                                fontSize: '1.2rem',
                                                                '&:hover': { color: '#f02c48' }
                                                            }}
                                                            onClick={() => this.setState({ showPassword: !showPassword })}
                                                        />
                                                    ) : (
                                                        <VisibilityIcon
                                                            className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm' // Adjusted position and size
                                                            sx={{
                                                                color: 'rgba(255, 255, 255, 0.6)',
                                                                fontSize: '1.2rem',
                                                                '&:hover': { color: '#f02c48' }
                                                            }}
                                                            onClick={() => this.setState({ showPassword: !showPassword })}
                                                        />
                                                    )}
                                                </div>
                                                {errors.passwordError && (
                                                    <div className='text-red-500 text-xs mt-1 min-h-[1rem]'>{errors.passwordError}</div>
                                                )}
                                            </div>
                                            <div className='flex-1'>
                                                <div className='relative'>
                                                    <TextField
                                                        id="confirmpassword"
                                                        label="Confirm Password"
                                                        variant="outlined"
                                                        onChange={this.handleChange}
                                                        value={formData.confirmpassword}
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        fullWidth
                                                        size="small"
                                                        InputProps={{
                                                            style: { color: 'white' }
                                                        }}
                                                        InputLabelProps={{
                                                            style: {
                                                                color: 'rgba(255, 255, 255, 0.6)',
                                                                fontSize: '0.85rem'
                                                            }
                                                        }}
                                                        placeholder="Confirm password"
                                                        sx={{
                                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                            borderRadius: '0.5rem',
                                                            backdropFilter: 'blur(8px)',
                                                            WebkitBackdropFilter: 'blur(8px)',
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                                                '&:hover fieldset': { borderColor: '#f02c48' },
                                                                '&.Mui-focused fieldset': { borderColor: '#f02c48' },
                                                                input: {
                                                                    color: 'white',
                                                                    '::placeholder': { color: 'rgba(255, 255, 255, 0.6)' }
                                                                }
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                color: 'rgba(255, 255, 255, 0.6)',
                                                                '&.Mui-focused': { color: '#f02c48' }
                                                            }
                                                        }}
                                                    />
                                                    {showConfirmPassword ? (
                                                        <VisibilityOffIcon
                                                            className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm' // Adjusted position and size
                                                            sx={{
                                                                color: 'rgba(255, 255, 255, 0.6)',
                                                                fontSize: '1.2rem',
                                                                '&:hover': { color: '#f02c48' }
                                                            }}
                                                            onClick={() => this.setState({ showConfirmPassword: !showConfirmPassword })}
                                                        />
                                                    ) : (
                                                        <VisibilityIcon
                                                            className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm' // Adjusted position and size
                                                            sx={{
                                                                color: 'rgba(255, 255, 255, 0.6)',
                                                                fontSize: '1.2rem',
                                                                '&:hover': { color: '#f02c48' }
                                                            }}
                                                            onClick={() => this.setState({ showConfirmPassword: !showConfirmPassword })}
                                                        />
                                                    )}
                                                </div>
                                                {errors.confirmpasswordError && (
                                                    <div className='text-red-500 text-xs mt-1 min-h-[1rem]'>{errors.confirmpasswordError}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                !this.state.setLoading ? (
                                    <Button disabled={this.state.setLoading} type='submit' variant="contained" sx={{
                                        backgroundColor: '#f02c48',
                                        color: 'white',
                                        width: '100%',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '0.5rem',
                                        '&:hover': {
                                            backgroundColor: '#d01c38',
                                            boxShadow: '0 0 0.5rem rgb(240, 44, 72 / 0.5)'
                                        },
                                    }}>
                                        {
                                            type === 'login' ? 'Login' : type === 'register' ? 'Create Account' : ''
                                        }
                                    </Button>
                                ) : (
                                    <Button
                                        fullWidth
                                        loading
                                        loadingPosition="start"
                                        startIcon={<SaveIcon />}
                                        variant="outlined"
                                        sx={{
                                            backgroundColor: '#f02c48',
                                            width: '100%',
                                            padding: '0.75rem 1.5rem'
                                        }}
                                    >

                                    </Button>
                                )
                            }



                            <div className="relative mt-6 text-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20" />
                                </div>
                                {
                                    type === 'login' && (
                                        <div className="relative flex justify-center text-sm">
                                            <span className="bg-black/10 backdrop-blur-md px-3 py-0.5 rounded-full text-white">
                                                Don't have an account?
                                            </span>
                                        </div>
                                    )
                                }

                            </div>

                            <div>
                                <NavLink to={type === 'login' ? '/register' : '/login'} className="text-sm text-[rgba(255, 255, 255, 0.3)]">
                                    <Button variant="outlined" sx={{
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                        width: '100%',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '0.5rem',
                                        marginTop: type === 'register' ? '1rem' : "",
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                            color: 'white',
                                            boxShadow: '0 0 0.5rem rgb(240, 44, 72 / 0.5)'
                                        },
                                    }}>

                                        {type === 'login' ? 'Create an account' : 'Already have an account?'}
                                    </Button>
                                </NavLink>
                            </div>
                        </form>
                    </Card>
                </motion.div>
            </Box>
        )
    }
}

export default WithRouter(AuthTemplate)
