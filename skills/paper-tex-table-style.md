# Shiro Kuriwaki's instructions to LLMs for LaTeX tables

## mostly drafted by codex

_Version 0.3 — 2026-09-11_

Use these defaults for descriptive and regression tables in social science
papers and results memos. Explicit user requests and journal requirements take
precedence. Keep analytical choices separate from presentation preferences.

## Captions and titles

- Number tables automatically with `\caption`, not `\caption*`. Use a colon:
  **Table 1: Sample Construction**. Make both the label and short title bold
  and normal text size, even when the table body uses smaller text.
- Use concise, substantive titles and consistent wording across the paper.
- Put sample definitions, estimator details, and qualifications in normal-weight
  notes. If explanatory prose follows the short title inside a caption, reset
  that prose to `\normalfont`. Do not repeat a title inside the table body.
- Keep captions, labels, and notes in one maintained source. Follow the existing
  division between the R generator and manuscript wrapper; avoid duplicate
  captions or manual edits to generated tables.
- When a memo's AI acknowledgment is requested as a header, use the requested
  wording in a running header on every page. Do not add it to papers by default.

```tex
\usepackage{booktabs,caption,array,makecell}
\captionsetup[table]{
  font={normalsize,bf},labelfont=bf,textfont=bf,labelsep=colon,skip=6pt
}
```

## Width, alignment, and page layout

- Use the table's natural width when it fits. Do not shrink a short table to
  `\linewidth` or add whitespace merely to fill the page. Start with `tabular`
  rather than a width-filling `tabular*`.
- Wrap long or awkward column headings deliberately, especially when headings
  create wide columns with mostly empty bodies. Use short, interpretable labels
  such as “Has newsletter in window”; `\makecell{Has newsletter\\in window}`
  is one way to wrap them.
- Left-align row labels and prose. In regression tables, center coefficients,
  standard errors, sample sizes, and other numeric or categorical model entries,
  including Yes/No indicators. Descriptive counts may be right-aligned.
- Use `booktabs` rules to separate headers and meaningful panels. Avoid vertical
  rules, boxed grids, and decorative shading as defaults.
- Let tables flow naturally. Do not insert a page break after every table.
  Keep a regression table and its notes together when feasible.
- For many paired outcomes, start with four outcomes per panel, each with two
  adjacent model columns. Stack panels on one page; use landscape and a modest
  reduction to `\small` if helpful. Adapt to the actual number of outcomes.
  Avoid scaling the entire table to illegibly small text with `\resizebox`.
- Use normal body text size when practical. Smaller table text does not imply
  smaller captions. Keep notes readable and spacing modest.

## Numbers, labels, and sample definitions

- Display rates as proportions with a leading zero and three decimals:
  `0.215`, not `21.5%` or `.22`. Use thousands separators for counts: `21,437`.
- Keep regression coefficients and SEs in their estimation units, usually
  probability units for linear probability models. Do not multiply them by 100
  unless percentage points are explicitly requested and labeled.
- Default coefficients and SEs to three decimals; increase precision when needed
  to preserve meaningful differences. Explain parentheses and any significance
  stars in the notes, including thresholds and the clustering unit.
- Use a Unicode check mark `✓` for included fixed effects and a blank cell for
  excluded fixed effects. Ensure the TeX engine/font renders the glyph. A blank
  FE cell means exclusion, not missing data; use a dash for genuinely missing
  statistics.
- State the numerator and denominator of rates; do not silently code missing
  as zero.
- Fold brief row-specific qualifications into the relevant cell when that
  eliminates a redundant column: `70,228 (hypothetical)` or `21,437 (actual)`.

## Model comparisons

- Group related models under the outcome name. Use short column labels and
  explain model distinctions once in the notes.
- Report sample size as “N” in every regression column. For regressions with
  clustered standard errors, also report the number of clusters and identify
  the clustering unit in the notes.
- Include outcome means and FE indicators when relevant. Omit likelihoods,
  scores, AIC/BIC, and similar diagnostics unless requested.
- Keep variable definitions, units, and sample restrictions consistent when a
  comparison is meant to isolate a modeling choice. Disclose differences that
  remain; a figure described as a visualization of a table must use that table's
  actual estimates, samples, and uncertainty measures.

## Generation and verification

- Use `gt` for descriptive tables and `modelsummary::modelsummary()` for
  regression tables. Generate both TeX and a gt HTML preview with an editable
  gt object, unless the user requests fewer formats.
- Update the generator and regenerate outputs. Use stable filenames and
  project-relative TeX inputs that work in the manuscript or Overleaf.
- Write R in tidyverse style, with descriptive section headings and lines no
  longer than 80 characters. Use `glue`, `scales`, and readr I/O; specify join
  relationships. New Codex-authored scripts start with `# Written by Codex`.
- Keep fast intermediate models and summaries in memory unless a later script
  explicitly reads them or they are expensive to recompute. Editable gt tables
  are final deliverables, not disposable model caches.
- Compile with the manuscript's actual page size and fonts, then inspect the
  rendered PDF. HTML styling is not proof of correct TeX styling. Check caption
  numbering, FE glyphs, alignment, wrapping, panel fit, notes, and page breaks;
  resolve clipped text and overfull boxes.
- Check displayed estimates, SEs, units, and Ns against the fitted results.
  If a table is removed or replaced, update the manuscript inputs and the
  relevant generator so an old output is not silently reused.
