import { useState } from "react";
import "./App.css";
import Animation from "./components/Animation";
import { ModuleNames } from "./constants";
import ModuleNode from "./components/ModuleNode";
import Menu from "./components/Menu";
import Logo from "./components/Logo";


export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [moduleName, setModuleName] = useState(ModuleNames.BROWN_NOISE);

  // can't initialize the audio for the moduleNode until a user interaction has occured
  const userHasInteracted = () => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }

  if (!isInitialized) {
    return <Logo
      className="user-activation"
      inGreyScale={false}
      onClick={userHasInteracted}
    />
  }

  return (
    <div className="app">
      <Animation />
      <Menu setModuleName={setModuleName} moduleName={moduleName}/>
      { isInitialized && <ModuleNode moduleName={moduleName}/> }
    </div>
  );
}
