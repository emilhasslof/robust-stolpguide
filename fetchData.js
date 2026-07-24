// Fetches product data from the new Robust API, replacing the old scrape of the
// WordPress HTML table at robust-se.com/translate-table-mobile-app/.
//
// The app points directly at the durable Lovable project URL. When robust-se.com is
// later pointed at the same site via DNS, the app is unaffected — this URL keeps working.
const BASE = 'https://robust-se.lovable.app'
const API_URL = `${BASE}/api/stolpguide.v1.json`

// The app lists Robust mounting posts and mechanical strike plates (treated the same).
const SEARCHABLE_TYPES = ['montagestolpe', 'mekaniskt_slutbleck']

const asString = (value) => (value === null || value === undefined ? '' : String(value))

// Formats a list of series names in Swedish enumeration style, sharing the "-serien"
// suffix: ["100-serien","300-serien","400-serien"] -> "100-, 300- och 400-serien".
// Falls back to a plain join if the names don't all follow the "{x}-serien" pattern.
const formatSeries = (names) => {
    const list = names || []
    if (list.length <= 1) return list.join(', ')
    if (!list.every((n) => /-serien$/.test(n))) return list.join(', ')
    const prefixes = list.map((n) => n.replace(/-serien$/, ''))
    const last = prefixes[prefixes.length - 1]
    return `${prefixes.slice(0, -1).join('-, ')}- och ${last}-serien`
}

// Product ordering — mirrors the website (loaders.ts compareArticleNo): sort by leading
// letter prefix, then the first integer run numerically, then the remainder naturally.
// E.g. S2 < S11 < S14 < S14-10 < SA1. Implemented in pure JS (no Intl) so the order is
// deterministic across platforms; article numbers are ASCII, so this matches the
// website's locale-based comparison exactly (verified against the live data).
const naturalCompare = (a, b) => {
    const ax = a.match(/\d+|\D+/g) ?? []
    const bx = b.match(/\d+|\D+/g) ?? []
    const n = Math.min(ax.length, bx.length)
    for (let i = 0; i < n; i++) {
        const as = ax[i]
        const bs = bx[i]
        if (/^\d/.test(as) && /^\d/.test(bs)) {
            const d = Number(as) - Number(bs)
            if (d !== 0) return d
        } else if (as !== bs) {
            return as < bs ? -1 : 1
        }
    }
    return ax.length - bx.length
}
const compareArticleNo = (a, b) => {
    const parse = (s) => {
        const m = /^([^\d]*)(\d*)(.*)$/.exec(s) ?? ['', '', '', '']
        return [m[1].toLowerCase(), m[2] === '' ? -1 : Number(m[2]), m[3].toLowerCase()]
    }
    const [pa, na, ra] = parse(a)
    const [pb, nb, rb] = parse(b)
    if (pa !== pb) return pa < pb ? -1 : 1
    if (na !== nb) return na - nb
    return naturalCompare(ra, rb)
}

// Maps one API product onto the exact shape the app's components already consume.
const toFaceplate = (product) => {
    const specs = product.specs || {}
    return {
        modell: asString(product.article_no),
        product_type: product.product_type,
        plösmått: asString(specs.plosmatt_mm),
        höjd: asString(specs.height_mm),
        bredd: asString(specs.width_mm),
        // Frame profiles only (drives the "Karmprofil" filter). Posts without a frame
        // profile get an empty array; the search filter treats an empty query as
        // "match all", so those posts are not dropped from results.
        karmprofil: specs.karmprofil_names || [],
        // Compatible elslutbleck series, worded Swedish-style ("100-, 300- och
        // 400-serien"). Empty for strike plates, which is fine.
        elslutbleck: formatSeries(product.compatible_with_series_names),
        assa: product.corresponding_posts_assa || [],
        safetron: product.corresponding_posts_safetron || [],
        step: product.corresponding_posts_step || [],
        // Image paths are origin-relative; prefix with BASE for the native <Image>.
        bild: product.image_path ? `${BASE}${product.image_path}` : null,
    }
}

const fetchData = async () => {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error(`Failed to fetch product data: ${res.status}`)
    const json = await res.json()
    return (json.products || [])
        .filter((p) => SEARCHABLE_TYPES.includes(p.product_type))
        .map(toFaceplate)
        .sort((a, b) => compareArticleNo(a.modell, b.modell))
}

export default fetchData
