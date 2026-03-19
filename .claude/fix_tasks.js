const fs = require('fs');
const path = require('path');

const TASKS_DIR = String.raw`C:\Users\Nick.Goddard\OneDrive - Acora Limited\Documents\GitHub\ng-second-brain\tasks`;

const EDITS = {
  "al-go-execute-migration.md":                            { title: "AL-Go Execute Migration",                             project: "bc-repos-al-go-migration" },
  "al-go-migration-meeting.md":                            { title: "AL-Go Migration Meeting",                             project: "bc-repos-al-go-migration" },
  "al-go-migration-plan.md":                               { title: "AL-Go Migration Plan",                                project: "bc-repos-al-go-migration" },
  "al-go-migration-script.md":                             { title: "AL-Go Migration Script",                              project: "bc-repos-al-go-migration" },
  "al-object-id-ninja-configure-account.md":               { title: "AL Object ID Ninja Configure Account",               project: "al-object-id-ninja-rollout" },
  "al-object-id-ninja-deploy.md":                          { title: "Roll Out AL Object ID Ninja",                        project: "al-object-id-ninja-rollout" },
  "al-object-id-ninja-find-price.md":                      { title: "AL Object ID Ninja Find Price",                      project: "al-object-id-ninja-rollout" },
  "al-object-id-ninja-sign-off.md":                        { title: "Send AL Object ID Ninja Proposal for Sign-Off",      project: "al-object-id-ninja-rollout" },
  "al-object-id-ninja-sort-access.md":                     { title: "Sort Access to AL Object ID Ninja",                  project: "al-object-id-ninja-rollout" },
  "al-object-id-ninja-wait-for-sign-off.md":               { title: "Wait for AL Object ID Ninja Sign-Off",               project: "al-object-id-ninja-rollout" },
  "al-object-id-ninja-write-proposal.md":                  { title: "Write AL Object ID Ninja Proposal",                  project: "al-object-id-ninja-rollout" },
  "arrange-al-go-process-meeting.md":                      { title: "Arrange AL-Go Process Meeting",                      project: "al-go-support-email-notifications" },
  "ask-lisa-decree-absolute-timeline.md":                  { title: "Ask Lisa Decree Absolute Timeline",                  project: "get-divorced" },
  "assign-github-licence-mamta-pathak.md":                 { title: "Assign GitHub Licence to Mamta Pathak",              project: null },
  "bc-infra-it-feedback.md":                               { title: "Get IT Infra Team Feedback",                         project: "bc-dev-infrastructure-replacement" },
  "bc-infra-team-review.md":                               { title: "BC Infra Team Review",                               project: "bc-dev-infrastructure-replacement" },
  "bc-infra-write-requirements.md":                        { title: "BC Infra Write Requirements",                        project: "bc-dev-infrastructure-replacement" },
  "book-car-webuyanycar.md":                               { title: "Book Car with We Buy Any Car",                       project: "sell-seat-exeo" },
  "cii-pbi55179-confirm-webshop-handling.md":              { title: "CII PBI-55179 Confirm Webshop Handling",             project: "cii-pbi55179-midyear-membership" },
  "cii-pbi55179-investigate-unit-price.md":                { title: "CII PBI-55179 Investigate Unit Price",               project: "cii-pbi55179-midyear-membership" },
  "cii-pbi55179-test-plan.md":                             { title: "CII PBI-55179 Create Test Plan",                     project: "cii-pbi55179-midyear-membership" },
  "cii-pbi55179-write-solution.md":                        { title: "CII PBI-55179 Write Solution",                       project: "cii-pbi55179-midyear-membership" },
  "clean-seat-exeo.md":                                    { title: "Clean Seat Exeo",                                    project: "sell-seat-exeo" },
  "code-review-a0177.md":                                  { title: "Code Review A0177",                                  project: "fix-failing-pr-build" },
  "compile-al-go-triage-error-list.md":                    { title: "Compile AL-Go Triage Error List",                    project: "al-go-support-email-notifications" },
  "continia-expenses-await-response.md":                   { title: "Await Continia Support Response",                    project: "continia-expenses-bc28-compatibility" },
  "continia-expenses-raise-support-call.md":               { title: "Raise Continia Support Call",                        project: "continia-expenses-bc28-compatibility" },
  "debug-11290-example.md":                                { title: "Debug 11290 Example",                                project: null },
  "discuss-al-go-failures-process.md":                     { title: "Discuss AL-Go Failures Process",                     project: "al-go-support-email-notifications" },
  "find-v5-logbook.md":                                    { title: "Find V5 Logbook",                                    project: "sell-seat-exeo" },
  "fix-11290-bug.md":                                      { title: "Fix Bug 11290",                                      project: null },
  "fix-pr-build-release-client-response.md":               { title: "Fix PR Build Release Client Response",               project: "fix-failing-pr-build" },
  "get-11290-example-from-jess.md":                        { title: "Get 11290 Example from Jess",                        project: null },
  "get-wrapping-paper.md":                                 { title: "Get Wrapping Paper",                                 project: null },
  "hsl-bc-copy-production-to-sandbox.md":                  { title: "Copy Production to Sandbox",                        project: "hsl-bc-sandbox-refresh" },
  "hsl-bc-copy-production-to-uat.md":                      { title: "Copy Production to UAT",                            project: "hsl-bc-sandbox-refresh" },
  "hsl-bc-delete-sandbox-environment.md":                  { title: "Delete Sandbox Environment",                        project: "hsl-bc-sandbox-refresh" },
  "hsl-bc-delete-uat-environment.md":                      { title: "Delete UAT Environment",                            project: "hsl-bc-sandbox-refresh" },
  "hsl-bc-sync-crm-sandbox.md":                            { title: "Sync CRM to Sandbox",                               project: "hsl-bc-sandbox-refresh" },
  "hsl-bc-sync-crm-uat.md":                                { title: "Sync CRM to UAT",                                   project: "hsl-bc-sandbox-refresh" },
  "hsl-bc-wait-for-zeph-crm-refresh.md":                   { title: "Wait for Zeph CRM Refresh",                         project: "hsl-bc-sandbox-refresh" },
  "hsl-speak-to-stu-allen-regarding-crm-setup.md":         { title: "Speak to Stu Allen re CRM Setup",                   project: "hsl-bc-sandbox-refresh" },
  "investigate-11290-why-not-working.md":                  { title: "Investigate 11290 Why Not Working",                  project: null },
  "investigate-continia-expenses-bc28-incompatibility.md": { title: "Investigate Continia Expenses BC28 Incompatibility", project: "continia-expenses-bc28-compatibility" },
  "link-disney-plus-to-sky-glass.md":                      { title: "Link Disney+ to Sky Glass",                         project: null },
  "order-new-v5-logbook.md":                               { title: "Order New V5 Logbook",                               project: "sell-seat-exeo" },
  "raise-servicenow-tickets-for-al-go-failures.md":        { title: "Raise ServiceNow Tickets for AL-Go Failures",        project: "al-go-support-email-notifications" },
  "release-11290-fix.md":                                  { title: "Release 11290 Fix",                                  project: null },
  "release-11390-to-production.md":                        { title: "Release 11390 to Production",                        project: null },
  "release-11460-to-production.md":                        { title: "Release 11460 to Production",                        project: null },
  "republish-infopro-extensions-to-acoradev.md":           { title: "Republish InfoPro Extensions to AcoraDev",           project: null },
  "research-alcops-al-go-integration.md":                  { title: "Research ALCops AL-Go Integration",                  project: "al-go-support-email-notifications" },
  "research-app-insights-email-alerts.md":                 { title: "Research App Insights Email Alerts",                 project: "al-go-support-email-notifications" },
  "review-inc1014760.md":                                  { title: "Review INC1014760",                                  project: "cii-incident-management" },
  "review-inc1015233.md":                                  { title: "Review INC1015233",                                  project: "cii-incident-management" },
  "review-inc1015406.md":                                  { title: "Review INC1015406",                                  project: "cii-incident-management" },
  "ring-pete-lysandrou-arkell-way-update.md":              { title: "Ring Pete Lysandrou - Arkell Way Update",            project: "sell-4-arkell-way" },
  "ring-pete-lysandrou.md":                                { title: "Ring Pete Lysandrou",                                project: "sell-4-arkell-way" },
  "swap-insurance-to-vw-golf.md":                          { title: "Swap Insurance to VW Golf",                         project: "sell-seat-exeo" },
  "take-car-to-webuyanycar.md":                            { title: "Take Car to We Buy Any Car",                        project: "sell-seat-exeo" },
  "wait-for-court-financial-order.md":                     { title: "Wait for Court Financial Order",                    project: "get-divorced" },
  "wrap-mothers-day-present.md":                           { title: "Wrap Mothers Day Present",                          project: null },
};

