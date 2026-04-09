# Math -- Grade 7 -- Unit 5, Lesson 9

## Topic
Simulations

## Learning Objectives
- Explain what a simulation is and why simulations are used to estimate probability.
- Design a simulation that models a real-world probability situation using coins, number cubes, or spinners.
- Run a simulation, record results, and use relative frequency to estimate the probability.
- Compare simulation estimates to theoretical probabilities when available.

## Prerequisites
- Experimental probability and the Law of Large Numbers (Lesson 7).
- Compound events and sample spaces (Lesson 8).
- Ability to translate a real-world probability situation into a mathematical model.

## Materials Needed
- Coins (2 per student)
- Two 6-sided number cubes
- Colored chips in a bag (optional, for replacement-based simulations)
- Spinner templates (optional -- divide a circle into sections; use a pencil and paperclip as the spinner)
- Tally sheets for recording simulation results
- Calculator
- Student worksheet (Guided Practice and Independent Practice)
- Index cards for Exit Ticket

**Standards:** 7.SP.8c -- Design a simulation to generate frequencies for compound events.

---

## Warm-Up (5 minutes)

**Purpose:** Review experimental probability and connect to the concept of simulation.

Ask: "A basketball player makes 70% of their free throws. If she takes 2 free throws at the end of a game, what is the probability she makes both? How could you estimate this if you couldn't calculate it?"

Accept initial attempts. Likely student approaches: calculating (0.7 * 0.7 = 0.49), or guessing, or saying "run the experiment with a basketball."

Say: "We can't always run the real experiment -- maybe it's too expensive, too slow, or physically impossible. A simulation uses a simple random tool (a coin, a die, a spinner) to stand in for the real event. Today we learn how to design and run simulations."

---

## Direct Instruction (12 minutes)

### Key Vocabulary

- **Simulation** -- a model that uses a simple random process to represent a real-world probability situation and generate data to estimate probabilities.
- **Model assignment** -- deciding which simulation outcome represents which real-world outcome. Example: "Heads = makes a free throw, Tails = misses."
- **Trial** -- one complete run of the simulation (e.g., flipping two coins represents two free throws).
- **Favorable trial** -- a trial in which the simulated event of interest occurs (e.g., both coins show heads = makes both free throws).

### Instruction Notes

**Step 1 -- Why simulate?**

Say: "Some real-world probability questions are easy to calculate (flip a coin, what's P(heads)?). But others are complex: 'What's the probability that a family with 4 children has at least 3 girls?' or 'What's the probability that a baseball player who hits .300 gets 2 hits in their first 3 at-bats?' We could calculate these, but simulations let us estimate them quickly with physical tools."

Say: "Simulations are especially powerful for situations that would be impractical to actually run -- like predicting how often an airplane part fails after 10,000 flights."

**Step 2 -- Designing a simulation: three steps.**

Write on board:

**Step 1:** Identify the probability of the real-world event.
**Step 2:** Choose a simulation tool that matches that probability.
**Step 3:** Define what constitutes one trial and what constitutes a favorable outcome.

Example: A basketball player makes 50% of her shots. We want to simulate whether she makes her next 3 shots.

- Step 1: P(makes a shot) = 50% = 1/2
- Step 2: Flip a coin. Heads = makes the shot, Tails = misses.
- Step 3: One trial = 3 coin flips (representing 3 shots). Favorable outcome depends on the question: "makes all 3" = HHH; "makes at least 2" = HHH, HHT, HTH, THH.

**Step 3 -- Choosing the right simulation tool.**

| Real-world probability | Simulation tool | Model assignment |
|------------------------|-----------------|-----------------|
| 50% | Coin flip | Heads = success, Tails = failure |
| 1/6 ≈ 16.7% | Roll a number cube | One specific face = success, others = failure |
| 1/3 ≈ 33.3% | Roll a number cube | Two specific faces = success, others = failure |
| 30% | Spinner (3 out of 10 equal sections) | 3 sections = success, 7 sections = failure |
| Any percent | Random number table or random digit | Assign digits to match the probability |

