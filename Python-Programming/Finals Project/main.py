from ollama import Client

client = Client()

print("Chat with 'Mental Block: ' - type 'exit' to quit\n")

while True:
    prompt = input("You: ")
    if prompt.lower() in ["exit", "quit"]:
        break
    
    response = client.chat(
        model='chain',
        messages=[{'role': 'user', 'content': prompt}]
    )
    
    print("\nMental Block: ", response['message']['content'])
    print()