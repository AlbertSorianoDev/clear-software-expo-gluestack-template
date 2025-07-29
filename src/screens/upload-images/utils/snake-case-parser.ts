import snakecaseKeys from "snakecase-keys";

export function snakeCaseParser<T>(data: Record<string, unknown> | []): T {
  return snakecaseKeys(data, { deep: true }) as T;
}
