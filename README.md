# Meeting Value Calculator

A business-focused tool that makes the people-cost of meetings visible and helps teams identify practical opportunities to recover capacity.

## The business problem

Meetings are essential for decision-making and alignment, but their cost is rarely considered during planning. Long meetings and oversized attendee lists can consume valuable employee time without a clear view of the trade-off.

This calculator helps managers and teams treat meeting time as an investment. It estimates the direct compensation cost of a meeting and shows the potential savings from reducing its duration.

## What it does

- Captures meeting duration, attendee count, and meeting frequency.
- Lets users enter each attendee's annual compensation.
- Calculates the hourly cost of every attendee.
- Shows the cost per meeting, per month, and per year.
- Models a shorter-meeting scenario and estimates recurring savings.
- Produces a plain-language recommendation to guide a better planning conversation.

## How the calculation works

The tool uses a standard assumption of **2,080 working hours per year** (40 hours × 52 weeks).

```text
Hourly cost per attendee = Annual compensation ÷ 2,080

Meeting cost = Sum of attendee hourly costs × Meeting duration (hours)

Annual meeting cost = Meeting cost × Meetings per month × 12
```

For the opportunity scenario, the calculator models a meeting that is approximately 25% shorter, rounded to the nearest five minutes.

> Tip: Use fully loaded employee cost—not only base salary—when building a real business case.

## Why this is a consultancy case study

This project is designed to demonstrate business thinking rather than technical complexity. It turns an operational habit into a measurable question:

**What decision, alignment, or outcome needs to justify the investment of this meeting?**

It supports practical actions such as:

- reducing meeting duration with a structured agenda;
- sending pre-reads before the meeting;
- inviting only decision-makers and essential contributors; and
- tracking recurring meetings with a high annual cost.

## Run locally

This is a lightweight static website—no installation or build step is needed.

1. Download or clone the repository.
2. Open `index.html` in any modern browser.
3. Update the meeting details and compensation figures to explore the business case.

## Project structure

```text
├── index.html   # Page structure and calculator interface
├── styles.css   # Responsive visual design
├── app.js       # Cost, savings, and recommendation logic
└── README.md
```

## Live site

Once GitHub Pages is enabled, the project can be viewed at:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/
```

## Interview talking points

- I framed the problem around **productive capacity and decision value**, rather than simply reducing meeting costs.
- I made the assumptions explicit so that stakeholders can challenge or adapt the model.
- I designed the tool to turn a number into an action: shorten the meeting, refine the agenda, or reconsider who needs to attend.
- The same approach could be extended into a consulting engagement by analysing a meeting portfolio by function, seniority, or recurring cost.

---

Built as a business-efficiency and operational-improvement case study.
