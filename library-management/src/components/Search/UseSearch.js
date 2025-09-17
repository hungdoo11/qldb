import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useSearch(initialValue = "") {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const [search, setSearch] = useState(params.get("search") || initialValue);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        if (search) query.set("search", search);
        else query.delete("search");

        navigate(`${location.pathname}?${query.toString()}`, { replace: true });
    }, [search, location.pathname]);

    return [search, setSearch];
}
