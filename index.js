const fetch = require('node-fetch');

const WEBHOOK_URL = 'https://hook.us2.make.com/plfe1n1gvp9ga7nriju95n5qwxzic3qv';

const data = {
  title: 'My YouTube Video',
  script: 'This is the generated script from AI.',
  voice: 'https://example.com/voice.mp3' // Use real voice file URL if needed
};

async function sendToMake() {
  try {
    console.log('Sending data to Make.com...');
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.text(); // Make.com returns plain text
    console.log('✅ Make.com response:', result);
    
    // Prevent early exit in Replit
    setTimeout(() => {
      console.log('✅ Script completed. You can close the terminal.');
      process.exit(0);
    }, 1000);

  } catch (error) {
    console.error('❌ Error sending to Make.com:', error.message);
  }
}

sendToMake();
