document.querySelector('#analyze-btn').addEventListener('click', async () => {
  const positive = document.querySelector('#positive');
  const neutral = document.querySelector('#neutral');
  const negative = document.querySelector('#negative');
  const reportDiv = document.querySelector('#report');

  try {
    // Send message to background.js and wait for response
    const response = await chrome.runtime.sendMessage({ action: "analyzeComments" });

    if (!response || response.error) {
      reportDiv.textContent = `Error: ${response?.error || "Unknown error"}`;
      return;
    }

    // Convert sentiment values to percentages
    const report = {
      positive: Math.round(parseFloat(response.result.pos) * 100),
      neutral: Math.round(parseFloat(response.result.neu) * 100),
      negative: Math.round(parseFloat(response.result.neg) * 100)
    };

    // Update DOM with sentiment values
    positive.textContent = `${report.positive}%`;
    neutral.textContent = `${report.neutral}%`;
    negative.textContent = `${report.negative}%`;

    // Load sentiment chart
    loadChart(report);

    reportDiv.classList.remove('hidden');
  } catch (error) {
    console.error('Popup error:', error);
    reportDiv.textContent = "Error: Failed to communicate with background script.";
  }
});

// Chart rendering function
function loadChart(report) {
  const canvas = document.getElementById('sentimentChart');
  const ctx = canvas.getContext('2d');

  // Clear previous chart if exists
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const data = [
    { label: "Positive", value: report['positive'], color: "green" },
    { label: "Neutral", value: report['neutral'], color: "orange" },
    { label: "Negative", value: report['negative'], color: "red" }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 120;
  const innerRadius = 70;

  let startAngle = -Math.PI / 2;

  // Draw donut chart
  data.forEach(item => {
    const sliceAngle = (item.value / total) * (2 * Math.PI);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();

    ctx.fillStyle = item.color;
    ctx.fill();

    startAngle += sliceAngle;
  });

  // Add center text
  ctx.fillStyle = "#333";
  ctx.font = "bold 16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Comments", centerX, centerY);
}
