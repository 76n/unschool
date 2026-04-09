# Math — Grade 8 — Unit 4, Lesson 4

## Topic
Combining Transformations

## Learning Objectives
- Apply two or more transformations in sequence to a figure on the coordinate plane.
- Demonstrate that the order of transformations can affect the final result.
- Describe a sequence of transformations that maps one figure onto another.
- Write the combined coordinate rule for a sequence of two transformations.

## Prerequisites
- Translations and the rule (x, y) -> (x + a, y + b) (Lesson 1)
- Reflections over the x-axis and y-axis with coordinate rules (Lesson 2)
- Rotations of 90, 180, and 270 degrees about the origin with coordinate rules (Lesson 3)

## Materials Needed
- Graph paper (at least three sheets per student)
- Ruler or straightedge
- Colored pencils (three colors: pre-image, intermediate image, final image)
- Tracing paper or patty paper (optional)
- Index card or half-sheet for Exit Ticket

**Standards:** 8.G.2 — Understand that a two-dimensional figure is congruent to another if the second can be obtained from the first by a sequence of rotations, reflections, and translations; 8.G.3 — Describe the effect of dilations, translations, rotations, and reflections on two-dimensional figures using coordinates.

---

## Warm-Up (5 minutes)
**Purpose:** Review individual transformation rules and prepare for combining them.

1. Apply the translation (x, y) -> (x + 3, y - 2) to the point (1, 4). Result: (4, 2).
2. Now reflect the result from Problem 1 over the y-axis. Result: (-4, 2).
3. Start over with the same point (1, 4). This time, reflect over the y-axis FIRST, then translate by (x + 3, y - 2). What do you get?
   - Reflect: (-1, 4). Translate: (-1 + 3, 4 - 2) = (2, 2).
4. Ask: "Did we get the same final answer in Problem 2 and Problem 3?" (No: (-4, 2) versus (2, 2).) "What does this tell us?" (The order matters!)

---

## Direct Instruction (10-15 minutes)

### Key Vocabulary
- **Sequence of transformations** — two or more transformations applied one after another.
- **Composition** — the result of applying one transformation followed by another.
- **Intermediate image** — the figure after the first transformation but before the second.

### Instruction Notes

**Step 1 — Demonstrate that order matters.**

Say: "In the warm-up, we discovered something important: when you combine two transformations, the order you do them in can change the final result. This is different from addition, where 3 + 5 and 5 + 3 give the same answer. With transformations, 'translate then reflect' is NOT always the same as 'reflect then translate.'"

**Step 2 — Walk through a full example with a triangle.**

Say: "Let us take triangle ABC with A(1, 1), B(4, 1), C(2, 3). We will apply two transformations in sequence."

**Sequence 1:** Translate (x, y) -> (x - 5, y + 0), then reflect over the x-axis.

Step 1 — Translate:
- A(1, 1) -> A'(1 - 5, 1) = A'(-4, 1)
- B(4, 1) -> B'(4 - 5, 1) = B'(-1, 1)
- C(2, 3) -> C'(2 - 5, 3) = C'(-3, 3)

Step 2 — Reflect over x-axis:
- A'(-4, 1) -> A''(-4, -1)
- B'(-1, 1) -> B''(-1, -1)
- C'(-3, 3) -> C''(-3, -3)

**Sequence 2:** Reflect over the x-axis first, then translate (x, y) -> (x - 5, y + 0).

Step 1 — Reflect over x-axis:
- A(1, 1) -> A'(1, -1)
- B(4, 1) -> B'(4, -1)
- C(2, 3) -> C'(2, -3)

Step 2 — Translate:
- A'(1, -1) -> A''(1 - 5, -1) = A''(-4, -1)
- B'(4, -1) -> B''(4 - 5, -1) = B''(-1, -1)
- C'(2, -3) -> C''(2 - 5, -3) = C''(-3, -3)

Say: "Interesting! In this specific case, both sequences gave the same final result. That happens because the translation is purely horizontal and the reflection is over the x-axis — they do not interfere with each other. But this is NOT always the case, as we saw in the warm-up."

**Step 3 — Show a case where order DOES change the result.**

Say: "Now let us try: reflect over the y-axis, then translate (x, y) -> (x + 2, y + 0) versus translate first, then reflect."

Point P(3, 1).

Order A: Reflect over y-axis: (-3, 1). Then translate: (-3 + 2, 1) = (-1, 1).
Order B: Translate: (3 + 2, 1) = (5, 1). Then reflect over y-axis: (-5, 1).

