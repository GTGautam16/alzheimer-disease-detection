
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
    // For development/testing, you can uncomment this to return a mock prediction
    // return Promise.resolve(Math.random());
    
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
  } catch (error) {
    console.error('Error getting prediction:', error);
    throw error;
  }
};
