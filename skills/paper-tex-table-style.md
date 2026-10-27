# Shiro Kuriwaki's instructions to LLMs for LaTeX tables

## mostly drafted by codex

_Version 0.4 — 2026-10-27_

Use these defaults for descriptive and regression tables in social science
papers and results memos. Explicit user requests and journal requirements take
precedence. Keep analytical choices separate from presentation preferences.

## Layout assessment

Before choosing a table layout, identify the main comparison readers should
make. Assess whether repeated labels, redundant columns, or the arrangement of
rows obscure that comparison. Consider simplifying columns, reorganizing rows,
or introducing meaningful panels. Restructure as needed to improve readability
while preserving the underlying information and any explicit layout requirements.

## Captions and titles

- Number tables automatically with `\caption`, not `\caption*`. Use a colon:
  **Table 1: Sample Construction**. Make both the label and short title bold
  and normal text size, even when the table body uses smaller text.
- Use concise, substantive titles and consistent wording.
- Place the table caption above the table body. Ensure that it establishes the
  subject and context needed to interpret the entries.
- Put sample definitions, estimator details, and qualifications in normal-weight
  notes. If explanatory prose follows the short title inside a caption, reset
  that prose to `\normalfont`. Do not repeat a title inside the table body.
- Place a left-aligned note block directly beneath the table body and wrap it
  within the table’s width. Use a consistent “Note:” label. Define symbols and
  abbreviations needed to interpret the table. State model features shared by every
  specification once in the notes; use indicators in the body when
  those features vary.
- Keep captions, labels, and notes in one maintained source. Follow the
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

<details markdown="block" style="margin-bottom: 10px;">
<summary>Example — Table wrappers for captions and notes</summary>

For a single-page table whose caption and notes belong to the manuscript
wrapper, standard LaTeX environments are sufficient. Save the generated table
body in a box and use its measured width for a `minipage`. This keeps the table
at its natural width and wraps the caption and notes to the same width.

```tex
% Declare once in the preamble, alongside the packages above.
\newsavebox{\tablebodybox}

% In the document, adapt the file path, caption, label, and notes.
\begin{table}[tbp]
\centering
\begin{lrbox}{\tablebodybox}
  \input{tables/table-body.tex}
\end{lrbox}
\begin{minipage}{\wd\tablebodybox}
  \caption{Table title}
  \label{tab:table-name}
  \noindent\usebox{\tablebodybox}
  \par\smallskip
  {\footnotesize\raggedright
    \textit{Note:} Define the sample, units, and statistical conventions
    needed to interpret the entries.
    \par
  }
\end{minipage}
\end{table}
```

The input file must contain a bare `tabular` environment with its generated
headings, rules, and entries. It must not contain another `table` float,
`longtable`, caption, or note block. Keep the body and wrapper in their existing
maintained sources. Use the multipage-table guidance below when the table
cannot fit on one page; a saved box and `minipage` do not break across pages.

As an optional alternative for single-page tables, use `threeparttable` to keep
the caption and notes aligned with the table body's width. Add
`\usepackage{threeparttable}` to the preamble and place a `threeparttable`
environment inside the `table` float. Within it, put the caption and label
above the bare `tabular` input and a `tablenotes` block below it. Use
`\begin{tablenotes}[flushleft]`, `\footnotesize`, `\raggedright`, and
`\item[] \textit{Note:}` for the note block. Retain the caption configuration
above.

</details>

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
  including Yes/No indicators. In descriptive tables, right-align numerical
  columns and center columns containing single characters or symbols.
- Match each individual column heading’s alignment to its entries: left for
  text columns, right for numerical descriptive columns, and centered for
  centered model entries or single-character columns.
- When several columns share a condition, sample, or other classification,
  place a spanning heading above them. Center that heading over its columns
  and use a partial horizontal rule to indicate its extent. Keep individual
  column headings beneath it and leave sufficient space between column groups.
