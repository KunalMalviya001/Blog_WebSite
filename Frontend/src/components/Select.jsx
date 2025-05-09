import React, { useId } from 'react';

// Select component provides a reusable dropdown select element.
// It supports dynamic options, labels, and customizable styling.
function Select({
    options, // Array of options to populate the dropdown
    label, // Label text for the select field
    className = '', // Additional custom classes for styling
    ...props // Spread operator to pass additional props to the select element
}, ref) {
    const id = useId(); // Generate a unique ID for the select field

    return (
        <div className='w-full'>
            {/* Render the label if provided */}
            {label && <label htmlFor={id} className=''>{label}</label>}
            {/* Dropdown select field */}
            <select
                {...props} // Pass additional props to the select element
                id={id} // Set the unique ID for the select field
                ref={ref} // Forward the ref to the select element
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} // Apply styles dynamically
            >
                {/* Map through the options array to render each option */}
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option} {/* Display the option text */}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);