Say: "The key principle: the simulation tool must have the same probability as the real event. If P = 0.3, I need a tool that produces 'success' 30% of the time."

**Step 4 -- Running the simulation.**

1. Define the trial (what combination of outcomes represents one real-world scenario).
2. Run many trials (at least 20-30; more is better).
3. Record results in a tally table.
4. Calculate relative frequency: (favorable trials) / (total trials).
5. Compare to the theoretical probability (if calculable).

### Worked Example

**Scenario:** A multiple-choice quiz has 4 questions, each with choices A, B, C, D. A student guesses randomly on all 4. What is the probability that she gets at least 3 correct?

**Theoretical probability** (for reference):
- P(correct on one question) = 1/4.
- P(at least 3 correct out of 4) = P(exactly 3) + P(exactly 4).
- P(exactly 3) = 4 * (1/4)^3 * (3/4) = 4 * (1/64) * (3/4) = 12/256 = 3/64.
- P(exactly 4) = (1/4)^4 = 1/256.
- P(at least 3) = 12/256 + 1/256 = 13/256 ≈ 5.1%.

**Simulation design:**
- P(correct) = 1/4. Use a number cube: "Roll a 1 or 2 = correct (2 out of 6 is not right -- need 1 out of 4)."
- Better: Use a 4-section spinner (equal sections, labeled 1-4). Section 1 = correct, sections 2-4 = incorrect.
- One trial = 4 spins (one per question).
- Favorable trial = at least 3 spins land on "1."

**Run 20 trials** (the student rolls a number cube 4 times per trial; since a 6-sided cube does not have exactly 1/4 probability for any side combination, use a coin twice: HH = correct, HT/TH/TT = incorrect. P(HH) = 1/4.)

Record sample results (these are illustrative -- actual results vary):

| Trial | Q1 | Q2 | Q3 | Q4 | # Correct | At Least 3 Correct? |
|-------|----|----|----|----|-----------|----------------------|
| 1 | Miss | Hit | Miss | Miss | 1 | No |
| 2 | Miss | Miss | Miss | Hit | 1 | No |
| 3 | Hit | Miss | Hit | Hit | 3 | Yes |
| ... | | | | | | |

After 20 trials, suppose 1 favorable trial (at least 3 correct).

Simulation estimate: P(at least 3 correct) ≈ 1/20 = 0.05 = 5%.
Theoretical probability ≈ 5.1%.
These are very close, showing the simulation is working.

---

## Guided Practice (10 minutes)

**Scenario:** A soccer player makes 2/3 of her penalty kicks. She has 3 penalty kicks in a tournament shootout. What is the probability she makes all 3?

Design and run a simulation together:

1. What is P(makes a kick)?
   - P = 2/3. We need a tool with a 2/3 probability.
   - **Facilitator tip:** "Which faces of a number cube would you assign to 'makes it'?"

2. Choose a simulation tool and assign outcomes.
   - Use a number cube. "Rolls of 1, 2, 3, or 4 = makes the kick (4/6 = 2/3). Rolls of 5 or 6 = misses." Wait -- 4/6 = 2/3. Yes, this works.
   - (Alternative: Roll 1,2,3,4 = makes it; 5,6 = misses.)
   - **Facilitator tip:** "4 out of 6 faces = 2/3 probability. Which 4 do you choose? It doesn't matter which 4 -- any 4 faces will do."

3. Define one trial.
   - Roll the number cube 3 times (one for each penalty kick).

4. Define a favorable outcome.
   - All 3 rolls are "makes" (faces 1-4).

5. Run 20 trials. Record in the table:

| Trial | Kick 1 | Kick 2 | Kick 3 | All 3 Made? |
|-------|--------|--------|--------|-------------|
| 1 | | | | |
| ... | | | | |
| 20 | | | | |

6. Calculate the simulation estimate: favorable trials / 20.
   - Answers vary by experiment. Theoretical P(all 3 made) = (2/3)^3 = 8/27 ≈ 29.6%.
   - Simulation estimate should be in the range of 20-40% with 20 trials.
   - **Facilitator tip:** "Is your estimate close to 8/27? What would happen with 100 trials?"