function hasFrontmatterField(content, field) {
  const lines = content.split('\n');
  if (!lines[0] || lines[0].trim() !== '---') return false;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') break;
    if (new RegExp(`^${field}\\s*:`).test(lines[i])) return true;
  }
  return false;
}

function insertIntoFrontmatter(content, fieldsToAdd) {
  const lines = content.split('\n');
  if (!lines[0] || lines[0].trim() !== '---') return content;
  let closeIdx = null;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { closeIdx = i; break; }
  }
  if (closeIdx === null) return content;
  const insertLines = Object.entries(fieldsToAdd).map(([k, v]) =>
    k === 'title' ? `title: "${v}"` : `project: ${v}`
  );
  return [...lines.slice(0, closeIdx), ...insertLines, ...lines.slice(closeIdx)].join('\n');
}

const changed = [];
const skipped = [];

for (const [filename, edits] of Object.entries(EDITS)) {
  const filepath = path.join(TASKS_DIR, filename);
  if (!fs.existsSync(filepath)) {
    skipped.push(`MISSING: ${filename}`);
    continue;
  }
  const content = fs.readFileSync(filepath, 'utf8');
  const fieldsToAdd = {};
  if (!hasFrontmatterField(content, 'title')) fieldsToAdd.title = edits.title;
  if (edits.project && !hasFrontmatterField(content, 'project')) fieldsToAdd.project = edits.project;
  if (Object.keys(fieldsToAdd).length === 0) {
    skipped.push(`already complete: ${filename}`);
    continue;
  }
  const newContent = insertIntoFrontmatter(content, fieldsToAdd);
  fs.writeFileSync(filepath, newContent, { encoding: 'utf8' });
  changed.push(`  ${filename}: +[${Object.keys(fieldsToAdd).join(', ')}]`);
}

console.log(`Changed ${changed.length} files:`);
changed.forEach(c => console.log(c));
console.log(`\nSkipped ${skipped.length}:`);
skipped.forEach(s => console.log(`  ${s}`));
