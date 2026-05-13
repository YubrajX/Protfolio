
async function testChatApi() {
    try {
        console.log("Sending request to http://localhost:3000/api/chat...");
        const response = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [
                    { role: "user", content: "Hello, are you working?" }
                ]
            }),
        });

        console.log(`Response Status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            const text = await response.text();
            console.error("Response Error Body:", text);
            return;
        }

        const reader = response.body?.getReader();
        if (!reader) {
            console.log("No body reader available");
            return;
        }

        const decoder = new TextDecoder();
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            console.log("Chunk:", decoder.decode(value, { stream: true }));
        }
        console.log("Stream finished.");

    } catch (error) {
        console.error("Test Request Failed:", error);
    }
}

testChatApi();
