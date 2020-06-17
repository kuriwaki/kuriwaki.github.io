---
layout: default
title: "Screencasts for Programming Topics in Statistics and Econometrics"
permalink: /screencasts/
---


# Screencasts

The following screencasts were designed as _short_ guided introductions for particular statistical concepts. They are probably best used as links in problem sets that students can refer to at their own pace, before they set out to tackle harder, open-ended questions.

All code uses R conforms to the tidyverse style and often uses tidyverse syntax, and uses real dataset that can be loaded on any R environment quickly (e.g. through a package built-in dataset). It is geared towards advanced undergraduates or a masters class where students already have some familiarity with probability and inference.

_Contents_: [Package Setup](#package-setup), [lm](#ols), [LASSO](#lasso), [Fixed Effects](#fixed-effects), [Instrumental Variables](#instrumental-variables), [Regression Discontinuity](#regression-discontinuity), [Diff-in-Diff](#difference-in-differences), [Creating Functions](#defining-functions), [Maps in ggplot](#maps-in-ggplot)


## Package Setup

Installing vs. loading scripts, basic structure and sections of a script, function masking.

<div class="video-container">
    <iframe src="https://player.vimeo.com/video/399959368?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
</div>

## OLS

Running linear regression, formulas, options to the `lm` function:

1. Basic syntax of `lm`
2. Summary of lm objects (extracting stats from summary)
3. Different types of formula specifications (logs, squared terms, factors)
4. Coefficient plots using `ggplot2` (putting 1-3 together)

<div class="video-container">
    <iframe src="https://player.vimeo.com/video/366640411?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
    <iframe src="https://player.vimeo.com/video/366640702?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
</div>
<div class="video-container">
    <iframe src="https://player.vimeo.com/video/366640713?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
    <iframe src="https://player.vimeo.com/video/366640727?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
</div>

## LASSO

Using `cv.glmnet` to

1. Setup and pre-processing: testing and training data, formula with `"."`, model matrix creation.
2. Fitting and understanding cv.glmnet: penalty terms, cross validation, LASSO algorithm, picking a penalty.
3. Making predictions with `predict` with the testing dataset, generic functions.

<div class="video-container">
    <iframe src="https://player.vimeo.com/video/371322839?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
    <iframe src="https://player.vimeo.com/video/371322878?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
    <iframe src="https://player.vimeo.com/video/371322903?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
</div>

## Fixed Effects

Fixed effects syntax with `lfe::felm`, adjusting for clustered errors.

<div class="video-container">
    <iframe src="https://player.vimeo.com/video/388825261?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
    <iframe src="https://player.vimeo.com/video/388825307?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
</div>



## Instrumental Variables

Instrumental variables as an omitted variable problem, using both `AER::ivreg` and `lfe::felm` packages. Uses the proximity to college dataset by Card (1994).

<div class="video-container">
    <iframe src="https://player.vimeo.com/video/406629459?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
</div>


## Regression Discontinuity

Visualizing regression discontinuity, estimating coefficients with interactions, polynomials, and local linear regression.

1. Visualizing RD
2. Estimating RD coefficients

<div class="video-container">
    <iframe src="https://player.vimeo.com/video/400826628?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
    <iframe src="https://player.vimeo.com/video/400826660?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
</div>

## Difference-In-Differences

Time series data, long form, plotting time trends, interactions, 2 by 2 difference-in-differences, DID with fixed effects.

1. Creating and understanding variables for DID
2. Implementing DID in a two-way FE regression

Thanks to Oscar Torres-Reyna for the data (http://princeton.edu/~otorres/DID101R.pdf).

<div class="video-container">
    <iframe src="https://player.vimeo.com/video/409267138?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
    <iframe src="https://player.vimeo.com/video/409267190?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
</div>



## Defining Functions

Arguments, body, and return statement. Also see the [rstudio.cloud/learn/primers/6.1](function basics tutorial) for background.

<div class="video-container">
    <iframe src="https://player.vimeo.com/video/388825332?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
</div>


## Maps in ggplot

Choropleth maps using `sf` objects in `ggplot2`, merging in other variables into sf dataframes.

<div class="video-container">
    <iframe src="https://player.vimeo.com/video/394800836?byline=0&byline=0&portrait=0" height="270" width="320" frameborder="0">
    </iframe>
</div>
