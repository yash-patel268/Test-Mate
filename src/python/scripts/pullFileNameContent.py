import git
import os
import json

repo_path = '../sampleRepo/redux'  # Replace with your repository's path
output_file = './gitFinds/files.json'  # Change the file extension to '.json'

code_file_extensions = ['.js', '.py', '.cpp', '.java', '.c', '.cs', '.php']  # Add more code file extensions as needed

file_type_data = []  # List to store fileType data in the desired format

def get_files_and_content():
    try:
        repo = git.Repo(repo_path)
        file_paths = [item.path for item in repo.tree().traverse() if item.type == 'blob']

        file_paths = [path for path in file_paths if any(path.endswith(ext) for ext in code_file_extensions)]

        file_types_and_names(file_paths)
        write_to_file(output_file)
    except Exception as err:
        print('An error occurred:', err)

def file_types_and_names(file_paths):
    for file_path in file_paths:
        file_extension = os.path.splitext(file_path)[1].lower()

        if file_extension in code_file_extensions:
            file_type_entry = next((entry for entry in file_type_data if entry['fileType'] == file_extension), None)

            if not file_type_entry:
                file_type_data.append({
                    'fileType': file_extension,
                    'files': [],
                })

            try:
                with open(os.path.join(repo_path, file_path), 'r', encoding='utf-8') as file:
                    content = file.read()

                    # Replace Windows line endings (CRLF) with Unix line endings (LF)
                    content = content.replace('\r\n', '\n')

                    # Replace backslashes with forward slashes
                    content = content.replace('\\', '/')

                    # Remove all occurrences of escaped double quotes and escaped backslashes
                    content = content.replace('\\"', '').replace('\\\\', '')

                    file_data = {
                        'fileName': file_path,
                        'content': content,
                    }

                    file_type_index = next((i for i, entry in enumerate(file_type_data) if entry['fileType'] == file_extension), None)
                    file_type_data[file_type_index]['files'].append(file_data)
            except Exception as err:
                print(f"Error reading file content for {file_path}: {err}")

def write_to_file(output_file):
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(file_type_data, f, indent=2)
        print(f"Code file list has been saved to {output_file}")
    except Exception as err:
        print('Error writing to file:', err)

# Call the function to get files and their content and write to a JSON file.
get_files_and_content()
