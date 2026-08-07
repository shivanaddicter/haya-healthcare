export const scanLabReport = async (base64Image, diseaseType) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured.');
  }

  // Define what fields we want to extract based on the disease type
  let promptContext = '';
  if (diseaseType === 'kidney') {
    promptContext = 'Extract: Age, Blood Pressure (bp), Specific Gravity (sg), Albumin (al), Sugar (su), Blood Glucose Random (bgr), Blood Urea (bu), Serum Creatinine (sc), Sodium (sod), Potassium (pot), Hemoglobin (hemo).';
  } else if (diseaseType === 'diabetes') {
    promptContext = 'Extract: Pregnancies, Glucose, Blood Pressure (bp), Skin Thickness (skin), Insulin, BMI, Diabetes Pedigree Function (dpf), Age.';
  } else if (diseaseType === 'heart') {
    promptContext = 'Extract: Age, Gender (1 for male, 0 for female), Chest Pain Type (cp), Cholesterol (chol), Blood Pressure (bp), Max Heart Rate (thalach).';
  } else if (diseaseType === 'liver') {
    promptContext = 'Extract: Age, Bilirubin, Alkaline Phosphatase (alkphos), SGPT, SGOT, Total Protein (protein).';
  } else if (diseaseType === 'lung' || diseaseType === 'stroke' || diseaseType === 'parkinson') {
    promptContext = 'Extract any relevant clinical values present in the report like Age, BMI, Glucose, Hypertension (1 or 0), Heart Disease (1 or 0), etc.';
  }

  const prompt = `You are a medical data extraction AI. Read this lab report and extract the clinical values. 
${promptContext}
Return ONLY a valid, raw JSON object (without markdown codeblocks) where the keys perfectly match the requested abbreviations and the values are numbers or strings. If a value is not found, leave the key out or set it to null.`;

  // Remove data:image/jpeg;base64, prefix if present
  const base64Data = base64Image.split(',')[1] || base64Image;
  const mimeType = base64Image.split(';')[0].split(':')[1] || 'image/jpeg';

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Data
            }
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to analyze the image with AI.');
    }

    const data = await response.json();
    let textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    
    // Clean up response if it contains markdown formatting
    textResponse = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(textResponse);
  } catch (error) {
    console.error('AI Scanner Error:', error);
    throw new Error('Could not parse the lab report. Ensure the image is clear and contains medical data.');
  }
};
