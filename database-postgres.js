import { randomUUID } from "node:crypto"
import { sql } from './db.js'

export class DatabasePostgres {

    async list({ search}) {  
        let videos

        if (search) {// Use parameterized query to prevent SQL injection and type issues
            const searchQuery = `%${search}%`;
            videos = await sql`SELECT * FROM videos WHERE title ILIKE ${searchQuery} OR description ILIKE ${searchQuery}`
        } else {
            videos = await sql`SELECT * FROM videos`
        }

        return videos
    }

    async create(video) {
        await sql`INSERT INTO videos (title, description, duration) VALUES (${video.title}, ${video.description}, ${video.duration})`
    }

    async update(id, video) {
       await sql`UPDATE videos SET title = ${video.title}, description = ${video.description}, duration = ${video.duration} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`DELETE FROM videos WHERE id = ${id}`
    }
}