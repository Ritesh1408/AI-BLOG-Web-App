import React from 'react';
import { getInitials } from '../../utils/helper';

const CharAvatar = ({
  fullName = '',
  width = 'w-12',
  height = 'h-12',
  customClass = '',
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100 ${width} ${height} ${customClass}`}
    >
      {getInitials(fullName)}
    </div>
  );
};

export default CharAvatar;
