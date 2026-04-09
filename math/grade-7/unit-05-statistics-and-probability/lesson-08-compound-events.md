# Math -- Grade 7 -- Unit 5, Lesson 8

## Topic
Compound Events

## Learning Objectives
- Define a compound event as an event involving two or more simple events.
- List all outcomes of a compound event using organized lists, tree diagrams, and two-way tables.
- Use the Fundamental Counting Principle to determine the size of a sample space.
- Calculate the probability of a compound event.

## Prerequisites
- Theoretical probability and sample spaces (Lessons 5-6).
- Systematic list-making skills.
- Fraction arithmetic (Unit 2).

## Materials Needed
- Two coins (for demonstration and guided practice)
- A number cube (for demonstration and guided practice)
- Colored pencils (optional; for color-coding tree diagrams)
- Student worksheet (Guided Practice and Independent Practice)
- Index cards for Exit Ticket

**Standards:** 7.SP.8 -- Find probabilities of compound events using organized lists, tables, tree diagrams, and simulation.

---

## Warm-Up (5 minutes)

**Purpose:** Activate systematic thinking.

Ask: "I'm going to flip a coin and roll a number cube at the same time. What are all the possible outcomes? Try to list them."

Give the student 2-3 minutes to attempt this independently.

Common incomplete answers: Students might list only a few combinations or not organize systematically.

Debrief: "How do we make sure we've found all possible combinations? How many did you find? Today, you'll learn a system that guarantees you find every single outcome."

---

## Direct Instruction (15 minutes)

### Key Vocabulary

- **Compound event** -- an event that involves two or more simple events happening together. Example: flipping a coin AND rolling a number cube.
- **Fundamental Counting Principle** -- if one event can happen in m ways and a second event can happen in n ways, then both events together can happen in m * n ways.
- **Tree diagram** -- a branching diagram that shows all possible outcomes of a compound event by branching for each stage.
- **Organized list** -- a systematic listing of all possible outcomes, often organized by fixing one variable and varying the other.
- **Two-way table** -- a grid where rows represent outcomes of one event and columns represent outcomes of another; each cell shows a compound outcome.

### Instruction Notes

**Step 1 -- The Fundamental Counting Principle.**

Say: "Before we list all outcomes, let's predict how many there are. If Event A has 3 possible outcomes and Event B has 4 possible outcomes, then (A and B together) has 3 * 4 = 12 possible outcomes. This is the Fundamental Counting Principle."

Examples:
- Flip a coin (2 outcomes) AND roll a 6-sided die (6 outcomes): 2 * 6 = **12 compound outcomes**
- Choose a shirt (3 colors) AND pants (4 styles): 3 * 4 = **12 outfits**
- Choose a first initial (26 letters) AND a number (10 digits): 26 * 10 = **260 combinations**

**Step 2 -- Organized lists.**

Say: "An organized list systematically goes through all possibilities. Fix the first event, then list all variations of the second event. Then move to the next outcome of the first event."

Example: Flip a coin and roll a die.
- H1, H2, H3, H4, H5, H6
- T1, T2, T3, T4, T5, T6

Total: 12 outcomes. Organized and complete.

**Step 3 -- Tree diagrams.**

Say: "A tree diagram shows the same information visually as branching paths. Each 'branch' represents one possible outcome. At the end of each path, you read the compound outcome."

Draw on board:

```
Coin flip:   H ------> 1
                  \--> 2
                  \--> 3
                  \--> 4
                  \--> 5
                  \--> 6

             T ------> 1
                  \--> 2
                  \--> 3
                  \--> 4
                  \--> 5
                  \--> 6
```

Each path from left to right is one compound outcome: (H,1), (H,2), ..., (T,5), (T,6). 12 total outcomes.

**Step 4 -- Two-way tables.**

Say: "A two-way table organizes compound outcomes in a grid. Rows represent outcomes of one event, columns represent outcomes of the other. This works well when each event has several outcomes."

