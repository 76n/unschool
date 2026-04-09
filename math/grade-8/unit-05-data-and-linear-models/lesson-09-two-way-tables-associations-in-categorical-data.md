# Math — Grade 8 — Unit 5, Lesson 9

## Topic
Two-Way Tables: Associations in Categorical Data

## Learning Objectives
- Define association in the context of categorical data using a two-way table.
- Compare conditional relative frequencies across rows or columns to identify whether an association exists.
- Describe an observed association in context: which category is more/less common, and by how much.
- Recognize what "no association" looks like in a two-way table (equal conditional relative frequencies).

## Prerequisites
- Can compute joint, row, and column relative frequencies from a two-way table (Unit 5, Lesson 8)
- Understands that relative frequencies are used to make fair comparisons (Lesson 8)
- Can describe associations in scatter plots (Unit 5, Lesson 2)

## Materials Needed
- Pencil
- Calculator
- Index card or half-sheet for Exit Ticket

**Standards:** 8.SP.4 — Use relative frequencies calculated for rows or columns to describe possible association between the two variables. For example, collect data from students in your class on whether or not they have a curfew and whether or not they have assigned chores at home. Is there evidence that those who have a curfew also tend to have chores?

---

## Warm-Up (5 minutes)
**Purpose:** Review conditional relative frequencies and introduce the idea of comparing groups.

1. A two-way table shows that among 80 students who play video games:
   - 60% of daily players prefer fiction books.
   - 60% of weekly players prefer fiction books.
   - 60% of monthly players prefer fiction books.
   Do video game frequency and book preference appear to be associated? *(No — all three groups have the same percentage. The distribution is identical, so there is no association.)*

2. Interleaved review (Unit 1 — number system): Write -2/3 as a decimal. Is it rational or irrational?
   *(-2/3 = -0.666... = -0.6̄. Rational — it is a repeating decimal.)*

3. Based on Lesson 8 work: You are asked "Among students who play sports, what percentage are girls?" Which denominator do you use — the row total, column total, or grand total? *(Column total — we are asking about a group defined by column category.)*

---

## Direct Instruction (10-15 minutes)

### Key Vocabulary
- **Association (categorical)** — a pattern in a two-way table where the distribution of one categorical variable differs depending on the category of the other variable.
- **No association (statistical independence)** — when the conditional relative frequencies are the same across all groups; knowing one variable gives no information about the other.
- **Conditional relative frequency** — a relative frequency computed using a row or column total as the denominator; expresses the distribution of one variable conditioned on a specific value of the other.

### Instruction Notes

**Step 1 — What does "association" mean for categorical data?**

Say: "With scatter plots, we looked for a pattern in numerical data: as x increases, does y tend to increase or decrease? With two-way tables, we are asking a different version of the same question: does knowing what category a person belongs to in one variable tell us anything about which category they are likely to be in for the other variable?"

Say: "If the answer is yes — knowing the row tells us something about the likely column — then there is an association. If the answer is no — the distribution across columns looks the same in every row — then there is no association."

**Step 2 — Identifying association by comparing row relative frequencies.**

Work through this full example.

**Data:** A gym surveys 300 members about their age group (Under 30 / 30 and Over) and their preferred workout type (Cardio / Strength).

|                    | Cardio | Strength | Row Total |
|--------------------|--------|----------|-----------|
| **Under 30**       | 80     | 70       | 150       |
| **30 and Over**    | 90     | 60       | 150       |
| **Column Total**   | 170    | 130      | 300       |

Compute row relative frequencies:
- Under 30: Cardio = 80/150 ≈ 53.3%; Strength = 70/150 ≈ 46.7%.
- 30 and Over: Cardio = 90/150 = 60%; Strength = 60/150 = 40%.

Ask: "Are the two rows different? Is there an association?"

