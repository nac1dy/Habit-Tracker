import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Habit Tracker PWA",
        short_name: "Habito",
        description: "A simple habit tracker PWA built with Next.js",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4a90e2",
        icons: [
            {
                src: "/Habito192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/Habito512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any"
            },
        ],
    }
}