---

## Independent Practice (12 minutes)

### Tier 1 (On-level)

1. A student guesses on every question of a true/false quiz with 5 questions. Design a simulation to estimate P(gets at least 4 correct).
   - (a) What is P(correct on one question)?
   - (b) Which simulation tool will you use? How will you assign outcomes?
   - (c) What constitutes one trial?
   - (d) What constitutes a favorable outcome?
   - (e) Run 20 trials. Record and compute the simulation estimate.

2. A free-throw shooter makes 75% of free throws. Design a simulation using a number cube.
   - (a) How will you assign faces to "makes it" and "misses"?
   - (b) Describe one trial that represents the player taking 2 free throws.
   - (c) Run 15 trials. What is the experimental probability that the player makes both free throws?

### Tier 2 (Stretch)

3. A family has 3 children. Assume equal probability of boy or girl (50% each).
   - (a) Design a simulation (using a coin) to estimate P(all 3 children are the same gender).
   - (b) Run 25 trials. Record your data.
   - (c) What is the theoretical probability that all 3 are the same gender?
   - (d) Compare your simulation estimate to the theoretical probability.

4. A restaurant has a "lucky meal deal" -- 1 in 8 orders comes with a free dessert. Design a simulation using a number cube to estimate P(getting a free dessert in your next 3 orders). How many possible simulation designs work for this problem? (Hint: there are multiple valid tool assignments.) Describe two.

### Tier 3 (Challenge)

5. Interleaved review (Unit 3 -- Equations): A simulation is run to estimate P(event). After n trials, the event occurred 18 times and the relative frequency is 0.36. Write and solve an equation to find n.

6. A baseball player has a batting average of 0.250 (hits 1 out of 4 at-bats). Design a simulation to estimate the probability that the player gets at least 1 hit in 4 at-bats.
   - (a) What tool will you use and how?
   - (b) Run 30 trials.
   - (c) Theoretical P(at least 1 hit in 4 at-bats) = 1 - P(0 hits in 4 at-bats) = 1 - (3/4)^4. Calculate this theoretical probability.
   - (d) How does your simulation compare?

---

## Exit Ticket

**Problem 1:** A student wants to simulate flipping a coin 3 times and getting exactly 2 heads. She will use a number cube. How should she assign the faces? (There are multiple correct answers -- any valid assignment receives credit.)

**Problem 2:** She runs 20 trials. In 7 of them, exactly 2 of the 3 flips are heads. What is her simulation estimate of P(exactly 2 heads in 3 flips)?

**Problem 3:** The theoretical P(exactly 2 heads in 3 flips) = 3/8. Is the simulation estimate from Problem 2 reasonable? Explain.

**Mastery:** Valid assignment in P1, correct relative frequency in P2, and reasonable comparison in P3 = Mastery. Problems 1-2 correct but P3 unexplained = Review Law of Large Numbers. Assignment in P1 incorrect = Review how to match simulation tool probability to real-world probability.

---

## Answer Key

### Independent Practice

1. (a) P(correct on one T/F question) = 1/2. (b) Use a coin: Heads = correct, Tails = incorrect. (c) One trial = 5 coin flips (one per question). Count how many are heads. (d) Favorable outcome = 4 or 5 heads. (e) Results vary. Theoretical: P(4 correct) = 5*(1/2)^5 = 5/32 ≈ 15.6%. P(5 correct) = (1/2)^5 = 1/32 ≈ 3.1%. P(at least 4) ≈ 18.75%. Accept any simulation estimate in the range 10%-30% as reasonable with 20 trials.

2. (a) 75% = 3/4. On a number cube: "Rolls 1, 2, 3, or 4 = makes it; rolls 5 or 6 = misses." (4/6 is not 3/4 -- this is a common design challenge.) Better approach: Use two dice. If first die is 1-3, go to first die result; if 4-6... Actually, simpler: Tell the student to ignore rolls of 5 and 6 and re-roll (using only outcomes 1-4, then 3 out of 4 = makes it). Or, use a spinner divided into 4 equal sections (3 = makes, 1 = misses). Accept any valid assignment that produces 75% success rate. (b) One trial = 2 rolls (2 free throws). Favorable = both rolls land on "makes it" faces. (c) Results vary. Theoretical P(makes both) = (3/4)^2 = 9/16 ≈ 56.3%.