- When a label is constant within a group, consider stating it once in the
  relevant group heading or column heading. Keep its association with every
  numerical entry unambiguous. For example, a table of borough vote shares may
  name the candidates once in each election's column headings, followed by
  borough rows containing their shares.
- Organize related rows into labeled groups when this helps interpretation. 
  Use left-aligned group headings with restrained emphasis,
  such as italics, and modest vertical space between groups. Keep group headings
  visually distinct from data rows and leave their numerical cells empty.
  <details markdown="block" style="margin-top: -10px; margin-bottom: 10px;">
  <summary>Examples — Row groups and spanning column headings</summary>

  The following exemplary helper constructs a descriptive table from 
  project-defined columns and labels. Supply column names as character vectors, 
  the intended row-group order as `group_order`, and a named list of column 
  vectors as `spanners`; each list name becomes its spanning heading. Supply a 
  named list of display labels as `column_labels`. Group identifiers must match 
  the data. Choose a missing-value label consistent with the conventions above.

  ```r
  make_grouped_table <- function(
      data, group_column, label_columns, numeric_columns,
      group_order, spanners, column_labels,
      digits = 3, missing_label = "-"
  ) {
    selected_columns <- unique(c(
      group_column, label_columns, numeric_columns
    ))

    table_gt <- data |>
      dplyr::select(dplyr::all_of(selected_columns)) |>
      gt::gt(groupname_col = group_column) |>
      gt::row_group_order(groups = group_order) |>
      gt::cols_label(.list = column_labels) |>
      gt::fmt_number(
        columns = dplyr::all_of(numeric_columns),
        decimals = digits
      ) |>
      gt::cols_align(
        align = "left", columns = dplyr::all_of(label_columns)
      ) |>
      gt::cols_align(
        align = "right", columns = dplyr::all_of(numeric_columns)
      ) |>
      gt::sub_missing(missing_text = missing_label)

    for (heading in names(spanners)) {
      table_gt <- gt::tab_spanner(
        table_gt,
        label = heading,
        columns = dplyr::all_of(spanners[[heading]])
      )
    }

    table_gt
  }
  ```

  Supply columns in their intended display order and group related columns
  together. Override the formatting of counts or other statistics separately
  when their precision differs from `digits`. Check the TeX rendering 
  separately: `gt::tab_style()` styling is specific to HTML and should not be 
  relied on to style the LaTeX output.

  For direct LaTeX generation, the following descriptive-table structure
  combines centered spanning headings, right-aligned numerical columns, and
  full-width italic row-group labels. Adapt the headings and input paths to
  the project.

  ```tex
  % Requires booktabs.
  % Define once in the preamble for expandable input of table rows.
  \makeatletter
  \newcommand{\inputtablerows}[1]{\@@input{#1}}
  \makeatother

  % Table body:
  \begin{tabular}{@{}lrrrr@{}}
  \toprule
  & \multicolumn{2}{c}{Sample A}
  & \multicolumn{2}{c}{Sample B} \\
  \cmidrule(lr){2-3}\cmidrule(lr){4-5}
  Variable & Mean & SD & Mean & SD \\
  \midrule

  \multicolumn{5}{@{}l}{\textit{Outcome measures}} \\
  \addlinespace[0.25em]
  \inputtablerows{tables/outcome-rows.tex}

  \addlinespace
  \multicolumn{5}{@{}l}{\textit{Background characteristics}} \\
  \addlinespace[0.25em]
  \inputtablerows{tables/characteristic-rows.tex}

  \bottomrule
  \end{tabular}
  ```

  Each generated row file must contain five cells per row and the terminating
  `\\`, without another table environment. Keep the helper definition in the
  preamble and only the `tabular` environment in the table-body file. The
  expandable row-input helper allows `booktabs` spacing and rule commands
  immediately after included rows. Use `\addlinespace` for row separation and
  column-spacing controls for horizontal separation. Keep spacing out of
  numerical cell contents.

  </details>

- Group related interaction terms together. When several terms share a common
  factor, state that factor and use indented continuation labels such
  as “× Moderator” to reduce repetition. Use this shorthand only when every
  interaction remains unambiguous. Preserve the distinction between main
  effects, two-way interactions, and higher-order interactions.
