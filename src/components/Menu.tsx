import { ModuleNames } from "../constants"

export default function Menu({setModuleName, moduleName}: {setModuleName: (type: ModuleNames) => void, moduleName: ModuleNames}) {
    return <div>
        <button onClick={() => setModuleName(ModuleNames.BROWN_NOISE)}>BROWN</button> -
        <button onClick={() => setModuleName(ModuleNames.WHITE_NOISE)}>WHITE</button> -
        <button onClick={() => setModuleName(ModuleNames.PINK_NOISE)}>PINK</button>
        <br />
        {moduleName}
    </div>
}