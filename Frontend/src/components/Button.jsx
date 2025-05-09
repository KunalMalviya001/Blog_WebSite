import React from "react";

export default function Button({
    children,
    // type = "button", // Default button type
    bgColor = "bg-blue-600", // Default background color
    textColor = "text-white", // Default text color
    className = "", // Additional custom classes
    ...props // Spread operator for additional props
}) {
    return (
        <button
            // type={type} // Apply the type prop
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} // Dynamic classes
            {...props} // Pass additional props
        >
            {children} {/* Render button content */}
        </button>
    );
}