document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");
    const emailField = document.getElementById("email");

    // Prevent duplicate submissions globally
    if (localStorage.getItem("submitted")) {
        form.innerHTML = "<p style='text-align:center; font-size:18px;'>You have already submitted the form. Thank you!</p>";
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = emailField.value.trim();
        if (!email) return alert("Please enter a valid email.");

        if (localStorage.getItem(email)) {
            return alert("You have already submitted the form!");
        }

        // Disable submit button to prevent multiple clicks
        const submitBtn = form.querySelector("button[type='submit']");
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                localStorage.setItem("submitted", true);
                localStorage.setItem(email, true);
                window.location.href = "thanks.html";
            } else {
                alert("Oops! There was a problem submitting your form.");
                submitBtn.disabled = false;
                submitBtn.textContent = "Submit";
            }
        } catch (error) {
            alert("Oops! There was a problem submitting your form.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
        }
    });
});
