from rich import print
from linkedin_api import Linkedin
import yaml
import re
import string


api = Linkedin(username="probirds.ni@gmail.com", password="S31@100402_linkedin")


def filter_data(data: dict, keys: list) -> dict:
    """Filter data based on keys"""
    filtered_data = {}

    for key in keys:
        if isinstance(key, str):
            if key in data:
                filtered_data[key] = data[key]
        elif isinstance(key, dict):
            for nested_key, nested_keys in key.items():
                if nested_key in data:
                    nested_data = data[nested_key]
                    if isinstance(nested_data, list):
                        filtered_data[nested_key] = [
                            {k: d[k] for k in nested_keys if k in d} for d in nested_data
                        ]
                    elif isinstance(nested_data, dict):
                        filtered_data[nested_key] = {
                            k: nested_data[k] for k in nested_keys if k in nested_data
                        }

    return filtered_data


def cleanup_text(yaml_str: str) -> str:
    # Remove non printable character
    yaml_str = ''.join(filter(lambda x: x in string.printable, yaml_str))
    # Remove quotes (single and double)
    yaml_str = re.sub(r'["\']', '', yaml_str)
    # Remove redundant "\" escapes
    yaml_str = re.sub(r'\\{1,}', '', yaml_str)
    # Remove double/triple newlines
    yaml_str = re.sub(r'\n{2,}', '\n', yaml_str)
    # Remove double/triple spaces
    yaml_str = re.sub(r' {2,}', ' ', yaml_str)
    return yaml_str


def get_linkedin_profile(username: str) -> str:
    profile = api.get_profile(username)
    
    # Get all the keys from the profile dictionary, only get keys with meaningful text values
    keys = [
        # One layer keys
        "summary",
        "firstName", 
        "lastName", 
        "geoLocationName", 
        "industryName", 
        "locationName", 
        "headline", 
        "languages",
        # Nested keys
        {"experience": ["companyName", "title"]},
        {"education": ["schoolName", "fieldOfStudy", "degreeName"]},
        {"skills": ["title"]},
        {"certifications": ["name", "authority"]},
        {"honors": ["title", "issuer"]},
        {"organizations": ["name", "title"]},
        {"projects": ["title", "description"]},
    ]
    
    data = filter_data(profile, keys)
    data = yaml.dump(data, sort_keys=False, width=1000)
    data = cleanup_text(data)
    
    return data


if __name__ == "__main__":
    print("Result:", get_linkedin_profile("arya-adyatma-aryadytm"))