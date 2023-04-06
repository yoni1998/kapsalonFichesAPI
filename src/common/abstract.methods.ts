export function sortNaamAlphabetically(result: any) {
  return result.sort((a: any, b: any) => a.naam?.localeCompare(b.naam));
}

export function sortDatum(result: any) {
  return result.sort(
    (a: any, b: any) => b.created_on.created_on - a.created_on.created_on
  );
}
