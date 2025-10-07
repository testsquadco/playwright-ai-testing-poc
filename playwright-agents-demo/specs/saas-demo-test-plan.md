# Demo SaaS – Comprehensive Test Plan

## Application Overview
The Demo SaaS app at `https://demo-saas.bugbug.io/` is a public training site for common SaaS user flows. Primary entry points observed:
- Landing page with CTAs to Log in and Sign up
- Authentication options: Continue with Google, Continue with Email (OTP)
- Password reset: Forgot password (Reset password page)

This plan focuses on authentication, navigation, UX validation, and basic non-functional checks appropriate for an external demo app.

## Scope
- Functional coverage of auth flows: Sign up, Sign in, Email OTP, Reset password, Navigation between auth pages
- Basic UI/UX validations: presence, labeling, links, and affordances
- Basic negative testing and validation messages where applicable

## Out of Scope
- Real email delivery and inbox verification (no access to email service)
- Social login real consent screens (Google OAuth flows may be mocked/skipped)
- Back-end data verification beyond what the UI reveals

## Assumptions
- Fresh, stateless environment per test (no persisted user data required)
- Demo app is publicly accessible without special credentials
- Seed file `seed.spec.ts` may remain minimal; tests can start from landing URLs

## Test Data
- Email patterns: `test+{timestamp}@example.com`
- Invalid emails: `user`, `user@`, `user@domain`, `user@domain.`
- OTP codes: Use UI-surfaced behaviors; do not depend on real inbox
- Passwords (if applicable): `P@ssw0rd!123`

## Environments
- Public URL: `https://demo-saas.bugbug.io/`
- Browsers: Chromium, Firefox, WebKit (default Playwright matrix)

## Quality Standards
- Independent scenarios that can run in any order
- Clear numbered steps and expected results
- Include happy path, edge cases, and error handling

---

## Scenarios

### 1. Navigation – Landing to Auth Pages
**Seed:** `seed.spec.ts`

#### 1.1 Navigate to Sign up from Landing
- Steps:
  1. Open `https://demo-saas.bugbug.io/`.
  2. Click "Sign up" CTA.
- Expected:
  - User is at `https://demo-saas.bugbug.io/sign-up`.
  - Page shows heading like "Create your account" and options (Google, Continue with Email).

#### 1.2 Navigate to Log in from Landing
- Steps:
  1. Open `https://demo-saas.bugbug.io/`.
  2. Click "Log in" CTA.
- Expected:
  - User is at `https://demo-saas.bugbug.io/sign-in`.
  - Page shows heading like "Log in" and options (Google, Continue with Email, Forgot password link).

#### 1.3 Cross-links between Sign in and Sign up
- Steps:
  1. From `sign-in`, click "Sign up" link.
  2. From `sign-up`, click "Log in" link.
- Expected:
  - Links navigate correctly between `sign-in` and `sign-up`.

---

### 2. Sign up – Email OTP Flow (UI-Driven)
**Seed:** `seed.spec.ts`

#### 2.1 Start Email-based Sign up
- Steps:
  1. Open `https://demo-saas.bugbug.io/sign-up`.
  2. Click "Continue with Email".
- Expected:
  - Navigates to an Email OTP flow page (e.g., `email-otp`).
  - Page prompts for email input or OTP as appropriate.

#### 2.2 Email Field Validation – Invalid Formats
- Steps:
  1. On Email OTP page, enter invalid emails: `user`, `user@`, `user@domain`, `user@domain.`
  2. Attempt to continue/submit each case.
- Expected:
  - Client-side validation prevents progression.
  - Visible error messages or input invalid state.

#### 2.3 Email Field Validation – Empty Input
- Steps:
  1. Leave email field empty.
  2. Attempt to continue/submit.
- Expected:
  - Required validation prevents submission with a clear message.

#### 2.4 Email OTP Entry – UI Behavior
- Steps:
  1. Provide a syntactically valid email `test+{timestamp}@example.com`.
  2. Continue to OTP entry (if the flow proceeds within the page).
  3. Observe OTP input UI (length, per-digit boxes, paste behavior if supported).
- Expected:
  - OTP UI is visible and ready for input.
  - If demo blocks real verification, page shows an informative state or mock behavior (no hard crash).

