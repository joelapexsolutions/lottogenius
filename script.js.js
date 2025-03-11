document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const generateBtn = document.getElementById('generateBtn');
    const lottoCountInput = document.getElementById('lottoCount');
    const lottoRangeInput = document.getElementById('lottoRange');
    const powerballToggle = document.getElementById('powerballToggle');
    const powerballGroup = document.getElementById('powerballGroup');
    const powerballRangeInput = document.getElementById('powerballRange');
    const generatorResults = document.getElementById('generatorResults');
    
    // Event Listeners
    generateBtn.addEventListener('click', generateNumbers);
    powerballToggle.addEventListener('change', togglePowerballOptions);
    
    // Functions
    function togglePowerballOptions() {
        if (powerballToggle.checked) {
            powerballGroup.classList.remove('hidden');
        } else {
            powerballGroup.classList.add('hidden');
        }
    }
    
    function generateNumbers() {
        const count = parseInt(lottoCountInput.value) || 6;
        const range = parseInt(lottoRangeInput.value) || 49;
        const includePowerball = powerballToggle.checked;
        const powerballRange = parseInt(powerballRangeInput.value) || 20;
        
        // Validate input
        if (count > range) {
            alert("Numbers to pick can't be greater than the range!");
            return;
        }
        
        if (count < 1 || range < count || range > 99) {
            alert("Please check your input values!");
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
        prompt.innerHTML = 'Download the full app for more features,<br>including saving favorites and more lottery types!';
        
        generatorResults.appendChild(prompt);
    }
    
    function getBallColor(number) {
        if (number <= 19) return 'red';
        if (number <= 29) return 'yellow';
        if (number <= 39) return 'green';
        return 'blue';
    }
});