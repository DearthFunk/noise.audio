import "./Menu.css";
import { ModuleNames } from "../constants"

interface MenuArgs {
    moduleName: ModuleNames;
    setModuleName: (type: ModuleNames) => void;
}

export default function Menu({setModuleName, moduleName}: MenuArgs) {
    return <div className="menu">
        <button onClick={() => setModuleName(ModuleNames.BROWN_NOISE)} className={moduleName === ModuleNames.BROWN_NOISE ? 'active' : ''}>BROWN</button>
        &nbsp;ø&nbsp;
        <button onClick={() => setModuleName(ModuleNames.WHITE_NOISE)} className={moduleName === ModuleNames.WHITE_NOISE ? 'active' : ''}>WHITE</button>
        &nbsp;ø&nbsp;
        <button onClick={() => setModuleName(ModuleNames.PINK_NOISE)} className={moduleName === ModuleNames.PINK_NOISE ? 'active' : ''}>PINK</button>
    </div>
}