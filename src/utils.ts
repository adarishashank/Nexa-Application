export const createId = (prefix: string): string => {
  const random = Math.random().toString(36).slice(2, 10);
  const timestamp = Date.now().toString(36);
  return `${prefix}_${timestamp}_${random}`;
};

export const nowIso = (): string => new Date().toISOString();
