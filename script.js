document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded - fixed script");
    
    // Elements
    const generateBtn = document.getElementById('generateBtn');
    const lottoCountInput = document.getElementById('lottoCount');
    const lottoRangeInput = document.getElementById('lottoRange');
    const powerballToggle = document.getElementById('powerballToggle');
    const powerballGroup = document.getElementById('powerballGroup');
    const powerballRangeInput = document.getElementById('powerballRange');
    const generatorResults = document.getElementById('generatorResults');
    
    console.log("Generate button found:", !!generateBtn);
    
    // Event Listeners - with proper checks to avoid null reference errors
    if (generateBtn) {
        generateBtn.addEventListener('click', generateNumbers);
        console.log("Added click event listener to generate button");
    } else {
        console.error("Generate button not found in the DOM");
    }
    
    if (powerballToggle) {
        powerballToggle.addEventListener('change', togglePowerballOptions);
    }
    
    // Functions
    function togglePowerballOptions() {
        if (powerballGroup) {
            if (powerballToggle.checked) {
                powerballGroup.classList.remove('hidden');
            } else {
                powerballGroup.classList.add('hidden');
            }
        }
    }
    
    function generateNumbers() {
        console.log("generateNumbers function called");
        
        if (!lottoCountInput || !lottoRangeInput || !generatorResults) {
            console.error("Required DOM elements not found");
            return;
        }
        
        const count = parseInt(lottoCountInput.value) || 6;
        const range = parseInt(lottoRangeInput.value) || 49;
        const includePowerball = powerballToggle && powerballToggle.checked;
        const powerballRange = powerballRangeInput ? (parseInt(powerballRangeInput.value) || 20) : 20;
        
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
        let numbers = generateUniqueNumbers(count, range);
        
        // Generate powerball if needed
        let powerball = null;
        if (includePowerball) {
            powerball = Math.floor(Math.random() * powerballRange) + 1;
        }
        
        displayResults(numbers, powerball);
    }
    
    function generateUniqueNumbers(count, range) {
        let numbers = [];
        let availableNumbers = Array.from({length: range}, (_, i) => i + 1);
        
        while (numbers.length < count) {
            const randomIndex = Math.floor(Math.random() * availableNumbers.length);
            numbers.push(availableNumbers[randomIndex]);
            availableNumbers.splice(randomIndex, 1);
        }
        
        return numbers.sort((a, b) => a - b);
    }
    
    function displayResults(numbers, powerball) {
        console.log("Displaying results:", {numbers, powerball});
        
        // Clear previous results
        generatorResults.innerHTML = '';
        
        // Create result row
        const resultRow = document.createElement('div');
        resultRow.className = 'result-row';
        
        // Create main balls
        const resultBalls = document.createElement('div');
        resultBalls.className = 'result-balls';
        
        numbers.forEach(number => {
            const ball = document.createElement('div');
            ball.className = `result-ball ${getBallColor(number)}`;
            ball.textContent = number;
            resultBalls.appendChild(ball);
        });
        
        resultRow.appendChild(resultBalls);
        
        // Add powerball if included
        if (powerball !== null) {
            const divider = document.createElement('div');
            divider.className = 'powerball-divider';
            divider.textContent = '|';
            resultRow.appendChild(divider);
            
            const powerballElement = document.createElement('div');
            powerballElement.className = 'result-ball yellow';
            powerballElement.textContent = powerball;
            
            const powerballContainer = document.createElement('div');
            powerballContainer.className = 'result-balls';
            powerballContainer.appendChild(powerballElement);
            
            resultRow.appendChild(powerballContainer);
        }
        
        generatorResults.appendChild(resultRow);
        
        // Add a prompt
        const prompt = document.createElement('p');
        prompt.style.textAlign = 'center';
        prompt.style.marginTop = '20px';
        prompt.innerHTML = 'Download the app for more features,<br>including saving favorites and more lottery types!';
        
        generatorResults.appendChild(prompt);
    }
    
    function getBallColor(number) {
        if (number <= 19) return 'red';
        if (number <= 29) return 'yellow';
        if (number <= 39) return 'green';
        return 'blue';
    }
    
    function showModal(title, message) {
        const modal = document.getElementById('customModal');
        
        if (modal) {
            modal.innerHTML = `
                <div class="modal-content">
                    <h2>${title}</h2>
                    <p>${message}</p>
                    <div class="modal-buttons">
                        <button onclick="closeModal()">OK</button>
                    </div>
                </div>
            `;
            
            modal.classList.remove('hidden');
        } else {
            // Fallback to alert if modal not found
            alert(title + ": " + message);
        }
    }
});

// Global functions
function closeModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}
