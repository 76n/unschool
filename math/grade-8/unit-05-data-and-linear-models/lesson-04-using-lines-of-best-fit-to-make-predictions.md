# Math — Grade 8 — Unit 5, Lesson 4

## Topic
Using Lines of Best Fit to Make Predictions

## Learning Objectives
- Use a line of best fit to predict a y-value for a given x-value by reading the graph.
- Distinguish between interpolation (within data range) and extrapolation (outside data range).
- Evaluate the reliability of predictions made by interpolation vs. extrapolation.
- Recognize specific limitations of prediction: context, range, and changing conditions.

## Prerequisites
- Can draw a line of best fit for linear data (Unit 5, Lesson 3)
- Can read values from a graph (Grade 6-7)
- Can substitute into linear equations (Grade 8, Unit 2)

## Materials Needed
- Graph paper (2 sheets)
- Ruler
- Pencil
- Calculator
- Index card or half-sheet for Exit Ticket

**Standards:** 8.SP.2, 8.SP.3 — Know that straight lines are widely used to model relationships between two quantitative variables. Use the equation of a linear model to solve problems in the context of bivariate measurement data, interpreting the slope and intercept.

---

## Warm-Up (5 minutes)
**Purpose:** Review drawing the line of best fit and slope calculation from Lesson 3.

1. A scatter plot shows a negative linear association. You draw a line of best fit that passes through approximately (5, 80) and (15, 40). Calculate the slope. What does the sign of the slope tell you about the association?
   *(m = (40 - 80)/(15 - 5) = -40/10 = -4. Negative slope confirms negative association — as x increases, y decreases.)*

2. Interleaved review (Unit 2): Solve for y when x = 12: y = -4x + 100.
   *(y = -4(12) + 100 = -48 + 100 = 52)*

3. Would you use a line of best fit to predict values for a scatter plot showing NO association? Why not?
   *(No — if there is no association, the line would be arbitrary and predictions would be meaningless.)*

---

## Direct Instruction (10-15 minutes)

### Key Vocabulary
- **Prediction** — using a mathematical model (the line of best fit) to estimate a value for an individual not in the data set.
- **Interpolation** — predicting a value for an x that falls within the range of the collected data.
- **Extrapolation** — predicting a value for an x that falls outside the range of the collected data.
- **Reliability** — how trustworthy a prediction is; interpolation is generally more reliable than extrapolation.

### Instruction Notes

**Step 1 — What does prediction mean here?**

Say: "Now that we have a line of best fit, we can use it to predict. The line is a model of the data trend. If we input an x-value into the line, the line gives back a predicted y-value. This is useful for estimating values we didn't actually measure."

Example context: A sports scientist records sprint times and reaction times for 10 athletes. After drawing a line of best fit, they want to predict the reaction time for a new athlete whose sprint time they know but whose reaction time they haven't tested yet.

**Step 2 — Two methods: reading the graph and using the equation.**

Method 1 (Reading the graph): "Find the x-value on the x-axis. Draw a vertical line up until it hits the line of best fit. Then draw a horizontal line to the y-axis and read the y-value."

Method 2 (Using the equation — previewed here, formalized in Lesson 5): "Write the equation of the line and substitute the x-value in."

For now, we will practice Method 1 (reading the graph) and Method 2 will be the focus of Lesson 5.

**Step 3 — Interpolation vs. Extrapolation.**

Work through a complete example.

Data: Number of times a basketball player practices free throws per week vs. their free-throw success rate (%).

| Player | Weekly Free-Throw Practice | Success Rate (%) |
|--------|---------------------------|------------------|
| 1      | 20                        | 62               |
| 2      | 40                        | 70               |
| 3      | 60                        | 78               |
| 4      | 80                        | 84               |
| 5      | 100                       | 88               |
| 6      | 50                        | 74               |
| 7      | 70                        | 81               |
| 8      | 30                        | 66               |
| 9      | 90                        | 86               |
| 10     | 110                       | 91               |

Data range: x goes from 20 to 110 attempts per week.

Draw a line of best fit. The line appears to pass through approximately (20, 61) and (110, 92).
Slope: m = (92 - 61)/(110 - 20) = 31/90 ≈ 0.34.

*Interpolation example:* "Predict the free-throw success rate for a player who practices 55 times per week."
- 55 is between 20 and 110 (within the data range).
- Read the graph at x = 55: the line appears to be at about y ≈ 75%.
- This is an interpolation. It is fairly reliable because 55 is well within the range of our data.

*Extrapolation example 1:* "Predict the success rate for a player who practices 150 times per week."
- 150 is beyond the data range (our data only goes to 110).
- If we extend the line to x = 150, the equation predicts roughly 92 + 0.34 × 40 ≈ 106%. But success rates cannot exceed 100%!
- This shows a limitation: the model breaks down far outside the data range.

