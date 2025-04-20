import React from 'react'

const SectionHeader = ({text}) => {
  return (
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gradient-to-l from-primary to-transparent"></div>
            <span className="mx-4 text-xl font-semibold text-gray-700">{text}</span>
            <div className="flex-grow h-px bg-gradient-to-r from-primary to-transparent"></div>
          </div>
        );
      };

export default SectionHeader