# .omp — Oh My Pi Configuration (musubapy.github.io)

This directory contains the Oh My Pi configuration for Roman Zashchitin's research blog.

## Purpose

The blog publishes concise, readable descriptions of scientific papers — structured like extended abstracts, aimed at a technical reader who is not a domain specialist. Each post maps to a single published paper identified by its DOI.

## Context Architecture

### Tier 1: Always Loaded — `AGENTS.md`

**File**: `/home/roman/github/musubapy.github.io/AGENTS.md`

OMP discovers `AGENTS.md` by walking ancestor directories from `cwd`. Contains:
- Site overview and author profile
- Post anatomy (front matter template, body structure, style rules)
- Allowed Chirpy theme features
- Skills inventory
- Critical invariants

### Tier 2: On-Demand — Skills (`.omp/skills/`)

| Skill | Trigger condition |
|---|---|
| `scientific-blog-writing` | Writing or revising any `_posts/*.md` research post |

### Tier 3: Context docs (`.omp/agent/context/`)

Loaded on demand via programmatic lookup when a skill is insufficient.

| Doc | Contents |
|---|---|
| `01_BLOG_OVERVIEW.md` | Extended site architecture and post history |

## Agents (`.omp/agents/`)

| Agent | Role |
|---|---|
| `PaperResearcher` | Fetches paper by DOI/arXiv ID, extracts structure: problem, method, results, citation |
| `PaperWriter` | Turns a research packet into a complete Chirpy post in reference style |

## Workflow

For each stub post in `_posts/`:
1. Invoke `PaperResearcher` with the DOI from the `## Links` section
2. Review the research packet (problem, method, key results, BibTeX)
3. Invoke `PaperWriter` with the packet to produce the final post body
4. The writer overwrites the stub with a complete post

## Directory Structure

```
.omp/
├── README.md                           # This file
├── settings.json                       # Model roles and skill config
├── agents/
│   ├── PaperResearcher.agent.md        # Research extraction agent
│   └── PaperWriter.agent.md            # Blog post writing agent
├── skills/
│   └── scientific-blog-writing/
│       └── SKILL.md                    # Writing standards and templates
└── agent/
    └── context/
        └── 01_BLOG_OVERVIEW.md         # Extended site and post history
```
