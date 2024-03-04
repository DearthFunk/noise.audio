import { useState } from "react";
import "./App.css";
import HumanValidation from './components/HumanValidation';
import NoiseAudio from "./components/NoiseAudio";

export default function App() {
  let [isInitialized, setIsInitialized] = useState(false);
  let content = isInitialized ? <NoiseAudio /> : <HumanValidation />

  return (
    <div className="app" onClick={() => setIsInitialized(true)}>
      { content }
    </div>
  );
}
