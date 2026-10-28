"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { blogCategories, getPosts, categoryLabel, type BlogCategory } from "@/lib/content/blog";
import { useLanguage } from "@/components/language-provider";
import { PageHero } from "@/components/site/page-hero";
import { BlogCard } from "@/components/site/content-blocks";
import { Stagger, StaggerItem } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

/** Grilla del blog con búsqueda, filtro por categoría y paginación del lado del cliente. */
export function BlogIndex() {
    const { u, language } = useLanguage();
    const copy = u.blogPage;
    const [category, setCategory] = useState<BlogCategory | "all">("all");
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        return [...getPosts(language)]
            .sort((a, b) => b.date.localeCompare(a.date))
            .filter((post) => category === "all" || post.category === category)
            .filter((post) => !normalized || `${post.title} ${post.excerpt}`.toLowerCase().includes(normalized));
    }, [category, query, language]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const selectCategory = (value: BlogCategory | "all") => {
        setCategory(value);
        setPage(1);
    };

    return (
        <>
            <PageHero
                breadcrumbs={[{ label: u.common.home, href: "/" }, { label: copy.label }]}
                label={copy.label}
                title={copy.title}
                description={copy.description}
            />

            <section className="pb-20 md:pb-28">
                <div className="container">
                    <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-wrap gap-2" role="group" aria-label={copy.filterAria}>
                            {(["all", ...blogCategories] as const).map((value) => (
                                <button
                                    key={value}
                                    onClick={() => selectCategory(value)}
                                    aria-pressed={category === value}
                                    className={cn(
                                        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                                        category === value
                                            ? "border-transparent bg-nb-sky text-nb-dark"
                                            : "border-nb-line text-white/80 hover:border-nb-sky/40 hover:text-white"
                                    )}
                                >
                                    {value === "all" ? copy.all : categoryLabel(value, language)}
                                </button>
                            ))}
                        </div>
                        <label className="relative block lg:w-72">
                            <span className="sr-only">{copy.searchLabel}</span>
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-nb-text" aria-hidden="true" />
                            <input
                                type="search"
                                value={query}
                                onChange={(event) => {
                                    setQuery(event.target.value);
                                    setPage(1);
                                }}
                                placeholder={copy.searchPlaceholder}
                                className="h-11 w-full rounded-full border border-nb-line bg-nb-surface pl-11 pr-4 text-sm text-white placeholder:text-nb-text focus:border-nb-sky/50 focus:outline-none"
                            />
                        </label>
                    </div>

                    {visible.length > 0 ? (
                        <Stagger key={`${category}-${query}-${currentPage}-${language}`} onMount className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {visible.map((post) => (
                                <StaggerItem key={post.slug} className="h-full">
                                    <BlogCard post={post} />
                                </StaggerItem>
                            ))}
                        </Stagger>
                    ) : (
                        <p className="nb-panel p-10 text-center text-nb-text">{copy.empty}</p>
                    )}

                    {totalPages > 1 && (
                        <nav aria-label={copy.pagination} className="mt-12 flex items-center justify-center gap-2">
                            <button
                                onClick={() => setPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-nb-line text-white transition-colors hover:border-nb-sky/40 disabled:opacity-30"
                                aria-label={copy.previousPage}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                                <button
                                    key={number}
                                    onClick={() => setPage(number)}
                                    aria-current={number === currentPage ? "page" : undefined}
                                    className={cn(
                                        "inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                                        number === currentPage ? "bg-nb-sky text-nb-dark" : "border border-nb-line text-white hover:border-nb-sky/40"
                                    )}
                                >
                                    {number}
                                </button>
                            ))}
                            <button
                                onClick={() => setPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-nb-line text-white transition-colors hover:border-nb-sky/40 disabled:opacity-30"
                                aria-label={copy.nextPage}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </nav>
                    )}
                </div>
            </section>
        </>
    );
}
