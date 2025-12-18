from ollama import Client

client = Client()

print("Chat with 'Chain' - type 'exit' to quit\n")

while True:
    prompt = input("You: ")
    if prompt.lower() in ["exit", "quit"]:
        break
    
    response = client.chat(
        model='chain',
        messages=[{'role': 'user', 'content': prompt}]
    )
    
    print("\nChain:", response['message']['content'])
    print()