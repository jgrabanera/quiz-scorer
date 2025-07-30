const Dropdown = ({ items, level }) => {
    console.log(level);
    function selectLevel(e) {
        console.log(e.target.value);
        const formData = new FormData();
        formData.append("level", e.target.value);
        axios
            .post("/update-level", formData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
    }
    return (
        <>
            <select
                defaultValue={
                    Number(level) === 1
                        ? "Easy"
                        : Number(level) === 3
                        ? "Average"
                        : "Difficult"
                }
                onChange={selectLevel}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 max-w-[130px] w-full"
            >
                {items.map((item) => (
                    <option key={item}>{item}</option>
                ))}
            </select>
        </>
    );
};

export default Dropdown;
