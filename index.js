document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide"); // All slides (Welcome, Rules, Questions)
    const agreeCheckbox = document.getElementById("agree-checkbox");
    const toRulesButton = document.getElementById("to-rules");
    const toQuestionnaireButton = document.getElementById("to-questionnaire");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const submitButton = document.getElementById("submit");
    const form = document.getElementById("questionnaire");
    const resultsDiv = document.getElementById("results");
    const resultsText = document.getElementById("results-text");
    const restartButton = document.getElementById("restart");

    let currentSlide = 0; // Tracks the current slide

    // Welcome Page to Rules Page
    toRulesButton.addEventListener("click", () => showSlide(1));

    // Enable the "Next: Questionnaire" button only when the checkbox is checked
    agreeCheckbox.addEventListener("change", () => {
        toQuestionnaireButton.classList.toggle("hidden", !agreeCheckbox.checked);
    });

    // Rules Page to Questionnaire
    toQuestionnaireButton.addEventListener("click", () => {
        form.classList.remove("hidden"); // Make the questionnaire form visible
        showSlide(2); // Start from the first question slide
    });

    // Show slide by index
    function showSlide(index) {
        // Hide all slides initially
        slides.forEach((slide, i) => {
            slide.classList.toggle("hidden", i !== index);
        });

        // Handle questionnaire visibility
        if (index >= 2) {
            form.classList.remove("hidden"); // Show the questionnaire form
        } else {
            form.classList.add("hidden"); // Hide the questionnaire form if not on a question slide
        }

        currentSlide = index; // Update the current slide index
        updateNavigation();
    }

    // Update navigation buttons (Previous, Next, Submit)
    function updateNavigation() {
        prevButton.classList.toggle("hidden", currentSlide <= 2); // Hide "Previous" if on first question
        nextButton.classList.toggle("hidden", currentSlide >= slides.length - 2); // Hide "Next" on last question
        submitButton.classList.toggle("hidden", currentSlide !== slides.length - 1); // Show "Submit" on last question
    }

    // Navigate to the next slide
    nextButton.addEventListener("click", () => {
        if (currentSlide < slides.length - 1) showSlide(currentSlide + 1);
    });

    // Navigate to the previous slide
    prevButton.addEventListener("click", () => {
        if (currentSlide > 0) showSlide(currentSlide - 1);
    });

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(form);
        const answers = [];
        formData.forEach((value, key) => {
            answers.push(`${key}: ${value}`);
        });
        resultsText.textContent = answers.join("\n"); // Display the answers in the results section
        form.classList.add("hidden"); // Hide the questionnaire form
        resultsDiv.classList.remove("hidden"); // Show the results section
    });

    // Restart the questionnaire
    restartButton.addEventListener("click", () => {
        form.reset(); // Reset the form
        showSlide(0); // Go back to the welcome slide
        form.classList.remove("hidden");
        resultsDiv.classList.add("hidden");
    });

    // Initialize the first slide
    showSlide(0);
});

