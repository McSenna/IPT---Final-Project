from ollama import Client

client = Client()

print("Chat with 'Zel' - type 'exit' to quit\n")

while True:
    prompt = input("You: ")
    if prompt.lower() in ["exit", "quit"]:
        break
    
    response = client.chat(
        model='zel',
        messages=[{'role': 'user', 'content': prompt}]
    )
    
    print("\n Zel:", response['message']['content'])
    print()