
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useStaggered } from '@/utils/animations';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  age: string;
  gender: string;
  education: string;
  socioEconomic: string;
  mmse: string;  // Mini-Mental State Examination
  cdrsb: string; // Clinical Dementia Rating Sum of Boxes
  etiv: string;  // Estimated Total Intracranial Volume
  nwbv: string;  // Normalized Whole Brain Volume
  asf: string;   // Atlas Scaling Factor
}

interface PredictionFormProps {
  onSubmit: (result: number) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    education: '',
    socioEconomic: '',
    mmse: '',
    cdrsb: '',
    etiv: '',
    nwbv: '',
    asf: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const totalFields = 9;
  const { isVisible } = useStaggered(totalFields, 100);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => value === '')
      .map(([key, _]) => key);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please fill in all fields: ${emptyFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }
    
    // Here we would normally send data to a backend API
    // For demo purposes, we'll simulate a prediction
    setIsLoading(true);
    
    setTimeout(() => {
      // Simplified mock prediction logic - a real app would call an API endpoint
      // with a trained model
      const mockPrediction = Math.random() > 0.5 ? 0.78 : 0.23;
      
      setIsLoading(false);
      onSubmit(mockPrediction);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto py-12 px-4">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="text-2xl text-alzheimer-800">Patient Information</CardTitle>
          <CardDescription>
            Enter the patient data for Alzheimer's disease risk assessment
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Demographics Section */}
            <div className={`space-y-4 transition-all duration-500 ${isVisible(0) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-lg font-medium text-alzheimer-700">Demographics</h3>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  className="input-field"
                  placeholder="e.g. 65"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                  <SelectTrigger className="input-field">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="education">Education (years)</Label>
                <Input 
                  id="education" 
                  type="number" 
                  value={formData.education}
                  onChange={(e) => handleChange('education', e.target.value)}
                  className="input-field"
                  placeholder="e.g. 12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="socioEconomic">Socioeconomic Status (1-5)</Label>
                <Select value={formData.socioEconomic} onValueChange={(value) => handleChange('socioEconomic', value)}>
                  <SelectTrigger className="input-field">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Low</SelectItem>
                    <SelectItem value="2">2 - Lower Middle</SelectItem>
                    <SelectItem value="3">3 - Middle</SelectItem>
                    <SelectItem value="4">4 - Upper Middle</SelectItem>
                    <SelectItem value="5">5 - High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Clinical Assessment */}
            <div className={`space-y-4 transition-all duration-500 ${isVisible(1) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-lg font-medium text-alzheimer-700">Clinical Assessment</h3>
              
              <div className="space-y-2">
                <Label htmlFor="mmse">MMSE Score (0-30)</Label>
                <Input 
                  id="mmse" 
                  type="number" 
                  min="0"
                  max="30"
                  value={formData.mmse}
                  onChange={(e) => handleChange('mmse', e.target.value)}
                  className="input-field"
                  placeholder="e.g. 28"
                />
                <p className="text-xs text-gray-500">Mini-Mental State Examination</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cdrsb">CDR-SB Score (0-18)</Label>
                <Input 
                  id="cdrsb" 
                  type="number" 
                  step="0.1"
                  min="0"
                  max="18"
                  value={formData.cdrsb}
                  onChange={(e) => handleChange('cdrsb', e.target.value)}
                  className="input-field"
                  placeholder="e.g. 1.5"
                />
                <p className="text-xs text-gray-500">Clinical Dementia Rating Sum of Boxes</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          {/* Neuroimaging Metrics */}
          <div className={`space-y-4 transition-all duration-500 ${isVisible(2) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-lg font-medium text-alzheimer-700">Neuroimaging Metrics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="etiv">ETIV (cm³)</Label>
                <Input 
                  id="etiv" 
                  type="number" 
                  step="0.01"
                  value={formData.etiv}
                  onChange={(e) => handleChange('etiv', e.target.value)}
                  className="input-field"
                  placeholder="e.g. 1400"
                />
                <p className="text-xs text-gray-500">Estimated Total Intracranial Volume</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nwbv">NWBV (proportion)</Label>
                <Input 
                  id="nwbv" 
                  type="number" 
                  step="0.001"
                  min="0"
                  max="1"
                  value={formData.nwbv}
                  onChange={(e) => handleChange('nwbv', e.target.value)}
                  className="input-field"
                  placeholder="e.g. 0.7"
                />
                <p className="text-xs text-gray-500">Normalized Whole Brain Volume</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="asf">ASF</Label>
                <Input 
                  id="asf" 
                  type="number" 
                  step="0.01"
                  value={formData.asf}
                  onChange={(e) => handleChange('asf', e.target.value)}
                  className="input-field"
                  placeholder="e.g. 1.2"
                />
                <p className="text-xs text-gray-500">Atlas Scaling Factor</p>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full animated-button"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Calculate Risk Assessment'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default PredictionForm;
