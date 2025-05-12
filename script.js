// Get all theme buttons
const themeButtons = document.querySelectorAll('.theme-btn');
const contentBox = document.querySelector('.content-box');

// Function to set theme
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('preferred-theme', theme);
    
    // Enhanced animation for content box
    animateContentBox();
    
    // Store last interaction time
    localStorage.setItem('lastInteraction', new Date().toISOString());
}

// Function to animate content box
function animateContentBox() {
    contentBox.style.animation = 'none';
    contentBox.offsetHeight; // Trigger reflow
    contentBox.style.animation = 'slideIn 0.5s ease-out';
}

// Function to initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) {
        setTheme(savedTheme);
    }
    
    // Add interaction count
    const interactionCount = parseInt(localStorage.getItem('interactionCount') || '0');
    localStorage.setItem('interactionCount', interactionCount + 1);
    
    // Display interaction stats
    displayInteractionStats();
}

// Function to display interaction statistics
function displayInteractionStats() {
    const lastInteraction = localStorage.getItem('lastInteraction');
    const interactionCount = localStorage.getItem('interactionCount');
    
    const statsDiv = document.createElement('div');
    statsDiv.className = 'stats-box';
    statsDiv.innerHTML = `
        <p>Last interaction: ${new Date(lastInteraction).toLocaleString()}</p>
        <p>Total interactions: ${interactionCount}</p>
    `;
    
    // Remove existing stats if any
    const existingStats = document.querySelector('.stats-box');
    if (existingStats) {
        existingStats.remove();
    }
    
    document.querySelector('.container').appendChild(statsDiv);
}

// Add click event listeners to theme buttons
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        setTheme(theme);
        displayInteractionStats();
    });
    
    // Add focus animation
    button.addEventListener('focus', () => {
        button.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('blur', () => {
        button.style.transform = 'scale(1)';
    });
});

// Initialize theme when page loads
document.addEventListener('DOMContentLoaded', initializeTheme); 