Say: "Different results: (-1, 1) versus (-5, 1). The order matters when the transformations interact — here, the horizontal translation and the y-axis reflection both affect the x-coordinate, so swapping their order gives different results."

**Step 4 — Writing combined rules.**

Say: "We can sometimes write a single rule that combines two transformations. For example: translate (x + 3, y - 1), then reflect over the x-axis."

- Translate: (x, y) -> (x + 3, y - 1)
- Reflect over x-axis: (x + 3, y - 1) -> (x + 3, -(y - 1)) = (x + 3, -y + 1)
- Combined rule: **(x, y) -> (x + 3, -y + 1)**

### Worked Examples

**Example A:** Apply the sequence: rotate 90 degrees CCW, then translate (x, y) -> (x + 2, y - 3). Start with point (4, 1).
- Rotate 90 CCW: (4, 1) -> (-1, 4)
- Translate: (-1 + 2, 4 - 3) = **(1, 1)**

**Example B:** Apply the sequence: reflect over the y-axis, then rotate 180 degrees. Start with point (2, -5).
- Reflect over y-axis: (2, -5) -> (-2, -5)
- Rotate 180: (-2, -5) -> (2, 5)
- Final image: **(2, 5)**

---

## Guided Practice (10 minutes)

**Activity 1: Applying Sequences Step by Step**

1. Point (3, 2). Translate (x, y) -> (x - 4, y + 1), then reflect over the x-axis.
   - "What is the point after the translation?" (-1, 3)
   - "Now reflect over the x-axis." (-1, -3)
   - Final: **(-1, -3)**

2. Point (-2, 5). Reflect over the y-axis, then rotate 90 degrees CCW.
   - "Reflect over y-axis." (2, 5)
   - "Apply the 90 CCW rule: (-y, x)." (-5, 2)
   - Final: **(-5, 2)**

3. Now do Problem 2 in the opposite order: rotate 90 CCW first, then reflect over the y-axis.
   - Rotate 90 CCW: (-2, 5) -> (-5, -2)
   - Reflect over y-axis: (-5, -2) -> (5, -2)
   - Final: **(5, -2)**
   - Ask: "Is this the same as Problem 2?" (No — different result. Order matters.)

**Activity 2: Describing Transformations**

4. Triangle XYZ has vertices X(1, 1), Y(3, 1), Z(2, 3). Triangle X'Y'Z' has vertices X'(-1, -1), Y'(-3, -1), Z'(-2, -3). What single transformation maps XYZ to X'Y'Z'?
   - "Compare the coordinates." Each (x, y) became (-x, -y). This is a **180-degree rotation** about the origin.

5. Square ABCD has vertices A(1, 2), B(3, 2), C(3, 4), D(1, 4). Square A'B'C'D' has vertices A'(4, -2), B'(6, -2), C'(6, -4), D'(4, -4). Describe a sequence of transformations.
   - "First, what happened to the y-coordinates? They changed sign — that is a reflection over the x-axis."
   - After reflection: (1, -2), (3, -2), (3, -4), (1, -4).
   - "Now compare to the final: x changed from 1 to 4, 3 to 6. That is a translation of +3 in x."
   - Sequence: **Reflect over x-axis, then translate (x + 3, y)**.

**Facilitator tip:** When the student gets stuck, ask: "What is different between the pre-image and the final image? Does the figure look flipped? Rotated? Shifted?" Breaking the transformation into pieces helps the student identify the sequence.

---

## Independent Practice (10-15 minutes)

### Tier 1 (On-level)

1. Point (5, -1). Translate (x, y) -> (x - 3, y + 4), then reflect over the y-axis.
2. Point (-4, 2). Rotate 180 degrees, then translate (x, y) -> (x + 1, y - 5).
3. Triangle with vertices (0, 0), (3, 0), (1, 2). Reflect over the x-axis, then translate (x, y) -> (x + 2, y + 3). List the final image vertices.
4. A point ends up at (6, -2) after being reflected over the y-axis and then translated (x, y) -> (x + 4, y - 2). What was the original point?

### Tier 2 (Stretch)

5. Point (2, 3). Apply these two sequences and compare:
   - Sequence A: Reflect over x-axis, then translate (x, y) -> (x + 1, y + 4)
   - Sequence B: Translate (x, y) -> (x + 1, y + 4), then reflect over x-axis
   - Are the results the same?
