// Define our closeModal function immediately as a global function
// This ensures it's available for the onclick handler
window.closeModal = function() {
    var modal = document.getElementById('customModal');
    if (modal) {
        modal.classList.add('hidden');
    }
};

// Main initialization function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - initializing lotto generator");
    
    // Get all required DOM elements
    var generateButton = document.getElementById('generateBtn');
    var lottoCountInput = document.getElementById('lottoCount');
    var lottoRangeInput = document.getElementById('lottoRange');
    var powerballToggle = document.getElementById('powerballToggle');
    var powerballGroup = document.getElementById('powerballGroup');
    var powerballRangeInput = document.getElementById('powerballRange');
    var resultsContainer = document.getElementById('generatorResults');
    
    // Log element status for debugging
    console.log("Found generate button:", !!generateButton);
    console.log("Found lotto count input:", !!lottoCountInput);
    console.log("Found results container:", !!resultsContainer);
    
    // Attach event listeners if elements exist
    if (generateButton) {
        generateButton.onclick = function() {
            handleGenerateClick();
        };
        console.log("Attached click handler to generate button");
    }
    
    if (powerballToggle) {
        powerballToggle.onchange = function() {
            togglePowerballOptions();
        };
    }
    
    // Handle generate button click
    function handleGenerateClick() {
        console.log("Generate button clicked");
        
        // Check if required elements exist
        if (!lottoCountInput || !lottoRangeInput || !resultsContainer) {
            alert("Some required elements are missing. Please refresh the page and try again.");
            return;
        }
        
        // Get input values
        var count = parseInt(lottoCountInput.value) || 6;
        var range = parseInt(lottoRangeInput.value) || 49;
        var includePowerball = powerballToggle && powerballToggle.checked;
        var powerballRange = powerballRangeInput ? (parseInt(powerballRangeInput.value) || 20) : 20;
        
        console.log("Generating with:", {count, range, includePowerball, powerballRange});
        
        // Validate input
        if (count > range) {
            showModal('Error', "Numbers to pick can't be greater than the range!");
            return;
        }
        
        if (count < 1 || range < count || range > 99) {
            showModal('Error', "Please check your input values!");
            return;
        }
        
        // Generate main numbers
        var numbers = generateUniqueNumbers(count, range);
        
        // Generate powerball if needed
        var powerball = null;
        if (includePowerball) {
            powerball = Math.floor(Math.random() * powerballRange) + 1;
        }
        
        // Display the results
        displayResults(numbers, powerball);
    }
    
    // Toggle powerball options visibility
    function togglePowerballOptions() {
        if (powerballGroup && powerballToggle) {
            if (powerballToggle.checked) {
                powerballGroup.classList.remove('hidden');
            } else {
                powerballGroup.classList.add('hidden');
            }
        }
    }
    
    // Generate unique random numbers
    function generateUniqueNumbers(count, range) {
        var numbers = [];
        var availableNumbers = Array.from({length: range}, function(_, i) { return i + 1; });
        
        while (numbers.length < count) {
            var randomIndex = Math.floor(Math.random() * availableNumbers.length);
            numbers.push(availableNumbers[randomIndex]);
            availableNumbers.splice(randomIndex, 1);
        }
        
        return numbers.sort(function(a, b) { return a - b; });
    }
    
    // Display the generated numbers
    function displayResults(numbers, powerball) {
        console.log("Displaying results:", {numbers, powerball});
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Create result row
        var resultRow = document.createElement('div');
        resultRow.className = 'result-row';
        
        // Create main balls
        var resultBalls = document.createElement('div');
        resultBalls.className = 'result-balls';
        
        for (var i = 0; i < numbers.length; i++) {
            var number = numbers[i];
            var ball = document.createElement('div');
            ball.className = 'result-ball ' + getBallColor(number);
            ball.textContent = number;
            resultBalls.appendChild(ball);
        }
        
        resultRow.appendChild(resultBalls);
        
        // Add powerball if included
        if (powerball !== null) {
            var divider = document.createElement('div');
            divider.className = 'powerball-divider';
            divider.textContent = '|';
            resultRow.appendChild(divider);
            
            var powerballElement = document.createElement('div');
            powerballElement.className = 'result-ball yellow';
            powerballElement.textContent = powerball;
            
            var powerballContainer = document.createElement('div');
            powerballContainer.className = 'result-balls';
            powerballContainer.appendChild(powerballElement);
            
            resultRow.appendChild(powerballContainer);
        }
        
        resultsContainer.appendChild(resultRow);
        
        // Add a prompt
        var prompt = document.createElement('p');
        prompt.style.textAlign = 'center';
        prompt.style.marginTop = '20px';
        prompt.innerHTML = 'Download the app for more features,<br>including saving favorites and more lottery types!';
        
        resultsContainer.appendChild(prompt);
    }
    
    // Determine ball color based on number range
    function getBallColor(number) {
        if (number <= 19) return 'red';
        if (number <= 29) return 'yellow';
        if (number <= 39) return 'green';
        return 'blue';
    }
    
    // Show a modal with a message
    function showModal(title, message) {
        var modal = document.getElementById('customModal');
        
        if (modal) {
            modal.innerHTML = '<div class="modal-content">' +
                '<h2>' + title + '</h2>' +
                '<p>' + message + '</p>' +
                '<div class="modal-buttons">' +
                '<button onclick="window.closeModal()">OK</button>' +
                '</div>' +
                '</div>';
            
            modal.classList.remove('hidden');
        } else {
            // Fallback to alert if modal not found
            alert(title + ": " + message);
        }
    }
});
