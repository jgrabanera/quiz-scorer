import { useEffect, useState } from "react";

const Dropdown = ({ items, level, setLevel, setqNumber }) => {
    const [levelValue, setLevelValue] = useState(level);
    //console.log(level);
    const selectLevel = (e) => {
        const formData = new FormData();
        formData.append("level", e.target.value);
        axios
            .post("/update-level", formData)
            .then((response) => {
                setLevelValue(response.data.level);
                setLevel(response.data.level);
                setqNumber(1);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
    };
    useEffect(() => {
        setLevelValue(level);
    }, [level]);

    return (
        <>
            <select
                value={levelValue}
                onChange={selectLevel}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 max-w-[130px] w-full"
            >
                {items.map((item) => (
                    <option value={item.score} key={item.score}>
                        {item.label}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Dropdown;