*Extrapolation example 2:* "Predict the success rate for a player who practices 0 times per week."
- Extending the line to x = 0 gives approximately 61 - 0.34 × 20 ≈ 54%.
- This is technically extrapolation, and it may be less reliable than reading within the data range.

**Step 4 — When extrapolation goes wrong.**

Say: "Extrapolation is risky because we are assuming the trend continues in the same way beyond our data. But real-world relationships often change outside the range we measured. Our model is built on data from players who practice 20-110 times per week. We don't know what happens outside that range."

Key idea: "Interpolation within the data range is generally more reliable than extrapolation outside it."

---

## Guided Practice (10 minutes)

The data below shows the number of hours a group of Grade 8 students spent studying for a standardized science test and their scores (out of 100).

| Student | Study Hours | Test Score |
|---------|-------------|------------|
| A       | 1           | 55         |
| B       | 2           | 62         |
| C       | 3           | 68         |
| D       | 4           | 73         |
| E       | 5           | 78         |
| F       | 6           | 83         |
| G       | 7           | 87         |
| H       | 8           | 90         |
| I       | 2.5         | 65         |
| J       | 5.5         | 80         |

1. Plot the scatter plot on graph paper (x: 0 to 10; y: 50 to 100 by 5s).

2. Draw a line of best fit.

3. Read the graph to predict the test score for a student who studied for 4.5 hours. Is this interpolation or extrapolation? Is the prediction reliable?
   *(About 75-76. Interpolation — 4.5 is within range [1 to 8]. Reliable.)*

4. Read the graph to predict the test score for a student who studied for 10 hours. Is this interpolation or extrapolation? Is the prediction reliable?
   *(About 95-97 by extending the line. Extrapolation — 10 is beyond the maximum in our data. Less reliable; also near the maximum possible score of 100, so the linear model may not hold.)*

5. A student studied 0 hours. What does your line predict for their score? What concerns do you have about this prediction?
   *(About 48-52 by extending the line to x = 0. Extrapolation. The model predicts a score near 50 for no study. May be plausible, but we have no data near 0 hours, so uncertainty is higher.)*

6. Would you be comfortable predicting the score for a student who studied 100 hours? Why or why not?
   *(No. 100 hours is far outside our data range. The linear model would give a nonsensical prediction (well above 100%). Nobody actually studies 100 hours for one test, and the relationship almost certainly does not stay linear at those extremes.)*

---

## Independent Practice (10-15 minutes)

### Tier 1 (On-level)

A fitness app records users' average daily step count and their body mass index (BMI). The data is plotted and a line of best fit is drawn. The line appears to pass through approximately (3000, 28) and (12000, 22).

1. Calculate the slope of this line of best fit. Include units (the x-unit is "steps" and the y-unit is "BMI points").

2. What does the slope tell you about the relationship between step count and BMI?

3. The data was collected from people who walk between 2,000 and 15,000 steps per day. Is it interpolation or extrapolation to predict the BMI of a person who walks 8,000 steps per day?

4. Using the line of best fit (reading from the graph or extending the line), predict the BMI for a person who walks 8,000 steps per day. Show your work or describe how you read the graph.

5. A person claims to walk 25,000 steps per day. Would you trust the line of best fit to predict their BMI? Explain.

6. If you extend the line all the way to x = 0 (a person who never walks), what BMI does the model predict? Is this a meaningful prediction?

### Tier 2 (Stretch)

7. The slope of the line is negative. A student says: "This means walking makes your BMI go down — so if you walk more, your BMI will decrease." What is mathematically correct about this statement? What is problematic about it?

8. Describe a real-world situation where the relationship between two variables is linear within a certain range but clearly cannot stay linear outside that range. Use specific numbers to explain why extrapolation would fail.

9. (Interleaved — Unit 3) A different app uses the linear equation y = -0.0007x + 30 to predict BMI from step count. What BMI does this equation predict for 5,000 steps? For 20,000 steps? Which prediction do you trust more, and why?

### Tier 3 (Challenge)

10. A scientist says: "Our line of best fit for ocean temperature vs. coral bleaching rate is very accurate for temperatures between 25°C and 32°C, but we need to predict bleaching at 35°C." Write a paragraph describing at least three specific concerns the scientist should have about this extrapolation.

---

## Exit Ticket

**Problem 1:** A scatter plot shows a negative linear association between hours of TV watched and GPA. The line of best fit passes through (1, 3.8) and (5, 2.2). A student watches 3.5 hours of TV per day. Is predicting their GPA interpolation or extrapolation? Predict their GPA using the line.

**Problem 2:** Why is extrapolation generally less reliable than interpolation? Give one specific reason.

**Mastery = 2 out of 2 correct.**

---

## Answer Key

### Independent Practice

1. m = (22 - 28)/(12000 - 3000) = -6/9000 = **-0.000667 BMI points per step**, or equivalently, **-0.667 BMI points per 1,000 steps**.