3. (a) Use a coin: Heads = girl, Tails = boy (or vice versa). One trial = 3 flips. Favorable = all 3 same (HHH or TTT). (b) Results vary over 25 trials. (c) P(all same) = P(all girls) + P(all boys) = (1/2)^3 + (1/2)^3 = 1/8 + 1/8 = **2/8 = 1/4 = 25%**. (d) Accept simulation estimate in range 15%-35% as reasonable with 25 trials.

4. P(free dessert) = 1/8. A number cube cannot produce probability of 1/8 directly. Design 1: Use two number cubes. Define "success" = both cubes show a 1 (1/6 * 1/6 = 1/36 -- too small). This does not work. Instead, use a random digit approach or a spinner divided into 8 equal sections. Design 1: 8-section spinner -- section 1 = free dessert, sections 2-8 = no dessert. Design 2: Roll a cube twice. If first roll is 1-4 (ignore 5-6), and second roll is 1-2 (out of 4 options), that gives P = (1/2)*(1/4) = 1/8. [Other valid designs exist. Credit any that correctly produce P = 1/8.] One trial = 3 spins/draws. Favorable = at least 1 free dessert in 3 orders.

5. Relative frequency = events / total trials. 0.36 = 18/n. n = 18/0.36 = **50 trials**.

6. (a) P(hit) = 1/4. Use a number cube: "Roll a 1 = hit; rolls 2, 3, 4, 5, 6 = out." (Not exactly 1/4 since 1 out of 6 = 1/6. Need a better tool.) Better: Use a 4-section spinner: section 1 = hit, sections 2-4 = out. Or: Flip 2 coins -- HH = hit (P = 1/4), any other = out. One trial = 4 at-bats (4 spins or 4 double-coin-flips). (b) Results vary. (c) P(0 hits in 4 at-bats) = (3/4)^4 = 81/256. P(at least 1 hit) = 1 - 81/256 = **175/256 ≈ 68.4%**. (d) Accept simulation estimates in range 55%-80% as reasonable with 30 trials.

### Exit Ticket

1. Valid assignment: a coin has P(heads) = 1/2. On a number cube: rolls 1, 2, or 3 = heads; rolls 4, 5, or 6 = tails. One trial = 3 rolls. Any equivalent assignment is also correct.

2. Favorable trials = 7 out of 20. Simulation estimate = 7/20 = **0.35 = 35%**.

3. Theoretical P(exactly 2 heads in 3 flips) = 3/8 = 0.375 = 37.5%. The simulation estimate of 35% is very close to 37.5% -- only 2.5% off. This is a reasonable result for 20 trials; the Law of Large Numbers says that with more trials, the simulation estimate would get even closer to 37.5%. The estimate is reasonable.

---

## Teacher Notes

- Simulation is one of the most creative and open-ended topics in the unit. Encourage the student to design their own simulation for any real-world scenario they care about (sports, games, school events).
- The "how to assign faces" step is where most design errors occur. Check the student's assignment by verifying: "What fraction of the simulation outcomes correspond to the real-world success?" If it doesn't match the real-world probability, the design is wrong.
- For probabilities like 1/8 or 1/3, students need to be creative. Multiple valid designs exist. Accept any correct design.
- Running the simulation is more important than the exact number of trials. 20-30 trials is sufficient for this lesson's purposes. If a student is enthusiastic, encourage running 50 or 100 trials for better estimates.
- This lesson connects beautifully to computational thinking and coding -- many professional simulations are computer programs that run millions of virtual trials. Mention this as a preview of future mathematics and computer science coursework.

---
*This lesson follows the [Teaching Methodology Framework](../../../methodology/teaching-methodology-framework.md).*
