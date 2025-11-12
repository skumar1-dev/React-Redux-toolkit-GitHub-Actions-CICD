import { useState, useEffect } from 'react';

function useDataFetching(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return; // If no URL, do nothing

        let isCancelled = false; // To avoid state update after unmount
        setLoading(true);
        setError(null);
        setTimeout(() => {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(jsonData => {
                    if (!isCancelled) {
                        setData(jsonData);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    if (!isCancelled) {
                        setError(err);
                        setLoading(false);
                    }
                });
        }, 1000);


        // Cleanup function to cancel update if component unmounts
        return () => {
            isCancelled = true;
        };
    }, [url]);

    return { data, loading, error };
}

export default useDataFetching;
