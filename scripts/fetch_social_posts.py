import json
import os
import requests
from datetime import datetime

# ==============================================================================
# SOCIAL MEDIA FETCH SCRIPT (TEMPLATE)
# ==============================================================================
# This script is designed to run via GitHub Actions to periodically fetch
# your latest social media posts and save them to 'assets/social-posts.json'.
#
# GitHub Pages is static and doesn't support server-side code. This
# "Build-time Data Fetching" pattern allows you to have "dynamic" content.
#
# TO CONFIGURE:
# 1. Obtain API tokens for LinkedIn, Instagram, and Facebook.
# 2. Add them to your GitHub Repository Secrets:
#    - LINKEDIN_TOKEN
#    - INSTAGRAM_TOKEN
#    - FACEBOOK_TOKEN
# 3. Update the fetch functions below with actual API calls.
# ==============================================================================

def fetch_linkedin_posts(token):
    """
    Fetch posts from LinkedIn API.
    Ref: https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/posts-api
    """
    if not token:
        print("Skipping LinkedIn: No token provided.")
        return []

    # Example logic (Conceptual):
    # response = requests.get(
    #     'https://api.linkedin.com/v2/posts?author=urn:li:person:YOUR_ID',
    #     headers={'Authorization': f'Bearer {token}'}
    # )
    # return process_linkedin_data(response.json())

    return []

def fetch_instagram_posts(token):
    """
    Fetch posts from Instagram Graph API.
    Ref: https://developers.facebook.com/docs/instagram-api
    """
    if not token:
        print("Skipping Instagram: No token provided.")
        return []
    return []

def fetch_facebook_posts(token):
    """
    Fetch posts from Facebook Graph API.
    Ref: https://developers.facebook.com/docs/graph-api
    """
    if not token:
        print("Skipping Facebook: No token provided.")
        return []
    return []

def main():
    # Retrieve secrets from environment variables (set in GitHub Action)
    linkedin_token = os.environ.get('LINKEDIN_TOKEN')
    instagram_token = os.environ.get('INSTAGRAM_TOKEN')
    facebook_token = os.environ.get('FACEBOOK_TOKEN')

    posts = []

    # posts.extend(fetch_linkedin_posts(linkedin_token))
    # posts.extend(fetch_instagram_posts(instagram_token))
    # posts.extend(fetch_facebook_posts(facebook_token))

    # FALLBACK / MOCK DATA
    # If no tokens are found, we use the current data or a set of placeholders
    # to ensure the UI doesn't break during the first run.
    if not posts:
        print("No tokens provided or APIs returned no data. Using placeholders.")
        posts = [
            {
                "id": "li-sample",
                "platform": "linkedin",
                "url": "https://www.linkedin.com/in/carlos-yajie-fetizanan",
                "image": "./assets/image.png",
                "text": "Check out my latest professional updates and projects on LinkedIn!",
                "date": datetime.now().strftime("%Y-%m-%d")
            },
            {
                "id": "ig-sample",
                "platform": "instagram",
                "url": "https://www.instagram.com/crls_brook/",
                "image": "./assets/image.png",
                "text": "Exploring new design trends and sharing my creative process on Instagram.",
                "date": datetime.now().strftime("%Y-%m-%d")
            },
            {
                "id": "fb-sample",
                "platform": "facebook",
                "url": "https://www.facebook.com/carlos.yajie",
                "image": "./assets/image.png",
                "text": "Stay tuned for more updates and behind-the-scenes content on Facebook.",
                "date": datetime.now().strftime("%Y-%m-%d")
            }
        ]

    output_path = os.path.join('assets', 'social-posts.json')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, 'w') as f:
        json.dump(posts, f, indent=2)

    print(f"Successfully updated {output_path} with {len(posts)} posts at {datetime.now()}")

if __name__ == "__main__":
    main()
