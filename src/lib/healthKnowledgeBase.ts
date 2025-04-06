
// This file contains a simplified knowledge base for common health topics
// In a production environment, this would be a much more comprehensive database
// potentially connected to a medical API or healthcare knowledge graph

export const healthKnowledgeBase = {
  // Common symptoms and their potential causes (simplified for demonstration)
  symptoms: {
    headache: [
      "Tension or stress", 
      "Migraine", 
      "Dehydration", 
      "Medication side effects",
      "Eye strain",
      "Sinus infection"
    ],
    fever: [
      "Viral infection",
      "Bacterial infection",
      "Inflammatory conditions",
      "Heat exhaustion",
      "Certain medications"
    ],
    fatigue: [
      "Lack of sleep",
      "Poor nutrition",
      "Anemia",
      "Depression",
      "Chronic fatigue syndrome",
      "Thyroid issues"
    ],
    nausea: [
      "Food poisoning",
      "Stomach flu",
      "Pregnancy",
      "Motion sickness",
      "Medication side effects"
    ],
    cough: [
      "Common cold",
      "Influenza",
      "Allergies",
      "Asthma",
      "COVID-19",
      "Bronchitis"
    ]
  },

  // Common preventative health recommendations by age group
  preventativeCare: {
    children: [
      "Regular well-child visits",
      "Routine vaccinations",
      "Dental check-ups every 6 months",
      "Vision screening",
      "Physical activity (60 minutes daily)"
    ],
    adults: [
      "Annual physical exam",
      "Blood pressure screening",
      "Cholesterol screening",
      "Cancer screenings based on age and risk factors",
      "Immunizations (flu shot annually, tetanus booster every 10 years)",
      "Physical activity (150 minutes moderate activity weekly)"
    ],
    seniors: [
      "Annual physical exam",
      "Blood pressure screening",
      "Diabetes screening",
      "Bone density test",
      "Hearing and vision tests",
      "Fall prevention assessment",
      "Annual flu shot and other age-appropriate vaccines"
    ]
  },

  // Basic nutrition guidance
  nutrition: {
    generalGuidelines: [
      "Eat a variety of fruits and vegetables",
      "Choose whole grains over refined grains",
      "Include lean proteins (fish, poultry, beans, nuts)",
      "Limit saturated fats, added sugars, and sodium",
      "Stay hydrated with water instead of sugary drinks"
    ],
    specificConditions: {
      diabetes: [
        "Monitor carbohydrate intake",
        "Maintain regular meal timing",
        "Choose foods with low glycemic index",
        "Limit sugary foods and beverages"
      ],
      heartDisease: [
        "Reduce sodium intake",
        "Limit saturated and trans fats",
        "Incorporate heart-healthy fats (olive oil, avocados, nuts)",
        "Increase fiber intake"
      ],
      hypertension: [
        "Follow the DASH diet",
        "Reduce sodium intake",
        "Limit alcohol consumption",
        "Increase potassium-rich foods"
      ]
    }
  },

  // Mental health resources
  mentalHealth: {
    commonConditions: ["Anxiety", "Depression", "Stress", "Insomnia", "ADHD"],
    selfCare: [
      "Regular physical activity",
      "Adequate sleep",
      "Stress management techniques (meditation, deep breathing)",
      "Maintaining social connections",
      "Setting realistic goals and expectations"
    ],
    warningSignsToSeekHelp: [
      "Persistent sadness or hopelessness",
      "Excessive worry or fear",
      "Extreme mood changes",
      "Withdrawal from friends and activities",
      "Significant changes in sleep or appetite",
      "Thoughts of self-harm or suicide"
    ]
  },

  // Common medical procedures information
  procedures: {
    bloodTest: {
      description: "Collection of blood sample for laboratory analysis",
      preparation: "May require fasting depending on test type",
      risks: "Minor bruising, slight pain at injection site"
    },
    mammogram: {
      description: "X-ray imaging of breast tissue to screen for cancer",
      preparation: "Avoid deodorant, perfume, or powder on day of test",
      frequency: "Typically annually or biennially for women over 40"
    },
    colonoscopy: {
      description: "Examination of the large intestine using a flexible camera",
      preparation: "Bowel preparation regime, typically clear liquid diet and laxatives",
      frequency: "Generally recommended every 10 years starting at age 45"
    }
  }
};