- Preserve category order across related tables so readers can compare them
  easily. When ranking is the purpose, order rows by the relevant statistic
  within meaningful groups. Use a deliberate substantive order rather than
  accepting software’s default alphabetical order.
- Use `booktabs` rules sparingly at the table’s upper and lower boundaries,
  beneath column headings, and between meaningful panels. Use single rules
  rather than doubled rules. Do not place horizontal rules between individual
  data rows. Avoid vertical rules, boxed grids, and decorative shading as
  defaults.
- When a very wide or sparse table needs help with row tracking, subtle
  alternating row shading may be used. Keep adjacent backgrounds similar in
  lightness and avoid strongly contrasting stripes. Ensure that the header
  remains clearly distinguishable from the body.
- Do not insert a page break after every table. Keep a regression table and 
  its notes together when feasible.
- For many paired outcomes, start with four outcomes per panel, each with two
  adjacent model columns. Stack panels on one page; use landscape and a modest
  reduction to `\small` if helpful. Adapt to the actual number of outcomes.
  Avoid scaling the entire table to illegibly small text with `\resizebox`.
- When a table cannot fit at a readable size, consider landscape orientation,
  meaningful panel division, or a multipage layout before reducing the font
  further. For multipage tables, repeat column headings and identify
  continuations. Keep each estimate with its uncertainty measure, and
  avoid separating group headings from the rows they introduce. Repeat only
  the notes needed to interpret each continuation page independently, and keep
  full shared notes in one clearly identified location.
- Use normal body text size when practical. Smaller table text does not imply
  smaller captions. Keep notes readable and spacing modest.

## Numbers, labels, and sample definitions

- Display rates as proportions with a leading zero and three decimals:
  `0.215`, not `21.5%` or `.22`. Use thousands separators for counts: `21,437`.
- Keep regression coefficients and SEs in their estimation units, usually
  probability units for linear probability models. Do not multiply them by 100
  unless percentage points are requested and labeled.
- Default coefficients and SEs to three decimals; increase precision when needed
  to preserve meaningful differences. Explain parentheses and any significance
  stars in the notes, including thresholds and the clustering unit.
- Place standard errors beneath coefficients by default. When each row
  represents a separate regression and a compact layout improves comparison,
  a dedicated standard-error column is also appropriate. Label it and keep 
  each uncertainty measure adjacent to its corresponding estimate.
  When standard errors appear beneath coefficients, use parentheses and the
  same alignment, with sufficient spacing to distinguish neighboring estimates.
- Use a consistent number of decimal places for comparable values within each
  numerical column or row block. If additional precision is needed, apply it
  consistently to the comparable entries. Preserve appropriate differences
  between types of statistics, such as integer sample sizes and decimal
  coefficients.
- Calculate differences, totals, ratios, and other derived quantities from
  unrounded data or estimates, then format the results for display. Do not
  recompute derived entries from rounded cells. Allow for rounding when
  checking displayed arithmetic. Suppress negative-zero formatting unless
  additional precision is needed to preserve a meaningful distinction.
