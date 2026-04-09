# Math — Grade 6 — Unit 5, Lesson 9

## Topic
Choosing the Best Measure and Display: When to Use Mean vs. Median, Which Display Best Answers Which Question, Effects of Outliers

## Learning Objectives
By the end of this lesson, the student will be able to:
- Choose between mean and median as the appropriate measure of center for a given data set and context, justifying the choice based on the presence or absence of outliers and skew.
- Select the most appropriate data display (dot plot, histogram, box plot) for a given data set and statistical question, explaining why the chosen display answers the question better than the alternatives.
- Explain and demonstrate how an outlier affects the mean, median, range, and IQR, and describe why some measures are more resistant to outliers than others.

## Prerequisites
- Calculating mean, median, mode (Lessons 3–4)
- Understanding range and IQR (Lesson 5)
- Creating and interpreting dot plots (Lesson 6)
- Creating and interpreting histograms (Lesson 7)
- Creating and interpreting box plots (Lesson 8)

## Materials Needed
- Calculator
- Reference chart of display types and their uses (see Direct Instruction)
- Whiteboard or projected notes for class comparison chart

---

## Warm-Up (5 minutes)
**Purpose:** Surface the key tension — why the "right" measure or display depends on context.

**Prompt:**
"A reporter is writing a story about salaries at a small software company with 8 employees. The salaries are:
$38,000 / $41,000 / $39,000 / $42,000 / $40,000 / $43,000 / $41,000 / $250,000

The CEO wants to publish the average salary. The employees want to show what a typical employee earns. Which measure — mean or median — would each prefer, and why?"

**Facilitator script:**
"Mean = (38+41+39+42+40+43+41+250) ÷ 8 = 534,000 ÷ 8 = $66,750. Median: ordered data = 38, 39, 40, 41, 41, 42, 43, 250 (thousands). Median = (41+41)÷2 = $41,000. The CEO prefers the mean ($66,750) because it's inflated by the CEO's own salary. The employees prefer the median ($41,000) because it represents a typical worker. Same data, two very different numbers — both technically correct. Today we'll build a framework for choosing the right measure every time."

---

## Direct Instruction (10–15 minutes)
**Purpose:** Build a decision framework for choosing measures of center and displays; explain outlier effects rigorously.

### Key Vocabulary
- **Outlier:** A data value that is unusually far from the other values in the data set. Outliers can strongly affect some statistics and have little effect on others.
- **Resistant Measure:** A statistic that is not strongly affected by outliers. The median and IQR are resistant measures.
- **Non-Resistant Measure:** A statistic that is strongly affected by outliers. The mean and range are non-resistant.
- **Symmetric Distribution:** A distribution where the left and right halves are roughly mirror images. In a symmetric distribution, mean ≈ median.
- **Skewed Distribution:** A distribution with a tail that extends more on one side. In a right-skewed distribution (tail to the right), mean > median. In a left-skewed distribution (tail to the left), mean < median.

### Instruction Notes

**Step 1 — When to use mean vs. median:**

"The mean and the median are both valid measures of center. The key question is: does this data set have outliers or strong skew?

