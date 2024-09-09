import { FaSearch } from "react-icons/fa";
import React, { useState } from 'react'

function NavBar({onSearch}) {
  const [searchQuery , setSearchQuery ] = useState('');

  const handleSearch = () =>{
    if(searchQuery.trim()){
      onSearch(searchQuery);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Call the search function when Enter is pressed
    }
  };
  return (
    <nav className="h-16 shadow-md bg-white">
      <div className='container mx-auto h-full flex items-center px-3 justify-between'>
      <div className="logo">EpiRecipes</div>

      <div className="flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow p-2 "> 

      <input
       type="text"
       placeholder="Search for recipes..." 
       className=" w-full outline-none bg-slate-100"
       value={searchQuery}
       onChange={(e) =>setSearchQuery(e.target.value) }
       onKeyDown={handleKeyDown}
       />
      
      <div 
      className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full cursor-pointer"
      onClick={handleSearch}
      >
      <FaSearch/> 
      </div>

      </div>
      <div className="user-icon">👤</div>
      </div>
     
    </nav>
  );
}


export default NavBar

