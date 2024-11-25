import React, { useState } from 'react';
import Stage1 from './components/Stage1';
import Stage2 from './components/Stage2';
import Stage3 from './components/Stage3';
import './index.css';

const App = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [stage, setStage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const nextStage = () => setStage(stage + 1);
  const prevStage = () => setStage(stage - 1);

  const handleSubmit = (updatedData) => {
    console.log('Form submitted with data:', updatedData);
    setShowPopup(true);

    // Reset form data and return to Stage 1 after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
      setData({});
      setErrors({});
      setStage(1);
    }, 2000);
  };

  return (
    <div className="form-container">
      {showPopup && <div className="popup">Registration Successful!</div>}

      {stage === 1 && (
        <Stage1
          onNext={nextStage}
          setData={setData}
          data={data}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {stage === 2 && (
        <Stage2
          onNext={nextStage}
          onBack={prevStage}
          setData={setData}
          data={data}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {stage === 3 && (
        <Stage3
          onBack={prevStage}
          setData={setData}
          data={data}
          errors={errors}
          setErrors={setErrors}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default App;
