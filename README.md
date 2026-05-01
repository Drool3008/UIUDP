# MaayHealth — Storyboard to Lecture Concept Mapping

This document maps each storyboard in `St_stup.pdf` to the UI/UX lecture concepts (from the `Lectures/` folder) that informed the design decisions.

---

## Storyboard 1 & 2 — Delegated Ingredient Sourcing ("The Cook Helper")
**Pages 1–2 of St_stup.pdf**

The user taps "Notify Cook" once → system automatically queries recipe DB, scales ingredients, and sends a WhatsApp message to the cook.

| UI Concept Used | Source Lecture |
|---|---|
| **Streamlined Limitation** — reducing a multi-step, repetitive task (calculating ingredients, messaging) down to a single tap | Class 15 (05 March) — *Cognition & Behaviour Patterns* |
| **Instant Gratification** — the "Success! Laxmi has been notified" confirmation screen with a checkmark delivers immediate feedback | Class 15 (05 March) — *Cognition & Behaviour Patterns* |
| **Heavy Execution by the Machine** — the system does the math so the user doesn't have to | Class 15 framing; aligns with Class 12's IA principle: *"automate actions users perform manually"* |
| **Nutrition Progress Bars** on the home screen (Iron/Protein) | Class 17–22 — *UI Design Elements: Informational components — Progress bars show the status of a task or action* |
| **"Back to Home" button** after success — self-exploration / recovery path | Class 15 — *Self Exploration* (back buttons, easy return) |

---

## Storyboard 3 — Voice-First Symptom Triage & Expert Escalation
**Page 3 of St_stup.pdf**

User says "I feel very dizzy after my walk" → persistent Voice FAB captures input → AI cross-references data → Emergency: Call Doctor button appears → doctor's dashboard is also alerted.

| UI Concept Used | Source Lecture |
|---|---|
| **Floating Action Button (FAB)** — persistent, always-accessible voice trigger | Class 17–22 — *UI Design Elements: Navigational components — Floating action buttons are icon-only buttons* |
| **Safety Escape Hatch** — the large "Emergency: Call Doctor" high-visibility button for a user in distress | Class 16 (9 March) — *Navigation Models: Escape Hatch — "When a user is hopelessly entangled… he needs an escape hatch, a well-labeled link to get back to a known place"* |
| **Deferred Choices** — the user doesn't have to navigate menus; the system takes over triage | Class 15 — *Deferred Choices ("don't ask for unnecessary info, allow later entry")* |
| **Changed in Midstream** — the system detects a mid-interaction state change (symptom onset) and pivots the experience | Class 15 — *Changed in Midstream* |
| **Prospective Memory** — logging symptom + triage data sent to the doctor so nothing is forgotten | Class 15 — *Prospective Memory* |

---

## Storyboard 4 — AI Meal Photo Audit & Feedback
**Page 4 of St_stup.pdf**

User photographs samosas → AI identifies dish (no manual input) → Nutrition Progress Bars update instantly on the home screen.

| UI Concept Used | Source Lecture |
|---|---|
| **Satisficing** — AI uses "good enough" logic to identify food from a photo; the user doesn't need to manually search or type | Class 15 — *Satisficing ("people will accept the 'good enough' instead of 'best' if it doesn't take time and effort")* |
| **System Image / Gulf of Evaluation** — instantly updating progress bars give the user a clear "system image" of their nutritional status, closing the gap between action and feedback | Class 1–6 — *Designer Model, User Model and System Image; Human Action Cycle (Norman, 1988)* |
| **Cost of Interaction** — the design explicitly eliminates manual calorie counting, reducing interaction cost | Class 15 framing of user behaviour patterns |
| **Instant Gratification** — "Samosas Added!" confirmation and immediate bar update | Class 15 — *Instant Gratification* |
| **Informational components: Progress Bars** — the Nutrition Progress Bars (Iron, Protein, Calories) | Class 17–22 — *UI Design Elements: Informational components* |

---

## Storyboard 5 & 6 — Onboarding & AI Meal Curation
**Pages 5–6 of St_stup.pdf**

New user enters pregnancy stage, regional preferences, budget ₹1,500, food exclusions via toggles → AI curates a 7-day meal plan from 2,000+ recipes → presented as a weekly calendar.

| UI Concept Used | Source Lecture |
|---|---|
| **Onboarding Screens** — the setup flow with toggles, pregnancy stage, budget inputs | Class 17–22 — *UI Design Elements: Informational components — "Onboarding screens provide information about a product's features and benefits"* |
| **Deferred Choices** — simple toggles for food exclusions; no complex manual entry | Class 15 — *Deferred Choices* |
| **Information Architecture (IA) — Curation** — filtering 2,000 recipes to a structured 7-day plan mirrors the IA principle of presenting the right info at the right time | Class 10 (12 Feb) — *Information Architecture* and Class 12 (19 Feb) — *IA Approach* |
| **Hub and Spoke Navigation** — the home screen ("hub") links out to the meal plan, then returns | Class 16 — *Navigation Models: Hub and Spoke* |
| **Stepwise Navigation** — the onboarding flow guides the user step-by-step through setup screens | Class 16 — *Navigation Models: Stepwise* |
| **Streamlined Limitation** — zero manual calculation; the AI does all nutritional math | Class 15 — *Streamlined Limitation* |
| **Gestalt: Proximity & Similarity** — recipe cards grouped visually by day on the weekly calendar | Class 17–22 — *Gestalt Principles: Proximity and Similarity* |

---

## Summary Table

| Lecture | Concepts Applied in Storyboard |
|---|---|
| **Class 15 (05 March)** — Cognition & Behaviour Patterns | Satisficing, Instant Gratification, Streamlined Limitation, Deferred Choices, Prospective Memory, Changed in Midstream, Self Exploration |
| **Class 16 (9 March)** — Navigation Models | Escape Hatch (Emergency button), Hub & Spoke (home screen), Stepwise (onboarding) |
| **Class 17–22 (12 Mar–2 Apr)** — UI Design Elements & Gestalt | Floating Action Button (voice), Progress Bars (nutrition), Onboarding Screens, Gestalt Proximity/Similarity (meal cards) |
| **Class 1–6 (Jan)** — Mental Models & Norman's HAC | System Image (nutrition bars closing Gulf of Evaluation), Human Action Cycle |
| **Class 10 & 12 (Feb)** — Information Architecture | Curation logic for meal plan, separating data from presentation |

The storyboard is most heavily grounded in **Class 15's behaviour patterns** (Satisficing, Streamlined Limitation, Instant Gratification) and **Class 16's navigation patterns** (Escape Hatch, Hub & Spoke), with the visual/UI layer drawing from **Class 17–22's UI elements**.
