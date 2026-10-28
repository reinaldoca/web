"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getPosts, getPost, slugifyHeading, categoryLabel } from "@/lib/content/blog";
import { useLanguage } from "@/components/language-provider";
import { PageHero } from "@/components/site/page-hero";
import { BlogCard, formatDate } from "@/components/site/content-blocks";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";
import { GradientButton } from "@/components/ui/gradient-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/** Artículo: índice lateral que resalta la sección visible, FAQ opcional y relacionados. */
export function PostView({ slug }: { slug: string }) {
    const { u, language } = useLanguage();
    const copy = u.postPage;
    const post = getPost(slug, language);
    if (!post) notFound();

    const headings = post.sections.map((section) => ({ id: slugifyHeading(section.heading), text: section.heading }));
    const [activeId, setActiveId] = useState(headings[0]?.id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting);
                if (visible.length > 0) setActiveId(visible[0].target.id);
            },
            { rootMargin: "-30% 0px -60% 0px" }
        );
        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });
        return () => observer.disconnect();
    }, [slug, language]); // eslint-disable-line react-hooks/exhaustive-deps

    const related = getPosts(language)
        .filter((other) => other.slug !== post.slug)
        .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
        .slice(0, 3);

    return (
        <>
            <PageHero
                breadcrumbs={[
                    { label: u.common.home, href: "/" },
                    { label: u.blogPage.label, href: "/blog" },
                    { label: categoryLabel(post.category, language) },
                ]}
                label={categoryLabel(post.category, language)}
                title={post.title}
                description={post.excerpt}
            >
                <p className="text-sm text-nb-text">
                    <time dateTime={post.date}>{formatDate(post.date, u.common.dateLocale)}</time> · {u.common.readingTime(post.readingMinutes)} · {copy.author}
                </p>
            </PageHero>

            <section className="pb-20 md:pb-28">
                <div className="container grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
                    <aside className="hidden lg:block">
                        <nav aria-label={copy.tocAria} className="sticky top-28">
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white">{copy.toc}</p>
                            <ul className="space-y-1 border-l border-nb-line">
                                {headings.map((heading) => (
                                    <li key={heading.id}>
                                        <a
                                            href={`#${heading.id}`}
                                            className={cn(
                                                "-ml-px block border-l py-1.5 pl-4 text-sm leading-snug transition-colors",
                                                activeId === heading.id ? "border-nb-sky text-white" : "border-transparent text-nb-text hover:text-white"
                                            )}
                                        >
                                            {heading.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>

                    <article className="max-w-3xl">
                        {post.sections.map((section) => (
                            <FadeIn key={section.heading} className="mb-12">
                                <h2 id={slugifyHeading(section.heading)} className="mb-5 scroll-mt-28 text-2xl font-bold md:text-3xl">
                                    {section.heading}
                                </h2>
                                {section.paragraphs.map((paragraph) => (
                                    <p key={paragraph.slice(0, 40)} className="mb-5 text-lg leading-relaxed text-nb-text">
                                        {paragraph}
                                    </p>
                                ))}
                            </FadeIn>
                        ))}

                        {post.faqs && post.faqs.length > 0 && (
                            <FadeIn className="mb-12">
                                <h2 className="mb-6 text-2xl font-bold">{copy.faq}</h2>
                                <Accordion type="single" collapsible className="space-y-3">
                                    {post.faqs.map((faq, index) => (
                                        <AccordionItem
                                            key={faq.question}
                                            value={`faq-${index}`}
                                            className="rounded-2xl border border-nb-line bg-nb-surface px-6 data-[state=open]:border-nb-sky/40"
                                        >
                                            <AccordionTrigger className="py-5 text-left font-semibold text-white hover:no-underline">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-5 leading-relaxed text-nb-text">{faq.answer}</AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </FadeIn>
                        )}

                        <FadeIn className="nb-panel flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-lg font-semibold text-white">{copy.ctaTitle}</p>
                                <p className="text-sm text-nb-text">{copy.ctaText}</p>
                            </div>
                            <GradientButton href="/contacto">{u.common.talkToSpecialist}</GradientButton>
                        </FadeIn>
                    </article>
                </div>
            </section>

            <section className="pb-20 md:pb-28">
                <div className="container">
                    <FadeIn>
                        <SectionHeader label={copy.relatedLabel} title={copy.relatedTitle} />
                    </FadeIn>
                    <Stagger className="grid gap-5 md:grid-cols-3">
                        {related.map((other) => (
                            <StaggerItem key={other.slug} className="h-full">
                                <BlogCard post={other} />
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>
        </>
    );
}
