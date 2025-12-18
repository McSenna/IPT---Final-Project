SHIFT = 25  # You can change this number to any integer

def encrypt_file():
    try:
        with open("message.txt", "r", encoding="utf-8") as f:
            content = f.read()

        encrypted = ""
        for char in content:
            if char.isupper():
                encrypted += chr((ord(char) - ord('A') + SHIFT) % 26 + ord('A'))
            elif char.islower():
                encrypted += chr((ord(char) - ord('a') + SHIFT) % 26 + ord('a'))
            else:
                encrypted += char

        with open("message.txt", "w", encoding="utf-8") as f:
            f.write(encrypted)

        print("File encrypted successfully: message.txt")

    except FileNotFoundError:
        print("message.txt not found.")


def decrypt_file():
    try:
        with open("message.txt", "r", encoding="utf-8") as f:
            content = f.read()

        decrypted = ""
        for char in content:
            if char.isupper():
                decrypted += chr((ord(char) - ord('A') - SHIFT) % 26 + ord('A'))
            elif char.islower():
                decrypted += chr((ord(char) - ord('a') - SHIFT) % 26 + ord('a'))
            else:
                decrypted += char

        with open("message.txt", "w", encoding="utf-8") as f:
            f.write(decrypted)

        print("File decrypted successfully: message.txt")

    except FileNotFoundError:
        print("message.txt not found.")



choice = input("Encrypt or Decrypt? (e/d): ").strip().lower()
if choice == 'e':
    encrypt_file()
elif choice == 'd':
    decrypt_file()
else:
    print("Invalid choice. Use 'e' for encrypt or 'd' for decrypt.")
