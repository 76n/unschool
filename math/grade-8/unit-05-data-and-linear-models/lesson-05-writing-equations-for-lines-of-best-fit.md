# Math — Grade 8 — Unit 5, Lesson 5

## Topic
Writing Equations for Lines of Best Fit

## Learning Objectives
- Write the equation of a line of best fit in slope-intercept form y = mx + b.
- Calculate slope from two points on the line of best fit.
- Identify or calculate the y-intercept from the line of best fit.
- Interpret slope and y-intercept in the context of real-world bivariate data.
- Use the equation to make numerical predictions.

## Prerequisites
- Can draw a line of best fit for linear data (Unit 5, Lesson 3)
- Can use a line of best fit to make predictions (Unit 5, Lesson 4)
- Can write a linear equation in slope-intercept form given slope and intercept (Grade 8, Unit 3)
- Can calculate slope from two points (Grade 8, Unit 3)

## Materials Needed
- Graph paper (2 sheets)
- Ruler
- Pencil
- Calculator
- Index card or half-sheet for Exit Ticket

**Standards:** 8.SP.3 — Use the equation of a linear model to solve problems in the context of bivariate measurement data, interpreting the slope and intercept. For example, in a linear model for a biology experiment, interpret a slope of 1.5 cm/hr as meaning that an additional hour of sunlight each day is associated with an additional 1.5 cm in mature plant height.

---

## Warm-Up (5 minutes)
**Purpose:** Review slope-intercept form from Unit 3 and connect to the line of best fit.

1. Write the equation of a line with slope -3 and y-intercept 15. *(y = -3x + 15)*

2. A line of best fit passes through (2, 50) and (8, 80). Calculate the slope. *(m = (80 - 50)/(8 - 2) = 30/6 = 5)*

3. Interleaved review (Unit 1 — exponents): Simplify: (2^3)^2. *(2^6 = 64)*

4. Why would you need an equation for a line of best fit rather than just reading values off the graph?
   *(An equation lets you compute precise predictions, share the model with others, and make predictions without needing to draw the graph each time.)*

---

## Direct Instruction (10-15 minutes)

### Key Vocabulary
- **Slope-intercept form** — y = mx + b, where m is the slope and b is the y-intercept.
- **Slope in context** — the rate of change: for each one-unit increase in x, y changes by m units.
- **y-intercept in context** — the predicted value of y when x = 0; may or may not be meaningful depending on whether x = 0 makes sense in context.

### Instruction Notes

**Step 1 — Review the procedure.**

Say: "We already know how to draw a line of best fit and how to use it to make predictions from a graph. Now we will write the equation of that line. Once we have the equation, we can make precise numerical predictions without having to draw the graph every time."

Write the procedure:

**Step 1:** Draw the line of best fit on the scatter plot. (Already done from Lesson 3.)
**Step 2:** Choose two points ON the line (not necessarily data points). Use points far apart for accuracy.
**Step 3:** Calculate slope: m = (y2 - y1)/(x2 - x1).
**Step 4:** Identify or calculate the y-intercept:
  - Option A: Read b directly from the graph if x = 0 is visible on the plot.
  - Option B: Substitute one point and m into y = mx + b and solve for b.
**Step 5:** Write the full equation: y = mx + b.
**Step 6:** Interpret slope and y-intercept in context. Include units.

**Step 2 — Full worked example.**

Data: Average daily temperature (°F) and number of hot chocolate cups sold at a café.

| Day | Temperature (°F) | Cups Sold |
|-----|-----------------|-----------|
| 1   | 25              | 98        |
| 2   | 30              | 92        |
| 3   | 35              | 84        |
| 4   | 40              | 75        |
| 5   | 45              | 68        |
| 6   | 50              | 60        |
| 7   | 55              | 52        |
| 8   | 60              | 45        |
| 9   | 65              | 38        |
| 10  | 70              | 30        |

Plot: x = temperature, y = cups sold. Range: x from 20 to 75, y from 20 to 110.

**Step 1:** Draw line of best fit (strong negative linear association).
**Step 2:** The line appears to pass through approximately (25, 97) and (70, 31).
**Step 3:** Slope: m = (31 - 97)/(70 - 25) = -66/45 ≈ -1.47.
**Step 4:** y-intercept: Using (25, 97): 97 = -1.47(25) + b → 97 = -36.75 + b → b = 133.75 ≈ 134.
**Step 5:** Equation: **y = -1.47x + 134**.
**Step 6:** Interpretation:
- Slope: "For each 1°F increase in temperature, the café sells about 1.47 fewer cups of hot chocolate."
- y-intercept: "If the temperature were 0°F, the model predicts about 134 cups would be sold." (Note: extrapolation beyond the data range, and temperatures near 0°F are unlikely in this context, so the y-intercept has limited practical meaning here.)

