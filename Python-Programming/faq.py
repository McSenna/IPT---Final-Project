import ollama

def academic_chatbot(): #define or function initialization
    message = [
        {
            'role': 'system',
            'content': 'You are an academic assistant. Provide detailed and accurate information on academic topics.'
        }
    ]
    
    print("Welcome to the Academic Chatbot! Type 'exit' to quit.")

    while True: #
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            break
        
        message.append({'role': 'user', 'content': user_input})
        
        response = ollama.chat(
            model='llama3.2',
            messages=message
        ) 
        assistant_response = response["message"]["content"]

        print(f"Assistant: {assistant_response}")
        message.append({'role': 'assistant', 'content': assistant_response})

if __name__ == "__main__":
    academic_chatbot()
