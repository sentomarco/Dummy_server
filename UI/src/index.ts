const messageDiv = document.getElementById("message")!;
const form = document.getElementById("messageForm") as HTMLFormElement;
const input = document.getElementById("userMessage") as HTMLInputElement;

async function loadInitialMessage() {
    const response = await fetch("/service1/hello");
    const data = await response.json();
    messageDiv.textContent = data.message;
}

form.onsubmit = async (e) => {
    e.preventDefault();
    const userInput = input.value;
    const response = await fetch("/service1/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
    });
    const data = await response.json();
    messageDiv.textContent = data.response;
};

loadInitialMessage();
