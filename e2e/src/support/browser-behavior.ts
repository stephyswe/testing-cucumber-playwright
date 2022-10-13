import {devices} from 'playwright'
import {env} from '../env/parseEnv'

export const getViewPort = (): { width: number, height: number } => {
        let viewPort
        const emulation = process.env.EMULATION || "browser"

            if (emulation != "browser") {
                const device = devices[emulation]
                viewPort = {
                    width: device.viewport.width,
                    height: device.viewport.height
                }
            } else {
                viewPort = {
                width: Number(env('BROWSER_WIDTH')),
                height: Number(env('BROWSER_HEIGHT'))
                }
            }
                return viewPort
        }