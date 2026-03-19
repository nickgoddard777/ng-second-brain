import os
import re

TASKS_DIR = r"C:\Users\Nick.Goddard\OneDrive - Acora Limited\Documents\GitHub\ng-second-brain\tasks"

EDITS = {
    "al-go-execute-migration.md":                            {"title": "AL-Go Execute Migration",                             "project": "bc-repos-al-go-migration"},
    "al-go-migration-meeting.md":                            {"title": "AL-Go Migration Meeting",                             "project": "bc-repos-al-go-migration"},
    "al-go-migration-plan.md":                               {"title": "AL-Go Migration Plan",                                "project": "bc-repos-al-go-migration"},
    "al-go-migration-script.md":                             {"title": "AL-Go Migration Script",                              "project": "bc-repos-al-go-migration"},
    "al-object-id-ninja-configure-account.md":               {"title": "AL Object ID Ninja Configure Account",               "project": "al-object-id-ninja-rollout"},
    "al-object-id-ninja-deploy.md":                          {"title": "Roll Out AL Object ID Ninja",                        "project": "al-object-id-ninja-rollout"},
    "al-object-id-ninja-find-price.md":                      {"title": "AL Object ID Ninja Find Price",                      "project": "al-object-id-ninja-rollout"},
    "al-object-id-ninja-sign-off.md":                        {"title": "Send AL Object ID Ninja Proposal for Sign-Off",      "project": "al-object-id-ninja-rollout"},
    "al-object-id-ninja-sort-access.md":                     {"title": "Sort Access to AL Object ID Ninja",                  "project": "al-object-id-ninja-rollout"},
    "al-object-id-ninja-wait-for-sign-off.md":               {"title": "Wait for AL Object ID Ninja Sign-Off",               "project": "al-object-id-ninja-rollout"},
    "al-object-id-ninja-write-proposal.md":                  {"title": "Write AL Object ID Ninja Proposal",                  "project": "al-object-id-ninja-rollout"},
    "arrange-al-go-process-meeting.md":                      {"title": "Arrange AL-Go Process Meeting",                      "project": "al-go-support-email-notifications"},
    "ask-lisa-decree-absolute-timeline.md":                  {"title": "Ask Lisa Decree Absolute Timeline",                  "project": "get-divorced"},
    "assign-github-licence-mamta-pathak.md":                 {"title": "Assign GitHub Licence to Mamta Pathak",              "project": None},
    "bc-infra-it-feedback.md":                               {"title": "Get IT Infra Team Feedback",                         "project": "bc-dev-infrastructure-replacement"},
    "bc-infra-team-review.md":                               {"title": "BC Infra Team Review",                               "project": "bc-dev-infrastructure-replacement"},
    "bc-infra-write-requirements.md":                        {"title": "BC Infra Write Requirements",                        "project": "bc-dev-infrastructure-replacement"},
    "book-car-webuyanycar.md":                               {"title": "Book Car with We Buy Any Car",                       "project": "sell-seat-exeo"},
    "cii-pbi55179-confirm-webshop-handling.md":              {"title": "CII PBI-55179 Confirm Webshop Handling",             "project": "cii-pbi55179-midyear-membership"},
    "cii-pbi55179-investigate-unit-price.md":                {"title": "CII PBI-55179 Investigate Unit Price",               "project": "cii-pbi55179-midyear-membership"},
    "cii-pbi55179-test-plan.md":                             {"title": "CII PBI-55179 Create Test Plan",                     "project": "cii-pbi55179-midyear-membership"},
    "cii-pbi55179-write-solution.md":                        {"title": "CII PBI-55179 Write Solution",                       "project": "cii-pbi55179-midyear-membership"},
    "clean-seat-exeo.md":                                    {"title": "Clean Seat Exeo",                                    "project": "sell-seat-exeo"},
    "code-review-a0177.md":                                  {"title": "Code Review A0177",                                  "project": "fix-failing-pr-build"},
    "compile-al-go-triage-error-list.md":                    {"title": "Compile AL-Go Triage Error List",                    "project": "al-go-support-email-notifications"},
    "continia-expenses-await-response.md":                   {"title": "Await Continia Support Response",                    "project": "continia-expenses-bc28-compatibility"},
    "continia-expenses-raise-support-call.md":               {"title": "Raise Continia Support Call",                        "project": "continia-expenses-bc28-compatibility"},
    "debug-11290-example.md":                                {"title": "Debug 11290 Example",                                "project": None},
    "discuss-al-go-failures-process.md":                     {"title": "Discuss AL-Go Failures Process",                     "project": "al-go-support-email-notifications"},
    "find-v5-logbook.md":                                    {"title": "Find V5 Logbook",                                    "project": "sell-seat-exeo"},
    "fix-11290-bug.md":                                      {"title": "Fix Bug 11290",                                      "project": None},
    "fix-pr-build-release-client-response.md":               {"title": "Fix PR Build Release Client Response",               "project": "fix-failing-pr-build"},
    "get-11290-example-from-jess.md":                        {"title": "Get 11290 Example from Jess",                        "project": None},
    "get-wrapping-paper.md":                                 {"title": "Get Wrapping Paper",                                 "project": None},
    "hsl-bc-copy-production-to-sandbox.md":                  {"title": "Copy Production to Sandbox",                        "project": "hsl-bc-sandbox-refresh"},
    "hsl-bc-copy-production-to-uat.md":                      {"title": "Copy Production to UAT",                            "project": "hsl-bc-sandbox-refresh"},
    "hsl-bc-delete-sandbox-environment.md":                  {"title": "Delete Sandbox Environment",                        "project": "hsl-bc-sandbox-refresh"},
    "hsl-bc-delete-uat-environment.md":                      {"title": "Delete UAT Environment",                            "project": "hsl-bc-sandbox-refresh"},
    "hsl-bc-sync-crm-sandbox.md":                            {"title": "Sync CRM to Sandbox",                               "project": "hsl-bc-sandbox-refresh"},
    "hsl-bc-sync-crm-uat.md":                                {"title": "Sync CRM to UAT",                                   "project": "hsl-bc-sandbox-refresh"},
    "hsl-bc-wait-for-zeph-crm-refresh.md":                   {"title": "Wait for Zeph CRM Refresh",                         "project": "hsl-bc-sandbox-refresh"},
    "hsl-speak-to-stu-allen-regarding-crm-setup.md":         {"title": "Speak to Stu Allen re CRM Setup",                   "project": "hsl-bc-sandbox-refresh"},
    "investigate-11290-why-not-working.md":                  {"title": "Investigate 11290 Why Not Working",                  "project": None},
    "investigate-continia-expenses-bc28-incompatibility.md": {"title": "Investigate Continia Expenses BC28 Incompatibility", "project": "continia-expenses-bc28-compatibility"},
    "link-disney-plus-to-sky-glass.md":                      {"title": "Link Disney+ to Sky Glass",                         "project": None},
    "order-new-v5-logbook.md":                               {"title": "Order New V5 Logbook",                               "project": "sell-seat-exeo"},
    "raise-servicenow-tickets-for-al-go-failures.md":        {"title": "Raise ServiceNow Tickets for AL-Go Failures",        "project": "al-go-support-email-notifications"},
    "release-11290-fix.md":                                  {"title": "Release 11290 Fix",                                  "project": None},
    "release-11390-to-production.md":                        {"title": "Release 11390 to Production",                        "project": None},
    "release-11460-to-production.md":                        {"title": "Release 11460 to Production",                        "project": None},
    "republish-infopro-extensions-to-acoradev.md":           {"title": "Republish InfoPro Extensions to AcoraDev",           "project": None},
    "research-alcops-al-go-integration.md":                  {"title": "Research ALCops AL-Go Integration",                  "project": "al-go-support-email-notifications"},
    "research-app-insights-email-alerts.md":                 {"title": "Research App Insights Email Alerts",                 "project": "al-go-support-email-notifications"},
    "review-inc1014760.md":                                  {"title": "Review INC1014760",                                  "project": "cii-incident-management"},
    "review-inc1015233.md":                                  {"title": "Review INC1015233",                                  "project": "cii-incident-management"},
    "review-inc1015406.md":                                  {"title": "Review INC1015406",                                  "project": "cii-incident-management"},
    "ring-pete-lysandrou-arkell-way-update.md":              {"title": "Ring Pete Lysandrou - Arkell Way Update",            "project": "sell-4-arkell-way"},
    "ring-pete-lysandrou.md":                                {"title": "Ring Pete Lysandrou",                                "project": "sell-4-arkell-way"},
    "swap-insurance-to-vw-golf.md":                          {"title": "Swap Insurance to VW Golf",                         "project": "sell-seat-exeo"},
    "take-car-to-webuyanycar.md":                            {"title": "Take Car to We Buy Any Car",                        "project": "sell-seat-exeo"},
    "wait-for-court-financial-order.md":                     {"title": "Wait for Court Financial Order",                    "project": "get-divorced"},
    "wrap-mothers-day-present.md":                           {"title": "Wrap Mothers Day Present",                          "project": None},
}

