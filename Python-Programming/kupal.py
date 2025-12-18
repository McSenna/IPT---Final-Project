import ollama 

message = [
    {
      'role' : 'system',
      'content' : ''  
    }
]

while True:
    user_input = input('\nPrompt : ')
    if user_input.lower() == 'exit':
        break
    
    message.append({'role' : 'user', 'content' : user_input})
    response = ollama.chat(
        model='kobe',
        messages=message,
    )
    
    chat_response = response['message'] ['content']
    print(chat_response)
    message.append({'role': 'assistant', 'content': chat_response})
        
if __name__ == "__main__":
    message()
    
    