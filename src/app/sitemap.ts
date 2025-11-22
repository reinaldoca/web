import { MetadataRoute } from "next";
import { servicesData } from "@/lib/services-data";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://cloudbit.com.ar";

    // Static routes
    const routes = [
        "",
        "/#nosotros",
        "/#elegirnos",
        "/#contacto",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1,
    }));

    // Dynamic service routes
    const serviceRoutes = servicesData.map((service) => ({
        url: `${baseUrl}/servicios/${service.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...routes, ...serviceRoutes];
}
