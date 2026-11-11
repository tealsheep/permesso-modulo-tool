export function FieldStatus({ required }: { required?: boolean }) {
  return required ? <><span className="required" aria-hidden="true">*</span><span className="sr-only">必填</span></> : <span className="optional">（选填）</span>
}
