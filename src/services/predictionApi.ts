
/**
 * API service for Alzheimer's disease prediction
 * Local simulation implementation
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

// Simulate prediction without backend
export const getPrediction = async (
  patientData: PatientData
): Promise<number> => {
  console.log("Simulating prediction with data:", patientData);
  
  // Create a delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Calculate risk score based on key risk factors
  let riskScore = 0;
  let riskFactors = 0;
  
  // Age is a significant risk factor
  if (patientData.Age > 65) {
    riskScore += 0.1;
    riskFactors++;
  }
  if (patientData.Age > 75) {
    riskScore += 0.1;
    riskFactors++;
  }
  
  // Genetic and family history
  if (patientData.FamilyHistoryAlzheimers) {
    riskScore += 0.15;
    riskFactors++;
  }
  
  // Lifestyle factors
  if (patientData.PhysicalActivity === 'Sedentary') {
    riskScore += 0.08;
    riskFactors++;
  }
  if (patientData.Smoking === 'Current') {
    riskScore += 0.07;
    riskFactors++;
  }
  if (patientData.AlcoholConsumption === 'Heavy') {
    riskScore += 0.07;
    riskFactors++;
  }
  if (patientData.DietQuality === 'Poor') {
    riskScore += 0.05;
    riskFactors++;
  }
  if (patientData.SleepQuality === 'Poor') {
    riskScore += 0.05;
    riskFactors++;
  }
  
  // Medical conditions
  if (patientData.CardiovascularDisease) {
    riskScore += 0.1;
    riskFactors++;
  }
  if (patientData.Diabetes) {
    riskScore += 0.08;
    riskFactors++;
  }
  if (patientData.Depression) {
    riskScore += 0.07;
    riskFactors++;
  }
  if (patientData.HeadInjury) {
    riskScore += 0.09;
    riskFactors++;
  }
  if (patientData.Hypertension) {
    riskScore += 0.08;
    riskFactors++;
  }
  
  // Cognitive assessment
  if (patientData.MMSE < 24) {
    riskScore += 0.2;
    riskFactors++;
  }
  
  // Symptoms
  if (patientData.MemoryComplaints) {
    riskScore += 0.1;
    riskFactors++;
  }
  if (patientData.Confusion) {
    riskScore += 0.12;
    riskFactors++;
  }
  if (patientData.Disorientation) {
    riskScore += 0.12;
    riskFactors++;
  }
  if (patientData.Forgetfulness) {
    riskScore += 0.11;
    riskFactors++;
  }
  if (patientData.DifficultyCompletingTasks) {
    riskScore += 0.1;
    riskFactors++;
  }
  if (patientData.PersonalityChanges) {
    riskScore += 0.09;
    riskFactors++;
  }
  
  // Normalize the score between 0 and 1
  let normalizedScore = riskScore / Math.max(riskFactors, 1);
  
  // Ensure the score is between 0 and 1
  normalizedScore = Math.min(Math.max(normalizedScore, 0), 0.95);
  
  // Add some randomness to make it more realistic
  const randomFactor = Math.random() * 0.1 - 0.05; // -0.05 to +0.05
  normalizedScore = Math.min(Math.max(normalizedScore + randomFactor, 0), 0.95);
  
  console.log("Calculated risk score:", normalizedScore);
  return normalizedScore;
};
