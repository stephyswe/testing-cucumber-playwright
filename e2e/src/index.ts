import dotenv from 'dotenv'
import {env, getJsonFromFile} from './env/parseEnv'
import {GlobalConfig, HostsConfig, PagesConfig} from './env/global'

dotenv.config({path: env("COMMON_CONFIG_FILE")})

const hostsConfig: HostsConfig = getJsonFromFile(env("HOSTS_URL_PATH"))
console.log("hostsConfig", hostsConfig)
const pagesConfig: PagesConfig = getJsonFromFile(env("PAGE_URL_PATH"))
console.log("pagesConfig", pagesConfig)

const worldParameters: GlobalConfig = {
    hostsConfig, pagesConfig
}

const common = `./src/features/**/*.feature \
                 --publish-quiet \
                 --require-module ts-node/register \
                 --require ./src/step-definitions/**/**/*.ts \
                 -f json:./reports/report.json \
                 --world-parameters ${JSON.stringify(worldParameters)} \
                 --format progress-bar`

const dev = `${common} --tags '@dev'`
const smoke = `${common} --tags '@smoke'`
const regression = `${common} --tags '@regression'`

export {dev, smoke, regression}