The rows are similar but not identical. The Under-30 group has roughly a 53%/47% cardio/strength split. The 30-and-Over group has a 60%/40% split. The 30-and-over group leans somewhat more toward cardio. There may be a weak association.

Now work through a second example that shows a stronger association.

**Data:** Same gym, but new data about nutrition tracking (Tracks Diet / Does Not Track) and whether members achieved a fitness goal this month.

|                       | Achieved Goal | Did Not Achieve | Row Total |
|-----------------------|---------------|-----------------|-----------|
| **Tracks Diet**       | 80            | 20              | 100       |
| **Does Not Track**    | 40            | 160             | 200       |
| **Column Total**      | 120           | 180             | 300       |

Row relative frequencies:
- Tracks Diet: 80/100 = **80%** achieved goal, 20/100 = 20% did not.
- Does Not Track: 40/200 = **20%** achieved goal, 160/200 = 80% did not.

Ask: "Is there an association now?"

Yes — a strong one. Members who track their diet have a very different goal achievement rate (80%) compared to those who don't (20%). Knowing whether a member tracks their diet gives strong information about whether they achieved their goal. This is a strong association.

**Step 3 — What does "no association" look like?**

Say: "If there were no association, the row relative frequencies would be identical in every row."

Example: Suppose 60% of both age groups preferred cardio:

|                  | Cardio | Strength | Row Total |
|------------------|--------|----------|-----------|
| **Under 30**     | 90     | 60       | 150       |
| **30 and Over**  | 90     | 60       | 150       |

Row relative frequencies: Under 30: 60%/40%. 30 and Over: 60%/40%. Identical. No association — age group tells you nothing about workout preference in this hypothetical.

**Step 4 — Describing an association.**

Model the full description: "There is a [strong/moderate/weak] association between [Variable 1] and [Variable 2]. Members who [row category] are [much more / slightly more / about equally likely] to [column category]. Specifically, [X%] of [row group A] [column outcome], compared to [Y%] of [row group B]."

Full description of the diet tracking example: "There is a strong association between diet tracking and goal achievement. Members who track their diet achieve their fitness goal at a much higher rate (80%) compared to members who do not track their diet (20%). These two groups look very different in their goal achievement rates."

---

## Guided Practice (10 minutes)

A school surveys 200 students about two things:
- Whether they participate in extracurricular activities (Yes / No)
- Whether they report feeling stressed about school (High Stress / Low Stress)

|                          | High Stress | Low Stress | Row Total |
|--------------------------|-------------|------------|-----------|
| **Extracurriculars: Yes**| 30          | 70         | 100       |
| **Extracurriculars: No** | 60          | 40         | 100       |
| **Column Total**         | 90          | 110        | 200       |

1. Compute the row relative frequencies for each group.
   - Extracurriculars Yes: High Stress = ___; Low Stress = ___.
   - Extracurriculars No: High Stress = ___; Low Stress = ___.

2. Compare the two rows. Do the distributions look the same or different?

3. Is there an association between extracurricular participation and stress level? Describe it.

4. Write a two-sentence summary of the association: "Students who participate in extracurriculars are [more/less] likely to report high stress. Specifically, ___% of extracurricular participants report high stress, compared to ___% of non-participants."

5. Column relative frequencies: compute what percentage of high-stress students do/do not participate in extracurriculars. How does this framing change the description?

**Expected calculations:**
- Row relative frequencies: Yes row: 30/100 = 30% high stress, 70/100 = 70% low stress. No row: 60/100 = 60% high stress, 40/100 = 40% low stress.
- Association: Yes, there is an association. Students who do NOT participate in extracurriculars report high stress at twice the rate (60%) of those who do participate (30%).
- Column relative frequencies for High Stress: 30/90 = 33.3% participate; 60/90 = 66.7% do not participate. Among high-stress students, about two-thirds do not participate in extracurriculars.

---

## Independent Practice (10-15 minutes)

### Tier 1 (On-level)

