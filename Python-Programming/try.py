import ollama

def chat():
    message = [
        {
            'role' : 'system',
            'content' : 'You are an chatbot!!'
        }
    ]
    
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            break
        
        message.append({'role': 'user', 'content': user_input})
        response = ollama.chat(
            model='garou',
            messages=message
        )
        
        chat_response = response["message"]["content"]
        print(f'Chatbot: {chat_response}')
        message.append({'role': 'assistant', 'content': chat_response})
        
if __name__ == "__main__":
    chat()