import { noises } from "../constants";

// Use dynamic imports for AudioWorklet processors
const getNoiseUrl = async (name: string): Promise<string> => {
    const module = await import(`../modules/audio/${name}.js`);
    return module.default;
};

export default class AudioControls {
    public isLoaded: boolean = false;
    private ctx: AudioContext;
    private gainNode: GainNode;
    private noiseNodes: Record<string, AudioWorkletNode> = {};
    private activeNode: AudioWorkletNode | undefined;

    constructor(initialNoise: string) {
        this.ctx = new AudioContext();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0, 0);
        this.gainNode.connect(this.ctx.destination);
        this.loadModules(initialNoise);
    }

    private async loadModules(initialNoise: string) {
        await Promise.all(noises.map(async ({name}) => {
            const noiseUrl = await getNoiseUrl(name);
            await this.ctx.audioWorklet.addModule(noiseUrl);
            const noiseNode = new AudioWorkletNode(this.ctx, `${name}-noise-processor`);
            this.noiseNodes[name] = noiseNode;
        }));
        this.isLoaded = true;
        this.selectNoise(initialNoise);
    }

    public selectNoise(selectedNoise: string) {
        if (!this.isLoaded) { return; }
        this.activeNode?.disconnect();
        this.activeNode = this.noiseNodes[selectedNoise];
        this.activeNode.connect(this.gainNode);
    }

    public mute(shouldMute: boolean) {
        if (!this.isLoaded) { return; }
        const newVolume = shouldMute ? 0 : 0.5;
        this.gainNode.gain.setValueAtTime(newVolume, 0);
    }
}