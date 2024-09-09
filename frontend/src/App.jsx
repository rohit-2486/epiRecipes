import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import {Footer} from "./components/Footer";
import { useState } from "react";

function App() {
  const [searchQuery , setSearchQuery] = useState('')
  // console.log("App.js",searchQuery)
  const handleSearch =(query) =>{
    setSearchQuery(query);
  }
  return (
    <>
      <NavBar onSearch={handleSearch} />
      <main className="min-h-[calc(100vh-120px)]"> 
        <Outlet context={{searchQuery}} />
      </main>
      <Footer/>
    </>
  );
}

export default App;
