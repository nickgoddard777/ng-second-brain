const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, LevelFormat, PageNumber
} = require("docx");

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const headerBorder = { style: BorderStyle.SINGLE, size: 1, color: "2E75B6" };
const headerBorders = { top: headerBorder, bottom: headerBorder, left: headerBorder, right: headerBorder };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

function headerCell(text, width) {
  return new TableCell({
    borders: headerBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: "2E75B6", type: ShadingType.CLEAR },
    margins: cellMargins,
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: "FFFFFF", font: "Arial", size: 20 })] })]
  });
}

function cell(text, width) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    margins: cellMargins,
    children: [new Paragraph({ children: [new TextRun({ text, font: "Arial", size: 20 })] })]
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: "404040" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "2E75B6", space: 1 } },
          children: [new TextRun({ text: "Development Practices & Processes — Meeting Summary", font: "Arial", size: 18, color: "999999" })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 4 } },
          children: [
            new TextRun({ text: "Page ", font: "Arial", size: 16, color: "999999" }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: "999999" })
          ]
        })]
      })
    },
    children: [
      // Title
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
        children: [new TextRun({ text: "Development Practices & Processes", bold: true, font: "Arial", size: 40, color: "2E75B6" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
        children: [new TextRun({ text: "Meeting Summary", font: "Arial", size: 28, color: "404040" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
        children: [new TextRun({ text: "12 May 2026 | 1:02 PM – 2:10 PM (1h 8m)", font: "Arial", size: 22, color: "666666" })] }),

      // Meeting Details
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Meeting Details")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun({ text: "Attendees: ", bold: true }), new TextRun("Nick Goddard, Daniel Townsend, Mamta Pathak, Kevin Portellas, Pitso Ntise, Lukasz Rodewald, Josh Murphy, Ricardo Cardoso")
      ]}),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun({ text: "Facilitator: ", bold: true }), new TextRun("Nick Goddard")
      ]}),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun({ text: "Transcription started by: ", bold: true }), new TextRun("Josh Murphy")
      ]}),

      // Topic 1
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Topic 1: Testing")] }),
      new Paragraph({ spacing: { after: 120 }, children: [
        new TextRun("Nick outlined the contractual obligation to test customer extensions against new BC major releases via DevOps pipelines. Currently pipelines only verify code compiles and upgrades — they cannot catch functional regressions. The only way to catch those is through developer-written tests.")
      ]}),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Key Points")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun({ text: "Test-Driven Development (TDD) should be the standard", bold: true }),
        new TextRun(" — write a failing test first, then write code to make it pass. This produces more modular, testable code.")
      ]}),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun({ text: "\"Not enough time\" is the universal objection", bold: true }),
        new TextRun(", but skipping tests leads to expensive snagging later, often at Acora’s cost.")
      ]}),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun({ text: "Bug fixes are the easiest tests to write", bold: true }),
        new TextRun(" — the customer tells you what’s wrong; replicate it in a test, then fix.")
      ]}),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun({ text: "New AL Language extension (v17+)", bold: true }),
        new TextRun(" includes a built-in test runner from Microsoft that is faster and more stable than AL Test Runner.")
      ]}),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun({ text: "AI tools (Claude, GitHub Copilot)", bold: true }),
        new TextRun(" are useful for explaining existing code, generating test plans from specs, and flagging ambiguous requirements.")
      ]}),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [
        new TextRun({ text: "Specs currently lack acceptance criteria", bold: true }),
        new TextRun(", making it hard to know what to test and build against.")
      ]}),

      // Topic 2
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Topic 2: Issue Tracking & Work Management via DevOps")] }),
      new Paragraph({ spacing: { after: 120 }, children: [
        new TextRun("Nick highlighted that commit messages and PR descriptions often lack context about what was asked for and why. This makes code review ineffective and traceability impossible.")
      ]}),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Key Points")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun({ text: "All work should flow through Azure DevOps", bold: true }),
        new TextRun(" — no more accepting work via email or other ad-hoc channels.")
      ]}),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun({ text: "Use AB#[work-item-number]", bold: true }),
        new TextRun(" in PR/commit messages to link changes back to DevOps work items.")
      ]}),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun({ text: "DevOps structure: ", bold: true }),
        new TextRun("project per customer, epics at Nav job level, features at job task level.")
      ]}),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun("Mike is exploring using Power Automate to auto-create DevOps structure from Project Operations plans.")
      ]}),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun({ text: "CII’s DevOps + ServiceNow integration is a model", bold: true }),
        new TextRun(" — push ServiceNow tickets directly into DevOps.")
      ]}),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [
        new TextRun({ text: "Better feedback loops needed", bold: true }),
        new TextRun(": developers are never told when customer testing passes, so tickets go stale.")
      ]}),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [
        new TextRun({ text: "Retrospectives on project delivery are needed", bold: true }),
        new TextRun(" to identify quoting vs. reality gaps.")
      ]}),

      // Topic 3
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Topic 3: Development Environment Setup Time")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Lukasz raised that creating Docker environments for new BC versions takes significant time and is not accounted for in quotes. Nick acknowledged this and noted Stu now includes release management and testing time in uplift quotes. Nick is also planning to redo the development environment infrastructure once current priorities allow.")
      ]}),

      // Action Items
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Action Items")] }),
      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [500, 5026, 1500, 2000],
        rows: [
          new TableRow({ children: [
            headerCell("#", 500), headerCell("Action", 5026), headerCell("Owner", 1500), headerCell("Notes", 2000)
          ]}),
          new TableRow({ children: [
            cell("1", 500), cell("Feed back to sales team that specs need acceptance criteria (what “done” looks like)", 5026), cell("Nick / Dan", 1500), cell("For quoting and spec process", 2000)
          ]}),
          new TableRow({ children: [
            cell("2", 500), cell("Raise with management that upgrades without understanding the code is a risk", 5026), cell("Nick / Dan", 1500), cell("Need management direction", 2000)
          ]}),
          new TableRow({ children: [
            cell("3", 500), cell("Feed back to sales that “just do what it does now” is not sufficient — need proper needs analysis or caveated proposals", 5026), cell("Nick / Dan", 1500), cell("Prompted by Edgeworth example", 2000)
          ]}),
          new TableRow({ children: [
            cell("4", 500), cell("Replicate the CII ServiceNow → DevOps integration for Acora-wide use", 5026), cell("Dan", 1500), cell("So support tickets flow into DevOps", 2000)
          ]}),
          new TableRow({ children: [
            cell("5", 500), cell("Document the DevOps structure/process and circulate to the team", 5026), cell("Nick", 1500), cell("Basis for retrospective meetings", 2000)
          ]}),
          new TableRow({ children: [
            cell("6", 500), cell("Set up retrospective meetings in DevOps to review project delivery", 5026), cell("Mamta", 1500), cell("Compare estimates vs actuals", 2000)
          ]}),
          new TableRow({ children: [
            cell("7", 500), cell("Docker/dev environment setup time must be factored into project planning", 5026), cell("Nick / Dan", 1500), cell("Whether chargeable or not", 2000)
          ]}),
          new TableRow({ children: [
            cell("8", 500), cell("Send out links to AL testing resources (Ariopa / YouTube)", 5026), cell("Nick", 1500), cell("", 2000)
          ]}),
          new TableRow({ children: [
            cell("9", 500), cell("Connect GitHub repo SO232 to Kevin’s DevOps project", 5026), cell("Nick", 1500), cell("Kevin lacks admin permissions", 2000)
          ]}),
        ]
      }),
    ]
  }]
});

const outPath = "C:\\Users\\Nick.Goddard\\OneDrive - Acora Limited\\Documents\\GitHub\\ng-second-brain\\outputs\\2026-05-12-dev-practices-meeting-summary.docx";
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outPath, buffer);
  console.log("Created: " + outPath);
});