6. Describe a sequence of two transformations that maps triangle with vertices (1, 1), (4, 1), (1, 3) to the triangle with vertices (-1, -1), (-4, -1), (-1, -3).

### Tier 3 (Challenge)

7. Write a single combined coordinate rule for: reflect over the y-axis, then translate (x, y) -> (x + 5, y - 2).
8. A student claims: "The order of transformations never matters for two translations." Is this correct? Prove your answer with a specific example.

---

## Exit Ticket

**Problem 1:** Apply the sequence to point (2, -3): translate (x, y) -> (x + 1, y + 5), then reflect over the y-axis. What is the final image?

**Problem 2:** True or false: Applying two transformations in different orders always gives different results. Explain with an example.

**Mastery = 2 out of 2 correct.**

---

## Answer Key

### Independent Practice

1. Translate (5, -1): (5 - 3, -1 + 4) = (2, 3). Reflect over y-axis: **(-2, 3)**.
2. Rotate 180: (-4, 2) -> (4, -2). Translate: (4 + 1, -2 - 5) = **(5, -7)**.
3. Reflect over x-axis: (0, 0), (3, 0), (1, -2). Translate: (0 + 2, 0 + 3) = (2, 3); (3 + 2, 0 + 3) = (5, 3); (1 + 2, -2 + 3) = (3, 1). Image: **(2, 3), (5, 3), (3, 1)**.
4. Work backward. After translation (x + 4, y - 2) the point is at (6, -2). Before translation: (6 - 4, -2 + 2) = (2, 0). This was the result of reflecting over y-axis. Before reflection: (-2, 0). Original point: **(-2, 0)**.
5. Sequence A: Reflect (2, 3) over x-axis: (2, -3). Translate: (3, 1). **Result: (3, 1).**
   Sequence B: Translate (2, 3): (3, 7). Reflect over x-axis: (3, -7). **Result: (3, -7).**
   **Not the same.** The order matters because the reflection and translation both affect the y-coordinate.
6. Each (x, y) became (-x, -y). This is a **180-degree rotation** about the origin. Alternatively: reflect over the x-axis, then reflect over the y-axis (or vice versa).
7. Reflect over y-axis: (x, y) -> (-x, y). Then translate: (-x, y) -> (-x + 5, y - 2). Combined rule: **(x, y) -> (-x + 5, y - 2)** or equivalently **(x, y) -> (5 - x, y - 2)**.
8. **Correct.** Two translations always give the same result regardless of order. Example: Translate (x + 3, y + 1) then translate (x - 2, y + 4) gives (x + 1, y + 5). Translate (x - 2, y + 4) then translate (x + 3, y + 1) gives (x + 1, y + 5). Same result because addition is commutative: (a + 3) - 2 = (a - 2) + 3.

### Exit Ticket

1. Translate (2, -3): (2 + 1, -3 + 5) = (3, 2). Reflect over y-axis: (-3, 2). Final: **(-3, 2)**.
2. **False.** The order does NOT always give different results. Example: two translations always give the same result regardless of order. Another example: a reflection over the x-axis followed by a reflection over the y-axis gives the same result as reflecting over the y-axis then the x-axis (both give (-x, -y)). So sometimes the order does not matter — it depends on which transformations are combined.

---

## Teacher Notes

- This lesson is the conceptual heart of the transformation sequence. The big idea — that order matters — connects to the mathematical concept of non-commutativity, which students will encounter again in matrix multiplication and function composition.
- Use three colors when plotting: one for the original, one for the intermediate image, one for the final image. This makes the two-step process visible.
- The "work backward" problem (Independent Practice #4) is difficult but extremely valuable. It requires the student to reverse the operations in reverse order — undo the second transformation first, then undo the first. This builds algebraic thinking.
- Some students will be overwhelmed by keeping track of multiple transformations. For these students, enforce a strict procedure: (1) Write the first transformation rule, (2) Apply it and write the intermediate coordinates, (3) Write the second transformation rule, (4) Apply it to the intermediate coordinates. No shortcuts until fluency develops.
- The Tier 3 problem about two translations is a nice opportunity to connect to commutativity: addition is commutative, so combining two translations (which are additions) always gives the same result regardless of order. But reflections and rotations involve sign changes and coordinate swaps, which do not commute with other operations.

---

*This lesson follows the [Teaching Methodology Framework](../../../methodology/teaching-methodology-framework.md).*
