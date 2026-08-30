const { Document, Paragraph, TextRun, HeadingLevel, Packer } = require('docx');
const fs = require('fs');

async function testDocx() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'Converted PDF Document',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'This is an editable Word document converted with NEXORA Tools.',
                bold: true,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  console.log('Docx generated successfully! Byte length:', buffer.length);
}

testDocx();
