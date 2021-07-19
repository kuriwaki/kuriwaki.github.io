---
layout: posts
title: "Racially Polarized Voting"
permalink: "/rpv-mrp/"
---

<a href="/">Home</a>


## Estimating Racially Polarized Voting through Surveys

**By Shiro Kuriwaki**

Here I present preliminary survey-based estimates of Racial Polarized Voting (RPV) by Congressional District. It is part of other ongoing work by Kuriwaki, Stephen Ansolabehere, and Angelo Dagonel.

Racial Polarized Voting is defined here as the level of support for one party (here Donald Trump vs. Hilary Clinton in 2016) _among_ one racial group compared to the support for the same party among another racial group. It is the basis for much of racial redistricting litigation, flowing from the interpretation of Section 2 of the Voting Rights Act in _Thornburg v. Gingles_ (1986) and _Alabama Legislative Black Caucus v. Alabama_ (2015).

It is a relatively simple quantity but measurement is challenging. Election results only provide aggregate vote choice and Census demographics provide only aggregate racial breakdowns. Voterfiles do not measure who a voter voted for. The approach uses survey data, which does not suffer from ecological inference problems but could be unrepresentative and too noisy. To overcome the problems inherent in surveys, I use statistical methods called multilevel regression and post-stratification (MRP).

***Racially Polarized Voting (2016 Presidential)***

The following main figure compares the estimated Trump vote among Whites in the 2016 electorate, and substracts off the Trump vote among Non-Whites.  

<iframe src="../programming/rpv_g2016.html" title="Racially Polarized Voting (2016 Presidential)" scrolling="no" seamless="seamless" width="100%" style="height: 40vh;" frameBorder="0"></iframe>

The three congressional districts (CD) with the **lowest** estimated RPV between Whites and Non-Whites are _HI-01_ (Honolulu), _CA-12_ (San Francisco), and _CA-34_ (Downtown Los Angeles). The three CDs with the **highest** estimated RPV are all in Mississippi: _MS-02_ (Mississippi Delta and Jackson), _MS-03_ (Southwestern and eastern Mississippi), and _MS-01_ (Northeastern Mississippi). Hover over each CD to see the exact numbers.

Below I show the Trump vote estimates that comprise this difference.

**Estimated Trump Vote among White Voters, by CD**

<iframe src="../programming/rpv_g2016_white.html" title="Estimated Trump Vote among Whites, by CD" scrolling="no" seamless="seamless" width="80%" style="height: 25vh;" frameBorder="0"></iframe>


***Estimated Trump Vote among Hispanic Voters, by CD***

<iframe src="../programming/rpv_g2016_hisp.html" scrolling="no" seamless="seamless" width="80%" style="height: 25vh;" frameBorder="0"></iframe>


***Estimated Trump Vote among Black Voters, by CD***

<iframe src="../programming/rpv_g2016_black.html" scrolling="no" seamless="seamless" width="80%" style="height: 25vh;" frameBorder="0"></iframe>


### Methods and Source Code

All methods are implemented in the open-source packages:

* [ccesMRPprep](https://www.shirokuriwaki.com/ccesMRPprep/): For preparation of the survey and the post-stratification target 
* [ccesMRPrun](https://www.shirokuriwaki.com/ccesMRPrun/): For estimating the model, calibration, and post-stratification


### Survey Data

Validated voters from the 2016 CCES (n = 28,462).


### Modeling

Uses the multi-level logit model with the formula specification:

```
trump  ~ (1 + female | race:region) + educ + age + s(pct_trump, k = 3) + (1 | st/cd)
```

where

* `trump` is a binary variable indicating 1 if the respondent voted for Trump and 0 if they voted for Clinton,
* `(... | race:region)` indicates there are random effects by every race x region (Northeast, South, Midwest, West) combination,
* `(1 + female | ...)` indicates there are varying coefficients on sex for each of the race x region intercepts,
* `s(pct_trump, ...)` indicates a flexible spline on the CD-level Trump voteshare. This variable is only measured at the CD-level, not at the micro-level, so therefore is not part of the post-stratification.
* `(... | st/cd)` indicates that there is a varying intercept for each CD. Intercepts are nested. It is shorthand for `(1|st) + (1|st:cd)`,

The model was fit on the survey and 2,000 posterior draws were sampled.

### Poststratification

The target distribution is the electorate in each CD. We use various synthetic population estimators implemented in `ccesMRPrun` by Yamauchi to balance on  the **joint** distribution of

* Race group (`White`, `Black`, `Hispanic`, and everyone else as `Other`)
* Age group (`18-24`, `25-34`, `35-44`, `45-64`, `65+`)
* Sex (`female` or not)
* Education (`High School or Less`, `Some College (2 years)`, `4 Year BA`, `Post-graduate`)

according to the ACS. 

I then modeled the turnout population as a function of the CCES so that turnout numbers in each State add up to the actual turnout. 


Finally, for each CD in each of the 2000 draws, I calibrated all the cell's estimate by an intercept shift on the logit scale so that the sum of the shifted estimates adds up to the actual Trump vote in 2016, using the intercept correction strategy used by Yair Ghitza and co-authors. 

### Limitations


* The estimates are not weighted to (i.e. modeled or post-stratified by) party registration or past vote cells. My [dissertation](https://dash.harvard.edu/handle/1/37368520), chapter 4, shows that post-stratifying on party registration can improve the representatives of survey estimates. 
* The estimates are not weighted to race and age distributions of each _electorate_ at the congressional district level. It is weighted to the race, age, and education distributions of the general adult population for each CD before a turnout model is applied.
* The microdata that inform the synthetic population estimators are the CCES itself. Therefore, any unobsereved unrepresentativeness in the survey sample may simply be passed on to the post-stratification.


### Acknowledgements

This work was informed and received assistance from Stephen Ansolabehere, Douglas Rivers, Andrew Gelman, Yair Ghitza, Angelo Dagonel, Lauren Kennedy, Jonathan Robinson, and Soichiro Yamauchi. It is enabled by support from NSF grant [1926424](https://nsf.gov/awardsearch/showAward?AWD_ID=1926424). Any errors remain my own.