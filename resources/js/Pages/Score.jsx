import Dropdown from "@/Components/Dropdown";
import NextQButton from "@/Components/NextQButton";
import Playoff from "@/Components/Playoff";
import axios from "axios";
import { useEffect, useState } from "react";

const score = () => {
    const [tblStudent, setTblStudent] = useState([]);
    const [qNumber, setqNumber] = useState();
    const [level, setLevel] = useState(0);
    const [playoff, setPlayoff] = useState(0);

    const handleClick = (student) => {
        axios
            .post("/insert-student-semiscore", {
                name: student.name,
                question: qNumber,
                score: level,
                save: true, // Assuming 'save' is a boolean to indicate if the score is saved
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
    };

    const playoffItems = [
        {
            value: 0,
            label: "Semi Finals",
        },
        {
            value: 1,
            label: "Finals",
        },
    ];

    const dropDownItems = [
        {
            score: 1,
            label: "Easy",
        },
        {
            score: 3,
            label: "Average",
        },
        {
            score: 5,
            label: "Difficult",
        },
    ];

    useEffect(() => {
        axios
            .get("/get-student-info")
            .then((response) => {
                setTblStudent(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        axios
            .get("/get-current-question-number")
            .then((response) => {
                console.log(response.data);
                setPlayoff(response.data.current_playoff);
                setqNumber(response.data.number);
                setLevel(response.data.current_point);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <div className="p-2">
                <h1 className="w-full bg-blue-200 p-3 text-3xl text-center font-bold">
                    Question no. {qNumber}
                </h1>
                <br />
                <div className="flex flex-row justify-between items-center ">
                    <Dropdown
                        qNumber={qNumber}
                        setqNumber={setqNumber}
                        level={level}
                        setLevel={setLevel}
                        items={dropDownItems}
                    />
                    <Playoff
                        playoff={playoff}
                        setPlayoff={setPlayoff}
                        items={playoffItems}
                    />

                    {/* <ResetToZero
                        qNumber={qNumber}
                        setqNumber={setqNumber}
                        name={"Reset Q"}
                    /> */}
                    <NextQButton
                        qNumber={qNumber}
                        setqNumber={setqNumber}
                        name={"Next Q"}
                    />
                </div>
                <br />
                <div className=""></div>
                <div className="">
                    <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-2">
                        {tblStudent.map((student, index) => (
                            <div
                                key={index}
                                onClick={() => handleClick(student)}
                                className="bg-gray-200 hover:bg-green-300 text-center p-4 rounded shadow transition duration-200"
                            >
                                <span className="font-bold">{student.id}</span>
                                <span className="text-xs line-clamp-2 capitalize">
                                    {student.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* table */}
            </div>
        </div>
    );
};

export default score;
