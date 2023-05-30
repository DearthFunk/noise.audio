import React from "react";
import "./App.css";
import Animation from "./components/Animation";
import Logo from "./components/Logo";
import Audio from "./components/Audio";

export default function App() {
  return (
    <div className="App">
      <Logo />
      <Animation />
      <Audio />
    </div>
  );
}
