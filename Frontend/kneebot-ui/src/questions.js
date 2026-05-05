export const questions = [
    {
        id: 'Age',
        text: 'What is your age?',
        type: 'number',
        placeholder: 'e.g. 65'
    },
    {
        id: 'Height',
        text: 'What is your height in inches?',
        type: 'number',
        placeholder: 'e.g. 64'
    },
    {
        id: 'Weight',
        text: 'What is your weight in pounds?',
        type: 'number',
        placeholder: 'e.g. 180'
    },
    {
        id: 'Gender',
        text: 'What is your gender?',
        type: 'choice',
        options: ['Male', 'Female', 'Prefer not to say']
    },
    {
        id: 'Education',
        text: 'What is your highest level of education?',
        type: 'choice',
        options: [ 'Associate’s Degree', 'Bachelor’s Degree', 'Doctorate Degree', 'Master’s Degree', 'Prefer not to say', 'Regular high school diploma, GED or alternative credential', 'Some college credit, but less than 1 year of college', 'Trade/technical/vocational school certification', 'one or more years of college credit', 'no degree']
    },
    {
        id: 'Employment',
        text: 'What is your current employment status?',
        type: 'choice',
        options: ['Employed Full-Time', 'Employed Part-Time', 'Prefer not to say', 'Retired', 'Seeking Opportunities']
    },
    {
        id: 'Income',
        text: 'What is your approximate annual income?',
        type: 'choice',
        options: ['$120,000 - $149,999', '$150, 000 - $179,999', '$30,000 - $59,999', '$60,000 - $89,999', '$90, 000 - $119,999', 'Less than $29,999', 'More than $180,000', 'Prefer not to say']
    },
    {
        id: 'Ethnicity',
        text: 'Are you of Hispanic, Latino, or Spanish origin?',
        type: 'choice',
        options: ['No', 'Yes']
    },
    {
        id: 'Race',
        text: 'What is your race?',
        type: 'checkbox',
        options: ['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Native Hawaiian or Pacific Islander', 'Prefer not to say', 'White']
    },
    {
        id: 'MedBackgrnd',
        text: 'Do you have a family history of joint pain?',
        type: 'checkbox',
        options: [
            'I had surgery or hospitalization that might be related to my knee pain in the past 10 years. Please specify:',
            'I have a medical history related to orthopedics. Please specify:',
            'None of the above.',
            'Someone in my family has a medical history related to joint pain.',
            'Something related to my home life (such as using stairs all the time and strenuous housework) may have caused my knee joint pain. Please specify',
            'Something related to my job may have caused my knee joint pain. Please specify:'
        ]
    },
    {
        id: 'Industry',
        text: 'If employed, what industry do you work in?',
        type: 'checkbox',
        options: ['Accounting', 'Advertising', 'Agriculture/Fishing', 'Architecture', 'Automotive', 'Banking/Financial', 'Brokerage', 'Chemicals/Plastics/Rubber', 'Communications/Information', 'Construction', 'Consulting', 'Consumer Electronics', 'Consumer Packaged Goods', 'Education', 'Energy/Utilities/Oil and Gas', 'Engineering', 'Fashion/Apparel', 'Food/Beverage', 'Government/Public Sector', 'Healthcare', 'Hospitality/Tourism', 'Human Resources', 'Information Technology (IT)', 'Insurance', 'Legal/Law', 'Manufacturing', 'Marketing', 'Media/Entertainment', 'Military', 'Non Profit/Social services', 'Not Applicable', 'Personal Services', 'Printing Publishing', 'Real Estate/Property', 'Retail/Wholesale trade', 'Sales', 'Security', 'Shipping/Distribution', 'Telecommunications', 'Transportation']
    },
    {
        id: 'Department',
        text: 'What is your primary department?',
        type: 'checkbox',
        options: ['Administration/General Staff', 'Creative/Design', 'Customer Service/Client Service', 'Executive Leadership', 'Finance/Accounting', 'Human Resources', 'Legal/Law', 'Logistics/Shipping', 'Market Research', 'Marketing', 'Not Applicable', 'Operations', 'Other', 'Procurement', 'Product Management/Product Development', 'Production', 'Research & Development', 'Sales/Business Development', 'Technology/IT']
    },
    {
        id: 'Stand',
        text: 'How many hours of your day is spent standing?',
        type: 'number',
        placeholder: 'e.g. 6'
    },
    {
        id: 'Profession',
        text: 'Have you worked in any of the following professions?',
        type: 'checkbox',
        options: ['I have worked in a health insurance company.', 'I have worked in a healthcare/medical marketing, market research, or advertising company.', 'I have worked in a pharmacy, pharmaceutical, medical device, or managed care company.', 'I have worked in the US Department of Health and Human Services (HHS) or the Food and Drug Administration (FDA).', 'I have worked or have been trained as a healthcare professional (physician, nurse, therapist, pharmacist, medical technician, etc.)', 'None of the above.']
    },
    {
        id: 'Insurance',
        text: 'Do you have health insurance?',
        type: 'choice',
        options: ['No', 'Yes']
    }
];