import React, { Component } from 'react'
import WithReduxState from '../components/hoc/WithReduxState'

interface ProfileProps {
  userInfo: {
    id: number
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    role: string;
  };
  isLoggedIn: boolean;
}

export class Profile extends Component<any, ProfileProps> {
  render() {
    const { isLoggedIn, userInfo } = this.props;

    if (!isLoggedIn) {
      return (
        <div className="bg-black text-white p-8 min-h-screen">
          <h2 className="font-anton text-3xl tracking-wide mb-6">Profile</h2>
          <p className="font-sans text-gray-300">Please log in to view your profile.</p>
          <button className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-sans transition-colors duration-300">
            Sign In
          </button>
        </div>
      );
    }

    return (
      <div className="bg-black text-white p-8 min-h-screen">
        <h2 className="font-anton text-3xl tracking-wide mb-6">Profile</h2>
        
        <div className="mb-6">
          <h3 className="font-anton text-2xl tracking-wide mb-1">
            {userInfo.firstname} {userInfo.lastname}
          </h3>
          <p className="font-sans text-gray-400 capitalize mb-8">{userInfo.role}</p>
        </div>
        
        <div className="space-y-6 font-sans max-w-lg">
          <div className="flex flex-col">
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-white">{userInfo.email}</p>
          </div>
          
          <div className="flex flex-col">
            <p className="text-gray-400 text-sm">Phone</p>
            <p className="text-white">{userInfo.phonenumber}</p>
          </div>
          
          <div className="flex flex-col">
            <p className="text-gray-400 text-sm">Account Type</p>
            <p className="text-white capitalize">{userInfo.role}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default WithReduxState(Profile)