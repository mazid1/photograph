export function isObject(value: any): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
