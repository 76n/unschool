# Math -- Grade 7 -- Unit 5, Lesson 6

## Topic
Theoretical Probability

## Learning Objectives
- List all outcomes in a sample space using organized lists and tables.
- Calculate theoretical probability for simple events using P(event) = favorable/total.
- Verify that all probabilities in a sample space sum to 1.
- Solve problems involving the complement of an event: P(not A) = 1 - P(A).

## Prerequisites
- Probability as a number from 0 to 1; P = favorable/total formula (Lesson 5).
- Fluency with fractions and conversion between fractions, decimals, percents (Unit 2).
- Ability to solve simple equations (Unit 3) for finding unknown quantities from given probabilities.

## Materials Needed
- A standard number cube (6-sided die)
- A standard deck of cards (or a representation of one)
- A bag with colored chips or labeled paper slips
- Student worksheet (Guided Practice and Independent Practice)
- Index cards for Exit Ticket

**Standards:** 7.SP.7 -- Develop a probability model and use it to find probabilities of events. Compare probabilities from a model to observed frequencies.

---

## Warm-Up (5 minutes)

**Purpose:** Reinforce the probability formula and activate prior knowledge.

Show the student a bag with 12 colored chips: 5 red, 4 blue, 3 green.

Ask:
1. "Without calculating, which color is most likely to be drawn?"
2. "List all three probabilities as fractions."
   - P(red) = 5/12; P(blue) = 4/12 = 1/3; P(green) = 3/12 = 1/4
3. "Add all three probabilities. What do you get?"
   - 5/12 + 4/12 + 3/12 = 12/12 = 1
4. "What is P(not blue)?"
   - P(not blue) = 1 - 4/12 = 8/12 = 2/3

Say: "In Lesson 5, we practiced the formula. Today we go deeper -- we'll practice building complete sample spaces so we can be sure we haven't missed any outcomes, and we'll use the complement rule to solve problems efficiently."

---

## Direct Instruction (12 minutes)

### Key Vocabulary

