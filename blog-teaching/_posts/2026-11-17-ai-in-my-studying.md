---
title: "What AI Can Teach Me (about econ/econometrics), and What Class Still Offers?"
author: tina
summary: How I used AI to study for my own economics and econometrics midterms, and what that suggests about the role of lecture.
galleries:
  pset_help:
    - src: /blog-teaching/images/ai-study-pset-problem.png
      alt: "Problem set question titled AI, Automation, and the Production Function, asking for the marginal products of labor and capital and whether the production function has constant returns to scale"
      caption: The problem set question
      width: 1180
      height: 1088
    - src: /blog-teaching/images/ai-study-chat-help-with.png
      alt: "Chat where I upload the problem with the prompt help me with, and the AI breaks it into three steps and starts deriving the marginal product of labor"
      caption: "“help me with: [attachment]”"
      width: 1466
      height: 1098
    - src: /blog-teaching/images/ai-study-chat-power-rule.png
      alt: "Chat where I ask why did the L get a n-1, and the AI explains the power rule for derivatives"
      caption: "“why did the L get a n-1”"
      width: 1466
      height: 1098
    - src: /blog-teaching/images/ai-study-chat-ppp-summary.png
      alt: "Chat where I ask the AI to summarize the steps in a purchasing power parity problem, and it answers with a table of each step, what to do, the output, and what it tells you"
      caption: "“summarize the differents steps and outputs in the problem i gave”"
      width: 1194
      height: 836
    - src: /blog-teaching/images/ai-study-chat-delta-k.png
      alt: "Chat where I ask how delta k is different from capital accumulation, and the AI explains the difference between uppercase delta (change in capital per worker) and lowercase delta (depreciation)"
      caption: "“explain how delta k is different from capital accumulation”"
      width: 1186
      height: 654
  solow_graph:
    - src: /blog-teaching/images/ai-study-solow-slide.png
      alt: "Lecture slide with a bonus problem on a temporary negative shock to capital, showing time paths for capital, consumption, and output stacked on one graph, with capital on top"
      caption: The lecture slide
      width: 1440
      height: 1056
    - src: /blog-teaching/images/ai-study-chat-which-line.png
      alt: "Chat where I ask how to tell which line is which parameter, and the AI points to the labels: purple is capital, blue is consumption, yellow is output"
      caption: "“explain how i know which line is which parameter”"
      width: 1186
      height: 660
    - src: /blog-teaching/images/ai-study-chat-k-c-y.png
      alt: "Chat where I ask why k is higher than c than y, and the AI explains that the ordering is not meaningful because consumption must be below output and the lines are only separated to show each path"
      caption: "“my question is why k is hugher than c than y”"
      width: 1190
      height: 756
---

Shiro just taught probability fundamentals in last week’s class. He asked me to consider whether AI could supplement or replace the lecture, and to what extent. For example, Shiro’s lecture ended with him solving the following problem with the class:

> “What is the variance of a sample mean of *n* binary random variables? Derive this by using the previous facts that we have just seen [Var(X) = p\*(1 - p), variance of a sum of random variables depends on its covariances, etc.]”

Here, I am sharing my experiences taking Introduction to Econometrics and Intermediate Macroeconomics this semester, and the role AI is playing in my learning.

Admittedly, I don’t attend my econometrics lecture because it is recorded. On the other hand, my economics class is not recorded, so I attend regularly, just in case the professor emphasizes something that’ll show up on the exam, even though I feel like I absorb very little content while sitting in class.

With this context, I approached midterms for both classes. I was very proactive in showing up to lecture and section, as well as review sessions and office hours, for my economics class. And this paid off. My study method was doing all the psets three times over to internalize what I needed to do, and I used AI to help me understand why I needed to do it. While the class posted pset solution keys, they were not very elaborate, and the missing steps are what help me build intuition. So I took screenshots of the problem and solution, and asked AI to walk me through how to reach the solution.

{% include blog-teaching-carousel.html images=page.galleries.pset_help label="Screenshots of asking AI to walk me through problem set solutions" caption="My first prompt would be something like “Help me with: [attachment],” followed by more granular clarification questions such as “why did the L get a n - 1” or “my question is why k is hugher (sic) than c than y.”" %}

Sometimes I had misconceptions or questions that I struggled to articulate, but AI was able to interpret them and give a satisfying answer (if not on the first try).

{% include blog-teaching-carousel.html images=page.galleries.solow_graph label="A lecture slide and my questions to AI about it" caption="For example, I had a question about the position of the functions on the graph and how I could tell which was which, but I learned that they should actually be separate graphs, even though the slide put them all together." %}

I am not so sure I would always get an answer to my actual question from my teachers, since I can’t always phrase it clearly enough (and I don’t want to take up more of their time). Still, I understand it is important to learn how to communicate where my confusion is to another human. Indeed, I really benefited from all the face-to-face time I had with the instructor, TFs, and peer tutors. The review session by my TF was beyond helpful, even after I had devoted significant time to studying on my own. In the end, I got a score I was proud of (as someone who had not taken an exam-based course in a full academic year, and for whom economics is not the most intuitive subject), I even high-fived one of my supervisors at work.

After my economics midterm, I had to study for econometrics. I tried to have the same approach to AI-assisted studying, but I just had less time. I think AI does a good job of teaching statistics and probability for the type of learner I am. I ask AI to quiz me, and those short quizzes can really help me build fundamental intuition or give me a quick diagnostic of what I should study. By uploading the lecture slides, I could also ask for questions to reinforce my learning. Other ways I’ve used AI to study for econometrics are asking for a plan of what I need to know and asking for feedback and corrections on my cheat sheet, which we are allowed to have during the exam, especially for the trickiest parts of the mock exams.

<figure class="notes-figure">
  <a href="{{ '/blog-teaching/images/ai-study-chat-cheat-sheet.png' | relative_url }}" aria-label="View full-size screenshot of asking AI for feedback on my cheat sheet">
    <img src="{{ '/blog-teaching/images/ai-study-chat-cheat-sheet.png' | relative_url }}" alt="Chat where I upload a photo of my cheat sheet and ask what else to note, and the AI suggests fixing the one-sided p-value formula with a table of p-values for each alternative hypothesis" width="1246" height="1170" loading="lazy">
  </a>
</figure>

While I did not do as well as I would’ve liked on that midterm, I still believe that, given sufficient time, I could learn probability and statistics using AI, even solely with AI and course materials. AI makes the learning experience more bespoke, and I can have a back-and-forth that I otherwise could not have in a lecture. Yet I don’t deny that I could do better if I put the same amount of effort into econometrics as into my economics class, including just showing up and being present. I believe overcoming the friction of getting to class or section correlates with students’ effort in the course.

Going back to Shiro’s class, I think it was helpful to have a class on the fundamentals of probability, especially to level the playing field given the diverse learning backgrounds of the students in AQRD. For future iterations, I wonder if students could be encouraged to be proactive about using AI to supplement their learning, while recognizing that students have different preferences and learning styles.
