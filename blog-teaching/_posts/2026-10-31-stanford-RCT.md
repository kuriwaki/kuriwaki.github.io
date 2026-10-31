---
title: >-
  The causal effect of small, mandatory, in-person drill sections: An experiment in Stanford's Stats 117 (Introduction to Probability)
author: shiro
summary: Duchi, Hartog, and Sun's randomized experiment on the effects of small-group tutorials.
---

I recently came across an eye-opening pedagogy [study](https://arxiv.org/abs/2610.39538v1) that
[Dennis Sun](https://statistics.stanford.edu/people/dennis-sun),
[John Duchi](https://stanford.edu/~jduchi/index.html), and
[Will Hartog](https://statistics.stanford.edu/people/will-hartog) conducted in spring 2026
in Stanford's statistics department class, "Introduction to Probability."
The class of 80 students was randomized into two groups:

* _Both groups:_ The same lectures, weekly homework assignments, and in-person
  midterm and final exams.
* _Control group_ (n = 42):** A standard, optional weekly section led by a teaching
  assistant, with homework graded as usual.
* _Treatment group_ (Oxbridge-style tutorials, n = 38): Mandatory weekly
  50-minute tutorials in groups of four, each led by a teaching assistant or the
  professor. Students solved new problems similar to the homework at the board,
  without notes, while their peers stayed off devices and followed along. They
  were graded on effort and engagement rather than mastery, and these tutorial
  grades replaced their homework grades.

So, these tutorials add an element of discomfort and challenge to the standard
section. They are also mandatory -- many statistics class's sections I've seen 
are optional. (Although worth noting that in our substantive political science 
classes with discussion section, attendance to those is mandatory.)

Students in the treatment group scored **15 percentage points** higher on the
midterm (where the control mean was 58%) and  **11 percentage points** higher on the final
exam (where the control mean was 50%). The t-statistics were about 3, so these were clearly
distinguishable from sampling noise.

Small sections are resource-intensive, but they might be feasible in a STEM class if 
they replace office hours for teaching fellows (TFs). For example, at Yale, 
a TF's contract is up to 
20 hours a week. In a statistics class, say three hours are spent attending
lectures, five preparing, and five grading exams. Then a TF may
still have time in their budget to lead seven of these small-group tutorials. 
They can replace office hours, as the authors of the paper suggest. (Maybe more on
this in a future post.)

Here is their full paper:

* John C. Duchi, Will Hartog, and Dennis L. Sun. 2026. "What’s Old Is New: Improved Learning from Small-Group Tutorials."" arXiv preprint, [arXiv:2610.39538v1](https://arxiv.org/abs/2610.39538v1).
* The paper is short, but there are also [slides](https://stanford.edu/~jduchi/projects/DuchiHaSu26-slides.pdf).

And some technical notes:

* The study was approved by the Stanford IRB.
* Dennis tells me that few students asked to switch groups after assignment.
* Randomization was blocked by pre-test score, and the regression adjusted for
  these blocks. The paper also reports a randomization inference test.
* The intervention changed several things at once, so the study does not isolate
  the effects of mandatory attendance, small groups, or oral problem-solving.
* I wonder what the standard deviation of scores was in the control group.

Thanks to Dennis for letting me post about the paper, and to Teddy Svoronos and Josh Goodman for
convening the chat that led me to this study.