Example: Rolling two number cubes. Both can show 1-6.

| | **Die 2: 1** | **Die 2: 2** | **Die 2: 3** | **Die 2: 4** | **Die 2: 5** | **Die 2: 6** |
|---|---|---|---|---|---|---|
| **Die 1: 1** | (1,1) | (1,2) | (1,3) | (1,4) | (1,5) | (1,6) |
| **Die 1: 2** | (2,1) | (2,2) | (2,3) | (2,4) | (2,5) | (2,6) |
| **Die 1: 3** | (3,1) | (3,2) | (3,3) | (3,4) | (3,5) | (3,6) |
| **Die 1: 4** | (4,1) | (4,2) | (4,3) | (4,4) | (4,5) | (4,6) |
| **Die 1: 5** | (5,1) | (5,2) | (5,3) | (5,4) | (5,5) | (5,6) |
| **Die 1: 6** | (6,1) | (6,2) | (6,3) | (6,4) | (6,5) | (6,6) |

Total: 36 outcomes.

**Step 5 -- Calculating compound probability.**

Once the sample space is complete:
P(compound event) = number of favorable compound outcomes / total compound outcomes

Example: When flipping a coin and rolling a die, what is P(heads AND an even number)?
- Favorable: (H,2), (H,4), (H,6) → 3 outcomes
- Total: 12
- P(H and even) = 3/12 = 1/4

### Worked Examples

**Example A: Two coin flips**

List all outcomes. What is P(exactly one head)?

- Sample space: {HH, HT, TH, TT} -- 2 * 2 = 4 outcomes
- Exactly one head: {HT, TH} -- 2 outcomes
- P(exactly one head) = 2/4 = 1/2

**Example B: Spinner and coin**

A spinner has 3 equal sections: Red (R), Blue (B), Green (G). A coin is flipped at the same time.

Sample space (using a list): R-H, R-T, B-H, B-T, G-H, G-T -- 3 * 2 = 6 outcomes.

P(Blue and Heads) = 1/6.
P(not Red) = outcomes not involving R: {B-H, B-T, G-H, G-T} = 4/6 = 2/3.

**Example C: Two dice -- using the table**

Using the 6x6 table above:
(a) P(sum = 7): Outcomes with sum 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 outcomes. P = 6/36 = 1/6.
(b) P(both dice show the same number): (1,1),(2,2),(3,3),(4,4),(5,5),(6,6) = 6 outcomes. P = 6/36 = 1/6.
(c) P(sum greater than 10): (5,6),(6,5),(6,6) = 3 outcomes. P = 3/36 = 1/12.

---

## Guided Practice (10 minutes)

**Scenario:** A student is choosing an outfit. She has 3 shirt colors (Red, White, Blue) and 2 pants styles (Jeans, Khakis). She also picks a hat -- either a cap or a beanie.

1. How many total outfit combinations are possible? (Use the Fundamental Counting Principle.)
   - Shirts * Pants * Hats = 3 * 2 * 2 = **12 outfits**.
   - **Facilitator tip:** "Multiply the number of choices for each item."

2. Draw a tree diagram showing all 12 outfits. (Start with shirt color, then pants, then hat.)
   - Student draws tree: R → Jeans → Cap, Beanie; R → Khakis → Cap, Beanie; W → Jeans → Cap, Beanie; etc.
   - **Facilitator tip:** "Each branch extends to a new choice. Count the endpoints to verify = 12."

3. If each outfit is equally likely to be chosen, what is the probability she wears a Red shirt?
   - Red shirt outfits: R-Jeans-Cap, R-Jeans-Beanie, R-Khakis-Cap, R-Khakis-Beanie = 4 outfits out of 12.
   - P(Red shirt) = 4/12 = 1/3.
   - **Facilitator tip:** "Count all endpoints where the shirt is Red."

4. What is P(Jeans AND a cap)?
   - Outcomes with Jeans AND Cap: R-Jeans-Cap, W-Jeans-Cap, B-Jeans-Cap = 3 outfits.
   - P = 3/12 = 1/4.

