import { noises } from "../constants";

export default class AudioControls {
    public isLoaded: boolean = false;
    private ctx: AudioContext;
    private gainNode: GainNode;
    private noiseNodes: Record<string, AudioWorkletNode> = {};
    private activeNode: AudioWorkletNode | undefined;

    constructor(initialNoise?: string) {
        this.ctx = new AudioContext();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0, 0);
        this.gainNode.connect(this.ctx.destination);
        this.loadModules(initialNoise);
    }

    private async loadModules(initialNoise?: string) {
        await Promise.all(noises.map(async ({name}) => {
            await this.ctx.audioWorklet.addModule(`modules/audio/${name}.js`);
            const noiseNode = new AudioWorkletNode(this.ctx, `${name}-noise-processor`);
            this.noiseNodes[name] = noiseNode;
        }));
        this.isLoaded = true;
        if (initialNoise) {
            this.selectNoise(initialNoise);
        }
    }

    public selectNoise(selectNoise: string) {
        if (!this.isLoaded) { return; }
        this.activeNode?.disconnect();
        this.activeNode = this.noiseNodes[selectNoise];
        this.activeNode.connect(this.gainNode);
    }

    public mute(shouldMute: boolean) {
        if (!this.isLoaded) { return; }
        this.gainNode.gain.setValueAtTime(shouldMute ? 0 : 0.5, 0);
    }
}