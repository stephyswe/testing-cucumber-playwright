import {Page} from 'playwright'
import {GlobalConfig, PageId} from '../env/global'

export const navigateToPage = async (
    page: Page,
    pageId: PageId,
    {pagesConfig, hostsConfig}: GlobalConfig
): Promise<void> => {
    const {
        UI_AUTOMATION_HOST: hostName = 'localhost',
    } = process.env

    const hostPath = hostsConfig[`${hostName}`]
    const url = new URL(hostPath)
    const pagesConfigItem = pagesConfig[pageId]
    url.pathname = pagesConfigItem.route
    await page.goto(url.href)
}

const pathMatchesPageId = (
    path: string,
    pageId: PageId,
    { pagesConfig }: GlobalConfig
): boolean => {
    const pagesRegexString = pagesConfig[pageId].regex
    const pageRegex = new RegExp(pagesRegexString)

    return pageRegex.test(path)
}

export const currentPathMatchesPageId = (
    page: Page,
    pageId: PageId,
    globalConfig: GlobalConfig
): boolean => {
    const {pathname: currentPath} = new URL(page.url())
    return pathMatchesPageId(currentPath, pageId, globalConfig)
}

export const getCurrentPageId = (
    page: Page,
    globalConfig: GlobalConfig
): PageId => {
    const {pagesConfig} = globalConfig

    const pageConfigPageIds = Object.keys(pagesConfig)

    const {pathname: currentPath} = new URL(page.url())

    const currentPageId = pageConfigPageIds.find(pageId =>
        pathMatchesPageId(currentPath, pageId, globalConfig)
    )

    if (!currentPageId) {
        throw new Error(`Failed to get page name from current route ${currentPath}, \
        possible pages: ${JSON.stringify((pagesConfig))}`)
    }

    return currentPageId
}