"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Node } from "unist";
import { MarkdownImage } from "./image-renderer";
import { slugify } from "@/lib/utils/slugify";

// Plugin để loại bỏ hoặc thay thế :contentReference[oaicite:X]{index=X} thành footnote
const remarkContentReference = () => {
    return (tree: Node) => {
        const visit = (node: Node) => {
            if (node.type === "text" && "value" in node && typeof node.value === "string") {
                const regex = /:contentReference\[oaicite:\d+\]\{index=\d+\}/g;
                if (regex.test(node.value)) {
                    node.value = node.value.replace(regex, (match: string) => {
                        const numberMatch = match.match(/\d+/);
                        return numberMatch ? `[${parseInt(numberMatch[0]) + 1}]` : "";
                    });
                }
            }
            if ("children" in node && Array.isArray(node.children)) {
                node.children.forEach((child: Node) => visit(child));
            }
        };
        visit(tree);
    };
};

interface MarkdownRendererProps {
    content: string;
}

export const CustomMarkdown = ({ content }: MarkdownRendererProps) => {
    return (
        <div
            className="prose max-w-none"
            style={{ color: "var(--text-secondary)", fontFamily: "Inter, sans-serif" }}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkContentReference]}
                components={{
                    p: ({ children, ...props }: React.ComponentProps<"p">) => (
                        <p
                            className="mb-4 text-base md:text-lg leading-relaxed"
                            style={{ color: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </p>
                    ),
                    h1: ({ children, ...props }: React.ComponentProps<"h1">) => (
                        <h1
                            className="text-3xl font-bold mb-3 leading-tight"
                            style={{ color: "var(--title-color)" }}
                            {...props}
                        >
                            {children}
                        </h1>
                    ),
                    h2: ({ children, ...props }: React.ComponentProps<"h2">) => {
                        const text = React.Children.toArray(children).join("");
                        const id = slugify(text);
                        return (
                            <h2
                                id={id}
                                className="text-2xl font-semibold mb-2 leading-tight"
                                style={{ color: "var(--title-color)" }}
                                {...props}
                            >
                                {children}
                            </h2>
                        );
                    },
                    h3: ({ children, ...props }: React.ComponentProps<"h3">) => {
                        const text = React.Children.toArray(children).join("");
                        const id = slugify(text);
                        return (
                            <h3
                                id={id}
                                className="text-xl font-semibold mb-2 leading-tight"
                                style={{ color: "var(--title-color)" }}
                                {...props}
                            >
                                {children}
                            </h3>
                        );
                    },
                    h4: ({ children, ...props }: React.ComponentProps<"h4">) => (
                        <h4
                            className="text-lg font-semibold mb-2 leading-tight"
                            style={{ color: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </h4>
                    ),
                    h5: ({ children, ...props }: React.ComponentProps<"h5">) => (
                        <h5
                            className="text-base font-semibold mb-2 leading-tight"
                            style={{ color: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </h5>
                    ),
                    h6: ({ children, ...props }: React.ComponentProps<"h6">) => (
                        <h6
                            className="text-sm font-semibold mb-2 leading-tight"
                            style={{ color: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </h6>
                    ),
                    ul: ({ children, ...props }: React.ComponentProps<"ul">) => (
                        <ul
                            className="list-disc list-inside mb-3"
                            style={{ color: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </ul>
                    ),
                    ol: ({ children, ...props }: React.ComponentProps<"ol">) => (
                        <ol
                            className="list-decimal list-inside mb-3"
                            style={{ color: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </ol>
                    ),
                    li: ({ children, ...props }: React.ComponentProps<"li">) => (
                        <li
                            className="mb-1 text-base md:text-lg leading-relaxed"
                            style={{ color: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </li>
                    ),
                    blockquote: ({ children, ...props }: React.ComponentProps<"blockquote">) => (
                        <blockquote
                            className="border-l-4 pl-4 italic my-4"
                            style={{ color: "var(--foreground)", borderColor: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </blockquote>
                    ),
                    code: ({ children, ...props }: React.ComponentProps<"code">) => (
                        <code
                            className="px-1 py-0.5 rounded text-base md:text-lg"
                            style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </code>
                    ),
                    pre: ({ children, ...props }: React.ComponentProps<"pre">) => (
                        <pre
                            className="p-4 rounded overflow-x-auto text-base md:text-lg"
                            style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </pre>
                    ),
                    img: MarkdownImage,
                    a: ({ children, ...props }: React.ComponentProps<"a">) => (
                        <a
                            className="hover:underline font-medium text-base md:text-lg hover:text-[var(--link-hover)]"
                            style={{ color: "var(--link-color)" }}
                            {...props}
                        >
                            {children}
                        </a>
                    ),
                    strong: ({ children, ...props }: React.ComponentProps<"strong">) => (
                        <strong className="font-bold text-base md:text-lg" {...props}>
                            {children}
                        </strong>
                    ),
                    em: ({ children, ...props }: React.ComponentProps<"em">) => (
                        <em className="italic text-base md:text-lg" {...props}>
                            {children}
                        </em>
                    ),
                    table: ({ children, ...props }: React.ComponentProps<"table">) => (
                        <div className="overflow-x-auto my-4">
                            <table
                                className="min-w-full border-collapse border table-auto"
                                style={{ color: "var(--foreground)", borderColor: "var(--foreground)" }}
                                {...props}
                            >
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children, ...props }: React.ComponentProps<"thead">) => (
                        <thead
                            className="bg-gray-100"
                            style={{ backgroundColor: "var(--placeholder-bg)", color: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </thead>
                    ),
                    tbody: ({ children, ...props }: React.ComponentProps<"tbody">) => (
                        <tbody {...props}>{children}</tbody>
                    ),
                    tr: ({ children, ...props }: React.ComponentProps<"tr">) => (
                        <tr
                            className="border-b"
                            style={{ borderColor: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </tr>
                    ),
                    th: ({ children, ...props }: React.ComponentProps<"th">) => (
                        <th
                            className="px-4 py-2 text-left font-semibold text-sm md:text-base align-top"
                            style={{ color: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </th>
                    ),
                    td: ({ children, ...props }: React.ComponentProps<"td">) => (
                        <td
                            className="px-4 py-2 text-sm md:text-base align-top"
                            style={{ color: "var(--foreground)" }}
                            {...props}
                        >
                            {children}
                        </td>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};