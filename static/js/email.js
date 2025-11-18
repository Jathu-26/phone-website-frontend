// email.js - Contact Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const btnMessage = document.getElementById("btnMessage");
    const btnSubscribe = document.getElementById("btnSubscribe");
    const messageForm = document.getElementById("messageForm");
    const subscribeForm = document.getElementById("subscribeForm");
    const statusMsg = document.getElementById("statusMsg");

    if (!btnMessage || !btnSubscribe || !messageForm || !subscribeForm || !statusMsg) {
        console.error("One or more form elements not found");
        return;
    }

    // Load already subscribed emails from localStorage
    let subscribedEmails = JSON.parse(localStorage.getItem("subscribedEmails")) || [];
    console.log("Loaded subscribed emails:", subscribedEmails);

    // --- TAB SWITCHING ---
    btnMessage.addEventListener("click", () => {
        messageForm.classList.remove("hidden");
        subscribeForm.classList.add("hidden");
        btnMessage.classList.add("active");
        btnSubscribe.classList.remove("active");
        statusMsg.textContent = "";
        statusMsg.className = "status-msg";
    });

    btnSubscribe.addEventListener("click", () => {
        subscribeForm.classList.remove("hidden");
        messageForm.classList.add("hidden");
        btnSubscribe.classList.add("active");
        btnMessage.classList.remove("active");
        statusMsg.textContent = "";
        statusMsg.className = "status-msg";
    });

    // --- FEEDBACK FORM (always allowed) ---
    messageForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(messageForm);
        formData.append("access_key", "f2953017-665c-46ee-b314-0741e9e15785");
        formData.append("subject", "New Customer Feedback (abcphone2025)");
        formData.append("to_email", "abcphone2025@gmail.com"); 

        statusMsg.innerHTML = "Sending feedback...";
        statusMsg.className = "status-msg";

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                statusMsg.innerHTML = "✅ Feedback sent successfully!";
                statusMsg.className = "status-msg success";
                messageForm.reset();
            } else {
                statusMsg.innerHTML = `❌ Failed to send feedback: ${result.message || 'Server error'}`;
                statusMsg.className = "status-msg error";
            }
        } catch (error) {
            statusMsg.innerHTML = "❌ Network error. Check your connection.";
            statusMsg.className = "status-msg error";
            console.error('Feedback error:', error);
        }
    });

    // --- SUBSCRIBE FORM (only once per email) ---
    subscribeForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const email = document.getElementById("subscribeEmail").value.trim().toLowerCase();
        console.log("Trying to subscribe:", email);

        // Check if already subscribed
        if (subscribedEmails.includes(email)) {
            statusMsg.textContent = "❌ You are already subscribed.";
            statusMsg.className = "status-msg error";
            console.log("Blocked duplicate subscription for:", email);
            return;
        }

        const formData = new FormData(subscribeForm);
        formData.append("access_key", "f2953017-665c-46ee-b314-0741e9e15785");
        formData.append("subject", "New Website Subscriber (abcphone2025)");
        formData.append("to_email", "abcphone2025@gmail.com"); 

        statusMsg.innerHTML = "Subscribing...";
        statusMsg.className = "status-msg";

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // Save email to localStorage
                subscribedEmails.push(email);
                localStorage.setItem("subscribedEmails", JSON.stringify(subscribedEmails));
                console.log("Saved new subscriber:", email);

                statusMsg.textContent = "✅ Thank you for subscribing!";
                statusMsg.className = "status-msg success";
                subscribeForm.reset();
            } else {
                statusMsg.innerHTML = `❌ Failed to subscribe: ${result.message || 'Server error'}`;
                statusMsg.className = "status-msg error";
            }
        } catch (error) {
            statusMsg.innerHTML = "❌ Network error. Check your connection.";
            statusMsg.className = "status-msg error";
            console.error('Subscription error:', error);
        }
    });
});
