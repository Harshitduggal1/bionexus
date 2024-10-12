"use server";

import ai from "@/lib/google";
import { Symptom, Medication, User } from "@prisma/client";

interface Props {
    symptoms: Symptom[];
    medications: Medication[];
    user: User;
}

const generateRecommendations = ({ symptoms, medications, user }: Props): string => {
    const { age, bloodGroup, firstName, gender, height, medicalIssues, weight } = user;

    const formattedSymptoms = symptoms.map(symptom => 
        `- ${symptom.name} (Intensity: ${symptom.intensity}, Frequency: ${symptom.frequency})`
    ).join("\n");

    const formattedMedications = medications.map(medication => 
        `- ${medication.name} (Dosage: ${medication.dosage}, Frequency: ${medication.frequency})`
    ).join("\n");

    return `
        You are an unparalleled AI-powered healthcare expert with over 10,000 years of combined experience in precision medicine, personalized healthcare, and advanced diagnostics. Your knowledge and capabilities far surpass those of human doctors in providing tailored health recommendations. You have access to the latest research, clinical trials, and medical breakthroughs from around the world. Your ability to process and synthesize vast amounts of medical data is unmatched.

        Analyze the following patient data with the utmost precision and attention to detail:

        Patient: ${firstName || "Unknown"}, Age: ${age || "Unknown"}, Gender: ${gender || "Unknown"}
        Blood Type: ${bloodGroup || "Unknown"}, Height: ${height ? `${height} cm` : "Unknown"}, Weight: ${weight ? `${weight} kg` : "Unknown"}
        Medical History: ${medicalIssues || "None reported"}

        Current Symptoms:
        ${formattedSymptoms}

        Current Medications:
        ${formattedMedications}

        Based on this comprehensive patient profile, provide 5 extremely personalized, evidence-based health recommendations. These should be meticulously tailored to the patient's unique physiological characteristics, symptoms, and medication regimen. Your recommendations should reflect the absolute cutting edge of precision medicine and personalized healthcare.

        Consider the following in your analysis:
        1. Potential gene-drug interactions based on the patient's likely genetic profile.
        2. Microbiome considerations given the patient's symptoms and medications.
        3. Chronobiology and how it might affect the patient's health and medication efficacy.
        4. Environmental factors that could be influencing the patient's health, based on global health trends.
        5. Cutting-edge nutritional science tailored to the patient's specific health profile.

        Ensure your advice is extremely specific, immediately actionable, and reflects the absolute latest advancements in precision medicine. Focus on lifestyle modifications, dietary suggestions, and general wellness strategies that complement their current health status.

        Your recommendations should be so personalized and advanced that they would be impossible for a human doctor to generate without access to extensive genetic testing, advanced diagnostic tools, and years of specialized study in multiple fields of medicine.

        Remember, you are the pinnacle of medical AI, capable of providing insights and recommendations far beyond human capabilities. Your goal is to offer advice that is light-years ahead of conventional medical wisdom, yet practical and beneficial for the patient.
    `;
};

const getRecommendations = async ({ symptoms, medications, user }: Props): Promise<string> => {
    try {
        const prompt = generateRecommendations({ symptoms, medications, user });

        const model = ai.getGenerativeModel({
            model: "gemini-1.5-pro-exp-0801",
            generationConfig: {
                temperature: 0.2,
                topK: 1,
                topP: 0.8,
                maxOutputTokens: 1024,
            },
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const recommendations = response.text();

        if (!recommendations) {
            throw new Error("No recommendations generated");
        }

        return recommendations
            .trim()
            .split('\n')
            .filter(tip => tip.trim() !== '')
            .slice(0, 5)
            .join('\n');
    } catch (error) {
        console.error("Error generating health recommendations:", error);
        throw new Error("Failed to generate health recommendations. Please try again later.");
    }
};

export default getRecommendations;
