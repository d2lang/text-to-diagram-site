#!/usr/bin/env tsx

/* eslint-disable no-console */

import fs from 'node:fs';
import path from 'node:path';

const EXAMPLES_DIR = path.join(__dirname, '../src/examples');
const OUTPUT_FILE = path.join(__dirname, '../src/lib/imgImports.ts');

interface GeneratedContent {
  imports: string[];
  switchCases: string[];
  exportStatements: string[];
}

function generateImgImports(): void {
  console.log('🔍 Scanning examples directory...');

  // Get all example directories
  const exampleDirs = fs
    .readdirSync(EXAMPLES_DIR)
    .filter((dir) => fs.statSync(path.join(EXAMPLES_DIR, dir)).isDirectory())
    .filter((dir) => dir.match(/^\d+_/)) // Only numbered directories
    .sort((a, b) => {
      const numA = parseInt(a.split('_')[0]);
      const numB = parseInt(b.split('_')[0]);
      return numA - numB;
    });

  const content: GeneratedContent = {
    imports: [],
    switchCases: [],
    exportStatements: [],
  };

  exampleDirs.forEach((dir) => {
    const renderDir = path.join(EXAMPLES_DIR, dir, 'render');
    if (!fs.existsSync(renderDir)) {
      console.log(`⚠️  No render directory found in ${dir}`);
      return;
    }

    const exampleName = dir.split('_').slice(1).join('_');
    console.log(`📁 Processing ${dir} (${exampleName})`);

    // Get all SVG files in render directory
    const svgFiles = fs
      .readdirSync(renderDir)
      .filter((file) => file.endsWith('.svg'))
      .sort();

    svgFiles.forEach((svgFile) => {
      const baseName = path.basename(svgFile, '.svg');
      const [tool, layout] = baseName.split('_');

      if (!tool || !layout) {
        console.warn(`⚠️  Invalid filename format: ${svgFile}`);
        return;
      }

      // Generate import name
      const importName = `${tool}_${exampleName}_${layout}`;

      // Generate import statement
      content.imports.push(
        `import ${importName} from '@/examples/${dir}/render/${svgFile}';`
      );

      // Generate export statement
      content.exportStatements.push(importName);

      // Generate switch case
      const caseId = `${tool}-${exampleName}-${layout}`;
      content.switchCases.push(`    case '${caseId}':`);
      content.switchCases.push(`      return ${importName};`);
    });

    // Add a newline for readability
    content.imports.push('');
    content.switchCases.push('');
  });

  content.imports.pop(); // Remove last empty line
  content.switchCases.pop(); // Remove last empty line

  // Generate the complete file content
  const fileContent = `// Auto-generated file - do not edit manually
// Generated on: ${new Date().toISOString()}
// This file contains all image imports from the examples render directories

${content.imports.join('\n')}

export function getImage(id: string) {
  switch (id.toLowerCase()) {
${content.switchCases.join('\n')}
  }
}
`;

  // Write the file
  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log(`✅ Generated ${OUTPUT_FILE}`);
  console.log(`📊 Total imports: ${content.imports.filter((imp) => imp.trim()).length}`);
  console.log(
    `📊 Total switch cases: ${content.switchCases.filter((case_) => case_.trim()).length}`
  );
}

// Run the script
try {
  generateImgImports();
} catch (error) {
  console.error('❌ Error generating image imports:', error);
  process.exit(1);
}
