const fetch = require('node-fetch'); // Only needed if using Node.js

const WEBHOOK_URL = 'https://hook.us2.make.com/plfe1n1gvp9ga7nriju95n5qwxzic3qv';

const data = {
  title: 'My YouTube Video',
  script: 'This is the generated script from AI.',
  voice: 'https://example.com/voice.mp3' // Replace with real URL or data
};

async function sendToMake() {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.text(); // ✅ Correct way for Make.com plain-text response
    console.log('Make.com response:', result); // Should log "Accepted"
  } catch (error) {
    console.error('Error sending to Make.com:', error.message);
  }
}

sendToMake();
