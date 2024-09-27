import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #videos = new Map()

    list({ search }) {
        return Array.from(this.#videos.entries())
        .map(([id, video]) => ({  ...video, id }))
        .filter(video => {
            if (!search) return true

            return video.title.includes(search) || video.description.includes(search)
        })
    }

    create(video) {
        const videoId = randomUUID()
        video.id = videoId
        this.#videos.set(videoId, video)
        return video
    }

    update(id, video) {
        this.#videos.set(id, video)
        return video
    }

    delete(id) {
        this.#videos.delete(id)
    }
}