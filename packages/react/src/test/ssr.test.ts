import { describe, expect, it } from 'vitest';

describe('SSR safety', () => {
  it('imports the package without browser globals', async () => {
    const mod = await import('../index');
    expect(mod.Button).toBeDefined();
    expect(mod.TextField).toBeDefined();
    expect(mod.Dialog).toBeDefined();
  });
});
