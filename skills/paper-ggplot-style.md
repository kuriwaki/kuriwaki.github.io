# Shiro Kuriwaki's instructions to LLMs for visualizations

_Version 0.1 — 2026-08-22_

When creating a visualization, especially with R and ggplot2, start with 
these principles, aesthetic preferences, and settings as strong defaults. 
Deviate from them only with the user's explicit request or permission.

## General principles

- Follow the relevant chapters of Claus O. Wilke's recommendations in 
  _Fundamentals of Data Visualization_ (O'Reilly). See the online 
  manuscript at <https://clauswilke.com/dataviz/> and the source code at
  <https://github.com/clauswilke/dataviz>.
- Follow the tidyverse style guide and prefer tidyverse data-formatting
  functions.
- Maintain a consistent style within each paper or project. Do not use different
  palettes for the same variables or reuse one palette for different variables.

## Figure size, titles, and captions

- Use a compact, landscape layout that leaves room for legible text.
- Default figures with one or two facets to 5 inches wide by 3 inches tall.
  Default figures with three or more facets to about 7 inches wide by 3 inches
  tall. Do not change these dimensions without the user's permission.
- Take seriously Wilke's Chapter 24, "Use Larger Axis Labels":
  <https://clauswilke.com/dataviz/small-axis-labels.html>. Most visualization
  software uses default label sizes that are too small.
- Design for the figure's final output width, even if no PDF or PNG file will be
  saved.
- Keep the plotting area dense but readable.
- Avoid using the ggplot title or subtitle. For exploratory figures, a title or
  caption may preserve useful context or provenance. Do not repeat information
  already available in the axes or legend or obvious from context.
- Wrap long categorical labels deliberately, for example with
  `stringr::str_wrap()`. Prefer meaningful endpoint labels and a shared
  direction cue when every intermediate x-axis label would be redundant.
- If a long y-axis title would be difficult to read vertically, omit it and use
  a short, left-aligned plot title instead. This exception is especially useful
  for time-series figures.

## Publication captions and notes

- When embedding a figure or table in a paper or book, place its title and
  caption in the surrounding document, such as the LaTeX source, rather than
  inside the ggplot. Follow Wilke's conventional book layout:
  <https://clauswilke.com/dataviz/figure-titles-captions.html>. Anticipate each
  figure or table as having one and not more than one title when rendered on the paper.
- For final figures and tables in TeX, use the following `caption`
  configuration.

```tex
\usepackage[
  margin=30pt,
  labelfont=bf,
  labelsep=endash,
  font=normalsize
]{caption}
```

- Begin `\caption{}` with a boldfaced short title and keep the entire caption
  short enough to fit on one rendered line. Put explanatory notes in a
  `minipage` below the figure or table and begin them with `\emph{Note}`.

## Theme and typography

- Start with `ggplot2::theme_classic(base_size = 11)` or
  `ggplot2::theme_classic(base_size = 12)`. Use `ggplot2::theme_minimal()` for
  tile plots where the axes are not the visual frame.
- Render axis titles and tick labels in black rather than gray. Keep reference
  lines thin or dotted and neutral gray. Avoid decorative panel grids.
- Use bold facet strips with blank strip backgrounds. Left-align strips for
  compact, one-row coefficient figures when that improves scanning.
- Keep typography large enough to remain legible at the figure's final size.
  Typical starting values are 11–12-point base text, 12–13-point axis
  titles, 10–11-point y-axis tick labels, and 8–9-point dense x-axis tick
  labels or notes.

## Estimates and uncertainty

- When an estimate is based on a small sample, such as fewer than 100
  observations, show a 95 percent confidence interval. Use points with thin,
  uncapped intervals, typically by combining `ggplot2::geom_point()` with
  `ggplot2::geom_linerange()`. If using `ggplot2::geom_errorbar()`, omit end
  caps with `width = 0`.

## Labels and units

- Be explicit about units. Clearly distinguish percentages, percentage points,
  and proportions. Use `scales::label_percent()` for proportions displayed as
  percentages. For differences stored as proportions but displayed in
  percentage points, use `scales::label_number(scale = 100, suffix = " pp")`.
  If values are already stored in percentage points, use the suffix without
  rescaling.
- Do not multiply underlying values by 100 solely for display; leave display
  conversion to a `scales` label function.
- For other units, incorporate them in the axis title or caption.
- Use direct labels or compact annotations when they reduce legend lookup
  without creating overlap. Do not narrate inside the plot when a symbol,
  mathematical key, facet strip, or manuscript note is clearer.

## Facets and small multiples

- When using facets, prefer `ggh4x::facet_wrap2()` or
  `ggh4x::facet_grid2()` with `axes = TRUE`. Set `remove_labels` appropriately
  to suppress repeated inner-panel tick labels; do not use
  `ggplot2::facet_wrap()` or `ggplot2::facet_grid()`.

## Color

- Use an appropriate colorblind-friendly palette from Cory McCartan's
  `wacolors` package by default instead of ggplot2's default discrete palette.
  Viridis palettes are also acceptable. Reuse the same named palette for the
  same concepts within a project.
- For choropleth maps of continuous quantities, prefer a binned scale such as
  `ggplot2::scale_fill_fermenter()` with a ColorBrewer palette over an unbroken
  continuous gradient. If values are already categorical, use
  `ggplot2::scale_fill_brewer()` or an appropriate manual discrete scale.
- For single-hue scales that default to `direction = -1`, set
  `direction = 1`. Leave the default direction of Viridis palettes unchanged.
- For U.S. Democrats and Republican, use the blue and red endpoints of the
  `ggredist$partisan` palette defined by Cory McCartan and Christopher T. Kenny:
  <https://github.com/alarm-redist/ggredist/blob/main/R/colors.R>. Use neutral
  gray for independents; use green only when gray already has another semantic
  role.
- Emphasize the focal series with greater opacity, linewidth, or point size.
- For multiple methods, combine color with shape or linetype so the comparison
  does not depend on color alone. See Wilke's Chapters 19 and 20:
  <https://clauswilke.com/dataviz/color-pitfalls.html> and
  <https://clauswilke.com/dataviz/redundant-coding.html>.
- Avoid using more than three categorical series colors in a facet. If more
  groups must be shown, group them, separate them into facets, or add another
  aesthetic mapping instead of relying on color alone.

## Line graphs and time trends

- Follow Wilke's Chapter 13 on time series and other functions of an independent
  variable: <https://clauswilke.com/dataviz/time-series.html>.
- If the x-axis represents years, use `ggplot2::labs(x = NULL)`. Do not print
  "Year" when the meaning is obvious from context.
- Label lines directly when possible instead of requiring readers to consult a
  legend.

## Combined figures

- Use `patchwork` to combine figures.
- When combined figures share an aesthetic, give their scales identical limits,
  breaks, labels, names, palettes, and guide and theme settings. Collect
  matching guides with `patchwork::plot_layout(guides = "collect")`.
- Suppress redundant guides. Place a necessary shared legend compactly at the
  top, bottom, or right according to the available aspect ratio.

## Write and save

- Do not save a figure to a file by default. Save it only when requested.
- For publication figures, default to vector PDF. Prefer
  `grDevices::cairo_pdf` when text or Unicode rendering benefits from it.
- When saving, use the smallest default dimensions above that fit the content;
  begin with 5 inches wide by 3 inches tall.
- Keep figure filenames consistent within a project. If filenames require
  numbering, prefer zero-padded forms such as `01` and `02`.

## Other inspirations

This work provides useful background but is lower priority than the specific
instructions above:

- Work on graphical perception and information design by William S. Cleveland
  and Robert McGill, Edward Tufte, and Steven L. Franconeri.

## Repository-specific instructions

- Follow repository-specific instructions, such as `AGENTS.md`, when present.
