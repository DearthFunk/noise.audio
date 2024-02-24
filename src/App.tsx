import React, { useState } from "react";
import "./App.css";
import Animation from "./components/Animation";
import Logo from "./components/Logo";
import Audio from "./components/Audio";
import { ModuleNames } from "./constants";


export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  const handleFirstClick = () => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }
  return (
    <div className={`App ${isInitialized ? '' : 'cursor'}`} onClick={handleFirstClick}>
      <Animation />
      { isInitialized ? <Audio moduleName={ModuleNames.WHITE_NOISE}/> : '' }
    </div>
  );
}
