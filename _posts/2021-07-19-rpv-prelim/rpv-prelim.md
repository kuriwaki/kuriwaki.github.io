---
layout: posts
title: "Racially Polarized Voting"
permalink: "/rpv-mrp/"
---

<a href="/">Home</a>


## Estimating Racially Polarized Voting through Surveys

**By Shiro Kuriwaki**

Here I present preliminary survey-based estimates of Racial Polarized Voting by Congressional District. It is part of a paper with Stephen Ansolabehere, and Angelo Dagonel.

Racially Polarized Voting (RPV) is defined here as the difference in level of support for one party (here the Republican candidate in the 2016 Presidential Election) among one racial group and the same level for the same party but in _another_ racial group. 

RPV is an important condition to consider race in redistricting because of how the Supreme Court interpreted Section 2 of the Voting Rights Act (VRA) in _Thornburg v. Gingles_ (1986). The VRA protects the rights of a racial minority to elect a candidate of their choice. Therefore a RPV of 0 (both groups have equal support) suggests that the drawing majority-Black or majority minority districts is not justified. A RPV of 100% (Whites completely supports one party and non-Whites completely opposes) suggests a justification to draw districts so a sufficiently large minority can elect their preferred candidate in at least some of the seats.  _Alabama Legislative Black Caucus v. Alabama_ (2015) further called for RPV analysis to take a district-by-district approach.

RPV is a relatively simple quantity to define, but its measurement is challenging. Election results only provide aggregate vote choice and Census demographics provide only aggregate racial breakdowns. Voterfiles do not measure who a voter voted for. My approach uses survey data, which does not suffer from such ecological inference problems. Of course, surveys are known to be unreliable in their own ways: left unadjusted, they are unrepresentative and too sparse for small subgroups. To overcome the problems inherent in surveys, we use a set of statistical methods called multilevel regression and post-stratification (MRP).

***Racially Polarized Voting (2016 Presidential)***

The following main figure compares the estimated Trump vote (as a proportion of the two party vote) among Whites in the 2016 electorate, and subtracts off the Trump vote among Non-Whites. I use Daily Kos's congressional district shapefile (<http://dkel.ec/map>) which nicely represents CDs in similar population while retaining the shape and rough location of the CDs within a state.

<iframe src="../programming/rpv_g2016.html" title="Racially Polarized Voting (2016 Presidential)" scrolling="no" seamless="seamless" width="100%" style="height: 40vh;" frameBorder="0"></iframe>

Hover over each CD to see the exact numbers. The three congressional districts (CD) with the **lowest** estimated RPV between Whites and Non-Whites are about 2-4 percentage points, in _HI-01_ (Honolulu), _CA-12_ (San Francisco), and _CA-34_ (Downtown Los Angeles). The three CDs with the **highest** estimated RPV are all in Mississippi: _MS-02_ (Mississippi Delta and Jackson), _MS-03_ (Southwestern and eastern Mississippi), and _MS-01_ (Northeastern Mississippi), with up to 60 percentage points. The three districts with the **median** RPV are _GA-05_ (Downtown Atlanta), _IL-16_ (North Central Illinois), and _MI-08_ (Lansing and northwestern Detroit exurbs), with about 24 percentage points.

Interesting regional and urban-rural patterns emerge. The South has the highest RPV among Whites and Non-Whites, but parts of the Midwest have high RPV too. Within a state, some districts differ from their state mean:  GA-05 (Downtown Atlanta) has a much lower RPV compared to other Georgia districts because only 28% of White voters voted for Trump. 

Below we show the 2016 Trump vote estimates that comprise this difference. In all three maps, gradations of pink indicate Trump vote in the racial group to be more than 50-50, and gray gradations indicate a less than 50-50 Trump vote.  It shows how Black voters are do not differ in their party support across regions, but Hispanic voters do. 

_Estimated Trump Vote among **White** Voters, by CD_:

<iframe src="../programming/rpv_g2016_white.html" title="Estimated Trump Vote among Whites, by CD" scrolling="no" seamless="seamless" width="90%" style="height: 35vh;" frameBorder="0"></iframe>


_Estimated Trump Vote among **Hispanic** Voters, by CD_:

<iframe src="../programming/rpv_g2016_hisp.html" scrolling="no" seamless="seamless" width="90%" style="height: 35vh;" frameBorder="0"></iframe>


_Estimated Trump Vote among **Black** Voters, by CD_:

<iframe src="../programming/rpv_g2016_black.html" scrolling="no" seamless="seamless" width="90%" style="height: 35vh;" frameBorder="0"></iframe>



MRP estimates the variation around each estimate by the posterior distribution. The average width of the 80 percent credible interval is ±0.6 percentage points (pp) for Whites, ±1.8 pp for Blacks, and ±3.1 pp for Hispanics (across the 435 estimates). Roughly speaking, this would translate to a margin of error (MoE) of ±1 pp for Whites, ±2.8 pp for Blacks, and ±3.0 pp for Hispanics.  In other words, if the map estimates the Hispanic Trump vote in a particular congressional district was 45%, the true number might be as low as 42% and as high as 48%.

### Methods and Source Code

All methods are implemented in the open-source packages:

* [ccesMRPprep](https://www.shirokuriwaki.com/ccesMRPprep/): For preparation of the survey and the post-stratification target 
* [ccesMRPrun](https://www.shirokuriwaki.com/ccesMRPrun/): For estimating the model, calibration, and post-stratification


### Survey Data

The core piece of data underlying this estimates is a national survey. We use validated voters from the 2016 CCES (n = 28,462). Even though the CCES is one of the largest politically surveys, there are only about 50-75 voters in each of the Congressional Districts. Moreover, racially minorities in each of these districts are even smaller. Therefore, we need a model to borrow information from other districts.


### Modeling Strategy

We fit the following multi-level logit model on the CCES data, with the formula specification:

`trump  ~ (1 + female | race:region) + educ + age + s(pct_trump, k = 3) + (1 | st/cd)`

in the [package](https://paul-buerkner.github.io/brms/) `brms`, where

* `trump` is a binary variable indicating 1 if the respondent voted for Trump and 0 if they voted for Clinton,
* `(... | race:region)` indicates there are random effects by every race x region (Northeast, South, Midwest, West) combination,
* `(1 + female | ...)` indicates there are varying coefficients on sex for each of the race x region intercepts,
* `s(pct_trump, ...)` indicates a flexible spline on the CD-level Trump voteshare. This variable is only measured at the CD-level, not at the micro-level, so therefore is not part of the post-stratification, and
* `(... | st/cd)` indicates that there is a varying intercept for each CD. Intercepts are nested within states (`st`). It is shorthand for `(1|st) + (1|st:cd)`.


### Poststratification

I take 2,000 draws from the estimated posterior distribution of the model, and then reweight the cell estimates to be more representative of each congressional district (CD).

The target distribution is the electorate in each CD. We use various synthetic population estimators implemented in `ccesMRPrun` to balance on  the **joint** distribution of

* Race group (`White`, `Black`, `Hispanic`, and everyone else as `Other`),
* Age group (`18-24`, `25-34`, `35-44`, `45-64`, `65+`),
* Sex (`female` or not), and 
* Education (`High School or Less`, `Some College (2 years)`, `4 Year BA`, `Post-graduate`),

according to the ACS. The [age by sex by education by CD] distribution uses  2016 1-year ACS estimates. The [race by CD] distribution uses the 2015-2018 __5__-year ACS estimates, because the 2016 1-year ACS estimates estimated 0 people of racial minorities in some congressional districts (e.g. Black voting age people in Wyoming). We combined the two tables into a four-way table through the balancing multinomial logit `bmlogit` implemented by Yamauchi (for details, see [here](https://www.shirokuriwaki.com/ccesMRPprep/reference/synth_bmlogit.html)). 

We then modeled the turnout population as a function of these demographics and updated distribution to resemble the electorate.  Specifically, we fit the regression `turnout ~ race * age + female + educ` in the full CCES data for each state or group of small states, where `turnout` is an indicator for validated vote.  we then imputed the conditional distribution of `Pr(turnout | race, age, female, educ, state)` onto the ACS of Voting Age Population while ensuring that `Pr(turnout | state)` matched the actual VAP turnout of a state. 

Finally, for each CD in each of the 2,000 iterations, we calibrated all the cell's estimate by an intercept shift on the log odds scale so that the sum of the shifted estimates adds up to the actual Trump vote in 2016, using the intercept correction strategy used by Yair Ghitza and Andrew Gelman (e.g. [2013](http://www.stat.columbia.edu/~gelman/research/published/misterp.pdf), [2020](http://www.stat.columbia.edu/~gelman/research/published/pan2000003_REV2.pdf)). 



### Limitations

The results should be considered preliminary as more model checking is conducted. It may be possible to address other limitations or insufficient control in this model:

1. The estimates are not weighted to (i.e. modeled or post-stratified by) party registration or past vote cells. My [dissertation](https://dash.harvard.edu/handle/1/37368520), chapter 4, shows that post-stratifying on party registration can improve the representatives of survey estimates. 
2. The estimates are not weighted to race and age distributions of each _electorate_ at the congressional district level. It _is_ weighted to the race, age, and education distributions of the general adult population for each CD before the turnout model is applied.
3. The model that specifies turnout probabilities may be underspecified.
4. The calibration to election outcomes assumes a uniform shift. For example, suppose we only controlled for race and a district has three racial groups. The algorithm will find a correction _d_ that is the same for all three racial groups. In other words, it assumes away the possibility that, e.g. the Trump vote is underestimated for Whites but overestimated for Blacks.
5. The microdata that inform the synthetic population estimators are the CCES itself. Therefore, any unobsereved unrepresentativeness in the survey sample may simply be passed on to the post-stratification.


Unfortunately, the party registration breakdown or the race breakdown among the electorate is not available uniformly in all 50 states, and depends on each state's voterfile. States that have race on the voter file are mostly in the South (see aforementioned dissertation chapter). A method that tries to use race or party registration from the voterfile to post-stratify must have a reliable way to impute across these states. 


### Acknowledgements

This work is part of a paper with Stephen Ansolabehere and Angelo Dagonel. The analysis was informed by, and received assistance from Andrew Gelman, Yair Ghitza,  Lauren Kennedy,  Douglas Rivers, Jonathan Robinson, and Soichiro Yamauchi. It is enabled by support from NSF grant [1926424](https://nsf.gov/awardsearch/showAward?AWD_ID=1926424). Any errors remain my own.