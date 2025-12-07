// Chuck Norris Jokes API Configuration
const API_URL = 'https://api.chucknorris.io/jokes/random';

// DOM Elements
const jokeText = document.getElementById('jokeText');
const newJokeBtn = document.getElementById('newJokeBtn');
const loader = document.getElementById('loader');
const jokeContent = document.getElementById('jokeContent');

// Fetch a new joke from the API
async function fetchJoke() {
    try {
        // Show loader, hide content
        showLoader();

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Hide loader, show content with the joke
        hideLoader();
        displayJoke(data.value);

    } catch (error) {
        console.error('Error fetching joke:', error);
        hideLoader();
        displayError();
    }
}

// Display the joke in the UI
function displayJoke(joke) {
    jokeText.textContent = joke;
}

// Display error message
function displayError() {
    jokeText.textContent = "Chuck Norris bu şakayı yeterince güçlü bulmadı! Lütfen tekrar deneyin.";
    jokeContent.style.display = 'block';
}

// Show loading state
function showLoader() {
    loader.style.display = 'block';
    jokeContent.style.display = 'none';
    newJokeBtn.disabled = true;
}

// Hide loading state
function hideLoader() {
    loader.style.display = 'none';
    jokeContent.style.display = 'block';
    newJokeBtn.disabled = false;
}

// Event Listeners
newJokeBtn.addEventListener('click', fetchJoke);

// Fetch a joke when page loads
document.addEventListener('DOMContentLoaded', fetchJoke);

// Optional: Allow fetching joke with spacebar key
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !newJokeBtn.disabled) {
        event.preventDefault();
        fetchJoke();
    }
});