5. What is P(NOT a blue shirt)?
   - Not-blue shirts: Red or White → 4 + 4 = 8 outfits.
   - P = 8/12 = 2/3.

---

## Independent Practice (12 minutes)

### Tier 1 (On-level)

1. A coin is flipped and a spinner with 4 equal sections (1, 2, 3, 4) is spun.
   - (a) How many outcomes are in the sample space?
   - (b) List all outcomes using an organized list.
   - (c) What is P(heads AND an odd number)?
   - (d) What is P(tails AND 4)?

2. A snack booth offers a choice of chips or pretzels AND a drink of water, juice, or soda.
   - (a) Create a two-way table showing all possible snack combinations.
   - (b) How many total combinations are there?
   - (c) If a student picks randomly, what is P(chips AND juice)?

3. A student's locker combination has 3 positions, each a number from 1 to 4. How many possible three-digit combinations are there? (Repetition allowed.)

### Tier 2 (Stretch)

4. Two number cubes are rolled. Use a table or list to find:
   - (a) P(sum = 4)
   - (b) P(sum is greater than or equal to 10)
   - (c) P(one die shows a 6)
   - (d) P(both dice show a 6)

5. A game involves spinning a spinner (sections: 1, 2, 3) and rolling a number cube (faces: 1-6). A player wins if the spinner number matches the number cube.
   - (a) How many outcomes are in the sample space?
   - (b) How many outcomes are winning outcomes?
   - (c) What is P(win)?

### Tier 3 (Challenge)

