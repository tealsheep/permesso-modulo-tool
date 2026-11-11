import postcss from 'postcss'
import ts from 'typescript'

const visualProperty = /^(?:color|background(?:-color|-image)?|(?:border|outline)(?:-(?:top|right|bottom|left))?(?:-color)?|(?:text-decoration|text-emphasis|caret|accent|column-rule)(?:-color)?|fill|stroke|box-shadow|text-shadow|border(?:-(?:top|bottom)-(?:left|right))?-radius)$/
const kebab = (name: string) => name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

export function checkDeclaration(property: string, value: string): boolean {
  if (property.startsWith('--')) return false // Only tokens.css may define variables.
  if (!visualProperty.test(property)) return !/#[\da-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|lab|lch|color)\s*\(/i.test(value)
  // No fallbacks: var(--ink, red) would create another source of visual values.
  const rest = value.replace(/var\(--[\w-]+\)/g, '').trim()
  if (/shadow|radius/.test(property)) return rest.split(/\s+/).every((part) => /^(?:none|0|inherit|initial|unset|revert)?$/.test(part))
  return rest.split(/\s+/).every((part) => /^(?:|0|\d+(?:\.\d+)?(?:px|em|rem)|solid|dashed|dotted|double|underline|overline|line-through|none|transparent|currentcolor|inherit|initial|unset|revert)$/i.test(part))
}

export function cssViolations(source: string): string[] {
  const failures: string[] = []
  postcss.parse(source).walkDecls((decl) => {
    if (!checkDeclaration(decl.prop.toLowerCase(), decl.value)) failures.push(`${decl.source?.start?.line}: ${decl.prop}: ${decl.value}`)
  })
  return failures
}

export function tsxViolations(source: string): string[] {
  const failures: string[] = []
  const file = ts.createSourceFile('component.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  function inspect(property: string, node: ts.Node) {
    const prop = kebab(property)
    if (!visualProperty.test(prop) && !prop.startsWith('--')) return
    const value = ts.isStringLiteralLike(node) ? node.text : node.getText(file)
    if (!checkDeclaration(prop, value)) failures.push(`${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1}: ${prop}: ${value}`)
  }
  function visit(node: ts.Node) {
    if (ts.isPropertyAssignment(node)) inspect(node.name.getText(file).replace(/['"]/g, ''), node.initializer)
    if (ts.isJsxAttribute(node) && node.initializer) {
      const value = ts.isJsxExpression(node.initializer) ? node.initializer.expression : node.initializer
      if (value) inspect(node.name.getText(file), value)
    }
    ts.forEachChild(node, visit)
  }
  visit(file)
  return failures
}
