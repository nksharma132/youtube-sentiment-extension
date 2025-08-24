// Collect all YouTube comments and return as a single string
const collectComments = () => {
  const comments = [...document.querySelectorAll("#content-text")]
    .map(comment => comment.innerText.trim()); // clean up each comment
  return comments.join(" ");
};

// Listen for messages from background or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getComments") {
    const combinedText = collectComments();

    // Return the combined text to the sender
    sendResponse({ combinedText });

    // Keep the channel alive for potential async operations
    return true;
  }
});
