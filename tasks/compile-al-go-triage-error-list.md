---
type: task
status: pending
tags:
  - work
  - al-go
  - support
due: 2026-04-30
project: "[[al-go-support-email-notifications]]"
title: Compile AL-Go Triage Error List
---

Compile a list of known AL-Go test errors that support can use to triage incoming failure notifications.

[[al-go-support-email-notifications]]

## Error Guide
- The email will have a subject which tells you the Workflow that failed and the repository that it failed in.
	- The repository name starts with AcoraLimited, and then there are 3 formats
		- ACO_ACO00000 - these are utility apps and aren't related to a particular customer.
		- X0000_ACO00000 - the X0000 will tell you the customer number and then the ACO00000 will be the individual extension
		- X0000 or CUS000000 - This is a repository where there are one or more extensions for a customer the X0000 is the old Nav customer number and the CUS0000000 is the new BC customer number.
	- There are three workflows currently that will send failure emails 
		- Test Current - this is a test against the 'current' BC version, for Saas customers this will be the current version MS provide us with so for example v28.0 became the current version at the beginning of April even though no customers have this version
- All error lines start with the date time and then the text **##[error]** e.g. **2026-04-11T01:16:09.0545154Z ##[error]**
- When ever an error occurs there is an error line with the text **Process completed with exit code 1.** these lines can be ignored as they don't provide any context.
- 