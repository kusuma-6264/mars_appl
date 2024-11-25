import React, { useState } from 'react';

const Stage1 = ({ onNext, data, setData, errors, setErrors }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });

        // Clear error message for the specific field when user starts typing
        if (value) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/; // e.g., 123-456-7890
        return regex.test(phone);
    };

    const handleNext = () => {
        const newErrors = {};

        // Validation
        if (!data.fullName) newErrors.fullName = 'Full Name is required';
        if (!data.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
        if (!data.nationality) newErrors.nationality = 'Nationality is required';
        if (!data.email || !validateEmail(data.email)) newErrors.email = 'Please enter a valid Gmail address';
        if (!data.phone || !validatePhone(data.phone)) newErrors.phone = 'Please enter a valid phone number (e.g., 123-456-7890)';

        // If errors exist, update state
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            onNext(); // Move to the next stage
        }
    };

    return (
        <form>
            <label>
                Full Name: <span className="required">*</span>
            </label>
            <input
                type="text"
                name="fullName"
                value={data.fullName || ''}
                onChange={handleChange}
                required
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}

            <label>
                Date of Birth: <span className="required">*</span>
            </label>
            <input
                type="date"
                name="dateOfBirth"
                value={data.dateOfBirth || ''}
                onChange={handleChange}
                required
            />
            {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}

            <label>
                Nationality: <span className="required">*</span>
            </label>
            <input
                type="text"
                name="nationality"
                value={data.nationality || ''}
                onChange={handleChange}
                required
            />
            {errors.nationality && <span className="error">{errors.nationality}</span>}

            <label>
                Email: <span className="required">*</span>
            </label>
            <input
                type="email"
                name="email"
                value={data.email || ''}
                onChange={handleChange}
                required
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <label>
                Phone: <span className="required">*</span>
            </label>
            <input
                type="tel"
                name="phone"
                value={data.phone || ''}
                onChange={handleChange}
                required
                placeholder="e.g., 123-456-7890"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}

            <div className="navigation-buttons">
                <button type="button" onClick={handleNext}>
                    Next
                </button>
            </div>
        </form>
    );
};

export default Stage1;
