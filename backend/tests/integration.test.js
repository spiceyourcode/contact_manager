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

test('user registration returns 400 on invalid email format', async () => {
  const { app } = await import('../server.js');
  const server = app.listen(0);
  const port = server.address().port;
  try {
    const response = await fetch(`http://localhost:${port}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123'
      })
    });
    assert.strictEqual(response.status, 400);
    const data = await response.json();
    assert.ok(data.message.includes('email') || data.message.includes('valid'));
  } finally {
    server.close();
    await mongoose.connection.close();
  }
});

test('contact creation returns 401 without authentication token', async () => {
  const { app } = await import('../server.js');
  const server = app.listen(0);
  const port = server.address().port;
  try {
    const response = await fetch(`http://localhost:${port}/api/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Contact',
        email: 'test@example.com',
        phone: '123-456-7890'
      })
    });
    assert.strictEqual(response.status, 401);
    const data = await response.json();
    assert.ok(data.message.includes('access') || data.message.includes('token') || data.message.includes('authorized'));
  } finally {
    server.close();
    await mongoose.connection.close();
  }
});

