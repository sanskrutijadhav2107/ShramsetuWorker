import React, { createContext, useContext, useState } from "react";

/**
 * This shape MUST match backend schema keys
 */
export type SignupData = {
  phone_number?: string;
  name?: string;
  password?: string;
  confirm_password?: string;

  role?: "worker";        // "worker"
  language?: string;    // "en", "hi", etc

  latitude?: number;
  longitude?: number;

  service_type?: string; // plumber, electrician...
  experience?: number;   // 0,1,3,5,10
  age?: 25;

  user_id?: number;
};

type SignupContextType = {
  signupData: SignupData;
  updateSignupData: (data: Partial<SignupData>) => void;
  resetSignupData: () => void;
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider = ({ children }: { children: React.ReactNode }) => {
  const [signupData, setSignupData] = useState<SignupData>({});

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData(prev => ({
      ...prev,
      ...data,
    }));
  };

  const resetSignupData = () => {
    setSignupData({});
  };

  return (
    <SignupContext.Provider
      value={{
        signupData,
        updateSignupData,
        resetSignupData,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used inside SignupProvider");
  }
  return context;
};








