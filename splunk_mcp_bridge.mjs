import readline from "readline";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const SPLUNK_URL = "https://<IP or HOST NAME>:<PORT>/services/mcp/";
const BEARER_TOKEN = "<ADD TOKEN HERE>";

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

rl.on("line", async (line) => {
  if (!line.trim()) return;

  try {
    const request = JSON.parse(line);
    
    const response = await fetch(SPLUNK_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${BEARER_TOKEN}`,
        "X-Splunk-Authorization": BEARER_TOKEN,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(request)
    });

    const jsonResponse = await response.json();
    
    // Ensure the ID matches what Claude sent
    if (jsonResponse) {
        jsonResponse.id = request.id; 
        process.stdout.write(JSON.stringify(jsonResponse) + "\n");
    }
  } catch (error) {
    console.error("Execution Error:", error.message);
  }
});

console.error("Final Robust Relay Active");
