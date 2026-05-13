// This utility now returns a Base64 string for database storage
// instead of saving to the local filesystem.

export async function saveFile(file: File, _folder: string = "uploads"): Promise<string | null> {
    if (!file || file.size === 0) return null

    try {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString("base64")
        const mimeType = file.type || "image/png" // Default to png if type missing

        // Return Data URI
        return `data:${mimeType};base64,${base64}`
    } catch (error) {
        console.error("Error processing file:", error)
        throw new Error("Failed to process file")
    }
}
