from ollama import Client

client = Client()

print("Chat with 'kobe' - type 'exit' to quit\n")

while True:
    prompt = input("You: ")
    if prompt.lower() in ["exit", "quit"]:
        break
    
    response = client.chat(
        model='kobe',
        messages=[{'role': 'user', 'content': prompt}]
    )
    
    print("\nKobe:", response['message']['content'])
    print()