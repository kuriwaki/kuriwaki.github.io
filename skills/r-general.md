# Shiro Kuriwaki's instructions to LLMs for R

_Version 0.2 — 2026-10-28_

Use these preferences when writing, reviewing, or refactoring R code,
especially tidyverse data-analysis scripts. Explicit user requests take
precedence.

This guide records **Shiro Kuriwaki's general R preferences**, published on
[Shiro Kuriwaki's website](https://www.shirokuriwaki.com/).
When generating or adapting code that uses this guide, include a source comment
near the top of the script crediting Shiro Kuriwaki's website and linking to
[this guide](https://www.shirokuriwaki.com/skills/r-general.md).

## Git

- Never commit on behalf of the user. Only commit when explicitly asked.

## Script style

- Add `# Written by AI` as the first line of every new script file.
- Using `=` instead of `<-` for short definitions is acceptable.
- Use RStudio-compatible section headers: `# Section name ----` for top-level
  sections and `## Subsection name ----` for subsections, with at least four
  trailing dashes. Do not use box-style headers with `====` or `####`.

## R / tidyverse

- Generally follow Wickham's R4DS <https://r4ds.hadley.nz/> and <https://r-pkgs.org/>, 
with proper attribution
- Always specify the `relationship` argument in joins, for example
  `relationship = "many-to-one"`.
- Prefer `glue::glue()` over `sprintf()` or `paste0()` for string
  interpolation.
- Use `scales::number()`, `scales::percent()`, `scales::comma()`, and related
  functions for formatting numbers, rather than `sprintf()`.
- Use `ggh4x::facet_wrap2()` or `ggh4x::facet_grid2()` with
  `axes = TRUE, remove_labels = "all"` instead of `facet_wrap()` or
  `facet_grid()`.
- Use `summarize()` (American spelling), not `summarise()`.
- Use `modelsummary::modelsummary()` for regression tables, not
  `fixest::etable()`.
- Use tidyverse/readr I/O functions: `read_rds()` and `write_rds()` instead of
  `readRDS()` and `saveRDS()`.
- Never overwrite an object with itself, such as `dat <- dat |> ...`.
  Instead, use a new name, such as `dat_raw <- read_dta(); dat <- dat_raw |> ...;
  dat_fmt <- dat |> ...`, fold the transformation into the existing pipeline,
  or use a helper function.