A health study surveys 400 adults about two things:
- Whether they sleep 7 or more hours per night: Yes / No
- Whether they got sick during the past 3 months: Yes / No

|                          | Got Sick | Did Not Get Sick | Row Total |
|--------------------------|----------|-----------------|-----------|
| **Sleeps 7+ hours**      | 40       | 160             | 200       |
| **Sleeps < 7 hours**     | 100      | 100             | 200       |
| **Column Total**         | 140      | 260             | 400       |

1. Compute the row relative frequencies for both rows. Round to the nearest percent.
2. Is there an association between sleep duration and getting sick? Explain, using the relative frequencies.
3. Write a complete description of any association. Use specific numbers.
4. Compute the column relative frequency: among people who got sick, what percentage slept fewer than 7 hours?
5. Is it more appropriate to use row or column relative frequencies to answer the question: "Does sleep duration affect the likelihood of getting sick?" Explain.

### Tier 2 (Stretch)

6. A classmate says: "140 out of 400 people got sick, and 100 of those are in the 'sleeps less than 7 hours' group. That's 71.4% of all sick people — that proves that less sleep causes sickness." Identify two errors in this reasoning.

7. What would the table look like if there were absolutely NO association between sleep and sickness? Fill in a hypothetical two-way table for 400 adults where the row relative frequencies are identical.

8. (Interleaved — Unit 5 Lesson 6) Even if the row relative frequencies in this study show a strong association, what do you need to be careful about when interpreting whether sleep causes sickness?

### Tier 3 (Challenge)

9. (Interleaved — Unit 3 functions) The table in this lesson shows a two-way comparison. Consider a function f(x) where f(1) = 30%, f(2) = 60% (where 1 = extracurricular participant, 2 = non-participant, and f(x) = percentage who report high stress). Is this a function? Explain using the definition of a function.

10. A study finds that the association between variable A and variable B is very strong when computing row relative frequencies but nearly zero when computing column relative frequencies. Can this happen? Construct a two-way table example where this appears to be the case, and explain why both calculations are valid depending on the question asked.

---

## Exit Ticket

**Problem 1:** Two groups of students are surveyed about whether they eat breakfast (Yes/No).

|                 | Eats Breakfast | Skips Breakfast | Row Total |
|-----------------|----------------|-----------------|-----------|
| **Athletes**    | 72             | 8               | 80        |
| **Non-athletes**| 48             | 72              | 120       |

Compute row relative frequencies for each group. Is there an association? Describe it in one sentence using specific numbers.

**Problem 2:** In a two-way table, if the row relative frequencies are the same in every row, what does that tell you about the two variables?

**Mastery = 2 out of 2 correct.**

---

## Answer Key

### Independent Practice

1. Row relative frequencies:
   - Sleeps 7+ hours: Got Sick = 40/200 = **20%**; Did Not Get Sick = 160/200 = **80%**.
   - Sleeps < 7 hours: Got Sick = 100/200 = **50%**; Did Not Get Sick = 100/200 = **50%**.

2. **Yes, there is an association.** The two rows look very different: people who sleep 7+ hours get sick only 20% of the time, while people who sleep fewer than 7 hours get sick 50% of the time. Knowing sleep duration gives strong information about illness likelihood.

3. "There is a strong association between sleep duration and getting sick in the past 3 months. Adults who sleep 7 or more hours per night get sick at a much lower rate (20%) than adults who sleep fewer than 7 hours (50%). Adults who are sleep-deprived are 2.5 times as likely to have gotten sick in this study."

4. Column relative frequency among sick people: 100/140 ≈ **71.4%** slept fewer than 7 hours.

5. **Row relative frequencies** are more appropriate for answering "does sleep duration affect likelihood of getting sick?" because this question asks: given what we know about a person's sleep habits (their row), how likely are they to get sick? We want to compare the two groups (7+ hours vs. < 7 hours) on the same outcome (getting sick). Row relative frequencies allow this comparison.

