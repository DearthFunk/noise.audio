import { ModuleNames } from "../constants"

export default function Menu({setModuleName, moduleName}: {setModuleName: (type: ModuleNames) => void, moduleName: ModuleNames}) {
    return <div className="menu">
        <button onClick={() => setModuleName(ModuleNames.BROWN_NOISE)} className={moduleName === ModuleNames.BROWN_NOISE ? 'active' : ''}>BROWN</button> -
        <button onClick={() => setModuleName(ModuleNames.WHITE_NOISE)} className={moduleName === ModuleNames.WHITE_NOISE ? 'active' : ''}>WHITE</button> -
        <button onClick={() => setModuleName(ModuleNames.PINK_NOISE)} className={moduleName === ModuleNames.PINK_NOISE ? 'active' : ''}>PINK</button>
    </div>
}