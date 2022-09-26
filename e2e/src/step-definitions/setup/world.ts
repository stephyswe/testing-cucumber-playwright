import {chromium, webkit, firefox, BrowserContextOptions, Page, Browser, BrowserContext} from "@playwright/test";
import {World, setWorldConstructor, IWorldOptions} from "@cucumber/cucumber";
import {env} from '../../env/parseEnv'

export type Screen = {
    browser: Browser;
    context: BrowserContext;
    page: Page;
}

export class ScenarioWorld extends World {
    constructor(options: IWorldOptions) {
        super(options)
    }

    screen!: Screen;

    async init(contextOptions?: BrowserContextOptions): Promise<Screen> {
        await this.screen?.page.close()
        await this.screen?.context.close()
        await this.screen?.browser.close()

        const browser = await this.newBrowser();
        const context = await browser.newContext(contextOptions)
        const page = await context.newPage()

        this.screen = { browser, context, page }

        return this.screen
    }

    private newBrowser = async (): Promise<Browser> => {
        const automationBrowsers = ['chromium', 'firefox', 'webkit']
        type AutomationBrowser = typeof automationBrowsers[number]
        const automationBrowser = env('UI_AUTOMATION_BROWSER') as AutomationBrowser
        let browserType = chromium
        const browserOptions = {
            headless: process.env.HEADLESS !== 'false',
            args: ['--disable-web-security', '--disable-features=IsolateOrigins, site-per-process']
        }
        if (automationBrowser === 'chromium') browserType = chromium
        if (automationBrowser === 'firefox') browserType = firefox
        if (automationBrowser === 'webkit') browserType = webkit
        return browserType.launch(browserOptions)
    }
}

setWorldConstructor(ScenarioWorld)