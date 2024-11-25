import React from 'react';

const Stage3 = ({ onSubmit, onBack, setData, data, errors, setErrors }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });

        // Clear error message for the specific field when user starts typing
        if (value) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const handleSubmit = () => {
        const newErrors = {};

        // Validation
        if (!data.healthDeclaration) newErrors.healthDeclaration = 'Health Declaration is required';
        if (!data.emergencyContact) newErrors.emergencyContact = 'Emergency Contact is required';
        if (!data.medicalConditions) newErrors.medicalConditions = 'Medical Conditions field is required';

        // If errors exist, update state
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            onSubmit(data); // Submit the form
        }
    };

    return (
        <form>
            <label>
                Health Declaration (Yes/No): <span className="required">*</span>
            </label>
            <select
                name="healthDeclaration"
                value={data.healthDeclaration || ''}
                onChange={handleChange}
                required
            >
                <option value="">--Select--</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            {errors.healthDeclaration && (
                <span className="error">{errors.healthDeclaration}</span>
            )}

            <label>
                Emergency Contact Information: <span className="required">*</span>
            </label>
            <input
                type="text"
                name="emergencyContact"
                value={data.emergencyContact || ''}
                onChange={handleChange}
                required
            />
            {errors.emergencyContact && (
                <span className="error">{errors.emergencyContact}</span>
            )}

            <label>
                Any Medical Conditions (if applicable): <span className="required">*</span>
            </label>
            <textarea
                name="medicalConditions"
                value={data.medicalConditions || ''}
                onChange={handleChange}
                required
            ></textarea>
            {errors.medicalConditions && (
                <span className="error">{errors.medicalConditions}</span>
            )}

            <div className="navigation-buttons">
                <button type="button" onClick={onBack}>
                    Back
                </button>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </form>
    );
};

export default Stage3;
