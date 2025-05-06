import { useState } from "react";

const useFetch = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);

    const fetchData = async (url: string, method: string) => {
        try {
            const resp = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(!resp.ok) {
                throw new Error('Network response was not ok');
            } else {
                const json = await resp.json();
                setData(json);
                setLoading(false);
                setError(null);
            }
        } catch(e) {
            setError('Error fetching data');
            setLoading(false);
            setData(null);
        }
    }


    return {
        data,
        loading,
        error,
        fetchData
    }
}

export default useFetch;