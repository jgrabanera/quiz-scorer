import { useEffect, useState } from "react";

const Playoff = ({ playoff, setPlayoff, items }) => {
    const [playoffValue, setPlayoffValue] = useState(playoff);
    const selectPlayoff = (e) => {
        const formData = new FormData();
        formData.append("playoff", e.target.value);
        axios
            .post("/update-playoff", formData)
            .then((response) => {
                setPlayoffValue(response.data.playoff);
                setPlayoff(response.data.playoff);
                console.log(response.data.playoff);
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
    };

    useEffect(() => {
        setPlayoffValue(playoff);
    }, [playoff]);

    return (
        <>
            <select
                value={playoffValue}
                onChange={selectPlayoff}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 max-w-[130px] w-full"
            >
                {items.map((item) => (
                    <option value={item.value} key={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Playoff;
