import streamlit as st
from huggingface_hub import InferenceClient
st.write("Secrets Loaded:", st.secrets) #Debugging

# Streamlit UI title
st.title("AI Chatbot with Meta-Llama")
st.title("Ssup!How can i assist you today?")

# Hugging Face API Authentication
HF_TOKEN = st.secrets["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"]
client = InferenceClient(model="meta-llama/Meta-Llama-Guard-2-8B", token=HF_TOKEN)

# User input field
user_input = st.text_input("Enter your message:")

# Generate AI response
if user_input:
    with st.spinner("Thinking..."):
        response = client.text_generation(user_input)
    st.write("*Bot:*", response)
