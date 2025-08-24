chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyzeComments") {
    (async () => {
      try {
        console.log("Starting to fetch comments...");

        const comments = await getYouTubeComments();
        if (!comments.length) {
          sendResponse({ error: "No comments found" });
          return;
        }

        // Send comments to Flask backend
        const response = await fetch("http://127.0.0.1:5000/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comments }),
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        console.log("Analysis result:", data);

        sendResponse({ result: data });
      } catch (error) {
        console.error("Error in analyzeComments:", error);
        sendResponse({ error: "Failed to analyze comments" });
      }
    })();

    return true;
  }
});


// --- Helper to extract YouTube comments ---
const getYouTubeComments = async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) throw new Error("No active tab found");

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () =>
        Array.from(document.querySelectorAll("#content-text")).map(
          comment => comment.innerText
        ),
    });

    return result || [];
  } catch (error) {
    console.error("Error fetching YouTube comments:", error);
    return [];
  }
};