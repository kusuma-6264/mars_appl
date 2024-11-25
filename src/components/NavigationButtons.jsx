import React from 'react';

const NavigationButtons = ({ onBack, onNext, isLast, isFirst, data, setErrors, currentStage }) => {
    const handleNext = () => {
        const newErrors = {};

        if (currentStage === 1) {
            // Stage 1 validation
            if (!data.fullName) newErrors.fullName = 'Full Name is required';
            if (!data.dob) newErrors.dob = 'Date of Birth is required';
            if (!data.nationality) newErrors.nationality = 'Nationality is required';
            if (!data.email) {
                newErrors.email = 'Email is required';
            } else if (!validateEmail(data.email)) {
                newErrors.email = 'Invalid email address';
            }
        } else if (currentStage === 2) {
            // Stage 2 validation
            if (!data.occupation) newErrors.occupation = 'Occupation is required';
            if (!data.address) newErrors.address = 'Address is required';
            if (!data.phone) {
                newErrors.phone = 'Phone number is required';
            } else if (!validatePhone(data.phone)) {
                newErrors.phone = 'Invalid phone number';
            }
        } else if (currentStage === 3) {
            // Stage 3 validation
            if (!data.bankName) newErrors.bankName = 'Bank Name is required';
            if (!data.accountNumber) {
                newErrors.accountNumber = 'Account Number is required';
            } else if (!validateAccountNumber(data.accountNumber)) {
                newErrors.accountNumber = 'Invalid Account Number';
            }
            if (!data.ifscCode) newErrors.ifscCode = 'IFSC Code is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); // Show validation errors
        } else {
            setErrors({}); // Clear previous errors
            onNext(); // Navigate to the next stage
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/; // Phone number should be 10 digits
        return phoneRegex.test(phone);
    };

    const validateAccountNumber = (accountNumber) => {
        const accountRegex = /^[0-9]{9,18}$/; // Account number should be 9-18 digits
        return accountRegex.test(accountNumber);
    };

    return (
        <div className="navigation-buttons">
            {!isFirst && <button onClick={onBack}>Back</button>}
            {!isLast && <button onClick={handleNext}>Next</button>}
            {isLast && <button type="submit" onClick={handleNext}>Submit</button>}
        </div>
    );
};

export default NavigationButtons;
