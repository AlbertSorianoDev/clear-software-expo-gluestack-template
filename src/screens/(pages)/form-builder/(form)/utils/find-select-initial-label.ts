export function findSelectInitialLabel(
  optionId?: number,
  options?: { id: number; label: string }[],
): string | undefined {
  if (!optionId || !options?.length) return undefined;
  return options.find((opt) => opt.id === optionId)?.label;
}
