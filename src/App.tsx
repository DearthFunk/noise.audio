import React, { useState } from "react";
import "./App.css";
import Animation from "./components/Animation";
import Logo from "./components/Logo";
import Audio from "./components/Audio";

export default function App() {
  const [soundIsOn, setSoundIsOn] = useState(false);
  return (
    <div className="App">
      <Logo
        soundIsOn={soundIsOn}
        toggleSound={setSoundIsOn}
      />
      <Animation />
      <Audio
        soundIsOn={soundIsOn}
      />
    </div>
  );
}
