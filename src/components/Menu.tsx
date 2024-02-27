import "./Menu.css";
import { AnimationNames, ModuleNames } from "../constants"

interface MenuArgs {
    moduleName: ModuleNames;
    setModuleName: (type: ModuleNames) => void;
    animationName: AnimationNames;
    setAnimationName: (type: AnimationNames) => void;
}

export default function Menu({setModuleName, moduleName, setAnimationName, animationName}: MenuArgs) {
    return <div className="menu">
        <button onClick={() => setModuleName(ModuleNames.BROWN_NOISE)} className={moduleName === ModuleNames.BROWN_NOISE ? 'active' : ''}>BROWN</button>
        <span className="seperator">|</span>
        <button onClick={() => setModuleName(ModuleNames.WHITE_NOISE)} className={moduleName === ModuleNames.WHITE_NOISE ? 'active' : ''}>WHITE</button>
        <span className="seperator">|</span>
        <button onClick={() => setModuleName(ModuleNames.PINK_NOISE)} className={moduleName === ModuleNames.PINK_NOISE ? 'active' : ''}>PINK</button>
        <br />
        <button onClick={() => setAnimationName(AnimationNames.STAR_FIELD)} className={animationName === AnimationNames.STAR_FIELD ? 'active' : ''}>STAR</button>
        <span className="seperator">|</span>
        <button onClick={() => setAnimationName(AnimationNames.NOISE_LOOP)} className={animationName === AnimationNames.NOISE_LOOP ? 'active' : ''}>NOIZE</button>
    </div>
}