import React from 'react';

const Stage2 = ({ onNext, onBack, setData, data, errors, setErrors }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });

        // Clear error message for the specific field when user starts typing
        if (value) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const handleNext = () => {
        const newErrors = {};

        // Validation
        if (!data.departureDate) newErrors.departureDate = 'Departure Date is required';
        if (!data.returnDate) newErrors.returnDate = 'Return Date is required';
        if (!data.accommodationPreference) newErrors.accommodationPreference = 'Accommodation Preference is required';

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
                Departure Date: <span className="required">*</span>
            </label>
            <input
                type="date"
                name="departureDate"
                value={data.departureDate || ''}
                onChange={handleChange}
                required
            />
            {errors.departureDate && <span className="error">{errors.departureDate}</span>}

            <label>
                Return Date: <span className="required">*</span>
            </label>
            <input
                type="date"
                name="returnDate"
                value={data.returnDate || ''}
                onChange={handleChange}
                required
            />
            {errors.returnDate && <span className="error">{errors.returnDate}</span>}

            <label>
                Accommodation Preference: <span className="required">*</span>
            </label>
            <select
                name="accommodationPreference"
                value={data.accommodationPreference || ''}
                onChange={handleChange}
                required
            >
                <option value="">--Select--</option>
                <option value="Space Hotel">Space Hotel</option>
                <option value="Martian Base">Martian Base</option>
            </select>
            {errors.accommodationPreference && (
                <span className="error">{errors.accommodationPreference}</span>
            )}

            <label>
                Special Requests or Preferences:
            </label>
            <textarea
                name="specialRequests"
                value={data.specialRequests || ''}
                onChange={handleChange}
            ></textarea>

            <div className="navigation-buttons">
                <button type="button" onClick={onBack}>
                    Back
                </button>
                <button type="button" onClick={handleNext}>
                    Next
                </button>
            </div>
        </form>
    );
};

export default Stage2;