#### 2.5 Resend OTP – Availability and Throttling
- Steps:
  1. Trigger resend OTP (if available).
  2. Attempt rapid repeated clicks.
- Expected:
  - Resend is rate-limited or disabled with clear feedback.
  - No UI crash or console errors.

---

### 3. Sign in – Email OTP Flow (UI-Driven)
**Seed:** `seed.spec.ts`

#### 3.1 Start Email-based Log in
- Steps:
  1. Open `https://demo-saas.bugbug.io/sign-in`.
  2. Click "Continue with Email".
- Expected:
  - Navigates to Email OTP flow page (same or similar to Sign up flow).

#### 3.2 Invalid Email and Empty States
- Steps:
  1. Try invalid emails and empty input as in 2.2 and 2.3.
- Expected:
  - Identical validation behaviors.

#### 3.3 OTP Input – Error Handling
- Steps:
  1. Enter fewer than required OTP digits, non-numeric, or wrong length.
  2. Attempt submission.
- Expected:
  - Validation errors shown; submission blocked.

---

### 4. Forgot/Reset Password Flow
**Seed:** `seed.spec.ts`

#### 4.1 Navigate to Reset Password
- Steps:
  1. Open `https://demo-saas.bugbug.io/sign-in`.
  2. Click "Forgot password?".
- Expected:
  - Navigates to `https://demo-saas.bugbug.io/reset-password`.
  - UI prompts to enter an email for reset.

#### 4.2 Reset Email Validation
- Steps:
  1. Enter invalid email formats and empty.
  2. Attempt submission.
- Expected:
  - Proper validation messages and blocked submission.

#### 4.3 Reset Request Feedback
- Steps:
  1. Enter a valid email and submit.
- Expected:
  - UI shows a confirmation/toast/informational state that reset instructions were sent (demo-safe behavior).

---

### 5. Social Login – Google Button Presence and UX
**Seed:** `seed.spec.ts`

#### 5.1 Google Login Button Presence (Sign in/Sign up)
- Steps:
  1. Open `sign-in` and `sign-up` pages.
  2. Verify presence and labeling of "Continue with Google".
- Expected:
  - Button is visible, enabled, and consistently styled.

#### 5.2 Google Login Click Behavior (Non-Destructive)
- Steps:
  1. Click the Google button.
- Expected:
  - If redirected to an OAuth page or blocked due to demo constraints, the flow should be safe and reversible.
  - No console errors or broken states in the app.

---

### 6. General UX and Accessibility Checks
**Seed:** `seed.spec.ts`

#### 6.1 Headings and Landmarks
- Steps:
  1. Inspect page headings and ARIA landmarks on `sign-in`, `sign-up`, and `email-otp` pages.
- Expected:
  - Clear H1/H2 for main purpose (e.g., "Log in", "Create your account").
  - Landmarks like `main`/`form` present where applicable.

#### 6.2 Keyboard Navigation
- Steps:
  1. Tab through interactive elements.
- Expected:
  - Visible focus outlines.
  - Logical tab order.

#### 6.3 Labels and Inputs
- Steps:
  1. Check that inputs have associated labels or `aria-label`s.
- Expected:
  - Screen-reader friendly labels are present.

---

### 7. Reliability and Stability Observations
**Seed:** `seed.spec.ts`

#### 7.1 Network and Console Errors
- Steps:
  1. Open key pages and monitor network requests and console logs during interactions.
- Expected:
  - No 4xx/5xx from first-party endpoints during normal flows.
  - No uncaught exceptions in console.

#### 7.2 Basic Performance Hints (Non-measured)
- Steps:
  1. Observe initial page load and navigation responsiveness.
- Expected:
  - Pages render within a reasonable time for a demo app.

---

## Reporting
- Save generated automated tests under `tests/` with seeds from `seed.spec.ts`.
- Tag specs by feature (auth, otp, reset) for selective execution.
- Capture traces/screenshots on failure using Playwright configuration.

## How to Use with Playwright Planner Agent (VS Code)
- In VS Code, open Chat and select the "Playwright Planner Agent".
- Provide prompt: "Explore https://demo-saas.bugbug.io and create a comprehensive test plan. Save to specs/saas-demo-test-plan.md. Use seed from seed.spec.ts."
- The agent will use `planner_setup_page`, browser navigation tools, and write this plan as Markdown.
