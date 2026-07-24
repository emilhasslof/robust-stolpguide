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

// Maps one API product onto the exact shape the app's components already consume.
const toFaceplate = (product) => {
    const specs = product.specs || {}
    return {
        modell: asString(product.article_no),
        plösmått: asString(specs.plosmatt_mm),
        höjd: asString(specs.height_mm),
        bredd: asString(specs.width_mm),
        // The old "karmprofil" field conflated post shape and frame profiles; preserve
        // that by combining both. post_shape is present on every post, so this is never
        // empty — an empty karmprofil array would drop the post from search results.
        karmprofil: [...(specs.post_shape || []), ...(specs.karmprofil_names || [])],
        // Old "elslutbleck" was a single string; a post can now be compatible with
        // several series, so join them (empty for strike plates, which is fine).
        elslutbleck: (product.compatible_with_series_names || []).join(', '),
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
}

export default fetchData
