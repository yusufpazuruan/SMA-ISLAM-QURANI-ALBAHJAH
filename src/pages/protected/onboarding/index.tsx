// import { useState } from "react";

// import { Button } from "@/components/ui/button";
// import {
//   Stepper,
//   StepperIndicator,
//   StepperItem,
//   StepperSeparator,
//   StepperTrigger,
// } from "@/components/ui/stepper";
// import OnboardingForm from "./onboarding-form";
// import { ArrowLeft, ArrowRight, Check } from "lucide-react";

// const steps = [1, 2, 3, 4];

// export default function Onboarding() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleNextStep = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setCurrentStep((prev) => prev + 1);
//       setIsLoading(false);
//     }, 500);
//   };

//   return (
//     <div className="mx-auto max-w-xl space-y-8 text-center">
//       <Stepper value={currentStep} onValueChange={setCurrentStep}>
//         {steps.map((step) => (
//           <StepperItem
//             key={step}
//             step={step}
//             className="not-last:flex-1"
//             loading={isLoading}
//           >
//             <StepperTrigger asChild>
//               <StepperIndicator />
//             </StepperTrigger>
//             {step < steps.length && <StepperSeparator />}
//           </StepperItem>
//         ))}
//       </Stepper>

//       <OnboardingForm currentStep={currentStep} />

//       <div className="flex justify-center space-x-4">
//         <Button
//           variant="outline"
//           className="w-32"
//           onClick={() => setCurrentStep((prev) => prev - 1)}
//           disabled={currentStep === 1}
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" /> Prev
//         </Button>
//         <Button
//           className="w-32"
//           onClick={handleNextStep}
//           disabled={currentStep > steps.length}
//         >
//           {currentStep === steps.length ? (
//             <>
//               ✅ Finish
//             </>
//           ) : (
//             <>
//               <ArrowRight className="mr-2 h-4 w-4" /> Next
//             </>
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Stepper,
//   StepperIndicator,
//   StepperItem,
//   StepperSeparator,
//   StepperTrigger,
// } from "@/components/ui/stepper";
// import OnboardingForm from "./onboarding-form";
// import { ArrowLeft, ArrowRight, Check } from "lucide-react";

// const steps = [1, 2, 3, 4];

// export default function Onboarding() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false); // ✅ animasi selesai

//   const onboardingFormRef = useState<{
//     validateStep: (step: number) => Promise<boolean>;
//     submitForm: () => void;
//   } | null>(null);

//   const handleNextStep = async () => {
//     if (!onboardingFormRef[0]) return;

//     const isValid = await onboardingFormRef[0]?.validateStep(currentStep);
//     if (!isValid) return;

//     if (currentStep === steps.length) {
//       onboardingFormRef[0]?.submitForm();
//       setIsSuccess(true);
//     } else {
//       setIsLoading(true);
//       setTimeout(() => {
//         setCurrentStep((prev) => prev + 1);
//         setIsLoading(false);
//       }, 300);
//     }
//   };

//   return (
//     <div className="mx-auto max-w-xl space-y-8 text-center">
//       <Stepper value={currentStep} onValueChange={setCurrentStep}>
//         {steps.map((step) => (
//           <StepperItem
//             key={step}
//             step={step}
//             className="not-last:flex-1"
//             loading={isLoading}
//           >
//             <StepperTrigger asChild>
//               <StepperIndicator />
//             </StepperTrigger>
//             {step < steps.length && <StepperSeparator />}
//           </StepperItem>
//         ))}
//       </Stepper>

//       {/* ✅ Kirim ref ke OnboardingForm */}
//       <OnboardingForm currentStep={currentStep} formRef={onboardingFormRef} />

//       <div className="flex justify-center space-x-4">
//         <Button
//           variant="outline"
//           className="w-32"
//           onClick={() => setCurrentStep((prev) => prev - 1)}
//           disabled={currentStep === 1 || isSuccess}
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" /> Prev
//         </Button>
//         <Button
//           className="w-32"
//           onClick={handleNextStep}
//           disabled={isLoading || isSuccess}
//         >
//           {isSuccess ? (
//             <>
//               <Check className="mr-2 h-4 w-4 text-green-500 animate-bounce" />
//               Done!
//             </>
//           ) : currentStep === steps.length ? (
//             <>✅ Finish</>
//           ) : (
//             <>
//               <ArrowRight className="mr-2 h-4 w-4" /> Next
//             </>
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// }


// import { Stepper, StepperIndicator, StepperItem, StepperSeparator, StepperTrigger } from "@/components/ui/stepper";
// import OnboardingForm from "./onboarding-form";

// const steps = [1, 2, 3, 4];

export default function Onboarding() {
  return (
    <div className="mx-auto max-w-xl space-y-8 text-center">
      {/* <OnboardingForm steps={steps} /> */}

      onboarding
    </div>
  );
}