**Step 3 — Using the equation to predict.**

"On a day when the temperature is 48°F, how many cups of hot chocolate does the model predict?"
- Substitute x = 48: y = -1.47(48) + 134 = -70.56 + 134 = 63.44 ≈ **63 cups**.
- Is this interpolation or extrapolation? (Interpolation — 48 is within the data range of 25-70°F.)

"On a day when the temperature is 80°F, how many cups does the model predict?"
- y = -1.47(80) + 134 = -117.6 + 134 = 16.4 ≈ **16 cups**.
- Is this interpolation or extrapolation? (Extrapolation — 80 is beyond the data range.) Trust this prediction less.

### Worked Example 2

**Data:** Number of days of practice and a tennis player's serve speed (mph).

Line of best fit passes through (10, 65) and (50, 85).

Step 3: m = (85 - 65)/(50 - 10) = 20/40 = 0.5.
Step 4: Using (10, 65): 65 = 0.5(10) + b → 65 = 5 + b → b = 60.
Step 5: Equation: **y = 0.5x + 60**.
Step 6: Interpretation:
- Slope: "For each additional day of practice, the player's serve speed increases by about 0.5 mph."
- y-intercept: "A player with 0 days of formal practice would have a predicted serve speed of 60 mph." (This is somewhat plausible as a baseline speed.)

Prediction: After 30 days of practice: y = 0.5(30) + 60 = 15 + 60 = **75 mph**.

---

## Guided Practice (10 minutes)

The data below records the number of hours a plant receives sunlight per day and its height after 8 weeks (in centimeters).

| Plant | Hours Sunlight | Height (cm) |
|-------|---------------|-------------|
| 1     | 1             | 8           |
| 2     | 2             | 11          |
| 3     | 3             | 15          |
| 4     | 4             | 18          |
| 5     | 5             | 22          |
| 6     | 6             | 25          |
| 7     | 7             | 28          |
| 8     | 8             | 32          |
| 9     | 3.5           | 16          |
| 10    | 6.5           | 27          |

1. Plot the scatter plot. (x: 0 to 10; y: 0 to 40 by 5s.)

2. Draw a line of best fit.

