"use server";  

import ai from "@/lib/google";  
import { Symptom, Medication, User } from "@prisma/client";  

interface Props {  
    symptoms: Symptom[];  
    medications: Medication[];  
    user: User;  
}  

// Generate a formatted string of patient data and recommendations  
const formatPatientData = ({ symptoms, medications, user }: Props): string => {  
    const { age, bloodGroup, firstName, gender, height, medicalIssues, weight } = user;  

    const formattedSymptoms = symptoms.map(symptom =>   
        `- ${symptom.name} (Intensity: ${symptom.intensity}, Frequency: ${symptom.frequency})`  
    ).join("\n");  

    const formattedMedications = medications.map(medication =>   
        `- ${medication.name} (Dosage: ${medication.dosage}, Frequency: ${medication.frequency})`  
    ).join("\n");  

    return `  
        Patient: ${firstName || "Unknown"}, Age: ${age || "Unknown"}, Gender: ${gender || "Unknown"}  
        Blood Type: ${bloodGroup || "Unknown"}, Height: ${height ? `${height} cm` : "Unknown"}, Weight: ${weight ? `${weight} kg` : "Unknown"}  
        Medical History: ${medicalIssues || "None reported"}  

        Current Symptoms:  
        ${formattedSymptoms}  

        Current Medications:  
        ${formattedMedications}  
    `;  
};  

// Generate recommendations based on patient data  
const generateRecommendationsPrompt = (patientData: string): string => {  
    return `  
        You are an AI-powered healthcare expert with unparalleled capabilities in personalized medicine.   
        Analyze the following patient information and provide 5 actionable, evidence-based health recommendations:  

        ${patientData}  

        Consider the following factors in your analysis:  
        1. Gene-drug interactions based on the patient's likely genetic profile.  
        2. Microbiome considerations relevant to the current symptoms and medications.  
        3. Chronobiology impacting medication efficacy and health.  
        4. Environmental factors influencing health trends.  
        5. Advanced nutritional recommendations tailored to the patient's specific health profile.  

        Your recommendations should be extremely specific and immediately actionable, reflecting the latest advancements in precision medicine. Focus on practical lifestyle modifications, dietary suggestions, and general wellness strategies that complement their current health status.  

        Ensure your insights are comprehensive and far exceed typical medical advice.  
    `;  
};  

// Function to get health recommendations asynchronously  
const getRecommendations = async ({ symptoms, medications, user }: Props): Promise<string> => {  
    try {  
        const patientData = formatPatientData({ symptoms, medications, user });  
        const prompt = generateRecommendationsPrompt(patientData);  

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

        // Return top 5 recommendations, or empty if none found  
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
