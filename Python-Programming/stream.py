import ollama

message_data = [
    {
        'role': 'system',
        'content': 'You are an academic assistant. Provide detailed and accurate information on academic topics.'
    }
]

while True:
    user_input = input("\nYou: ")
    if user_input.lower() == 'exit':
        break
    
    message_data.append({'role': 'user', 'content': user_input})
    
    ai_response = ollama.chat(
        model='llama3.2',
        messages=message_data,
        stream=True
    )
    
    for chunk in ai_response:
        print(chunk['message']['content'], end='', flush=True)
        stream_reply = chunk['message']['content'] 
        
    message_data.append({'role': 'assistant', 'content': stream_reply})
    
    