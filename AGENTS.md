# musubapy.github.io — Agent Context

This is the personal research blog of Roman Zashchitin, built with Jekyll and the Chirpy theme.
The primary purpose of this repository is to publish concise, well-structured descriptions of scientific papers.

## Site overview

- **Theme**: jekyll-theme-chirpy (dark mode, TOC enabled, math via MathJax, Mermaid diagrams)
- **Author**: Roman Zashchitin — robotics engineer, control theory, reinforcement learning
- **URL**: https://musubapy.github.io
- **Posts directory**: `_posts/`
- **Shared assets** (images, video): `commons/images/` referenced via `media_subpath: '/commons/images/'`

## Post anatomy

Every post is a Markdown file named `YYYY-MM-DD-<doi-slug>.md` in `_posts/`.

### Front matter template

```yaml
---
title: <Full paper title>
description: >-
  One or two sentences summarising the paper's core idea and contribution.
  Written for a technical reader who is not a domain specialist.
author: roman
date: YYYY-MM-DD HH:MM:SS +ZZZZ
categories: [Research, <domain>]
tags: [<tag1>, <tag2>, ...]
math: true          # include if the post uses LaTeX
mermaid: true       # include if the post has Mermaid diagrams
image:
  path: <filename>  # leave empty if no image available
  alt: <caption>
media_subpath: '/commons/images/'
pin: false          # true only for landmark papers
---
```

### Body structure (reference: `2024-10-15-10.48550-arXiv.2409.09869.md`)

1. **## Overview** — Problem statement and motivation. Why this matters. 2–4 sentences.
2. **## Problem / Methodology** — What the paper proposes. Key technical idea, formal setup if relevant.
3. **## Results** — What was measured or proved. Concrete numbers and comparisons where available.
4. **## Conclusion** — What this contribution opens up; one short paragraph.
5. **## Citation** — BibTeX block.

Target reading time: 2–4 minutes. No padding. Every sentence has one job.

### Style rules

- Academic prose, no metaphors, no colloquialisms.
- English only.
- Separate what is proved, what is empirically observed, and what is conjectured.
- Do not restate the title in the opening sentence.
- `math: true` must be in front matter whenever the body uses `$...$` or `$$...$$`.
- Inline math: `$x$`. Display math: `$$x$$` on its own line.

## Allowed Chirpy features

| Feature | Syntax |
|---|---|
| YouTube embed | `{% include embed/youtube.html id='VIDEO_ID' %}` |
| Video (local) | `<video controls width="100%"><source src="/commons/images/file.mp4" type="video/mp4"></video>` |
| Image | `![alt](path)` or front matter `image:` field |
| Mermaid diagram | ` ```mermaid ` code block |
| Math | `$...$` inline, `$$...$$` display |
| Tip/Warning callout | `> **Tip**` or `> **Warning**` blockquotes |

## Skills inventory

| Task | Skill |
|---|---|
| Writing or revising a research blog post | `skill://scientific-blog-writing` |

## Critical invariants

- The `date` field in front matter controls post ordering. Use the actual publication date where known.
- `media_subpath` must always be `'/commons/images/'` in posts that reference local assets.
- Do not create posts with empty `## Summary` sections — use the structure defined above instead.
