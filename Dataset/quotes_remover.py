import pandas as pd

# Load the CSV file (update with your filename if needed)
input_file = "mod- Predict Student Dropout and Academic Success.csv"
output_file = "clean- Predict Student Dropout and Academic Success.csv"

# Open, read, replace, and save
with open(input_file, "r", encoding="utf-8") as f:
    content = f.read()

# Remove all double quotes
cleaned_content = content.replace('"', '')

# Write to new file
with open(output_file, "w", encoding="utf-8") as f:
    f.write(cleaned_content)

print(f'All double quotes removed and saved to: {output_file}')
