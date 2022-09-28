import dotenv from 'dotenv'
import * as fs from "fs";
import {env, getJsonFromFile} from './env/parseEnv'
import {GlobalConfig, HostsConfig, PagesConfig, PageElementMapping} from './env/global'

dotenv.config({path: env("COMMON_CONFIG_FILE")})

const hostsConfig: HostsConfig = getJsonFromFile(env("HOSTS_URL_PATH"))
const pagesConfig: PagesConfig = getJsonFromFile(env("PAGE_URL_PATH"))
const mappingFiles = fs.readdirSync(`${process.cwd()}${env("PAGE_ELEMENTS_PATH")}`)

const pageElementMappings: PageElementMapping = mappingFiles.reduce(
    (pageElementConfigAcc, file) => {
        const key = file.replace('.json', '')
        const elementMappings = getJsonFromFile(`${env('PAGE_ELEMENTS_PATH')}${file}`)
        return { ...pageElementConfigAcc, [key]: elementMappings}
    }, {}
)

const worldParameters: GlobalConfig = {
    hostsConfig, pagesConfig, pageElementMappings
}

const common = `./src/features/**/*.feature \
                 --require-module ts-node/register \
                 --require ./src/step-definitions/**/**/*.ts \
                 -f json:./reports/report.json \
                 --world-parameters ${JSON.stringify(worldParameters)} \
                 --format progress-bar`

const dev = `${common} --tags '@dev'`
const smoke = `${common} --tags '@smoke'`
const regression = `${common} --tags '@regression'`

export {dev, smoke, regression}
