"use client";
import { useMemo } from "react";
import { visit } from "unist-util-visit";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { slugify } from "@/lib/utils/slugify";
import type { Article } from "@/lib/types/article";
import type { Heading, PhrasingContent, Text } from "mdast";

interface TableOfContentsProps {
    blocks: Article["blocks"];
}

export default function TableOfContents({ blocks }: TableOfContentsProps) {
    // Generate TOC from markdown headings
    const toc = useMemo(() => {
        const headings: { text: string; level: number; id: string }[] = [];

        blocks?.forEach((block) => {
            if (block.__component === "shared.rich-text" && block.body) {
                const processor = unified().use(remarkParse);
                const tree = processor.parse(block.body);
                visit(tree, "heading", (node: Heading) => {
                    if (node.depth === 2 || node.depth === 3) {
                        const text = node.children
                            .filter((child: PhrasingContent): child is Text => child.type === "text")
                            .map((child) => child.value)
                            .join("");
                        const id = slugify(text);
                        headings.push({ text, level: node.depth, id });
                    }
                });
            }
        });
        return headings;
    }, [blocks]);

    // Handle smooth scroll with offset
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Match scroll-padding-top in globals.css
            const y = element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    if (toc.length === 0) return null;

    return (
        <div className="mb-8 p-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-md dark:bg-[var(--card-bg-dark)]">
            <h3 className="text-lg font-semibold text-[var(--foreground)] font-[var(--font-sans)] mb-3">
                Table of Contents
            </h3>
            <ul className="space-y-2">
                {toc.map((heading) => (
                    <li
                        key={heading.id}
                        className={`text-m ${heading.level === 3 ? "pl-4" : "pl-0"} text-[var(--text-secondary)]`}
                    >
                        <a
                            href={`#${heading.id}`}
                            onClick={(e) => handleScroll(e, heading.id)}
                            className="text-[var(--link-color)] hover:text-[var(--link-hover)] transition-colors font-[var(--font-sans)]"
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}