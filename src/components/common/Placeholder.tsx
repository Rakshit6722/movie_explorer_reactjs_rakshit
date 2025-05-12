import React, { Component } from 'react';
import { FiSearch } from 'react-icons/fi';

export class Placeholder extends Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center h-full opacity-40">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-5 bg-gray-800/30 rounded-full mb-6">
            <FiSearch data-testid="placeholderIcon" size={40} className="text-gray-500/80" />
          </div>
          <h2 className="text-xl font-light text-gray-400/90 mb-2">
            Search for movies
          </h2>
          <p className="text-gray-500/70 text-xs max-w-xs mx-auto">
            Enter a title or keyword in the search bar above
          </p>
        </div>
      </div>
    );
  }
}

export default Placeholder;
