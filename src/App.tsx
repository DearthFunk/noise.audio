import { useState } from "react";
import "./App.css";
import Animation from "./components/Animation";
import { ModuleNames } from "./constants";
import ModuleNode from "./components/ModuleNode";
import Menu from "./components/Menu";


export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [moduleName, setModuleName] = useState(ModuleNames.BROWN_NOISE);

  // can't initialize the audio for the moduleNode until a user interaction has occured
  const userHasInteracted = () => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }

  return (
    <div className={`App centerScreen ${isInitialized ? '' : 'cursor'}`} onClick={userHasInteracted}>
      <Menu setModuleName={setModuleName} moduleName={moduleName}/>
      {/* <Animation /> */}
      { isInitialized ? <ModuleNode moduleName={moduleName}/> : '' }
    </div>
  );
}
