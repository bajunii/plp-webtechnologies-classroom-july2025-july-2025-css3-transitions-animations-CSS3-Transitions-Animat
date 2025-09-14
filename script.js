// ===== PART 2: JAVASCRIPT FUNCTIONS - SCOPE, PARAMETERS & RETURN VALUES =====

// Global Variables (Demonstrating Global Scope)
let globalCounter = 0;
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];

/**
 * Function demonstrating parameters and return values
 * Takes a number as parameter and returns its square
 */
function calculateSquare() {
    // Local variable (demonstrating local scope)
    const input = document.getElementById('numberInput');
    const number = parseFloat(input.value);
    
    // Input validation with early return
    if (isNaN(number)) {
        displayResult('Please enter a valid number!');
        return null;
    }
    
    // Calculate square (demonstrating function logic)
    const square = calculateMath(number, 'square');
    const result = `The square of ${number} is ${square}`;
    
    displayResult(result);
    return square;
}

/**
 * Reusable function with parameters demonstrating different calculations
 * @param {number} num - The number to calculate with
 * @param {string} operation - The type of calculation ('square', 'cube', 'double')
 * @returns {number} - The result of the calculation
 */
function calculateMath(num, operation) {
    // Local scope variables
    let result;
    
    switch (operation) {
        case 'square':
            result = num * num;
            break;
        case 'cube':
            result = num * num * num;
            break;
        case 'double':
            result = num * 2;
            break;
        default:
            result = num;
    }
    
    return result;
}

/**
 * Function demonstrating random generation and return values
 * Returns a random color from the global colors array
 */
function generateRandomColor() {
    // Local variable accessing global array
    const randomIndex = Math.floor(Math.random() * colors.length);
    const selectedColor = colors[randomIndex];
    
    // Update the color display
    const colorDisplay = document.getElementById('color-display');
    colorDisplay.style.backgroundColor = selectedColor;
    colorDisplay.style.transform = 'scale(1.1)';
    
    // Reset scale after animation
    setTimeout(() => {
        colorDisplay.style.transform = 'scale(1)';
    }, 200);
    
    displayResult(`Generated color: ${selectedColor}`);
    return selectedColor;
}

/**
 * Function demonstrating global scope modification
 * Modifies the global counter variable
 */
function updateCounter() {
    // Modifying global variable (demonstrating global scope)
    globalCounter++;
    
    // Local variables for DOM manipulation
    const counterElement = document.getElementById('counter');
    const counterDisplay = document.getElementById('counter-display');
    
    // Update display with animation
    counterElement.textContent = globalCounter;
    counterDisplay.style.transform = 'scale(1.1)';
    counterDisplay.style.backgroundColor = generateRandomColorValue();
    
    // Reset animation
    setTimeout(() => {
        counterDisplay.style.transform = 'scale(1)';
    }, 200);
    
    displayResult(`Counter updated to: ${globalCounter}`);
    return globalCounter;
}

/**
 * Helper function that returns a value without displaying it
 * Demonstrates pure function concept
 */
function generateRandomColorValue() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

/**
 * Utility function for displaying results
 * @param {string} message - The message to display
 */
function displayResult(message) {
    const resultDisplay = document.getElementById('result-display');
    resultDisplay.textContent = message;
    resultDisplay.style.opacity = '0';
    resultDisplay.style.transform = 'translateY(10px)';
    
    // Animate in
    setTimeout(() => {
        resultDisplay.style.opacity = '1';
        resultDisplay.style.transform = 'translateY(0)';
    }, 50);
}

// ===== PART 3: COMBINING CSS ANIMATIONS WITH JAVASCRIPT =====

/**
 * Function that triggers CSS animations through class manipulation
 * @param {string} animationType - The type of animation to trigger
 */
function animateBox(animationType) {
    const box = document.getElementById('animated-box');
    
    // Remove any existing animation classes
    box.classList.remove('bounce', 'spin', 'pulse');
    
    // Force reflow to ensure class removal takes effect
    box.offsetHeight;
    
    // Add the new animation class
    box.classList.add(animationType);
    
    // Remove animation class after animation completes
    setTimeout(() => {
        box.classList.remove(animationType);
    }, 1000);
    
    // Update result display
    displayResult(`Applied ${animationType} animation to the box!`);
}

/**
 * Function to reset all animations
 */
