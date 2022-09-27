export type PageId = string
export type PagesConfig = Record<PageId, Record<string, string>>
export type HostsConfig = Record<string, string>

export type GlobalConfig = {
    hostsConfig: HostsConfig
    pagesConfig: PagesConfig
}