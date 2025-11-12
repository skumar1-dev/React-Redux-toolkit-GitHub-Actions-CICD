import React, { useState, useEffect } from 'react'


// Use case:

// Avoid making API calls on every keystroke.

// Wait for the user to stop typing before acting.

function useDebounce(value, delay = 500) {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);

        return () => {
            clearTimeout(handler); // Cleanup
        };
    }, [value, delay]);


    return debouncedValue;
}

export default useDebounce