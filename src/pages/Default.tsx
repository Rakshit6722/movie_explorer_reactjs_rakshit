import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Default extends Component {
  render() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-white/10 backdrop-blur-xl border-2 border-[#e23145]/80 shadow-2xl rounded-2xl px-8 py-14 flex flex-col items-center max-w-lg w-full">
          <h1 className="text-7xl md:text-8xl font-extrabold text-white mb-4 drop-shadow-lg">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
            Page Not Found
          </h2>
          <p className="text-gray-300 mb-8 text-center">
            Oops! The page you are looking for does not exist or has been moved.<br />
            Let’s get you back to exploring movies!
          </p>
          <Link
            to="/"
            className="px-6 py-2 rounded bg-[#e23145] text-white font-semibold shadow hover:opacity-90 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }
}

export default Default;