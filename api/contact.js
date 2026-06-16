export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

    if (!formspreeEndpoint) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Forward the request to Formspree
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(response.status).json({ error: 'Error sending message' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