- Display p-values consistently and use a threshold such as “<0.001” for values
  below the reporting precision. Do not display a rounded p-value as zero.
  Determine significance markers from unrounded p-values so that formatting
  cannot change their classification.
  <details markdown="block" style="margin-top: -10px; margin-bottom: 10px;">
  <summary>Example — Formatting estimates and p-values</summary>

  This exemplary helper formats numerical result columns without changing their 
  stored values. Pass the project's estimate and uncertainty column names 
  through `estimate_columns`, and its p-value column names through 
  `p_value_columns`. The precision, separators, and missing-value label are 
  configurable.

  ```r
  format_results_table <- function(
      data, estimate_columns, p_value_columns,
      digits = 3, decimal_mark = ".", grouping_mark = ",",
      missing_label = "-"
  ) {
    accuracy <- 10^(-digits)

    format_estimate <- scales::label_number(
      accuracy = accuracy,
      decimal.mark = decimal_mark,
      big.mark = grouping_mark
    )

    format_p_value <- scales::label_pvalue(
      accuracy = accuracy,
      decimal.mark = decimal_mark
    )

    data |>
      gt::gt() |>
      gt::fmt(
        columns = dplyr::all_of(estimate_columns),
        fns = format_estimate
      ) |>
      gt::fmt(
        columns = dplyr::all_of(p_value_columns),
        fns = format_p_value
      ) |>
      gt::sub_missing(missing_text = missing_label)
  }
  ```

  Apply the appropriate column labels and descriptive or regression alignment
  to the returned table. The estimate formatter suppresses a minus sign when
  rounding produces zero. The p-value formatter uses a lower threshold equal
  to `accuracy` and an upper threshold equal to `1 - accuracy`. Continue to
  calculate significance classifications from the original numerical values.
  The same `scales::label_number()` formatter can be passed as `fmt` to
  `modelsummary()` when formatting estimates there.

  </details>

- Identify quantitative variables and their units in column headings or row
  labels wherever applicable. Explain transformations and normalization
  baselines in the notes when needed for interpretation. Readers should not
  have to infer whether entries represent original measurements, proportions,
  percentages, or indexed values.
- Use a Unicode check mark `✓` for included fixed effects and a blank cell for
  excluded fixed effects. Ensure the TeX engine/font renders the glyph. A blank
  FE cell means exclusion, not missing data; use a dash for genuinely missing
  statistics.
- Distinguish statistics that are not applicable, predictors excluded from a
  specification, and genuinely missing results. Explain the meaning of
  intentional blank cells when it could be ambiguous. Retain the designated
  missing-value marker for genuinely missing statistics, and never use zero as
  a substitute for an absent result.
- State the numerator and denominator of rates; do not silently code missing
  as zero.
- Label sample sizes with the unit being counted whenever “N” alone could be
  ambiguous. Distinguish observations from unique individuals, groups, or
  events.
- Fold brief row-specific qualifications into the relevant cell when that
  eliminates a redundant column: `70,228 (hypothetical)` or `21,437 (actual)`.

## Descriptive and comparison tables

- Organize descriptive statistics into substantively meaningful groups. Report
  the nonmissing observation count for each variable when availability differs.
  Use means and standard deviations where informative, and add medians, ranges,
  or other distributional summaries when they help characterize the data. Label
  descriptive dispersion separately from estimation uncertainty.
- State whether cross-tabulated proportions use row totals, column totals, or
  the entire sample as their denominator. Show the corresponding counts where
  useful. Explain omitted categories and whether they remain in the denominator.
  Do not renormalize displayed categories merely to make them sum to one, or
  treat a nonunit sum as an error when categories are intentionally omitted.

## Correlation and component tables

- For a symmetric correlation matrix, usually display one triangle and format
  the diagonal consistently. Use the same variable order for rows and columns.
  Identify the correlation measure, sample, and level of aggregation. State
  whether correlations use a common complete-case sample or pair-specific
  observations, and report varying sample sizes when needed for interpretation.

## Model comparisons

- Group related models under the outcome name. Use short column labels and
  explain model distinctions once in the notes.
- When comparing many outcomes or specifications using only a few focal
  coefficients, consider placing one regression in each row. Identify the
  outcome or specification in the leftmost column and use separate columns for
  the focal coefficients and relevant supporting statistics. State in the notes 
  that each row represents a separate regression.
- When the same specifications are estimated for several outcomes, consider
  placing outcomes in stacked row blocks and specifications in columns. Keep
  each column’s meaning constant across blocks and describe the shared
  specifications once. Make clear that each outcome–specification combination
  represents a separate regression, and report its sample size and uncertainty.
- Focus the table body on coefficients needed for the substantive comparison.
  Controls, constants, and other estimated terms may be omitted from the display
  when their individual estimates are not needed. State which terms or groups
  of terms remain included in estimation. Describe them as “included but not
  displayed” where necessary to distinguish them from excluded predictors or
  reference categories.
