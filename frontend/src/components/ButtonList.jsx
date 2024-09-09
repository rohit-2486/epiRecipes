import React from 'react';
import { FaArrowUp } from "react-icons/fa";

const ButtonList = ({ onFilter }) => {
  return (
    <div className='flex justify-center w-full mt-5'>
      <button
        className='px-5 m-2 py-2 mx-10 bg-black text-white rounded-md'
        onClick={() => onFilter('rating')}
      >
        <div className='flex justify-center w-full'>
          <div className='m-1'>
            <FaArrowUp />
          </div>
          <div>Rating</div>
        </div>
      </button>

      <button
        className='px-5 m-2 py-2 mx-10 bg-black text-white rounded-md'
        onClick={() => onFilter('veg')}
      >
        Veg
      </button>

      

      
    </div>
  );
};

export default ButtonList;

