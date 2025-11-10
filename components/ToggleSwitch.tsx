import React, { useState } from 'react';

const ToggleSwitch: React.FC = () => {
  const [isOn, setIsOn] = useState(true);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
        isOn ? 'bg-teal-500' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;