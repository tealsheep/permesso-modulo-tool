import { writeFile } from 'node:fs/promises'
import { fieldRulesMarkdown } from '../src/questionnaire/rule-report'
await writeFile('docs/FIELD-RULES.md', fieldRulesMarkdown())
console.log('Generated docs/FIELD-RULES.md from questionnaire branches and mapping metadata.')