- **Sample space** -- the complete set of all possible outcomes for an experiment.
- **Uniform probability model** -- a model in which all outcomes are equally likely (e.g., a fair coin, a fair die).
- **Non-uniform probability model** -- a model in which outcomes are not equally likely (e.g., a spinner with unequal sections).
- **Complement** -- the complement of event A is "A does not happen." Written P(A') or P(not A). P(A) + P(not A) = 1.

### Instruction Notes

**Step 1 -- Listing sample spaces completely.**

Say: "The most common error in probability is forgetting some outcomes in the sample space. We need to be systematic."

For a number cube: Simply list all 6 faces: {1, 2, 3, 4, 5, 6}. Easy.

For a deck of cards: The sample space has 52 outcomes. Organized by suit: 13 hearts, 13 diamonds, 13 clubs, 13 spades. Within each suit: Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King.

For a more complex experiment (drawing from a bag with repeated items): Each chip is a separate outcome, even if two chips have the same color. A bag with 3 red chips and 2 blue chips has 5 outcomes; 3 of those outcomes result in "red."

**Step 2 -- Uniform vs. non-uniform probability models.**

Say: "When all outcomes are equally likely -- like a fair number cube -- we can directly apply P = favorable/total. But sometimes the outcomes have different probabilities."

Example: A spinner has sections of different sizes: 40% red, 30% blue, 20% green, 10% yellow. These are not equally likely. The probability of each color equals its fraction of the total area.

- P(red) = 0.40; P(blue) = 0.30; P(green) = 0.20; P(yellow) = 0.10.
- Check: 0.40 + 0.30 + 0.20 + 0.10 = 1.00. Yes, all probabilities sum to 1.

**Step 3 -- The complement rule.**

Say: "Sometimes it's easier to find the probability of what you DON'T want, then subtract from 1."

Formula: **P(not A) = 1 - P(A)** (equivalently, P(A) + P(not A) = 1)

Example: A number cube is rolled. What is P(not 6)?

- P(6) = 1/6
- P(not 6) = 1 - 1/6 = 5/6

This matches listing: {1,2,3,4,5} = 5 favorable outcomes out of 6. Same answer.

When complement is more efficient: "A bag has 20 chips: 3 red, 2 blue, 5 green, 4 yellow, 4 orange, 2 purple. What is P(not green)?"
- P(green) = 5/20 = 1/4.
- P(not green) = 1 - 1/4 = 3/4.
- (Much easier than counting all non-green chips: 3+2+4+4+2 = 15, then 15/20 = 3/4.)

### Worked Examples

**Example A: Number cube probabilities**

A fair 6-sided number cube is rolled. Find:
(a) P(odd number)
(b) P(multiple of 3)
(c) P(greater than 4)
(d) P(less than or equal to 2)
(e) P(odd or even)

- Sample space: {1,2,3,4,5,6}
- (a) Odd: {1,3,5} → P = 3/6 = 1/2
- (b) Multiples of 3: {3,6} → P = 2/6 = 1/3
- (c) Greater than 4: {5,6} → P = 2/6 = 1/3
- (d) Less than or equal to 2: {1,2} → P = 2/6 = 1/3
- (e) Odd or even covers all numbers 1-6 → P = 6/6 = 1 (certain event)

**Example B: Cards**

A card is drawn from a standard deck of 52. Find:
(a) P(King)
(b) P(heart)
(c) P(red card)
(d) P(face card) [face cards: Jack, Queen, King in each suit; 3 per suit * 4 suits = 12 face cards]
(e) P(not a face card)

- (a) 4 kings / 52 = 1/13 ≈ 7.7%
- (b) 13 hearts / 52 = 1/4 = 25%
- (c) 26 red cards / 52 = 1/2 = 50%
- (d) 12 face cards / 52 = 3/13 ≈ 23.1%
- (e) P(not face card) = 1 - 3/13 = 10/13 ≈ 76.9%

**Example C: Non-uniform model**

A spinner has the following sections: Red = 1/4, Blue = 1/4, Green = 1/3, Yellow = 1/6.

Verify these probabilities sum to 1: 1/4 + 1/4 + 1/3 + 1/6 = 3/12 + 3/12 + 4/12 + 2/12 = 12/12 = 1. Yes.

(a) P(green or yellow) = 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2
(b) P(not red) = 1 - 1/4 = 3/4

---

## Guided Practice (10 minutes)

**Activity:** Students work with cards and number cubes.

**Part A: Deck of cards**

Present these questions. Work through them together, listing the favorable outcomes.

1. A card is drawn at random. What is P(number card less than 6)? [Count: Aces through 5s. Each suit has: A,2,3,4,5 = 5 cards. 4 suits = 20 cards total.]
   - P = 20/52 = 5/13 ≈ 38.5%
   - **Facilitator tip:** "List the favorable cards by suit to avoid missing any."

2. What is P(drawing a black King)?
   - Black Kings: King of Spades, King of Clubs = 2 cards.
   - P = 2/52 = 1/26 ≈ 3.8%

3. What is P(not a heart)?
   - P(heart) = 13/52 = 1/4.
   - P(not heart) = 1 - 1/4 = **3/4**.

**Part B: Spinner with unequal sections**

A spinner has 4 sections. The probability of landing on each section:
- Red: P = 0.35
- Blue: P = 0.25
- Green: P = ?
- Yellow: P = 0.20

4. What is P(green)? (All probabilities must sum to 1.)
   - 0.35 + 0.25 + P(green) + 0.20 = 1. P(green) = 1 - 0.80 = **0.20**.

5. What is P(not red)?
   - P(not red) = 1 - 0.35 = **0.65**.

6. Is this a uniform probability model? How do you know?
   - No. A uniform model would have equal probabilities for all sections. Red (0.35) ≠ Green (0.20) ≠ other sections.

---

## Independent Practice (12 minutes)

### Tier 1 (On-level)

1. A bag contains: 6 orange chips, 4 green chips, 5 purple chips, 3 white chips. A chip is drawn at random.
   - (a) What is the total number of outcomes?
   - (b) P(orange)
   - (c) P(white)
   - (d) P(not green)
   - (e) P(orange or purple)

2. A standard number cube is rolled. Find each probability and express as a fraction and percent.
   - (a) P(prime number) [Prime: 2, 3, 5]
   - (b) P(factor of 6) [Factors of 6: 1, 2, 3, 6]
   - (c) P(not a prime number)

3. Verify: For the number cube, P(rolling a 1) + P(rolling a 2) + P(rolling a 3) + P(rolling a 4) + P(rolling a 5) + P(rolling a 6) = ___. Does this make sense?

### Tier 2 (Stretch)

4. A box of chocolates contains 20 pieces: 8 milk chocolate, 5 dark chocolate, 4 white chocolate, 3 caramel. A piece is chosen at random.
   - (a) P(milk chocolate)
   - (b) P(not dark chocolate)
   - (c) P(milk or dark chocolate)
   - (d) P(caramel or white)

5. A spinner has three sections. P(red) = 2/5, P(blue) = 1/3. What is P(green)? Verify that the three probabilities sum to 1. (Work with fractions carefully.)

6. Interleaved review (Unit 3 -- Equations): A number cube is rolled. P(rolling a multiple of k) = 1/3. What is k? List the multiples of k that appear on the die to verify.

### Tier 3 (Challenge)

7. A deck of 52 cards has 4 suits of 13 cards each. Several cards are removed. The probability of drawing a spade is now 1/5. How many spades remain? How many total cards remain if there are now 20 cards in the deck?

8. Interleaved review (Unit 4 -- Geometry): A circular dartboard has a bullseye circle with radius 2 cm inside a larger circle with radius 10 cm. A dart lands at a random point on the board. What is the probability that the dart hits the bullseye? (Use P = area of bullseye / area of board. Use pi = 3.14.)

---

## Exit Ticket

**Problem 1:** A bag has 4 red, 5 blue, and 3 yellow chips. Find P(not yellow). Use the complement rule.

**Problem 2:** A spinner has probabilities: P(A) = 1/3, P(B) = 1/4. There are only three sections (A, B, C). Find P(C). Verify that all three probabilities sum to 1.

**Problem 3:** A number cube is rolled. Which is more likely: P(rolling a 6) or P(rolling a number less than 3)? Justify with probabilities.

**Mastery:** All three problems solved correctly using appropriate methods (complement in P1, summing to 1 in P2) = Mastery. Correct answers but no method shown = Ask the student to explain their reasoning. Incorrect = Reteach complement rule and the "sum to 1" property.

---

## Answer Key

### Independent Practice

1. Total = 6+4+5+3 = 18 chips. (a) 18 total outcomes. (b) P(orange) = 6/18 = 1/3 ≈ 33.3%. (c) P(white) = 3/18 = 1/6 ≈ 16.7%. (d) P(not green) = 1 - 4/18 = 14/18 = 7/9 ≈ 77.8%. (e) P(orange or purple) = (6+5)/18 = 11/18 ≈ 61.1%.

2. (a) Primes: {2,3,5}. P = 3/6 = 1/2 = 50%. (b) Factors of 6: {1,2,3,6}. P = 4/6 = 2/3 ≈ 66.7%. (c) P(not prime) = 1 - 1/2 = 1/2 = 50%.

3. Each face has probability 1/6. Sum = 6 * (1/6) = 6/6 = **1**. This makes sense because the six outcomes cover the entire sample space and one of them is guaranteed to occur.

4. Total = 20. (a) P(milk) = 8/20 = 2/5 = 40%. (b) P(not dark) = 1 - 5/20 = 15/20 = 3/4 = 75%. (c) P(milk or dark) = (8+5)/20 = 13/20 = 65%. (d) P(caramel or white) = (3+4)/20 = 7/20 = 35%.

5. P(red) + P(blue) + P(green) = 1. 2/5 + 1/3 + P(green) = 1. Common denominator 15: 6/15 + 5/15 + P(green) = 15/15. P(green) = 15/15 - 11/15 = **4/15**. Verify: 6/15 + 5/15 + 4/15 = 15/15 = 1. Correct.

6. P(rolling a multiple of k) = 1/3 = 2/6. So k has 2 multiples on the cube (1-6). k = 3: multiples of 3 on a cube are {3, 6} = 2 values. P = 2/6 = 1/3. Yes. **k = 3**. (Also possible: k = 2 gives {2,4,6}=3 values=3/6=1/2, not 1/3. k=3 works.)

7. P(spade) = 1/5. If total cards = 20, spades = (1/5) * 20 = **4 spades** remain. Total cards remaining = **20**.

8. Area of bullseye = 3.14 * 2^2 = 3.14 * 4 = 12.56 sq cm. Area of full board = 3.14 * 10^2 = 3.14 * 100 = 314 sq cm. P(bullseye) = 12.56 / 314 = **0.04 = 4%**.

### Exit Ticket

1. P(yellow) = 3/12 = 1/4. P(not yellow) = 1 - 1/4 = **3/4** = 75%.

2. P(A) + P(B) + P(C) = 1. 1/3 + 1/4 + P(C) = 1. Common denominator 12: 4/12 + 3/12 + P(C) = 12/12. P(C) = 5/12. Verify: 4/12 + 3/12 + 5/12 = 12/12 = 1. Correct.

3. P(rolling a 6) = 1/6 ≈ 0.167. P(rolling a number less than 3) = P({1,2}) = 2/6 = 1/3 ≈ 0.333. **Rolling a number less than 3 is more likely** (1/3 > 1/6).

---

## Teacher Notes

- The complement rule (P(not A) = 1 - P(A)) is one of the most useful tools in all of probability. Reinforce it whenever it saves calculation. Encourage the student to ask: "Is it easier to count what I want, or to count what I DON'T want and subtract?"
- For card problems, have an actual deck of cards available if possible. Students often have misconceptions about what cards are in a deck. Point out: 4 suits, 13 ranks per suit, Ace counts as a single rank, and face cards are Jack, Queen, King.
- The geometric probability problem (Tier 3, Problem 8) is a beautiful cross-topic connection: it uses the area formula from Unit 4 to solve a probability problem. This is exactly the kind of interleaved application that builds deep understanding.
- Non-uniform models (spinner problems) are important because students must resist the temptation to assume all outcomes are equally likely. Always ask: "Are all outcomes equally likely? How do you know?"

---
*This lesson follows the [Teaching Methodology Framework](../../../methodology/teaching-methodology-framework.md).*
