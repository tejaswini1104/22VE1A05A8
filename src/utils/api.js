export async function shortenUrl(entry) {
  const response = await fetch('http://localhost:5000/urls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...entry,
      shortUrl: "http://short.ly/" + Math.random().toString(36).substring(7),
      expiry: new Date(Date.now() + entry.validity * 60000).toISOString()
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to shorten URL');
  }

  return response.json();
}

export async function getStats() {
  const response = await fetch('http://localhost:5000/urls');
  return response.json();
}
