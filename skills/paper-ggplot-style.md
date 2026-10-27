# Shiro Kuriwaki's instructions to LLMs for visualizations

_Version 0.2 — 2026-10-27_

When creating a visualization, especially with R and ggplot2, start with 
these principles, aesthetic preferences, and settings as strong defaults. 
Deviate from them only with the user's explicit request or permission.

## General principles

- Follow the relevant chapters of Claus O. Wilke's recommendations in 
  _Fundamentals of Data Visualization_ (O'Reilly). See the online 
  manuscript at <https://clauswilke.com/dataviz/> and the source code at
  <https://github.com/clauswilke/dataviz>.
- Follow the tidyverse style guide at <https://style.tidyverse.org/> and prefer 
  tidyverse data-formatting functions.
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
  <details markdown="block" style="margin-top: -10px; margin-bottom: 10px;">
  <summary>Wilke, Chapter 24 — Use larger axis labels</summary>

  - **Source:** [Use larger axis labels](https://clauswilke.com/dataviz/small-axis-labels.html)

  **Summary:** Axis titles, tick labels, legend text, and other annotations
  often need larger type than plotting software supplies by default. Readers
  should be able to read them without zooming.

  Readability alone is insufficient: text must be proportionate to the plotting
  area and graphical elements. A modest increase may leave labels undersized.
  Conversely, enlarging text while leaving points small creates an imbalance.
  Adjust text, plotted symbols, and legend symbols together so the composition
  remains balanced.

  Choose sizes for intended reproduction dimensions. Large labels can be
  appropriate for a graphic that will be reduced substantially. At widths of
  only one or two inches, both labels and symbols may need substantial
  enlargement beforehand. A design that looks oversized when enlarged may be
  the only one that remains effective after reduction.

  Always evaluate the complete graphic at a realistic final size. Confirm that
  annotations remain legible and that text and data marks retain suitable
  proportions.

  </details>

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
  <details markdown="block" style="margin-top: -10px; margin-bottom: 10px;">
  <summary>Wilke, Chapter 22 — Titles, captions, and tables</summary>

  - **Source:** [Titles, captions, and tables](https://clauswilke.com/dataviz/figure-titles-captions.html)

  **Summary:** Visualizations should communicate information and make a clear
  point. Provide the titles, captions, labels, and annotations needed to establish
  context and make the displayed data unambiguous.

  Every figure needs one title that accurately identifies its subject or
  communicates its main point. A title may be a concise phrase or a short sentence
  making a clear assertion; it does not have to be a complete sentence. Begin a
  caption with a proper title rather than a narrative introduction such as “This
  figure shows.”

  Choose title placement according to the publication format. In conventional
  books and articles with captions below figures, place the title at the
  beginning of the caption block and omit an integrated title above the graphical
  display. Do not give the same figure separate titles in both locations. For
  standalone infographics, social media graphics, or web graphics without
  accompanying captions, integrate the title, any useful subtitle, and data
  source information into the display so it can be understood independently.

  Axis and legend titles should identify the variables represented and explain
  their mapping to position, color, size, or other graphical attributes. Include
  measurement units for quantitative variables wherever applicable, including
  quantitative variables represented through legends. Categorical variables do
  not require units. Use accompanying caption text to explain measurement
  definitions, distinctions between related quantities, data transformations,
  and provenance when these are necessary for interpretation.

  Omit an axis or legend title only when the remaining labels explain its meaning
  completely. Familiar country names, movie titles, company names, category
  labels, and recognizable calendar years may make a corresponding title
  redundant. A legend whose entries already identify the categories does not also
  need a title that merely restates their shared category. Avoid adding units or
  headings that provide no useful information, such as specifying calendar-era
  units for ordinary recent years.

  Be conservative when deciding that context makes a title unnecessary. A plot
  title, subtitle, or caption may identify the general subject without
  establishing precisely what an axis measures. Retain the axis title whenever
  removing it would require readers to infer the quantity represented. In
  particular, distinguish indexed or normalized values from original
  measurements and explain the normalization baseline where needed. Readers
  should not have to guess how values correspond to the displayed variables.

  Entire axes, including their ticks and tick labels, may be omitted when the
  visualization remains clear and its purpose emphasizes qualitative
  relationships. Some chart types, including pie charts and treemaps,
  conventionally have no axes. Bar charts and mosaic plots can sometimes
  omit one or both axes when their meaning is otherwise clear. Recognize that
  removing axes reduces the emphasis on exact values.

  Treat tables as deliberately designed data displays. Do not assume that
  software defaults or predefined table styles provide appropriate formatting.
  Use the following layout rules:

  - Omit vertical lines.
  - Omit horizontal lines between data rows. Horizontal lines separating the
    header from the body, or marking the table’s upper and lower boundaries, are
    acceptable.
  - Align text columns to the left.
  - Align numerical columns to the right and use a consistent number of decimal
    places throughout each numerical column.
  - Center columns containing single characters.
  - Align each column heading consistently with the data beneath it.

  Use restrained formatting to establish structure. Dense grids and unnecessary
  row separators add visual clutter and can make tables harder to read. Most
  tables do not need a line separating every pair of rows. Very wide, sparse
  tables may need additional guidance to help readers track rows; subtle
  alternating row shading can provide this without introducing a full grid.
  Keep differences between adjacent row backgrounds modest. Strongly contrasting
  dark and light stripes create visual noise. Distinguish the header clearly
  from the body. A stronger header color can work with restrained body shading.

  Place figure captions below their graphical displays and table captions above
  their tables. Ensure the table caption establishes the context needed to
  interpret the entries before readers encounter the table body.

  </details>

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

  ```r
  party_colors <- c(
    Democrat   = "#0063B1",
    Republican = "#A0442C"
  )
  ```

- Emphasize the focal series with greater opacity, linewidth, or point size.
- For multiple methods, combine color with shape or linetype so the comparison
  does not depend on color alone. See Wilke's Chapters 19 and 20:
  <https://clauswilke.com/dataviz/color-pitfalls.html> and
  <https://clauswilke.com/dataviz/redundant-coding.html>.
  <details markdown="block" style="margin-top: -10px; margin-bottom: 10px;">
  <summary>Wilke, Chapters 19 and 20 — Common pitfalls of color use and redundant coding</summary>

  - **Sources:** [Common pitfalls of color use](https://clauswilke.com/dataviz/color-pitfalls.html) and [Redundant coding](https://clauswilke.com/dataviz/redundant-coding.html)

  **Summary:** Use color to communicate meaningful distinctions, clarify
  patterns, or guide attention. Every color assignment should serve an
  identifiable purpose. Avoid decorative coloring that adds no information or
  makes the data harder to inspect.

  Limit the number of categories distinguished primarily by color. Qualitative
  color scales generally work best with three to five categories. At
  approximately eight to ten categories or more, matching colors between
  plotted marks and a legend often becomes too burdensome, even when the
  colors are technically distinguishable. Color alone can also fail with only
  two or three categories when their marks overlap, are small, or have similar
  colors.

  When many individual items need identification, use color for a smaller
  number of meaningful groups and identify individual items through direct
  labels. Label a representative or substantively important subset when
  labeling every observation would overcrowd the display. Provide the complete
  underlying data separately as a table when readers need access to every
  item. Do not force a large collection of unique colors to perform the work
  of individual identification.

  Avoid large filled areas of intensely saturated color. Strong saturation can
  draw attention away from nearby text, obscure reference lines, and make
  comparisons harder. A visually striking color arrangement does not justify
  coloring individual bars or other marks differently when those differences
  convey no additional information.

  For sequential scales representing quantitative values, ensure that the
  colors clearly communicate ordering and that differences in appearance
  correspond appropriately to differences in values. Prefer a coherent
  progression in lightness. Avoid rainbow scales for ordered quantitative
  data: their lightness changes unevenly and reverses direction, while their
  endpoints can have similar hues despite representing widely separated
  values. These properties can conceal variation, create apparent boundaries,
  or emphasize arbitrary ranges of values. Grayscale inspection can reveal
  these uneven or non-monotonic lightness patterns.

  Account for different forms of color-vision deficiency. A contrast that is
  obvious under one form of vision may become difficult or impossible to
  distinguish under another. Red–green contrasts can fail under deuteranomaly
  or protanomaly, while blue–green contrasts can fail under tritanomaly. Do
  not assume that checking one form of color-vision deficiency establishes
  accessibility for the others, or that a palette’s appearance under typical
  color vision predicts its performance under simulated deficiencies.

  Consider accessibility separately for sequential, diverging, and qualitative
  scales. A well-designed sequential scale can remain interpretable when its
  hues change under color-vision deficiency because its dark-to-light ordering
  remains apparent. Diverging scales must preserve the distinction between
  their opposing sides. Literal red–green or blue–green contrasts can lose
  that distinction, but adjusting the hues can retain the intended character
  while improving separability. A pink-to-yellow-green palette such as
  ColorBrewer PiYG illustrates how modified hues can preserve contrasting
  sides across common color-vision-deficiency simulations.

  Qualitative palettes require multiple colors that remain distinguishable
  from one another. The eight-color Okabe–Ito palette is an available option
  designed for color-vision accessibility:

  | Color | Hex value |
  |---|---|
  | Orange | `#E69F00` |
  | Sky blue | `#56B4E9` |
  | Bluish green | `#009E73` |
  | Yellow | `#F0E442` |
  | Blue | `#0072B2` |
  | Vermilion | `#D55E00` |
  | Reddish purple | `#CC79A7` |
  | Black | `#000000` |

  A colorblind-friendly palette does not by itself make a visualization
  accessible. Color discrimination also depends on the size and thickness of
  the graphical elements. Colors that are easy to distinguish in large areas
  can become difficult to distinguish in small points, thin lines, or text,
  especially under color-vision deficiency. Evaluate the actual graphical
  elements rather than judging the palette only from large samples. Test the
  complete visualization under multiple color-vision-deficiency simulations
  and inspect a grayscale version.

  Use redundant coding so that essential information does not depend entirely
  on hue. Encode important distinctions through multiple coordinated visual
  properties, such as color combined with point shape, spatial ordering, or
  directly associated text. These additional cues should reinforce the same
  interpretation and preserve identification when colors become difficult to
  distinguish.

  For grouped scatter plots, use distinct point shapes alongside color when
  necessary to distinguish categories. Pay particular attention to groups
  whose observations intermingle. Assign more readily distinguishable colors
  to overlapping groups. Colors that are relatively similar may be less
  problematic for groups that are spatially separated.

  Select redundant encodings according to the type of mark. Different shapes
  work naturally for points, whereas different line types may be less
  effective. Dashed and dotted lines are generally more suitable for straight
  or gently curved paths than for highly irregular ones, and they can still
  introduce visual noise. Complex dash patterns can also be difficult to match
  between a curve and its legend key. Do not assume that changing line type
  automatically produces a clearer visualization.

  When a legend is necessary, order its entries to match the visual
  ordering in the data. For vertically ordered curves, arrange the legend in
  the corresponding top-to-bottom order. Set this ordering deliberately, since
  plotting software generally cannot infer the ordering perceived in the
  display. Matching spatial order provides an additional identification cue
  and can help even when different colors appear similar under color-vision
  deficiency or collapse to nearly identical gray values.

  When the same variable controls several aesthetics, provide one combined
  legend that communicates those mappings together. Avoid separate legends
  that independently explain the color and shape of the same categories. If a
  quantitative variable is represented both by position along an axis and by
  color, integrate the reference color bar along that same axis so a single
  visual guide explains both representations.

  Prefer direct labeling when it makes the visualization easier to interpret.
  A separate legend requires readers to transfer information between the key
  and the data; labels placed beside their corresponding marks reduce this
  lookup. For line plots, place series names beside appropriate line
  endpoints. For density plots, label the curves directly.

  For scatter plots containing many observations, directly label groups.
  Labeled ellipses enclosing most observations in each group are one possible
  approach. Keep the resulting display uncluttered, as additional group
  boundaries and labels may make background grids unnecessary or distracting.
  Another approach is to place group-specific density estimates in the margins
  and label those distributions, allowing them to provide both distributional
  information and a replacement for the categorical legend while leaving the
  central scatter plot less crowded.

  Colored direct labels can strengthen the association between text and data,
  but their readability requires attention. Text consists of thin strokes and
  can appear lighter than a nearby filled area using the same color. Use
  sufficiently dark text. A useful approach is to use a lighter shade for
  filled points or areas and a darker shade of the same hue for outlines,
  curves, and associated labels. Coordinate these shades so the group identity
  remains consistent without sacrificing the contrast needed to read text and
  trace graphical boundaries.

  </details>

- Avoid using more than three categorical series colors in a facet. If more
  groups must be shown, group them, separate them into facets, or add another
  aesthetic mapping instead of relying on color alone.

## Line graphs and time trends

- Follow Wilke's Chapter 13 on time series and other functions of an independent
  variable: <https://clauswilke.com/dataviz/time-series.html>.
  <details markdown="block" style="margin-top: -10px; margin-bottom: 10px;">
  <summary>Wilke, Chapter 13 — Visualizing time series and other functions of an independent variable</summary>

  - **Source:** [Visualizing time series and other functions of an independent variable](https://clauswilke.com/dataviz/time-series.html)

  **Summary:** Use line graphs when the observations have a meaningful order
  imposed by time or another quantitative variable. Place the ordering
  variable along the horizontal axis and connect neighboring observations in
  that order. Line graphs are appropriate for time series, experimental
  dose–response relationships, and other settings where successive values of
  an independent variable define meaningful neighbors.

  Distinguish observed values from the lines connecting them. Points represent
  observations, while connecting segments can serve as visual guides that
  emphasize sequence and help readers follow the data. Intermediate positions
  along those segments are not necessarily observed values or justified
  predictions. This distinction matters particularly when observations are
  sparse or unevenly spaced. Where necessary, explain in the caption that
  connecting lines are only guides to the eye.

  Choose whether to show individual points according to the purpose and
  density of the display. Points emphasize the individual observations and
  their locations along the ordering variable. Lines emphasize continuity and
  the overall pattern. Combining points and lines can communicate both. For
  densely sampled series, omit point markers when they add clutter without
  providing useful information. A line alone can make the overall temporal
  trend easier to inspect.

  A filled area beneath a time-series curve can place additional emphasis on
  the overarching trend by visually separating the region below the curve from
  the region above it. For this encoding, begin the vertical axis at zero so
  that the height of the filled region accurately represents the value at each
  time point.

  When displaying multiple series, connect observations separately within each
  series so readers can follow their trajectories. A collection of unconnected
  points can become difficult to interpret when different series overlap or
  intermingle. Connecting each series’ neighboring observations makes its
  progression more apparent.

  Prefer direct labels beside the corresponding lines when they can replace a
  separate legend. This reduces the need to repeatedly match graphical
  elements to legend entries. Once the lines are directly identified, point
  shapes that existed mainly to support legend matching may become
  unnecessary. Remove such markers when doing so simplifies the display
  without losing information about the observations or series identities.

  Apply the same principles to ordered experimental conditions. In a
  dose–response display, connect responses in increasing order of dose or
  treatment intensity. This can reveal both the shape of the response and
  differences between groups. Compare baseline levels separately from changes
  across the experimental range: groups can have similar response patterns
  while differing substantially in their initial values.

  When several response variables vary over time, separate line graphs provide
  a straightforward way to show each variable’s temporal development. Stack
  and align the plots along a common time axis so corresponding periods can be
  compared. Each response can retain its own vertical axis and measurement
  units. However, assessing whether variables move together or in opposite
  directions requires comparing their trajectories across panels, which can
  make joint patterns harder to identify.

  Use a connected scatter plot when the primary question concerns the joint
  evolution of two response variables. Place one response on each axis and
  connect paired observations in chronological order. The resulting path
  traces movement through the space defined by the two variables. This
  representation is also known as a phase portrait.

  Interpret the orientation of connected segments as joint movement. Segments
  oriented along a rising diagonal represent changes in the same direction:
  both variables increase together or decrease together. Segments oriented
  along a falling diagonal represent opposite-direction changes. Loops and
  spirals can reveal cyclical relationships or repeated trajectories that are
  less apparent when the variables are shown in separate time-series panels.

  Indicate both temporal direction and temporal scale in a connected scatter
  plot. Use arrows or a ordered progression in color or lightness to
  show the direction of travel. Add date labels or other temporal markers
  along the path to establish when particular states occurred and how much
  time elapsed between them. A path without these cues can obscure its
  chronological order and the pace of change, even when the underlying
  geometric pattern remains visible.

  Choose between separate line graphs and connected scatter plots according to
  the analytical task and the intended audience. Separate line graphs are
  generally easier to read and show each variable’s relationship with time.
  Connected scatter plots can make irregular cycles and joint trajectories
  more apparent and may encourage greater engagement, but readers can more
  easily confuse their order and direction or fail to recognize associations.
  Use them when their ability to reveal joint structure justifies the
  additional interpretation required, and provide temporal guidance.

  Extend connected scatter plots to higher-dimensional time series by first
  applying dimensionality reduction, such as principal components analysis.
  Represent each time point by its scores on a selected pair of components,
  then connect successive time points chronologically. This produces a
  trajectory summarizing the joint movement of many measured variables.

  Inspect more than one pair of components when different projections may
  reveal complementary patterns. A component associated with overall system
  size or long-term growth can produce a trajectory that progresses
  approximately from left to right and resembles a conventional time-series
  plot. Other component pairs may reveal loops or spirals associated with
  recurring phases that are less visible in the growth-dominated projection.

  Use meaningful phase classifications and selected date annotations to
  interpret trajectories in the reduced space. Coloring periods by substantive
  states, such as contraction and recovery, can show which movements accompany
  each phase. Different phases may correspond to changes in different
  components, so a pattern absent from one projection may become apparent in
  another. Preserve temporal ordering and sufficient chronological annotation
  throughout these displays.

  </details>

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
