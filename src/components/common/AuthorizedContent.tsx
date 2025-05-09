import React from 'react';
import { Link } from 'react-router-dom';

interface AuthorizedContentProps {
  isAuthorized: boolean;
  requiredPlan?: 'gold' | 'platinum';
  posterUrl?: string;
  movieTitle?: string;
  children: React.ReactNode;
}

const AuthorizedContent: React.FC<AuthorizedContentProps> = ({
  isAuthorized,
  requiredPlan = 'gold',
  posterUrl,
  movieTitle,
  children
}) => {
  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col relative">
    
      {posterUrl && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={posterUrl}
            alt={movieTitle || "Movie"}
            className="w-full h-full object-cover filter blur-md opacity-20"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
      )}
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className={`mb-6 mx-auto w-16 h-16 rounded-full flex items-center justify-center 
            ${requiredPlan === 'gold' ? 'bg-yellow-900/30 border-2 border-yellow-600' : 'bg-gray-800 border-2 border-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${requiredPlan === 'gold' ? 'text-yellow-500' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            {movieTitle ? `"${movieTitle}" requires a higher plan` : 'Premium Content'}
          </h2>
          

          <p className="text-gray-400 mb-6">
            This content is only available with the {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)} Plan or higher.
          </p>
          

          <div className="space-y-3">
            <Link 
              to="/subscription" 
              className={`block px-6 py-2 rounded-lg font-medium text-center
                ${requiredPlan === 'gold' 
                  ? 'bg-yellow-600 text-black hover:bg-yellow-500' 
                  : 'bg-gray-600 text-white hover:bg-gray-500'}`}
            >
              Upgrade My Plan
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="block w-full px-6 py-2 rounded-lg bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorizedContent;
