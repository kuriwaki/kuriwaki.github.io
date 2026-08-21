# Paper ggplot style

When creating a graph, especially with R and ggplot2, use these visualization
principles, aesthetic preferences, and settings. Treat them as defaults, and
relax them when the figure's purpose, data, or audience warrants an exception.

## General principles

1. Follow Claus O. Wilke's recommendations in _Fundamentals of Data
   Visualization_ (O'Reilly). See the online manuscript at
   <https://clauswilke.com/dataviz/> and the source code at
   <https://github.com/clauswilke/dataviz>.
2. When choosing visual encodings, draw on established work in graphical
   perception and information design by William S. Cleveland and Robert McGill,
   Edward Tufte, and Steven L. Franconeri.
3. Be internally consistent across figures in a paper or project. Do not use
   different palettes for the same variables or reuse one palette for different
   variables.
4. Follow repository-specific instructions, such as `AGENTS.md`, when present.
   Otherwise, follow tidyverse coding style.

## Figure size, titles, and captions

- Prefer a compact, landscape layout that leaves room for legible text. As a
  starting point, size figures with one or two facets at 5 inches wide by
  3 inches tall, and figures with three or more facets at about 7 inches wide by
  3 inches tall. Adjust these dimensions when the content requires it. Follow
  Wilke's Chapter 24, "Use Larger Axis Labels":
  <https://clauswilke.com/dataviz/small-axis-labels.html>.
- Keep the plotting area dense but readable.
- Design for the figure's final displayed width, not merely for a zoomed
  standalone PDF.
- Avoid using the ggplot title or subtitle unless necessary. Titles can be
  useful in exploratory figures for preserving context or provenance.
- For final figures embedded in papers, place the title and caption in the
  surrounding document, such as the LaTeX source, rather than inside the
  ggplot.
- Wrap long categorical labels deliberately, for example with
  `stringr::str_wrap()`. Prefer meaningful endpoint labels and a shared
  direction cue when every intermediate x-axis label would be redundant.
- If a long y-axis title would be difficult to read vertically, omit it and use
  a short, left-aligned plot title instead. This exception is especially useful
  for time-series figures.

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

- Show 95 percent uncertainty intervals when a figure presents estimates. Use
  points with thin, uncapped intervals, typically by combining
  `ggplot2::geom_point()` with `ggplot2::geom_linerange()`. If using
  `ggplot2::geom_errorbar()`, omit end caps with `width = 0`.

## Labels and units

- Be explicit about units. Clearly distinguish percentages, percentage points,
  and proportions. Use `scales::label_percent()` for proportions displayed as
  percentages. For differences stored as proportions but displayed in
  percentage points, use `scales::label_number(scale = 100, suffix = " pp")`.
  If values are already stored in percentage points, use the suffix without
  rescaling.
- Do not multiply underlying values by 100 solely for display; leave display
  conversion to a `scales` label function.
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
  Reuse the same named palette for the same concepts within a project.
- For choropleth maps of continuous quantities, prefer a binned scale such as
  `ggplot2::scale_fill_fermenter()` with a ColorBrewer palette over an unbroken
  continuous gradient. If values are already categorical, use
  `ggplot2::scale_fill_brewer()` or an appropriate manual discrete scale.
- For U.S. political parties, use Democratic blue (`#2166AC`), Republican red
  (`#B2182B`), and neutral gray for independents. Use green for independents
  only when gray already has another semantic role.
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

## Patchwork

- Use `patchwork` to combine figures.
- When combined figures share an aesthetic, give their scales identical limits,
  breaks, labels, names, palettes, and guide and theme settings. Collect
  matching guides with `patchwork::plot_layout(guides = "collect")`.
- Suppress redundant guides. Place a necessary shared legend compactly at the
  top, bottom, or right according to the available aspect ratio.

## Write and save

- Do not save a figure by default. Save it only when requested.
- For publication figures, default to vector PDF. Prefer
  `grDevices::cairo_pdf` when text or Unicode rendering benefits from it.
- When saving, use the smallest default dimensions above that fit the content;
  begin with 5 inches wide by 3 inches tall.
- Keep figure filenames consistent within a project. If filenames require
  numbering, prefer zero-padded forms such as `01` and `02`.
