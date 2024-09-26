import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const categories = [
  "Research Grants",
  "Patents and Journals",
  "Conferences",
  "Design Patents",
];

const CategoryInputForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    projectTitle: '',
    fundingAgency: '',
    role: '',
    totalCost: '',
    pptLink: '',
    description: '',
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://gaurav-backend.vercel.app/api/submit-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const result = await response.json();
      console.log('Success:', result);

      setFormData({
        category: '',
        projectTitle: '',
        fundingAgency: '',
        role: '',
        totalCost: '',
        pptLink: '',
        description: '',
      });
      setCurrentStep(0);
    } catch (error) {
      console.error('Error:', error);
      setSubmitError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { name: 'category', type: 'select', options: categories },
    { name: 'projectTitle', type: 'text' },
    { name: 'fundingAgency', type: 'text' },
    { name: 'role', type: 'text' },
    { name: 'totalCost', type: 'number' },
    { name: 'pptLink', type: 'url' },
    { name: 'description', type: 'textarea' },
  ];

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, formFields.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-lg shadow-lg p-8 w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-foreground">Fill your Project Details</h2>
        
        <div className="mb-8">
          <div className="flex justify-between">
            {formFields.map((_, index) => (
              <motion.div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
                animate={{ scale: index === currentStep ? 1.2 : 1 }}
              >
                {index < currentStep ? <Check size={16} /> : index + 1}
              </motion.div>
            ))}
          </div>
          <div className="mt-2 h-2 bg-muted rounded-full">
            <motion.div 
              className="h-full bg-primary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / (formFields.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {formFields[currentStep].type === 'select' ? (
              <select
                name={formFields[currentStep].name}
                value={formData[formFields[currentStep].name]}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 bg-background text-foreground"
              >
                <option value="">Select a category</option>
                {formFields[currentStep].options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : formFields[currentStep].type === 'textarea' ? (
              <textarea
                name={formFields[currentStep].name}
                placeholder={formFields[currentStep].name.charAt(0).toUpperCase() + formFields[currentStep].name.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                value={formData[formFields[currentStep].name]}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 h-32 resize-none bg-background text-foreground"
              />
            ) : (
              <input
                type={formFields[currentStep].type}
                name={formFields[currentStep].name}
                placeholder={formFields[currentStep].name.charAt(0).toUpperCase() + formFields[currentStep].name.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                value={formData[formFields[currentStep].name]}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 bg-background text-foreground"
              />
            )}
          </motion.div>

          {submitError && (
            <div className="mt-4 text-red-500">{submitError}</div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0 || isSubmitting}
              className={`px-4 py-2 rounded-md flex items-center ${
                currentStep === 0 || isSubmitting ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
              } transition-all duration-300`}
            >
              <ChevronLeft size={20} className="mr-2" /> Previous
            </button>
            {currentStep === formFields.length - 1 ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300 flex items-center"
              >
                Next <ChevronRight size={20} className="ml-2" />
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CategoryInputForm;