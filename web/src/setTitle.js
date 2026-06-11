import useSiteStore from '@/stores/useSiteStore.js'
const siteStore = useSiteStore()

export default title => {
    document.title = `${title} | ${siteStore.siteInfo.title}`
}
