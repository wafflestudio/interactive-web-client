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

export const safeApply = <T extends Record<string, any>>(
  currentObject: T,
  partialValue: Record<string, any>,
): T => {
  const originalKeys = Object.keys(currentObject);
  const partialEntries = Object.entries(partialValue);

  const newObject = currentObject;

  for (const [key, value] of partialEntries) {
    if (originalKeys.includes(key)) {
      const validKey = key as keyof typeof newObject;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      newObject[validKey] = value;
    }
  }

  return newObject;
};