2. The slope tells us that as daily step count increases by 1,000 steps, BMI tends to decrease by about 0.667 points. More walking is associated with lower BMI.

3. **Interpolation.** The data range is 2,000 to 15,000 steps; 8,000 steps falls within that range.

4. Using the slope formula from the line: the line passes through (3000, 28) and (12000, 22). At x = 8,000:
   - Distance from x = 3000 to x = 8000 is 5,000 steps.
   - BMI change: 5000 × (-0.000667) ≈ -3.33.
   - Predicted BMI: 28 - 3.33 ≈ **24.7**.
   (Accept any answer in approximately 24-25 based on graph reading.)

5. **No.** 25,000 steps is well outside the data range (max is 15,000). The linear model was built on data from 2,000-15,000 steps per day. Extending it to 25,000 assumes the same rate of decrease continues, which may not be true. Additionally, walking 25,000 steps/day (about 12 miles) represents extreme activity, a population not represented in the data.

6. At x = 0: extending the line from (3000, 28) with slope -0.000667:
   BMI = 28 - (-0.000667)(3000 - 0) ... wait, using point-slope: starting from (3000, 28), moving back 3000 steps: 3000 × 0.000667 ≈ 2, so BMI at x = 0 is approximately 28 + 2 = **30**. This predicts a BMI of about 30 for someone who walks 0 steps per day. While this is extrapolation (no data near x = 0) and thus uncertain, a BMI of 30 for a completely sedentary person is not implausible. However, we have no data to support it and the prediction should be treated with caution.

7. **Mathematically correct:** The slope is negative, meaning that in this data set, people with higher step counts tend to have lower BMIs — a negative association exists. **Problematic:** The statement implies causation ("walking makes your BMI go down"). The scatter plot only shows an association. Other factors (diet, exercise type, genetics) may explain the pattern. Additionally, the direction of cause might be reversed — people with lower BMI may be more likely to walk more.

8. Sample answer: A plant's growth (height in cm) vs. water given per week (mL) may be linear between 50 mL and 300 mL per week. But below 50 mL, the plant starts dying and the relationship collapses. Above 400 mL, the plant is overwatered and growth also decreases. The linear model breaks completely outside the healthy range.

9. At x = 5,000: y = -0.0007(5000) + 30 = -3.5 + 30 = **26.5**.
   At x = 20,000: y = -0.0007(20000) + 30 = -14 + 30 = **16**.
   The prediction for **5,000 steps** is more reliable — it is within a plausible data range. 20,000 steps per day is exceptional (about 10 miles of walking), and a BMI of 16 is below the clinical threshold for normal weight (typically 18.5), so the extrapolation to 20,000 steps is likely unreliable.

10. Concerns about extrapolating coral bleaching data to 35°C:
   (1) **Model validity:** The linear relationship was established between 25°C and 32°C. At 35°C, the underlying biology may change qualitatively — bleaching might accelerate exponentially rather than linearly, making the linear model wrong in form.
   (2) **No data at that range:** We have no observations at 35°C to validate the model's accuracy. The prediction is pure extrapolation.
   (3) **Range of conditions:** 35°C is above any historical temperature recorded in the study zone, meaning the ecosystem may respond in ways not captured by the existing data (e.g., mass die-off rather than partial bleaching).

### Exit Ticket

1. **Interpolation** — 3.5 hours is within the range of 1 to 5 hours in the data. Slope: m = (2.2 - 3.8)/(5 - 1) = -1.6/4 = **-0.4**. Using point (1, 3.8): at x = 3.5, distance from x = 1 is 2.5 units. GPA change: 2.5 × (-0.4) = -1.0. Predicted GPA: 3.8 - 1.0 = **2.8**.

2. Sample answers: "We have no data outside the range, so we don't know if the trend continues." Or: "The relationship might change in ways we haven't observed beyond the data range." Or: "Real-world constraints (like a score can't exceed 100) may cause the model to break down."

---

## Teacher Notes

- This lesson should feel like a natural extension of Lesson 3 — the heavy lifting (drawing the line) is already done. Lesson 4 is about what the line is for.
- Many students need to be explicitly shown the graphical method for prediction: "Find x on the x-axis → go up to the line → read across to the y-axis." Practice this motion physically before asking for written predictions.
- The distinction between interpolation and extrapolation should be understood qualitatively, not just defined. Ask: "If we measured 10 people between ages 20 and 50, and we want to predict something for a 35-year-old vs. a 75-year-old, which prediction do we trust more? Why?"
- The coral bleaching Challenge problem (Tier 3 #10) is excellent for STEM-interested students. It previews the scientific reasoning that appears in biology and earth science.
- Interleaved review: Tier 2 #9 requires substituting values into a linear equation (Unit 3) and evaluating the reliability of the results — a direct integration of Unit 3 skills with Unit 5 context.

---

*This lesson follows the [Teaching Methodology Framework](../../../methodology/teaching-methodology-framework.md).*
