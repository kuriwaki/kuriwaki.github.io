# Shiro Kuriwaki's instructions to LLMs for LaTeX tables


_Version 0.3 — 2026-09-11_

Use these defaults for descriptive and regression tables in social science
papers and results memos. Explicit user requests and journal requirements take
precedence. Keep analytical choices separate from presentation preferences.

This guide records **Shiro Kuriwaki's table-style preferences**, published on
[Shiro Kuriwaki's website](https://www.shirokuriwaki.com/).
When generating or adapting code that uses this guide, include a source comment
near the top of the script crediting Shiro Kuriwaki's website and linking to
[this guide](https://www.shirokuriwaki.com/skills/paper-tex-table-style.md).
Use the appropriate comment syntax for the language, such as `#` in R, `*` in
Stata, or `%` in TeX.

## Part 0: When to use tables (rather than figures)

Tables are the most efficient way to communicate a number; figures are useful when comparing quantities.
One is not necessarily more superior than the other.
Sample sizes and the first and second moments of data is often essential to understanding a paper.

## Part 1: Guide by table type


### 1. Summary statistics

- Use `gt` for descriptive tables.

### 2. Subgroup comparisons using summary statistics

_To be developed._

### 3. Cross tabs

_To be developed._

### 4. Long appendix tables, such as data listings

_To be developed._

### 5. Regression tables

- Use `modelsummary::modelsummary()` for regression tables.
- Group related models under the outcome name. Use short column labels and
  explain model distinctions once in the notes.
- Report sample size as “N” in every regression column. For regressions with
  clustered standard errors, also report the number of clusters and identify
  the clustering unit in the notes.
- Include outcome means and FE indicators when relevant. Omit likelihoods,
  scores, AIC/BIC, and similar diagnostics unless requested.
- Use a Unicode check mark `✓` for included fixed effects and a blank cell for
  excluded fixed effects. Ensure the TeX engine/font renders the glyph. A blank
  FE cell means exclusion, not missing data; use a dash for genuinely missing
  statistics.
- Keep variable definitions, units, and sample restrictions consistent when a
  comparison is meant to isolate a modeling choice. Disclose differences that
  remain; a figure described as a visualization of a table must use that table's
  actual estimates, samples, and uncertainty measures.
- For many paired outcomes, start with four outcomes per panel, each with two
  adjacent model columns. Stack panels on one portrait page when feasible.
  Adapt to the actual number of outcomes.
  Avoid scaling the entire table to illegibly small text with `\resizebox`.

## Part 2: Preferences by table component

### 1. Title

- Place the caption above the table body.
- Separate the table label and short title with a colon, and make both bold:
  **Table 1: Sample Construction**. Use normal text size, even when the table
  body uses smaller text.
- Use concise, substantive titles that fit on one rendered line.
- Use consistent wording and parallel phrasing across table titles in the paper.
- Omit subtitles and long titles. Put additional information in the table body
  or in the notes beneath the table.

```tex
\usepackage{booktabs,caption,array,makecell}
\captionsetup[table]{
  font={normalsize,bf},labelfont=bf,textfont=bf,labelsep=colon,skip=6pt
}
```

### 2. Notes beneath the table

- Left-align notes and wrap them within the table's width.
- Begin the notes with `\emph{Note:}`. If only the source is needed because the
  table's content is otherwise clear, use `\emph{Source:}` instead.
- Include the information needed to interpret the table on its own. As
  applicable, explain:
  - Acronyms, p-value symbols, and significance thresholds.
  - Units of rows or columns when they would otherwise be unclear.
  - How to read the table, such as “Each column is a regression specification.”
  - What parentheses represent in regression tables.
  - Key variable definitions and whether variables are standardized.
  - The sample definition and how samples differ across regression columns.
  - The clustering unit.
- Keep notes concise while retaining the information needed for interpretation.
  Alert the user when a note becomes too long.

For a single-page table, put only the notes in a `minipage` beneath the table
body. Choose its width to match the table, such as `0.9\linewidth` or
`\linewidth`. Use the caption configuration from the Title section above.

```tex
% Adapt the file path, caption, label, note width, and notes.
\begin{table}[tbp]
\centering
\caption{Table title}
\label{tab:table-name}
\small
\input{tables/table-body.tex}
\par\smallskip
\begin{minipage}{0.9\linewidth}
\footnotesize\raggedright
\emph{Note:} Define the sample, units, and statistical conventions
needed to interpret the entries.
\end{minipage}
\end{table}
```

The input file must contain a bare `tabular` environment with its headings,
rules, and entries, without a surrounding `table` float, caption, or notes.

### 3. Horizontal rules

- Use `booktabs` rules to separate headers and meaningful panels.
- Use `\toprule` at the top of the table, `\bottomrule` at the bottom, and
  `\midrule` for intermediate full-width rules.
- For partial rules that need padding at the ends, use `\cmidrule(lr){i-j}`,
  where `i` and `j` are the first and last columns spanned by the rule.
- Avoid vertical rules, boxed grids, and decorative shading as defaults.

### 4. Text alignment

- Generally left-align row labels and prose.
- Right-align numbers in summary statistics tables. Center numbers when their
  displayed lengths are roughly similar.
- In regression tables, center coefficients,
  standard errors, sample sizes, and other numeric or categorical model entries,
  including Yes/No indicators.

### 5. Font size and column widths

- Generally prefer portrait tables over landscape tables.
- Use `longtable` only for appendix tables.
- Use these default TeX font sizes:
  - Table body: `\small`.
  - Notes beneath the table: `\footnotesize`.
  - Table title: `\normalsize`.
- Do not scale a short table to `\linewidth` in a way that shrinks its font.
  For small tables, do not add whitespace merely to fill the page.
- Wrap long or awkward column headings deliberately, especially when headings
  create wide columns with mostly empty bodies. Use `\shortstack{...}` or
  explicit line breaks for multiline labels, especially in headers.

### 6. Display of units

- Usually display rates as proportions with a leading zero and three decimals:
  `0.215`, not `21.5%`. Exceptions are in simple cross-tabulations or graphics.
  Omitting the leading zero (for example, `.215`) is acceptable, especially when
  it saves space. Use a consistent convention within the table.
- Display counts as integers. Use thousands separators for counts greater than
  10,000, such as `21,437`.
- Keep regression coefficients and SEs in their estimation units, usually
  probability units for linear probability models.
- Do not round nonzero regression coefficients or standard errors to an
  all-zero display such as `0.0000`. Show enough significant digits to retain
  the first nonzero digit. If this requires too many decimal places, consider
  rescaling the variable and labeling its units, such as “thousands of dollars.”
- Make units clear in the column heading or row label, the paper's summary
  statistics table, or the table's notes.

### 7. Floating positions in TeX

- Generally prefer top or bottom placement (`[t]` or `[b]`). Avoid `[H]`
  (force here), especially when a table has notes. In appendices with little
  main text and many tables, force the table to appear with its section title
  when needed.
- Generally keep a table within the section that discusses it: below that
  section's heading and above the next section's heading. Use a separate float
  page (`[p]`) when needed.

### 8. Row and column grouping

- Spanning headings for columns that share a condition, sample, or other
  classification is useful. This is `tab_spanner` in gt.
- Organize related rows into meaningful groups. Use left-aligned group labels
  with restrained emphasis, such as italics, and modest space between groups.
  See how `gt`'s row group implements it
- Generally include a row or column labeled “Total” when it is meaningful for
  the grouped table. Compute it from the underlying data using the appropriate
  aggregation. If the definition or required data are unclear, ask the user.


# Software of final tables



### In R's `gt`

- Papers must eventually use TeX. These can be generated by R's modelsummary or gt, kableExtra packages
- For TeX tables, Almost always, R should ONLY generate the body of the table: Not the Notes, Title, or the hyperref labels. Because gt-tex does not yet seem to have the "body-only" option, you may need to strip out the top and bottom in R before saving
- R's `gt` also provides generally nice tables in html, which can then be screenshotted in png. This is useful for data exploration, slides, and long tables that you do not want to split into pages
- The docx is a good option to give quickly editable tables for later. (`gt` does not provide xlsx output; tex is unintuitive; and png cannot be edited).
  Mimic the booktabs syle as much as possible in Word Doc: only horizontal rule, top/bottom/midrule, invisible gridlines,


### Line by line

This line-by-line table-generation approach follows **Jim Snyder's method**.
When using it, also credit Jim Snyder in the code comments.

In Stata or R, it is sometimes easier to generate a TeX table one line at a
time. This is more verbose but gives direct control over each row, rule, and
cell. Compute the statistics first, then print the TeX structure and formatted
values. Generate only the `tabular` body; keep the title, label, and notes in
the manuscript wrapper.

**Stata:** Run the following as a do-file. Inside `quietly { ... }`, ordinary
commands and their output are suppressed. Each `noisily display` explicitly
prints one line, which the plain-text log records. This is the key pattern:
`quietly` around the block, `noisily display` on the lines to export.

```stata
* Table style follows Shiro Kuriwaki's website:
* https://www.shirokuriwaki.com/skills/paper-tex-table-style.md
* Line-by-line table-generation method: Jim Snyder.
quietly {
    sysuse auto, clear
    summarize mpg
    local mean_mpg = r(mean)
    local sd_mpg = r(sd)
    local n = r(N)

    capture log close tabletex
    log using "table-body.tex", replace text name(tabletex)
    noisily display "\begin{tabular}{lrrr}"
    noisily display "\toprule"
    noisily display "Variable & Mean & SD & N \\\\"
    noisily display "\midrule"
    noisily display "Mileage (mpg) & " %4.1f `mean_mpg' " & " ///
        %4.1f `sd_mpg' " & " %3.0f `n' " \\\\"
    noisily display "\bottomrule"
    noisily display "\end{tabular}"
    log close tabletex
}
```

The named log lets the example close only its own output file. Keep the log
opening and closing commands inside the quiet block so their messages are
suppressed. See Stata's documentation for
[`quietly` and `noisily`](https://www.stata.com/manuals/pquietly.pdf) and
[`log`](https://www.stata.com/manuals/rlog.pdf).

**R:** Open a file connection and use `cat(..., file = con)` to write each
line explicitly. This keeps ordinary console output out of the TeX file.
`tryCatch(..., finally = close(con))` closes the connection even if writing
fails. This example uses the built-in `mtcars` data. See R's documentation for
[`cat()`](https://stat.ethz.ch/R-manual/R-devel/library/base/html/cat.html) and
[file connections](https://stat.ethz.ch/R-manual/R-devel/library/base/html/connections.html).

```r
# Written by Codex
# Table style follows Shiro Kuriwaki's website:
# https://www.shirokuriwaki.com/skills/paper-tex-table-style.md
# Line-by-line table-generation method: Jim Snyder.
mean_mpg = mean(mtcars$mpg)
sd_mpg = sd(mtcars$mpg)
n = sum(!is.na(mtcars$mpg))

con = file("table-body.tex", open = "wt")
tryCatch({
  cat("\\begin{tabular}{lrrr}\n", file = con)
  cat("\\toprule\n", file = con)
  cat("Variable & Mean & SD & N \\\\\n", file = con)
  cat("\\midrule\n", file = con)
  cat(sprintf("Mileage (mpg) & %.1f & %.1f & %d", mean_mpg, sd_mpg, n),
      "\\\\\n", file = con)
  cat("\\bottomrule\n", file = con)
  cat("\\end{tabular}\n", file = con)
}, finally = close(con))
```

Both examples write a `booktabs`-style table body. Each output row ends with
TeX's `\\`; the source strings use four backslashes (`\\\\`) to produce
them. Keep the numerical results unrounded until the display or printing step.