3. Choose two points ON your line. Record them: (__, __) and (__, __).
   *(Sample: (1, 8) and (8, 32), or (0, 5) and (9, 35), depending on the student's line.)*

4. Calculate the slope. Show your work.
   *(Using sample points (1, 8) and (8, 32): m = (32 - 8)/(8 - 1) = 24/7 ≈ 3.43)*

5. Calculate or read the y-intercept. Show your work.
   *(Using (1, 8) and m ≈ 3.43: 8 = 3.43(1) + b → b = 4.57 ≈ 4.6)*

6. Write the equation of your line of best fit.
   *(y ≈ 3.43x + 4.6)*

7. Interpret the slope in context: "For each additional hour of sunlight per day, the plant grows about ___ cm taller over 8 weeks."
   *(About 3.43 cm.)*

8. Use your equation to predict the height of a plant that receives 5.5 hours of sunlight.
   *(y = 3.43(5.5) + 4.6 = 18.865 + 4.6 ≈ 23.5 cm)*

9. Use your equation to predict the height of a plant that receives 12 hours of sunlight. Is this interpolation or extrapolation? Should you trust this prediction?
   *(y = 3.43(12) + 4.6 = 41.16 + 4.6 ≈ 45.8 cm. Extrapolation — 12 is beyond the data range of 1-8 hours. Less reliable; also, plants have physical limits to how much sunlight helps them.)*

---

## Independent Practice (10-15 minutes)

### Tier 1 (On-level)

A fitness researcher records the number of minutes of vigorous exercise per week and a health metric (cardiovascular fitness score, out of 100) for 10 participants. The line of best fit passes through (60, 45) and (240, 81).

1. Calculate the slope of this line of best fit. Include units.
2. Find the y-intercept algebraically (use one of the given points). Show your work.
3. Write the equation of the line of best fit in slope-intercept form.
4. Interpret the slope: what does it mean in terms of exercise and fitness score?
5. Interpret the y-intercept: what would it mean for someone who does 0 minutes of exercise per week?
6. Predict the fitness score for someone who exercises 150 minutes per week. Show your work.
7. Is problem 6 an example of interpolation or extrapolation? (Assume data range is 60 to 300 minutes.)

### Tier 2 (Stretch)

Use the same exercise/fitness data for problems 8-10.

8. A participant's actual fitness score is 65 and they exercise 120 minutes per week. Their predicted score from the equation is approximately 57. What is the residual (actual - predicted)? What might explain this positive residual?

9. Another researcher uses the equation y = 0.18x + 35 for the same data. How is this equation different from yours? What two points would you check to determine which equation is a better fit?

10. (Interleaved — Unit 3) The equation y = 0.2x + 33 models the data. What does x need to be for y to equal 50? 65? Solve algebraically.

### Tier 3 (Challenge)

11. (Interleaved — Unit 2) You have two sets of bivariate data. Data Set A's line of best fit is y = 2x + 5. Data Set B's line of best fit is y = -x + 40. At what x-value do these two lines predict the same y-value? What might this x-value represent in a real-world scenario where x is "age in years" and y is a measurement?

---

## Exit Ticket

**Problem 1:** A line of best fit passes through (4, 22) and (10, 46). Write the equation of the line in slope-intercept form. Show all work.

**Problem 2:** In the context of the data: x = number of books read per month, y = vocabulary test score (out of 50). The equation y = 3.5x + 20 models the data. Interpret the slope and the y-intercept in one sentence each.

**Mastery = 2 out of 2 correct.**

---

## Answer Key

### Independent Practice

1. m = (81 - 45)/(240 - 60) = 36/180 = **0.2 fitness points per minute of exercise**.

2. Using (60, 45): 45 = 0.2(60) + b → 45 = 12 + b → **b = 33**. Equation: y = 0.2x + 33.

3. **y = 0.2x + 33**

4. Slope interpretation: "For each additional minute of vigorous exercise per week, a person's cardiovascular fitness score increases by about 0.2 points." Or equivalently: "For each additional 10 minutes of exercise per week, fitness score increases by about 2 points."

5. y-intercept interpretation: "A person who does 0 minutes of vigorous exercise per week has a predicted fitness score of about 33 out of 100." This represents the baseline fitness for a completely sedentary person in this study. Accept reasonable contextual interpretations.

6. y = 0.2(150) + 33 = 30 + 33 = **63**. Predicted fitness score: **63 out of 100**.

7. **Interpolation.** The data range is 60 to 300 minutes; 150 minutes falls within that range.

8. Residual = actual - predicted = 65 - 57 = **+8**. A positive residual means the actual fitness score is higher than the model predicted. Possible explanations: this person might do other types of exercise not measured (strength training, yoga), might have a naturally high baseline fitness, or might have better genetics, diet, or sleep habits than average.

9. The other researcher's equation has a slightly lower slope (0.18 vs. 0.2) and slightly higher y-intercept (35 vs. 33). To determine which is a better fit: pick two data points in the middle of the range (not the extreme ones used to build the line) and compare the residuals for each equation. The equation with smaller residuals overall is the better fit.

10. For y = 50: 50 = 0.2x + 33 → 0.2x = 17 → **x = 85 minutes**.
    For y = 65: 65 = 0.2x + 33 → 0.2x = 32 → **x = 160 minutes**.

11. Set equations equal: 2x + 5 = -x + 40 → 3x = 35 → x = 35/3 ≈ **11.67**. At this age, both models predict the same y-value. If x is age in years and y is a measurement (like height or score), this is the age where two trends converge — e.g., if one trend describes one subgroup's growth and another describes a different group's, this is the crossover point.

### Exit Ticket

1. Slope: m = (46 - 22)/(10 - 4) = 24/6 = **4**.
   Using (4, 22): 22 = 4(4) + b → 22 = 16 + b → b = **6**.
   Equation: **y = 4x + 6**. (Check with second point: y = 4(10) + 6 = 46. ✓)

2. **Slope interpretation:** For each additional book read per month, the predicted vocabulary test score increases by 3.5 points.
   **y-intercept interpretation:** A student who reads 0 books per month has a predicted vocabulary score of 20 out of 50 — representing a baseline vocabulary without any additional reading.

---

## Teacher Notes

- This is the most algebraically demanding lesson in the unit. Students who struggled in Unit 3 with slope-intercept form will need extra support in Steps 3-4. Have the Unit 3 slope formula visible as a reference.
- The most common error: students use two data points from the table to calculate slope, rather than two points on their line of best fit. The distinction matters: if their line does not pass through any of the data points (which is common), using data table values will give a slope that does not match the line they drew.
- Another common error: students forget to solve for b and just write "y = mx + (first y-value from data)." The y-intercept must be calculated, not assumed.
- Interleaved review: Tier 2 #10 and Tier 3 #11 connect directly to Unit 2 (solving equations) and Unit 3 (linear equations), explicitly practicing equation-solving skills in a data context.
- The y-intercept interpretation requires careful thinking. Sometimes the y-intercept has a meaningful context (a person with 0 books read still has baseline vocabulary skills). Sometimes it is meaningless or impossible (a temperature of 0°F for a city that never gets that cold). Help the student identify whether the y-intercept is a meaningful interpretation or just a mathematical artifact.

---

*This lesson follows the [Teaching Methodology Framework](../../../methodology/teaching-methodology-framework.md).*
