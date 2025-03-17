from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = FastAPI()

# Load Llama 3 model
model_name = "NousResearch/DeepHermes-3-Llama-3-3B-Preview"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16)

class RequestData(BaseModel):
    prompt: str

@app.post("/generate/")
async def generate_text(data: RequestData):
    inputs = tokenizer(data.prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=200)
    response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": response_text}

@app.get("/")
async def home():
    return {"message": "Llama 3 API is running!"}
