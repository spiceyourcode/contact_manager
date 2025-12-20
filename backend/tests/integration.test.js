process.env.NODE_ENV = 'test';

import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';

test('login endpoint returns 400 on missing fields', async () => {
  const { app } = await import('../server.js');
  const server = app.listen(0);
  const port = server.address().port;
  try {
    const response = await fetch(`http://localhost:${port}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.strictEqual(response.status, 400);
    const data = await response.json();
    assert.ok(data.message.includes('required'));
  } finally {
    server.close();
    await mongoose.connection.close();
  }
});
