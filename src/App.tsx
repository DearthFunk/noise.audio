import React, { useState } from "react";
import "./App.css";
import Animation from "./components/Animation";
import Logo from "./components/Logo";
import Audio from "./components/Audio";
import { AudioModules } from "./constants";


export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [soundIsOn, setSoundIsOn] = useState(false);

  const handleFirstClick = () => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }

  const handleToggleSound = () => {
    setSoundIsOn(!soundIsOn);
  }

  return (
    <div className="App" onClick={handleFirstClick}>
      <Logo
        inGreyScale={soundIsOn}
        toggleSound={() => handleToggleSound()}
      />
      <Animation />
      { isInitialized ? <Audio
        moduleName={AudioModules.WHITE_NOISE}
        soundIsOn={soundIsOn}
      /> : ''}
    </div>
  );
}
