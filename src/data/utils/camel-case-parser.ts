import camelcaseKeys from "camelcase-keys";

export function camelCaseParser<T>(data: Record<string, unknown> | []): T {
  return camelcaseKeys(data, { deep: true }) as T;
}
