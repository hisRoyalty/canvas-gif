import sharp from 'sharp';
import type { Options } from '../types/Options';
import Frame from './Frame';
import GifBase from './GifBase';

interface FrameData {
	data: Uint8ClampedArray;
	channels: number;
	height: number;
	width: number;
	frameNumber: number;
}

export default class GeneratedGif extends GifBase {
	constructor(frameData: FrameData[], options?: Options) {
		super(
			frameData[0]?.width,
			frameData[0]?.height,
			frameData[0].channels,
			options
		);

		for (const data of frameData) {
			const frame = new Frame(
				data.frameNumber,
				sharp(data.data, {
					raw: {
						width: data.width,
						height: data.height,
						channels: data.channels as any,
					},
				})
			);

			this.addFrame(frame);
		}
	}
}
