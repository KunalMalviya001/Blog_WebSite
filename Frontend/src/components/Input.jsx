import React, { useId } from 'react';

// Input component provides a reusable input field with customizable properties.
// It supports labels, dynamic styling, and forwarding refs for better integration with forms.
const Input = React.forwardRef(function Input({
    label, // Label text for the input field
    type = "text", // Input type (default is "text")
    className = "", // Additional custom classes for styling
    ...props // Spread operator to pass additional props to the input element
}, ref) {
    const id = useId(); // Generate a unique ID for the input field

    return (
        <div className='w-full'>
            {/* Render the label if provided */}
            {label && (
                <label 
                    className='inline-block mb-1 pl-1' 
                    htmlFor={id} // Associate the label with the input field
                >
                    {label}
                </label>
            )}
            {/* Input field with dynamic properties */}
            <input
                type={type} // Set the input type
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} // Apply styles dynamically
                ref={ref} // Forward the ref to the input element
                {...props} // Pass additional props to the input element
                id={id} // Set the unique ID for the input field
            />
        </div>
    );
});

export default Input;