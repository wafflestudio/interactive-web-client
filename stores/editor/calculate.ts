//compare logic
export const isPartialDifferent = <T extends object>(
  state: T,
  partialState: Partial<T>,
): boolean => {
  const originalKeys = Object.keys(state);
  const partialEntries = Object.entries(partialState);
  if (originalKeys.length < 1) {
    return false;
  }
  for (const [key, value] of partialEntries) {
    if (originalKeys.includes(key)) {
      const validKey = key as keyof typeof state;
      if (state[validKey] !== value) {
        return true;
      }
    } else {
      return true;
    }
  }
  return false;
};
