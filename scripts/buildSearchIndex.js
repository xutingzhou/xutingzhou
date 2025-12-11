import fs from "fs"
import { globby } from "globby"

async function generateIndex() {
    const paths = await globby(["src/app/articles/**/*.mdx", "src/app/life/**/*.mdx"])

    const index = []
    for (const file of paths) {
        const raw = fs.readFileSync(file, "utf8")

        const articleMatch = raw.match(/export const article\s*=\s*({[\s\S]*?})/)
        if (!articleMatch) {
            console.warn(`⚠️ No "export const article" found in ${file}`)
            continue
        }

        let article
        try {
            const jsObjectCode = articleMatch[1]
            article = new Function(`return ${jsObjectCode}`)()
        } catch (err) {
            console.error("❌ Failed to parse article in", file, err)
            continue
        }


        index.push({
            ...article,
            slug: file.replace("src/app/", "").replace(/(\/page)?\.mdx$/, ""),
            category: file.split("/")[2],
        })
    }

    // 🔥 如果 public 不存在，自动创建
    if (!fs.existsSync("public")) {
        fs.mkdirSync("public")
    }

    fs.writeFileSync("public/searchIndex.json", JSON.stringify(index))
}

generateIndex()