def has_frontmatter_field(content, field):
    lines = content.split('\n')
    if not lines or lines[0].strip() != '---':
        return False
    for i in range(1, len(lines)):
        if lines[i].strip() == '---':
            break
        if re.match(rf'^{field}\s*:', lines[i]):
            return True
    return False

def insert_into_frontmatter(content, fields_to_add):
    lines = content.split('\n')
    if not lines or lines[0].strip() != '---':
        return content
    close_idx = None
    for i in range(1, len(lines)):
        if lines[i].strip() == '---':
            close_idx = i
            break
    if close_idx is None:
        return content
    insert_lines = []
    for k, v in fields_to_add.items():
        insert_lines.append(f'{k}: "{v}"' if k == 'title' else f'{k}: {v}')
    new_lines = lines[:close_idx] + insert_lines + lines[close_idx:]
    return '\n'.join(new_lines)

changed = []
skipped = []

for filename, edits in EDITS.items():
    filepath = os.path.join(TASKS_DIR, filename)
    if not os.path.exists(filepath):
        skipped.append(f"MISSING: {filename}")
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    fields_to_add = {}
    if not has_frontmatter_field(content, 'title'):
        fields_to_add['title'] = edits['title']
    if edits['project'] and not has_frontmatter_field(content, 'project'):
        fields_to_add['project'] = edits['project']
    if not fields_to_add:
        skipped.append(f"already complete: {filename}")
        continue
    new_content = insert_into_frontmatter(content, fields_to_add)
    with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
        f.write(new_content)
    changed.append(f"  {filename}: +{list(fields_to_add.keys())}")

print(f"Changed {len(changed)} files:")
for c in changed:
    print(c)
print(f"\nSkipped {len(skipped)}:")
for s in skipped:
    print(f"  {s}")
