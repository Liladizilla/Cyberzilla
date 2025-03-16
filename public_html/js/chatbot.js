console.log("Chatbot script loaded successfully!");
window.onload = function () {
    let chatbox = document.createElement("div");
    chatbox.innerHTML = `<div id="chatbot" class="chatbot">
        <div class="chat-header">CyberZilla AI</div>
        <div class="chat-body">
            <p><strong>AI:</strong> Hi! Am CyberZilla! How can I help you today?</p>
        </div>
        <input type="text" id="chatInput" placeholder="Type a message...">
    </div>`;

    document.body.appendChild(chatbox);

    let chatInput = document.getElementById("chatInput");
    let chatBody = document.querySelector(".chat-body");

    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            let userMessage = chatInput.value.trim();
            if (userMessage) {
                chatBody.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
                chatInput.value = "";

                setTimeout(() => {
                    chatBody.innerHTML += `<p><strong>AI:</strong> I'm still learning. Stay tuned!</p>`;
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);
            }
        }
    });
};