function resetAnimations() {
    const box = document.getElementById('animated-box');
    box.classList.remove('bounce', 'spin', 'pulse');
    
    // Reset any inline styles
    box.style.transform = '';
    box.style.backgroundColor = '';
    
    displayResult('All animations reset!');
}

/**
 * Function demonstrating event-driven animation
 * Toggles card flip state
 */
function toggleCard() {
    const card = document.getElementById('flip-card');
    card.classList.toggle('flipped');
    
    const isFlipped = card.classList.contains('flipped');
    displayResult(`Card ${isFlipped ? 'flipped' : 'reset'}!`);
}

/**
 * Function to show modal with CSS animation
 */
function showModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('show');
    
    // Add loading effect before showing modal
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        displayResult('Modal opened with slide-in animation!');
    }, 1000);
}

/**
 * Function to hide modal
 */
function hideModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    displayResult('Modal closed!');
}

/**
 * Function demonstrating loading animation control
 */
function showLoading() {
    const loading = document.getElementById('loading');
    loading.classList.add('show');
}

/**
 * Function to hide loading animation
 */
function hideLoading() {
    const loading = document.getElementById('loading');
    loading.classList.remove('show');
}

/**
 * Advanced function demonstrating multiple animations with parameters
 * @param {HTMLElement} element - The element to animate
 * @param {string} animation - The animation type
 * @param {number} duration - Duration in milliseconds
 * @param {function} callback - Function to call after animation
 */
function animateElement(element, animation, duration = 1000, callback = null) {
    // Local variables demonstrating scope
    const originalTransform = element.style.transform;
    const originalBackground = element.style.backgroundColor;
    
    // Apply animation based on type
    switch (animation) {
        case 'shake':
            element.style.animation = `shake 0.5s ease-in-out`;
            break;
        case 'glow':
            element.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.8)';
            element.style.transform = 'scale(1.05)';
            break;
        case 'rainbow':
            let colorIndex = 0;
            const colorInterval = setInterval(() => {
                element.style.backgroundColor = colors[colorIndex % colors.length];
                colorIndex++;
            }, 200);
            
            setTimeout(() => {
                clearInterval(colorInterval);
                element.style.backgroundColor = originalBackground;
            }, duration);
            break;
    }
    
    // Reset after duration and call callback
    setTimeout(() => {
        element.style.transform = originalTransform;
        element.style.boxShadow = '';
        element.style.animation = '';
        
        if (callback && typeof callback === 'function') {
            callback();
        }
    }, duration);
    
    return true;
}

// ===== EVENT LISTENERS AND INITIALIZATION =====

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with welcome message
    displayResult('Welcome! Try the interactive functions above.');
    
    // Add click event to animated box for additional interactivity
    const animatedBox = document.getElementById('animated-box');
    animatedBox.addEventListener('click', function() {
        const randomAnimation = ['shake', 'glow', 'rainbow'][Math.floor(Math.random() * 3)];
        animateElement(this, randomAnimation, 1500, () => {
            displayResult(`Box clicked! Applied ${randomAnimation} effect.`);
        });
    });
    
    // Add keyboard event for Enter key on number input
    const numberInput = document.getElementById('numberInput');
    numberInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculateSquare();
        }
    });
    
    // Add hover effects to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

/**
 * Function demonstrating scope chain and closure
 * Returns a function that remembers its environment
 */
function createCounter(initialValue = 0) {
    // Private variable (closure)
    let count = initialValue;
    
    // Return function that has access to count variable
    return function() {
        count++;
        return count;
    };
}

// Example of closure usage
const specialCounter = createCounter(10);

/**
 * Advanced demonstration function showing parameter destructuring and default values
 * @param {Object} options - Configuration object
 * @param {string} options.element - Element ID to animate
 * @param {string} options.type - Animation type
 * @param {number} options.duration - Animation duration
 * @param {boolean} options.repeat - Whether to repeat animation
 */
function advancedAnimate({
    element = 'animated-box',
    type = 'bounce',
    duration = 1000,
    repeat = false
} = {}) {
    const targetElement = document.getElementById(element);
    
    if (!targetElement) {
        displayResult('Element not found!');
        return false;
    }
    
    animateElement(targetElement, type, duration, () => {
        if (repeat) {
            setTimeout(() => {
                advancedAnimate({ element, type, duration, repeat: false });
            }, 500);
        }
    });
    
    return true;
}

// Add CSS keyframe for shake animation
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}`;

// Inject shake animation into stylesheet
const style = document.createElement('style');
style.textContent = shakeKeyframes;
document.head.appendChild(style);