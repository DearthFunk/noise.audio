import { useState } from "react";
import "./App.css";
import NoiseAudio from "./components/NoiseAudio";

export default function App() {
  let [isInitialized, setIsInitialized] = useState(false);

  return (
    <div className="app" >
      { isInitialized ?
        <NoiseAudio /> :
        <button
          className="humanValidation centerScreen"
          onClick={() => setIsInitialized(true)}
        >
          let me out... <br/>
          whers noise?.. <br/>
          wht audio?.
        </button>
      }
    </div>
  );
}
