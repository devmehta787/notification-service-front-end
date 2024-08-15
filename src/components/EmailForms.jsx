import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    text: '',
    maxRetries: 3,
    retryDelay: 3000,
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/send-email', emailData);
      setResponseMessage(`Success: ${response.data}`);
    } catch (error) {
      setResponseMessage('Error: Failed to send email');
    }
  };

  return (
    <div className="email-form">
      <h1>Send an Email</h1>
      <form onSubmit={handleSubmit}>
        <label>
          To:
          <input
            type="email"
            name="to"
            value={emailData.to}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Subject:
          <input
            type="text"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Message:
          <textarea
            name="text"
            value={emailData.text}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Max Retries:
          <input
            type="number"
            name="maxRetries"
            value={emailData.maxRetries}
            onChange={handleChange}
            min="1"
            max="10"
          />
        </label>
        <label>
          Retry Delay (ms):
          <input
            type="number"
            name="retryDelay"
            value={emailData.retryDelay}
            onChange={handleChange}
            min="1000"
          />
        </label>
        <button type="submit">Send Email</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default EmailForm;