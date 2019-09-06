export function str(text: TemplateStringsArray, ...args: any[]) {
  return `"${mergeTemplating(text, args)}"`;
}

export function space(text: TemplateStringsArray, ...args: any[]) {
  return ` ${mergeTemplating(text, args)} `;
}

function mergeTemplating(text: TemplateStringsArray, args: any[]) {
  return text.reduce((prev, text, index) => {
    return prev + text + (args[index] ? args[index] : "");
  }, "");
}

export function getSpaces(size: number) {
  let content = "";
  for (let i = 0; i < size; i++) {
    content += " ";
  }
  return content;
}