Use the MEAN when:
- The distribution is roughly symmetric (no strong outliers or skew).
- All values contribute fairly to the "typical" value.
- You want to account for total quantity (e.g., average score determines a team's ranking).

Use the MEDIAN when:
- The distribution is skewed or has outliers.
- A few extreme values would distort the typical picture.
- Real-world examples: salaries, home prices, commute times, ages at a retirement home.

A helpful question to ask: 'If I removed the highest and lowest values, would the mean change dramatically?' If yes, use the median."

**Step 2 — How outliers affect each measure:**

Demonstration with a simple data set:
Data: 10, 11, 12, 13, 14 → Mean = 12, Median = 12, IQR = 2, Range = 4

Now add an outlier: 10, 11, 12, 13, 14, 50
- New mean = (10+11+12+13+14+50) ÷ 6 = 110 ÷ 6 ≈ 18.3 (increased by 6.3!)
- New median = (12+13) ÷ 2 = 12.5 (barely changed)
- New range = 50 − 10 = 40 (increased dramatically)
- New IQR: lower half 10,11,12 → Q1=11; upper half 13,14,50 → Q3=14; IQR = 3 (increased only slightly)

Conclusion table:
| Measure  | Original | With Outlier | Change |
| Mean     | 12       | 18.3         | Large  |
| Median   | 12       | 12.5         | Small  |
| Range    | 4        | 40           | Large  |
| IQR      | 2        | 3            | Small  |

"The mean and range are pulled strongly by outliers (non-resistant). The median and IQR change little (resistant). This is the core reason to prefer median and IQR when outliers are present."

**Step 3 — Relationship between skew and mean/median:**

"Recall from Lessons 6 and 7:
- Symmetric distribution: mean ≈ median (close together)
- Right-skewed (tail to the right): mean > median (outliers pull mean right)
- Left-skewed (tail to the left): mean < median (outliers pull mean left)

If you look at a dot plot or histogram and the tail goes to the right, expect mean > median. If the tail goes left, expect mean < median."

**Step 4 — Choosing the right display:**

Display selection framework:

Use a DOT PLOT when:
- Data set is small (roughly 5–30 values)
- Values span a narrow range (few dozen possible values or fewer)
- You want to see every individual data point
- Best for: showing exact frequencies, finding mode visually, small class data

Use a HISTOGRAM when:
- Data set is large (30+ values) OR values span a wide range
- Data is continuous (measurements: height, time, temperature)
- You want to see the overall shape and distribution
- Best for: comparing shapes, identifying skew, showing general distribution patterns

Use a BOX PLOT when:
- You want to compare two or more groups on the same scale
- You need a summary of center and spread without showing individual values
- You want to highlight the median and IQR clearly
- Best for: side-by-side comparisons, showing spread and outliers, summarizing large data sets

**Step 5 — Can one question have multiple good answers?**

"Sometimes more than one display is appropriate. The question drives the choice:
- 'What is the most common score?' → dot plot (mode visible)
- 'How are scores distributed across ranges?' → histogram
- 'Which class has higher and more consistent scores?' → box plot

There is rarely a single 'wrong' display, but some displays answer certain questions better."

### Worked Examples

**Example 1 — Choosing measure of center:**

Scenario A: 15 students' quiz scores: 72, 78, 80, 75, 82, 79, 81, 77, 76, 83, 80, 74, 81, 78, 79
→ Data is roughly symmetric (no extreme outliers). **Mean** is appropriate. Mean ≈ 78.3.

Scenario B: 8 students' weekly volunteer hours: 2, 3, 2, 3, 4, 2, 3, 28
→ The value 28 is a clear outlier. If a student volunteers 28 hours while others average 3, the mean ≈ 5.9 gives a misleading picture. **Median** is appropriate. Median = (3+3)÷2 = 3 hours.

Scenario C: Home prices on a street: $185K, $192K, $188K, $195K, $190K, $890K
→ The $890K house (perhaps a mansion) dramatically inflates the mean. **Median** is appropriate.

**Example 2 — Choosing the right display:**

Question: "How did students in our class score on a 50-point test, and which scores were most common?"
→ Best display: **dot plot**. Small class (≈25 students), shows individual scores, mode visible.

Question: "How are the heights of all 500 sixth graders in the district distributed?"
→ Best display: **histogram**. Large data set, continuous measurement, wide range.

Question: "Did Class A or Class B score higher and more consistently on the unit test?"
→ Best display: **box plot** (two side-by-side). Shows medians, IQRs, and ranges for direct comparison.

---

## Guided Practice (10 minutes)

For each scenario below, state (a) which measure of center you would use and why, and (b) which display you would choose and why.

1. A teacher wants to know the "typical" number of absences per student in a class of 26 students. Most students had 0–3 absences, but two students had 22 and 35 absences.

2. A sports analyst wants to compare the distributions of points-per-game for two NBA teams across an 82-game season.

3. A science class measured the mass of 15 rock samples (in grams). The values ranged from 14.2 g to 18.9 g with no obvious outliers.

4. A researcher recorded the daily number of texts sent by 200 middle school students, ranging from 0 to 450 texts.

**Facilitator guidance:**
1. Median (outliers at 22, 35 would inflate mean); dot plot or box plot (small class, moderate range, outliers visible).
2. Box plots (compare two distributions); median (games may have some extreme outlier scores).
3. Mean (symmetric, no outliers); dot plot (small n = 15, narrow range).
4. Histogram (large n = 200, wide range); mean or median depending on skew — the distribution is likely right-skewed (many low values, few very high), so median is safer.

---

## Independent Practice (10–15 minutes)

**Problem 1:**
A data set of 10 marathon finish times (in hours) includes the values:
3.2, 3.5, 3.4, 3.6, 3.3, 3.7, 3.5, 3.4, 6.8, 3.3

(a) Calculate the mean and median.
(b) Which measure better represents a "typical" finish time? Why?
(c) Which measure — range or IQR — better captures the typical spread? Calculate both.
(d) Draw the five-number summary and describe what the box plot would look like.

**Problem 2:**
Three data sets are described below. For each, decide whether the mean or median is more appropriate and explain.

Data Set A: Ages of people at a children's birthday party — mostly kids aged 7–9, with two parents aged 35 and 38.
Data Set B: Daily temperatures in Denver in July — ranging from 85°F to 103°F, fairly normally distributed.
Data Set C: Number of steps walked per day by 12 students — values 4,200 / 5,100 / 4,800 / 5,500 / 4,700 / 5,200 / 4,900 / 5,300 / 5,000 / 4,600 / 5,100 / 4,800.

**Problem 3:**
For each statistical question, choose the best display (dot plot, histogram, or box plot) and explain your reasoning.

(a) "What scores did individual students get on last week's 20-point pop quiz?" (Class of 18 students)
(b) "How does the distribution of commute times for workers in Seattle compare to those in Portland?" (500 workers per city)
(c) "How are the ages of participants in a 5K run distributed?" (300 participants, ages 8–72)
(d) "What is the most common number of siblings reported by students in our school?" (100 students, integer values 0–6)

**Problem 4:**
A data set has these values: 5, 7, 8, 9, 11, 12, 14, 45

(a) Calculate the mean and median.
(b) Remove the outlier (45) and recalculate the mean and median.
(c) Fill in this table (calculate all four measures with and without the outlier):
    - Mean with outlier: ___; Mean without outlier: ___; Change: ___
    - Median with outlier: ___; Median without outlier: ___; Change: ___
    - Range with outlier: ___; Range without outlier: ___; Change: ___
    - IQR with outlier: ___; IQR without outlier: ___; Change: ___
(d) Which two statistics changed the least? What does this confirm about resistant measures?

**Problem 5 (Stretch):**
A news article reports: "The average income in Millbrook is $87,000 per year."
You investigate and find the data for 9 residents: $28K, $32K, $35K, $30K, $29K, $33K, $31K, $28K, $477K.

(a) Verify the mean. Was the article accurate?
(b) Find the median. Which measure better represents what a typical Millbrook resident earns?
(c) Why might someone want to use the mean rather than the median in this context? Is it misleading?
(d) What display would you choose to show this data? How would you highlight the outlier?

### Difficulty Tiers

**On-level:** Problems 1–3.

**Stretch:** Problems 1–4.

**Challenge:** Problems 1–5.

### Interleaved Review

*Review from Unit 2 (Number System):*
R1. A submarine descends 240 feet below sea level, then rises 85 feet. What is its new depth relative to sea level?

*Review from Unit 1 (Ratios):*
R2. If 3 notebooks cost $7.50, how much do 8 notebooks cost?

*Review from Unit 4 (Geometry):*
R3. Find the area of a trapezoid with bases 10 cm and 14 cm and a height of 6 cm.

---

## Check for Understanding (3 minutes)

**Exit Ticket:**

> A small bakery tracked daily sales (in dollars) for 7 days:
> $120, $135, $128, $142, $130, $140, $580
>
> (a) Calculate the mean and median.
> (b) The bakery owner wants to tell a bank "our typical daily sales are $___." Which value should she report and why?
> (c) Which display — dot plot, histogram, or box plot — would best show a potential investor a summary of the bakery's sales including the unusually high day?

**Expected Answers:**

(a) Sum = 120 + 135 + 128 + 142 + 130 + 140 + 580 = 1,375
    Mean = 1,375 ÷ 7 ≈ **$196.43**
    Ordered: 120, 128, 130, 135, 140, 142, 580 (n=7); Median = 4th value = **$135**

(b) The owner should report the **median ($135)**. The mean ($196) is inflated by the single exceptional day ($580). The median more accurately represents what the bakery earns on a typical day. Reporting the mean could mislead the bank into thinking the bakery routinely earns nearly $200/day.

(c) A **box plot** would be most useful for an investor. It clearly shows the median (typical sales), the IQR (consistent sales range), and the long right whisker (or outlier dot if using a modified box plot) would visually highlight the $580 exceptional day. A dot plot would work too for only 7 data points, and it would show the outlier clearly. A histogram with only 7 points would have very few bars and be less informative.

**Mastery = correct mean and median; correct choice of median with clear outlier justification; reasonable display choice with explanation.**

### If Mastery Is Not Met
Target the student's specific confusion: either the calculation (recheck arithmetic), the mean vs. median reasoning (re-read Step 1 decision rules), or the display choice (revisit the display framework). The connection between outliers and the mean vs. median choice is the core concept.

### If Mastery Is Met
Ask: "If the bakery owner used the mean to qualify for a business loan, and then the bank expected typical sales of ~$196 per day, what problem might arise? What does this tell you about the ethical responsibility to use appropriate statistics?"

---

## Extension (Optional)

**Investigating Real Data — Skew and Measures:**

Look up (or use provided) U.S. household income data:
- Median household income: approximately $74,000 (2023 estimate)
- Mean household income: approximately $102,000 (2023 estimate)

1. What does the fact that mean > median tell you about the shape of the income distribution?
2. Which measure do you think the government uses to describe "typical" American income, and why?
3. What would happen to the mean and median if the 400 wealthiest Americans' incomes were removed from the data set? Which would change more?

---

## Teacher/Facilitator Notes

- The warm-up salary scenario is highly effective — students immediately see why the same data can produce very different summaries depending on which measure is chosen. Return to it throughout the lesson.
- The display selection framework (Step 4) should be treated as a reference guide that students internalize over time, not a rigid ruleset. Emphasize the word "best" — multiple displays can be acceptable, but one often answers a specific question more efficiently.
- Problem 4's comparison table is a key activity for building explicit understanding of resistant vs. non-resistant measures. Consider doing it together as a class before assigning independent practice.
- Problem 5 (salary/income context) mirrors the warm-up and connects to real-world media literacy — a critical skill. Discuss the ethical dimension: misrepresenting data with technically accurate but misleading statistics.
- The exit ticket deliberately revisits the salary theme from the warm-up to close the loop on the lesson's central concept.

## Answer Key

**Guided Practice:**
1. (a) Median (two extreme outliers at 22 and 35 would greatly inflate the mean). (b) Dot plot (small class of 26 students, integer values 0–35, can show individual data points and the outliers visually) or box plot (to highlight the outlier as a long right whisker).
2. (a) Median (82 games; individual games may have outlier low or high scores). (b) Box plots side-by-side (best for comparing two distributions on the same scale).
3. (a) Mean (no outliers, roughly symmetric continuous data). (b) Dot plot (small n=15, narrow range of ≈5 grams, can show individual values).
4. (a) Median (likely right-skewed with many low values and a few very high values). (b) Histogram (large n=200, wide range 0–450, continuous-like count data).

**Independent Practice:**

1. (a) Ordered: 3.2, 3.3, 3.3, 3.4, 3.4, 3.5, 3.5, 3.6, 3.7, 6.8
      Mean = (3.2+3.3+3.3+3.4+3.4+3.5+3.5+3.6+3.7+6.8) ÷ 10 = 37.7 ÷ 10 = **3.77 hours**
      n=10; Median = (3.4+3.5)÷2 = **3.45 hours**
   (b) **Median (3.45 hours)** — the value 6.8 hours is a clear outlier (nearly double the other times). The mean of 3.77 is pulled well above the typical cluster of 3.2–3.7.
   (c) Range = 6.8 − 3.2 = **3.6 hours** (strongly affected by the 6.8 outlier). Q1 = 3.3 (median of lower 5: 3.2,3.3,3.3,3.4,3.4), Q3 = 3.6 (median of upper 5: 3.5,3.5,3.6,3.7,6.8 → median = 3.6). IQR = 3.6 − 3.3 = **0.3 hours**. The IQR (0.3) better captures the typical spread because it ignores the outlier.
   (d) Five-number summary: Min=3.2, Q1=3.3, Median=3.45, Q3=3.6, Max=6.8. Box plot: very narrow box (Q1 to Q3 spans only 0.3) with a dramatically long right whisker extending to 6.8. The box sits tightly between 3.3 and 3.6, indicating most runners finish within a tight range, but the long right whisker flags the very slow runner.

2. Data Set A: **Median** — the two parents (35, 38) are outliers that would inflate the mean well above the 7–9 age cluster. The median stays in the 7–9 range and represents the typical attendee.
   Data Set B: **Mean** — temperatures from 85–103°F with a normal distribution and no extreme outliers. The mean gives a fair representation of the typical temperature.
   Data Set C: **Mean or Median** — values are clustered tightly (4,200–5,500 steps), no outliers, roughly symmetric. Either measure works; mean ≈ 4,933 steps, median = (4,900+5,000)÷2 = 4,950 steps. Both are reasonable.

3. (a) **Dot plot** — class of 18 on a 20-point quiz has a small, narrow data set. Individual scores are visible and the mode is immediately apparent.
   (b) **Box plots** (side-by-side) — 500 workers per city; need to compare two distributions efficiently, highlighting medians and spread. A histogram could also work for showing each city's shape, but side-by-side box plots allow direct comparison.
   (c) **Histogram** — 300 participants spanning ages 8–72 is too many for a dot plot; a histogram with 5-year bins (e.g., 5–9, 10–14, etc.) shows the age distribution clearly.
   (d) **Dot plot** — 100 students with integer values 0–6 gives only 7 possible values; stacking dots above each integer value is compact and shows exact frequency. A histogram would be nearly identical but a dot plot preserves individual data.

4. (a) Mean = (5+7+8+9+11+12+14+45) ÷ 8 = 111 ÷ 8 = **13.875**
       Ordered: 5,7,8,9,11,12,14,45; n=8; Median = (9+11)÷2 = **10**
   (b) Without 45: data = 5,7,8,9,11,12,14 (n=7). Mean = 66÷7 ≈ **9.43**; Median = 4th value = **9**
   (c) Table:
       - Mean: 13.875 → 9.43; Change: 4.44 (large)
       - Median: 10 → 9; Change: 1 (small)
       - Range: 45−5=40 → 14−5=9; Change: 31 (very large)
       - IQR: With outlier: lower half 5,7,8,9 → Q1=(7+8)÷2=7.5; upper half 11,12,14,45 → Q3=(12+14)÷2=13; IQR=5.5. Without: lower 5,7,8 → Q1=7; upper 11,12,14 → Q3=12; IQR=5. Change: 0.5 (very small)
   (d) **Median and IQR** changed the least. This confirms they are resistant measures — they are much less affected by outliers than the mean and range.

5. (a) Sum = 28+32+35+30+29+33+31+28+477 = 723. Mean = 723÷9 = **$80,333**. The article said $87,000 — close but not exact (possibly using slightly different values or rounding). The mean is heavily influenced by the $477K outlier.
   (b) Ordered: 28,28,29,30,31,32,33,35,477. Median = 5th value = **$31,000**. The median better represents a typical resident — 8 of 9 residents earn between $28K and $35K. The mean of ~$80K is more than double what 8 of 9 residents earn.
   (c) Someone might use the mean because it is technically accurate and sounds more impressive for marketing or attracting businesses. It could be misleading because it suggests residents have far more purchasing power than they actually do — a bank, employer, or retailer making decisions based on the mean income would be misled about the typical Millbrook customer.
   (d) **Dot plot** (only 9 data points) or **box plot** (highlights the outlier as a very long right whisker). The dot plot would show 8 dots clustered between 28 and 35 and one isolated dot at 477 — making the outlier immediately obvious.

**Interleaved Review:**
R1. Starts at −240 feet; rises 85 feet: −240 + 85 = **−155 feet** (155 feet below sea level)
R2. Unit rate: $7.50 ÷ 3 = $2.50 per notebook. 8 × $2.50 = **$20.00**
R3. Area of trapezoid = ½ × (b₁ + b₂) × h = ½ × (10 + 14) × 6 = ½ × 24 × 6 = **72 cm²**

**Exit Ticket:**
(a) Mean ≈ **$196.43**; Median = **$135**
(b) The owner should report the **median ($135)**. The mean is inflated by the single $580 day (an outlier) and does not represent a typical sales day. The median shows what she actually earns on most days.
(c) **Box plot** — it summarizes center (median) and spread, and the long right whisker or outlier dot visually flags the $580 unusual day for the investor. A dot plot would also work for 7 data points. A histogram would not be ideal with only 7 values.
