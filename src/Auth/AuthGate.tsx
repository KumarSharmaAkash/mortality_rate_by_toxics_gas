import React, { useState, FormEvent } from 'react';
import './AuthGate.css';
import logo from '../images/user/user-06.png';
interface AuthGateProps {
  onSuccess: () => void;
}

const SECRET_CODE = 'admin';

const AuthGate: React.FC<AuthGateProps> = ({ onSuccess }) => {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (code === SECRET_CODE) {
      onSuccess();
    } else {
      setError('Incorrect code. Please try again.');
    }
  };

  return (
    <div className="auth-gate">
      <img src={logo} alt="INMAS Logo" className="logo w-50 h-50" />
      <h2 className='mt-4.5'>Please Enter the Secret Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
        />
        <button type="submit">Submit</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AuthGate;
