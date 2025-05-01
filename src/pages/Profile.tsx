import React, { Component } from 'react';
import WithReduxState from '../components/hoc/WithReduxState';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import CreateMovieForm from '../components/adminControl/createMovie/CreateMovieForm';

interface ProfileProps {
  userInfo: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    role: string;
  };
  isLoggedIn: boolean;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function Profile() {

  const userInfo = useSelector((state: any) => state.user.userInfo);
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-black text-white p-8 min-h-screen flex flex-col items-center justify-center">
        <h2 className="font-anton text-4xl tracking-wide mb-6">Profile</h2>
        <p className="font-sans text-gray-300 text-center mb-4">
          Please log in to view your profile.
        </p>
        <button onClick={() => window.location.href = '/login'} className="bg-[#e23145] hover:bg-[#e23145]/50 text-white px-6 py-3 rounded-lg font-sans transition-colors duration-300">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-b from-[#e23145] via-black/60 to-transparent text-white p-8 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-anton text-4xl tracking-wide mb-8 text-center">Profile</h2>

          <div className="bg-white/10 rounded-lg shadow-lg p-6 mb-8">
            <h3 className="font-anton text-2xl tracking-wide mb-2">
              Hi, {userInfo.name}
            </h3>
            {userInfo.role === 'supervisor' && (
              <p className="font-sans text-gray-400 mb-4">({userInfo.role})</p>
            )}
          </div>

          <div className="space-y-6 font-sans bg-white/10 rounded-lg shadow-lg p-6">
            <div className="flex flex-col">
              <p className="text-gray-400 text-sm uppercase tracking-wide">Email</p>
              <p className="text-white text-lg">{userInfo.email}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-gray-400 text-sm uppercase tracking-wide">Account Type</p>
              <p className="text-white text-lg capitalize">{userInfo.role}</p>
            </div>

          </div>

          {userInfo.role === 'supervisor' && (
            <div className="mt-8 bg-white/10 rounded-lg shadow-lg p-6">
              <h3 className="font-anton text-2xl tracking-wide mb-4">Actions</h3>
              <div className="flex flex-wrap gap-4">
                <Button sx={{ color: "#e23145", borderColor: '#e23145' }} variant="outlined" onClick={handleClickOpen}>
                  Add Movie
                </Button>
                <Button sx={{ color: "#e23145", borderColor: '#e23145' }} variant="outlined">
                  Edit Movie
                </Button>
                <Button sx={{ color: "#e23145", borderColor: '#e23145' }} variant="outlined">
                  Delete Movie
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
          },
        }}
      >
        <div>
          <CreateMovieForm />
        </div>
      </BootstrapDialog>
    </>

  );
}


export default Profile;