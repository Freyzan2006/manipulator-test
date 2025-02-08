import { ISamples } from "../interface/samples.interface";


export const checkCollision = (samples: ISamples[], x: number, y: number) => {
    return samples.some((obj) => obj.x === x && obj.y === y);
};