- Report sample size as “N” for every regression, whether models occupy columns
  or rows. For regressions with clustered standard errors, also report the
  number of clusters and identify the clustering unit in the notes.
- Include outcome means and FE indicators when relevant. Omit likelihoods,
  scores, AIC/BIC, and similar diagnostics unless requested.
- Keep variable definitions, units, and sample restrictions consistent when a
  comparison is meant to isolate a modeling choice. Disclose differences that
  remain; a figure described as a visualization of a table must use that table's
  actual estimates, samples, and uncertainty measures.

## Generation and verification

- Use `gt` for descriptive tables and `modelsummary::modelsummary()` for
  regression tables by default. When a table requires more control over its 
  structure, generate LaTeX from a reusable template or table-rendering
  function. Generate both TeX and a `gt` HTML preview with an editable `gt`
  object, unless the user requests fewer formats. Generate requested previews
  from the same computed results as the LaTeX table.
- Define recurring labels, category order, column groups, and numerical formats
  once and reuse them across related tables. Select columns by stable names
  when assigning formatting or spanning headings.
- Keep quantities numeric throughout calculation, joining, ordering, and
  validation. Apply decimal precision, separators, currency symbols, and other
  display formatting through the table-rendering functions. Keep the underlying
  results numeric; create display strings only during final rendering.
- Update the generator and regenerate outputs. Use stable filenames and
  project-relative TeX inputs that work in the manuscript or Overleaf.
  <details markdown="block" style="margin-top: -10px; margin-bottom: 10px;">
  <summary>Example — Exporting tables to HTML and TeX</summary>

  Export the completed `gt` object using the same filename stem for both
  formats. This applies to descriptive tables created with `gt()` and
  regression tables created with `modelsummary(output = "gt")`. Adapt the
  project-relative directory and filename stem to the table being generated.

  ```r
  output_dir <- "tables"
  table_stem <- "table-name"

  for (extension in c("html", "tex")) {
    gt::gtsave(
      table_gt,
      filename = glue::glue("{table_stem}.{extension}"),
      path = output_dir
    )
  }
  ```

  </details>

- Generate numerical statements in the manuscript from the same computed
  results used in tables and figures. Where appropriate, export individual
  formatted values as manuscript inputs so that changes to the analysis update
  all occurrences consistently.
- Write R in tidyverse style, with descriptive section headings and lines no
  longer than 80 characters. Use `glue`, `scales`, and readr I/O; specify join
  relationships. New Codex-authored scripts start with `# Written by Codex`.
- Keep fast intermediate models and summaries in memory unless a later script
  reads them or they are expensive to recompute. Editable `gt` tables
  are final deliverables, not disposable model caches.
- Compile with the manuscript's actual page size and fonts, then inspect the
  rendered PDF. HTML styling is not proof of correct TeX styling. Check caption
  numbering, FE glyphs, alignment, wrapping, panel fit, notes, and page breaks;
  resolve clipped text and overfull boxes.
- After rendering, review repetition, visual hierarchy, spacing, and note
  length as well as numerical accuracy and page fit. Address unnecessary
  repetition, oversized headings, excessive notes, and wasted space while
  retaining readable type and the spacing needed to distinguish groups.
- Check displayed estimates, SEs, units, and Ns against the fitted results.
  If a table is removed or replaced, update the manuscript inputs and the
  relevant generator so an old output is not silently reused.
- Verify that column spanners, model identifiers, panel labels, and sample
  information correspond to the correct results. Verify that the declared
  columns match the cells in each row, accounting for cells spanning multiple
  columns, and that spanning headings cover the intended columns. Check that
  LaTeX labels are unique and correspond to the intended manuscript references.
  Check that intentionally empty cells do not shift entries into neighboring
  columns. Check totals and proportions against the stated denominators and
  classification rules, allowing for rounding, overlapping groups, and
  intentionally omitted categories.
  
## Repository-specific instructions

- Follow repository-specific instructions, such as `AGENTS.md`, when present.