6. Interleaved review (Unit 2 -- Rational Numbers): A bag has 3 red and 5 blue chips. A chip is drawn (without replacement) and then a second chip is drawn. (This is a compound event where outcomes change!)
   - (a) If the first chip is red, how many chips remain? How many are red?
   - (b) Draw a tree diagram showing all possible outcomes for draws 1 and 2, including the number of each color at each stage.
   - (c) How many total 2-draw outcomes are possible? (Hint: it's not 8*8 since replacement is not allowed.)
   - (d) How many outcomes result in drawing two red chips? What is P(red, then red)?

7. A cafeteria serves lunch to 3 groups: 7th graders, 8th graders, and teachers. The probability that a randomly chosen person chooses pizza is 0.5 for 7th graders, 0.4 for 8th graders, and 0.3 for teachers. If 100 of each group eat lunch, what is the total expected number of people who choose pizza across all three groups?

---

## Exit Ticket

**Problem 1:** A bag has 2 green (G) and 3 yellow (Y) chips. A chip is drawn and replaced, then drawn again. List all possible outcomes of the two draws (treat each chip as identical within a color). Use the Fundamental Counting Principle to verify your count.

**Problem 2:** Using the sample space from Problem 1, find P(both draws are green).

**Problem 3:** Find P(at least one yellow chip in two draws).

**Mastery:** Sample space complete and both probabilities correct = Mastery. Sample space incomplete (missed some outcomes) = Reteach systematic listing with tree diagram. Probability formula error = Review P = favorable/total.

---

## Answer Key

### Independent Practice

1. (a) 2 * 4 = **8 outcomes**. (b) H1, H2, H3, H4, T1, T2, T3, T4. (c) Heads AND odd: H1, H3 = 2 outcomes. P = 2/8 = **1/4**. (d) Tails AND 4: T4 = 1 outcome. P = 1/8.

2. (a)

| | Water | Juice | Soda |
|---|---|---|---|
| Chips | Chips-Water | Chips-Juice | Chips-Soda |
| Pretzels | Pretzels-Water | Pretzels-Juice | Pretzels-Soda |

(b) 2 * 3 = **6 combinations**. (c) P(Chips AND Juice) = 1/6.

3. 4 * 4 * 4 = **64 possible combinations**.

4. Using the 6x6 table (36 total outcomes): (a) Sum = 4: (1,3),(2,2),(3,1) = 3 outcomes. P = 3/36 = **1/12**. (b) Sum ≥ 10: (4,6),(5,5),(5,6),(6,4),(6,5),(6,6) = 6 outcomes. P = 6/36 = **1/6**. (c) "One die shows a 6" (at least one): Count outcomes where die 1 = 6 OR die 2 = 6. Die 1 = 6: (6,1),(6,2),(6,3),(6,4),(6,5),(6,6) = 6. Die 2 = 6: (1,6),(2,6),(3,6),(4,6),(5,6),(6,6) = 6. Overlap (both = 6): (6,6) counted twice. Total = 6+6-1 = 11. P = 11/36. (d) P(both show 6) = 1/36.

5. (a) Spinner (3 outcomes) * Die (6 outcomes) = 3 * 6 = **18 outcomes**. (b) Winning = spinner matches die. Spinner shows 1, die shows 1: (1,1); spinner shows 2, die shows 2: (2,2); spinner shows 3, die shows 3: (3,3). **3 winning outcomes**. (c) P(win) = 3/18 = **1/6**.

6. (a) If first chip is red: 7 chips remain (2 red, 5 blue). (b) Tree diagram: First draw: R (3/8) or B (5/8). If first = R (3 red, 5 blue, 8 total): Second draw outcomes: R (2 remaining red out of 7) or B (5 blue out of 7). If first = B: Second draw: R (3 red out of 7) or B (4 blue out of 7). All four paths: R-R, R-B, B-R, B-B. (c) Total ordered 2-draw outcomes = 8 * 7 = **56** (first draw: 8 choices; second draw: 7 remaining). (d) R-R outcomes: 3 choices for first red * 2 choices for second red = 6 outcomes. P(red, then red) = 6/56 = **3/28**.

7. Expected pizza choosers: 7th graders: 0.5 * 100 = 50; 8th graders: 0.4 * 100 = 40; teachers: 0.3 * 100 = 30. Total = **120 people**.

### Exit Ticket

1. Sample space: 2 colors (G, Y), drawn twice with replacement. Outcomes: GG, GY, YG, YY. Fundamental Counting Principle: 2 * 2 = 4 outcomes. (Note: treating colors, not individual chips, as outcomes. With individual chips: 5 * 5 = 25, but since we care about color only, treating as 2-choice experiment.)

2. P(both green) = P(GG) = 1 outcome out of 4 = **1/4**. (Using probabilities: P(G) = 2/5 on each draw. P(G,G) = 2/5 * 2/5 = 4/25. This is the more precise calculation if individual chips are considered -- accept either interpretation and use to discuss the distinction between color-only and chip-specific sample spaces.)

3. P(at least one yellow) = 1 - P(no yellow) = 1 - P(GG). Using the color model: 1 - 1/4 = **3/4**. Outcomes with at least one yellow: GY, YG, YY = 3 out of 4. Consistent.

---

## Teacher Notes

- Lesson 8 is the most technically demanding lesson in the unit. Budget time generously -- two sessions if needed.
- The three methods (organized list, tree diagram, two-way table) are all equivalent. Encourage the student to try all three on early problems, then choose the most efficient method for later problems.
- Tree diagrams work best when the sample space is not too large (e.g., 2-3 branches at 2 levels = manageable). Two-way tables work best when both events have several outcomes (e.g., two dice).
- Problem 6 (without replacement) is a challenge problem introducing dependent events, which is beyond 7.SP.8 but is an excellent extension for strong students. Do not require this for all students.
- Common error: students list compound outcomes but count a combined outcome as two separate outcomes. For example, for two coin flips, they might list "HT and TH" as one outcome. Emphasize order matters: HT (Heads first, Tails second) is different from TH.
- For Problem 4c, the "at least one 6" calculation requires attention to avoid double-counting. The organized table makes this visual.

---
*This lesson follows the [Teaching Methodology Framework](../../../methodology/teaching-methodology-framework.md).*
