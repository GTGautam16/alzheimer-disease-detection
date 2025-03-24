
/**
 * API service for Alzheimer's disease prediction
 */

export interface PatientData {
  PatientID: string;
  Age: number;
  Gender: string;
  Ethnicity: string;
  EducationLevel: number;
  BMI: number;
  Smoking: string;
  AlcoholConsumption: string;
  PhysicalActivity: string;
  DietQuality: string;
  SleepQuality: string;
  FamilyHistoryAlzheimers: boolean;
  CardiovascularDisease: boolean;
  Diabetes: boolean;
  Depression: boolean;
  HeadInjury: boolean;
  Hypertension: boolean;
  SystolicBP: number;
  DiastolicBP: number;
  CholesterolTotal: number;
  CholesterolLDL: number;
  CholesterolHDL: number;
  CholesterolTriglycerides: number;
  MMSE: number;
  FunctionalAssessment: number;
  MemoryComplaints: boolean;
  BehavioralProblems: boolean;
  ADL: number;
  Confusion: boolean;
  Disorientation: boolean;
  PersonalityChanges: boolean;
  DifficultyCompletingTasks: boolean;
  Forgetfulness: boolean;
}

// Default API URL - update this with your actual backend URL when deployed
const API_URL = 'https://your-backend-service.com/api';

/**
 * Get prediction from backend model
 * @param patientData Patient data to use for prediction
 * @returns Promise with prediction result (0-1 risk score)
 */
export const getPrediction = async (patientData: PatientData): Promise<number> => {
  try {
    // For development/testing, return a mock prediction based on certain risk factors
    // Remove this and uncomment the fetch call when your backend is ready
    
    console.log('Using mock prediction with data:', patientData);
    
    // Calculate a mock risk score based on some risk factors
    // This is just for demonstration and does not reflect real medical calculations
    let riskScore = 0;
    
    // Age is a significant risk factor
    if (patientData.Age > 65) riskScore += 0.2;
    if (patientData.Age > 75) riskScore += 0.1;
    
    // Family history is a strong indicator
    if (patientData.FamilyHistoryAlzheimers) riskScore += 0.15;
    
    // Various health conditions increase risk
    if (patientData.CardiovascularDisease) riskScore += 0.1;
    if (patientData.Diabetes) riskScore += 0.1;
    if (patientData.Depression) riskScore += 0.05;
    if (patientData.HeadInjury) riskScore += 0.05;
    if (patientData.Hypertension) riskScore += 0.05;
    
    // Cognitive symptoms are strong indicators
    if (patientData.MemoryComplaints) riskScore += 0.05;
    if (patientData.Confusion) riskScore += 0.05;
    if (patientData.Disorientation) riskScore += 0.05;
    if (patientData.PersonalityChanges) riskScore += 0.05;
    if (patientData.DifficultyCompletingTasks) riskScore += 0.05;
    if (patientData.Forgetfulness) riskScore += 0.05;
    if (patientData.BehavioralProblems) riskScore += 0.05;
    
    // MMSE score is inversely related to risk (lower score = higher risk)
    if (patientData.MMSE < 24) riskScore += 0.1;
    if (patientData.MMSE < 20) riskScore += 0.1;
    
    // Add a small random factor for variation
    riskScore += (Math.random() * 0.1);
    
    // Ensure score is between 0 and 1
    riskScore = Math.min(Math.max(riskScore, 0), 1);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return riskScore;
    
    /* 
    // Uncomment this code when your backend is ready
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.prediction;
    */
  } catch (error) {
    console.error('Error getting prediction:', error);
    throw error;
  }
};
