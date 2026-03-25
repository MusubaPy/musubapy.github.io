# Skill: scientific-blog-writing

Writing and editing research blog posts for musubapy.github.io.

## When to use this skill

Invoke when writing, revising, or filling any post under `_posts/` that describes a scientific paper.

## Repository context

- **Theme**: Jekyll Chirpy (dark, TOC on, math via MathJax, Mermaid)
- **Posts path**: `_posts/YYYY-MM-DD-<doi-slug>.md`
- **Assets**: images/video in `commons/images/`, referenced via `media_subpath: '/commons/images/'`
- **Reference post**: `_posts/2024-10-15-10.48550-arXiv.2409.09869.md`

---

## Front matter template

```yaml
---
title: <Full paper title>
description: >-
  One or two sentences: core contribution in plain language.
  For a technical reader who is not a specialist.
author: roman
date: YYYY-MM-DD HH:MM:SS +ZZZZ
categories: [Research, <domain>]
tags: [<tag1>, <tag2>, ...]
math: true          # only if body uses $...$ or $$...$$
mermaid: true       # only if body uses ```mermaid blocks
image:
  path:             # filename only; leave blank if unavailable
  alt:              # image caption; leave blank if unavailable
media_subpath: '/commons/images/'
pin: false
---
```

**Rules:**
- `math: true` is **required** whenever the post body contains LaTeX. Omitting it breaks rendering.
- `mermaid: true` is required for Mermaid diagram blocks.
- `description` must not exceed two sentences. It appears in SEO meta and post cards.
- `date` controls sort order. Use the real publication date, not today.
- `pin: true` only for landmark, highly cited, or particularly important papers — ask before setting.

---

## Post body structure

### Standard sections (in order)

#### 1. Overview
- Opens with the class of problem the paper addresses.
- States why existing methods are insufficient for this problem.
- Closes with one sentence introducing what the paper proposes.
- Do **not** repeat the title verbatim. Do **not** open with "In this paper…"

#### 2. Method section
Choose a heading appropriate to the paper type:
- `## Approach` — for algorithmic/RL papers
- `## Design Method` — for mechanism/hardware papers
- `## Theoretical Framework` — for theory-first papers
- `## Method` — default fallback

Contents:
- The core technical idea in plain language.
- Formal claims (theorems, bounds) stated precisely but briefly — give the result, not the proof.
- What the method requires from the environment or system (assumptions).

#### 3. Results
- State the experimental platform or evaluation setup first.
- List the baselines used for comparison.
- Give concrete numbers: success rates, cost reductions, convergence steps.
- Separate what was measured empirically from what was proved formally.

If the paper is theory- or design-only (no experiments):
- Rename to `## Contributions`
- Describe the formal results and their significance.

#### 4. Conclusion
- One paragraph, 3–5 sentences.
- What the contribution enables or opens.
- Forward-looking but grounded — do not overstate.

#### 5. Optional sections
Include only when content is available:

```markdown
## Supplementary Materials
- Code: [https://github.com/...](https://github.com/...)

## Qualitative Demonstration
{% include embed/youtube.html id='VIDEO_ID' %}
```

#### 6. Citation (always last)

```markdown
## Citation

If you use this work, please cite:

**BibTeX:**
```bibtex
@article{key,
  title   = {...},
  author  = {...},
  journal = {...},
  year    = {YYYY}
}
` ``
```

---

## Style rules

| Rule | Rationale |
|---|---|
| Academic prose, no metaphors | Clarity over style |
| Every sentence has one job | Prevents compound ambiguities |
| Paragraph opens with claim, not background | Readers scan; topic sentences must carry information |
| Distinguish proved / observed / conjectured | Prevents overclaiming |
| No padding to meet length targets | A short complete post beats a padded incomplete one |
| 350–500 words body target | 2–4 minute read |

## Math notation

- Inline: `$\theta$`, `$\mathcal{L}$`
- Display: `$$V(x) \leq \gamma V(x_0)$$` on its own paragraph line
- **Always set `math: true`** in front matter when using either form.

## Chirpy embeds

| Embed | Syntax |
|---|---|
| YouTube | `{% include embed/youtube.html id='VIDEO_ID' %}` |
| Local video | `<video controls width="100%"><source src="/commons/images/file.mp4" type="video/mp4"></video>` |
| Image from assets | `![alt text](/commons/images/file.png)` |
| Mermaid diagram | ` ```mermaid ` block with `mermaid: true` in front matter |

---

## Common mistakes to avoid

- Leaving `description` empty — it breaks SEO and post cards.
- Setting `math: true` without using math, or using math without setting it.
- Writing `## Summary` as the section heading — the stub template uses this placeholder; replace it with proper sections.
- Starting the Overview with "This paper presents…" — too weak. Start with the problem.
- Stating a result as proved when it was only empirically observed.
- Citing a related paper as if it were this paper's own result.
