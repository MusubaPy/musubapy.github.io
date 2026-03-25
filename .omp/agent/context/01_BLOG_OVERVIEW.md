# Blog Overview — musubapy.github.io

## Author

Roman Zashchitin — robotics engineer. Research interests: legged robot locomotion, energy-efficient gait generation, model-based reinforcement learning, safe RL with Lyapunov guarantees, online inertial parameter identification (DREM).

Google Scholar: https://scholar.google.com/citations?user=6LYG_7AAAAAJ&hl=en  
ORCID: 0009-0001-7637-5517

## Published posts (complete)

| File | Paper | Status |
|---|---|---|
| `2024-10-15-10.48550-arXiv.2409.09869.md` | CALF — Critic As Lyapunov Function for safe RL | Complete — **canonical style reference** |
| `2020-01-01-10.1109-NIR50484.2020.9290214.md` | Energy-Efficiency in Legged Robots Locomotion: Open versus Closed Chains | Complete |
| `2020-01-01-10.17586-0021-3454-2020-63-5-467-475.md` | Algorithm of structural-parametric synthesis of adaptive gripper mechanisms with variable-length links | Complete |
| `2023-01-01-10.5220-0012234600003543.md` | A Study on the Energy Efficiency of Various Gaits for Quadruped Robots | Complete |
| `2024-01-01-10.1007-s10845-023-02197-y.md` | Predictive reinforcement learning: map-less navigation method for mobile robot | Complete — full abstract verified |
| `2024-01-01-10.1109-CoDIT62066.2024.10708080.md` | Model-based reinforcement learning experimental study for mobile robot navigation | Complete — research context only |
| `2024-01-01-10.1109-CoDIT62066.2024.10708603.md` | Reward Planning For Underactuated Robotic Systems With Parameters Uncertainty | Complete — research context only |
| `2024-01-01-10.48550-arXiv.2409.14867.md` | A novel agent with formal goal-reaching guarantees: experimental study with a mobile robot | Complete — full abstract verified |

> **Note on confidence**: Posts marked "research context only" were written without access to the full paper abstract (IEEE 403, Semantic Scholar timeout). They accurately describe the research area and methods based on title, venue, and the group's related work, but specific numbers and baselines were not verified. These should be revisited once the full text is accessible.

## Research themes

The papers cluster into three research lines:

1. **Legged robot locomotion & energy efficiency** (2020–2023)  
   Open-chain vs closed-chain mechanisms; adaptive gripper design; quadruped gait energy comparison.

2. **Model-based and predictive RL for mobile robot navigation** (2023–2024)  
   Map-less navigation with predictive RL; model-based RL navigation experiments; reward planning under parameter uncertainty.

3. **Safe RL with formal guarantees** (2024)  
   CALF framework — Lyapunov-based constraint on critic updates guaranteeing goal-reaching.

## Tone and audience

Posts are aimed at a technical reader with general ML/robotics background — not necessarily a specialist in the sub-field. The goal is to communicate: what was the open problem, what does the paper do about it, and whether it worked. Think extended abstract + motivation, not a tutorial.

## Reference post sections (canonical)

From `2024-10-15-10.48550-arXiv.2409.09869.md`:

1. **## Overview** — Opens with the class of problem and why existing methods fall short. Ends with a one-sentence statement of what the paper introduces.
2. **## Theoretical Basis** — The core mechanism. Formal claim restated in plain language. What is proved vs. what is assumed.
3. **## Experimental Validation** — Setup: platform, task, baselines. Results: metric, numbers, comparison.
4. **## Supplementary Materials** — Code repo link if available.
5. **## Qualitative Demonstration** — YouTube embed or video if available.
6. **## Conclusion** — One paragraph. What this contribution makes possible.
7. **## Citation** — BibTeX block.

Not every paper will have all sections. Papers without experiments (theory-only) omit Experimental Validation. Papers without code omit Supplementary Materials.
