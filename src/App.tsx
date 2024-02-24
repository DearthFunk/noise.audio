import { useState } from "react";
import "./App.css";
import Animation from "./components/Animation";
import { ModuleNames } from "./constants";
import ModuleNode from "./components/ModuleNode";


export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  // can't initialize the audio for the moduleNode until a user interaction has occured
  const userHasInteracted = () => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }

  return (
    <div className={`App centerScreen ${isInitialized ? '' : 'cursor'}`} onClick={userHasInteracted}>
      <Animation />
      { isInitialized ? <ModuleNode moduleName={ModuleNames.WHITE_NOISE}/> : '' }
    </div>
  );
}
