import test from 'node:test';
import assert from 'node:assert/strict';

// Mock of a D1 batch returning a successful insert followed by two
// conditional updates affecting zero rows. This is a regression demonstration,
// NOT an integration test against real Cloudflare D1.
test('BLOCKER: post-batch checks cannot undo partial committed changes', async () => {
  const persisted = { entitlement: false, accountActive: false, tokenConsumed: false };
  async function mockBatch() {
    persisted.entitlement = true;
    return [{meta:{changes:1}},{meta:{changes:0}},{meta:{changes:0}}];
  }
  const results = await mockBatch();
  const inserted = results[0].meta.changes;
  const accountUpdated = results[1].meta.changes;
  const tokenConsumed = results[2].meta.changes;
  assert.equal(inserted === 1 && accountUpdated === 1 && tokenConsumed === 1, false);
  assert.deepEqual(persisted, {entitlement:true,accountActive:false,tokenConsumed:false});
});
