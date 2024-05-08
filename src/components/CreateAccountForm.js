import React, { useState } from 'react';

function CreateAccountForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Optionally clear errors
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        console.log("Form Data Submitted:", formData);
        // Submit logic here
    };

    const validateForm = () => {
        let newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        // Confirm Password validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                {errors.password && <p>{errors.password}</p>}
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>
            <button type="submit">Create Account</button>
        </form>
    );
}

export default CreateAccountForm;
