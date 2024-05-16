import git
import json

repo_path = '../sampleRepo/redux'  # Replace with your repository's path
output_file = './gitFinds/commit_data.json'  # Change the file extension to '.json'

repo = git.Repo(repo_path)

def get_commit_data():
    try:
        # Get the commit log.
        log = repo.git.log(all=True, format="{'author_name': '%aN', 'message': '%s', 'date': '%aI'}")

        # Initialize an object to store commit data.
        commit_data = {
            'users': {},
            'totalCommits': 0
        }

        # Iterate through the commit log and collect commit details by author.
        for line in log.split('\n'):
            commit = json.loads(line)
            author = commit['author_name']
            message = commit['message']
            timestamp = commit['date']

            if author not in commit_data['users']:
                commit_data['users'][author] = {
                    'commits': [],
                    'totalCommits': 0
                }

            commit_data['users'][author]['commits'].append({
                'message': message,
                'timestamp': timestamp
            })

            commit_data['users'][author]['totalCommits'] += 1  # Increment the total commits for the user.
            commit_data['totalCommits'] += 1  # Increment the total commits.

        # Write the JSON object to a JSON file.
        with open(output_file, 'w') as f:
            json.dump(commit_data, f, indent=2)

        print(f"Results written to {output_file}")

    except Exception as e:
        print('An error occurred:', e)

# Call the function to get commit data and write to a JSON file.
get_commit_data()
