import pandas as pd
import numpy as np

# Load the original dataset
input_file1 = "Student_performance_data _.csv"  
df1 = pd.read_csv(input_file1)

# Print original columns to help with mapping
print("Original Columns:", df1.columns.tolist())

# Define the final column structure
final_columns = [
    "age", "major", "gpa", "application_order", "study_time_week", 
    "daytime/evening_classes", "attendance", "extracurriculars", 
    "previous_qualification", "displaced", "entertainment_hours", 
    "work", "average_sleep", "mental_health"
]

# Example mapping — Replace keys (original names) with what you find from print(df.columns)
column_mapping = {
    "Age": "age",
    "Department": "major",
    "GPA": "gpa",
    "Application mode": "application_order",
    "StudyTimeWeekly": "study_time_week",
    "Class time": "daytime/evening_classes",
    "Absences": "attendance",
    "Extracurricular": "extracurriculars",
    "Previous qualification": "previous_qualification",
    "Displaced": "displaced",
    "Entertainment time": "entertainment_hours",
    "Work hours": "work",
    "Sleep duration": "average_sleep",
    "Mental health score": "mental_health"
}

# Rename the columns that exist in the dataset
df1_renamed = df1.rename(columns=column_mapping)

# Create a new DataFrame with only the final columns, adding NaNs where necessary
for col in final_columns:
    if col not in df1_renamed.columns:
        df1_renamed[col] = pd.NA

# Reorder columns
df_final1 = df1_renamed[final_columns]

#Load the second dataset
df2 = pd.read_csv("dataset.csv")  # Update path if needed

#Calculate GPA from the two grade columns if they exist
if ("Curricular units 1st sem (grade)" in df2.columns and
    "Curricular units 2nd sem (grade)" in df2.columns):
    df2["gpa"] = (df2["Curricular units 1st sem (grade)"] + df2["Curricular units 2nd sem (grade)"]) / 10

#Map columns from dataset.csv to final structure
column_mapping_2 = {
    "Age at enrollment": "age",
    "Application order": "application_order",
    "Course": "major",
    "Daytime/evening attendance": "daytime/evening_classes",
    "Previous qualification": "previous_qualification",
    "Displaced": "displaced"
    # no need to map grades — GPA already computed
}

#Apply renaming
df2 = df2.rename(columns=column_mapping_2)

# Keep only relevant/renamed columns
df2_aligned = pd.DataFrame(columns=final_columns)  # create empty DataFrame with final structure
for col in final_columns:
    if col in df2.columns:
        df2_aligned[col] = df2[col]
    else:
        df2_aligned[col] = pd.NA

#Combine both datasets (fully aligned structure)
combined_df1_2 = pd.concat([df_final1, df2_aligned], ignore_index=True)

#Load the third dataset
df3 = pd.read_csv("clean- Predict Student Dropout and Academic Success.csv")  # Update path if needed

print("DF3 shape before cleaning:", df3.shape)

#Calculate GPA from the two grade columns if they exist
if ("Curricular units 1st sem (grade)" in df3.columns and
    "Curricular units 2nd sem (grade)" in df3.columns):
    df3["gpa"] = (df3["Curricular units 1st sem (grade)"] + df3["Curricular units 2nd sem (grade)"]) / 10

#Map columns from dataset.csv to final structure
column_mapping_3 = {
    "Age at enrollment": "age",
    "Application order": "application_order",
    "Course": "major",
    "Daytime/evening attendance": "daytime/evening_classes",
    "Previous qualification": "previous_qualification",
    "Displaced": "displaced"
    # no need to map grades — GPA already computed
}

#Apply renaming
df3 = df3.rename(columns=column_mapping_3)

# Keep only relevant/renamed columns
df3_aligned = pd.DataFrame(columns=final_columns)  # create empty DataFrame with final structure
for col in final_columns:
    if col in df3.columns:
        df3_aligned[col] = df3[col]
    else:
        df3_aligned[col] = pd.NA


#Combine both datasets (fully aligned structure)
combined_df1_3 = pd.concat([combined_df1_2, df3_aligned], ignore_index=True)

#-----------------
#Load & clean Dataset 4 (student_habits_performance.csv)
df4 = pd.read_csv("student_habits_performance.csv")
df4_cleaned = pd.DataFrame(columns=final_columns)

# ● study_hours_per_day × 7 → study_time_week
df4_cleaned["study_time_week"] = df4["study_hours_per_day"] * 7

# ● social_media_hours + netflix_hours → entertainment_hours
df4_cleaned["entertainment_hours"] = df4["social_media_hours"] + df4["netflix_hours"]

# ● extracurricular_participation Yes/No → 1/0
df4_cleaned["extracurriculars"] = (
    df4["extracurricular_participation"]
      .astype(str)
      .str.strip()
      .str.lower()
      .map({"yes": 1, "no": 0})
)

# Map any directly matching fields
df4_cleaned["age"] = df4["age"]
df4_cleaned["attendance"] = df4["attendance_percentage"]
df4_cleaned["average_sleep"] = df4["sleep_hours"]
df4_cleaned["mental_health"] = df4["mental_health_rating"]
df4_cleaned["work_hours"] = df4["part_time_job"]

# Fill all other final columns with NaN
for col in final_columns:
    if col not in df4_cleaned.columns:
        df4_cleaned[col] = pd.NA
df4_cleaned = df4_cleaned[final_columns]

# 6. Concatenate all cleaned DataFrames into one
combined_df1_4 = pd.concat([combined_df1_3, df4_cleaned],ignore_index=True)

df5 = pd.read_csv("MentalHealthSurvey.csv")
# Compute normalized mental_health = (academic_pressure + financial_concerns + depression + isolation) / 2
df5["mental_health"] = (df5["academic_pressure"] + df5["financial_concerns"] + df5["depression"] + df5["isolation"]) / 2
column_mapping_5= {
    "age": "age",
    "cgpa": "gpa",
    "average_sleep": "average_sleep"
}
df5 = df5.rename(columns=column_mapping_5)
df5_cleaned = pd.DataFrame({
    col: (
        df5[col]
        if col in df5.columns
        else (df5["mental_health"] if col == "mental_health" else pd.NA)
    )
    for col in final_columns
})

# === 7. Concatenate all cleaned DataFrames ===
combined_df = pd.concat([combined_df1_4, df5_cleaned],ignore_index=True)

#Export the final combined dataset
combined_df.to_csv("combined_student_dataset.csv", index=False)
print(combined_df.head())