6. Error 1: **This is a column relative frequency** (100/140 = 71.4%), not a row relative frequency. It answers "among sick people, what percentage slept less?" — not "do people who sleep less get sick more?" Error 2: **Causation is not established** by this data alone. This is an observational study. Other factors (stress, diet, social contact) may explain why less-sleep people got sick more often.

7. If there were no association, both rows would have the same distribution. The overall "got sick" rate is 140/400 = 35%. So a no-association table would look like:

|                       | Got Sick | Did Not Get Sick | Row Total |
|-----------------------|----------|-----------------|-----------|
| **Sleeps 7+ hours**   | 70       | 130             | 200       |
| **Sleeps < 7 hours**  | 70       | 130             | 200       |
| **Column Total**      | 140      | 260             | 400       |

Both rows: 70/200 = 35% got sick, 130/200 = 65% did not. Identical rows = no association.

8. Even with a strong association in the data, this is an **observational study** — participants chose their own sleep schedules. We cannot conclude causation. Possible lurking variables: people who sleep less may also have higher stress, worse diet, more social contact (catching germs from others), or pre-existing health conditions. A randomized controlled study would be needed to establish that sleep directly causes or prevents illness.

9. Yes, f is a function. For input x = 1 (extracurricular participant), the output is exactly one value: 30% high stress. For input x = 2 (non-participant), the output is exactly one value: 60% high stress. Each input maps to exactly one output — this satisfies the definition of a function. (Note: this is a discrete function with only two values in its domain.)

10. Yes, this can happen. Example: In a 2×2 table where the two groups are very unequal in size, row relative frequencies may show large differences while column relative frequencies show small differences (or vice versa). The two calculations answer different questions, so the "strength" of association can appear different depending on which direction you condition.

Sample table: Let Group A have 10 people, Group B have 190 people, all answering Yes/No.
|          | Yes | No  | Row Total |
|----------|-----|-----|-----------|
| Group A  | 8   | 2   | 10        |
| Group B  | 96  | 94  | 190       |

Row relative frequencies: Group A: 80% yes, 20% no. Group B: ~50.5% yes, ~49.5% no — clearly different (strong row association).
Column relative frequencies for Yes: 8/104 ≈ 7.7% from A, 96/104 ≈ 92.3% from B — almost all yes-sayers are from Group B (simply because Group B is so much larger). Both calculations are valid; they answer different questions.

### Exit Ticket

1. Row relative frequencies:
   - Athletes: 72/80 = **90%** eat breakfast, 8/80 = 10% skip.
   - Non-athletes: 48/120 = **40%** eat breakfast, 72/120 = 60% skip.
   **Yes, there is a strong association.** Athletes eat breakfast at a much higher rate (90%) than non-athletes (40%).

2. If row relative frequencies are the same in every row, it means the two variables **are not associated** (statistically independent). Knowing which row a person is in gives no information about which column they are likely to be in — the distribution of the column variable is the same across all groups.

---

## Teacher Notes

- The key conceptual move in this lesson is recognizing what association vs. no association looks like in terms of row relative frequencies. Drill the question: "Do the rows look the same or different?" before asking students to interpret.
- The hardest concept for students is explaining WHY different row relative frequencies indicate an association. Prompt: "If knowing your row doesn't help predict your column, the rows should look the same. If the rows look different, then the row category is giving us information about the column outcome."
- The "no association" table construction in Tier 2 #7 is an excellent conceptual exercise. Students who can build a no-association table from scratch truly understand what independence means.
- Interleaved review: Tier 3 #9 connects two-way table categories to the definition of a function from Unit 3 — an unusual but valid connection.
- The causal reasoning question (Tier 2 #8) explicitly connects back to Lesson 6 (correlation vs. causation), reinforcing the unit-wide theme.

---

*This lesson follows the [Teaching Methodology Framework](../../../methodology/teaching-methodology-framework.md).*
