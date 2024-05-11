export function getInitials(name: string): string {
  return name.split(" ").reduce((s, curr) => s.concat(curr.charAt(0)), "");
}
