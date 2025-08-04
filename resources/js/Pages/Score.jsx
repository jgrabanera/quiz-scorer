import Options from "@/Components/Options";
import NextQButton from "@/Components/NextQButton";
import ResetToZero from "@/Components/ResetToZero";
import Playoff from "@/Components/Playoff";
import axios from "axios";
import { useEffect, useState } from "react";

const score = () => {
    const [students, setStudents] = useState([]);
    const [qNumber, setqNumber] = useState();
    const [level, setLevel] = useState(0);
    const [isFinal, setIsFinal] = useState(0);
    const [checkedStudents, setCheckedStudents] = useState([]);

    const handleClick = (student) => {
        axios
            .post(
                playoff == 0
                    ? "/insert-student-semiscore"
                    : "/insert-student-finalscore",
                {
                    name: student.name,
                    question: qNumber,
                    score: level,
                    save: true, // Assuming 'save' is a boolean to indicate if the score is saved
                }
            )
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
    };

    const stages = [
        {
            value: 0,
            label: "Semi Finals",
        },
        {
            value: 1,
            label: "Finals",
        },
    ];

    const difficulties = [
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
        loadStudents();
        loadEvents();
        loadCheckedStudents();
    }, []);

    const loadStudents = () => {
        axios.get("/students").then((response) => {
            setStudents(response.data);
        }).catch((error) => {
            alert("❌ Error: Failed to load students.");
        })
    }

    const loadEvents = () => {
        axios.get("/events")
            .then((response) => {
                setIsFinal(response.data.is_final);
                setqNumber(response.data.number);
                setLevel(response.data.level);
            })
            .catch((error) => {
                alert("❌ Error: Failed to load events.");
            });
    }

    const loadCheckedStudents = ()=>{
        axios.get('/load-checked-students').then(
            res=>{
                setCheckedStudents(res.data);
            }
        )
    }

    const handleDifficultyChange = (e) => {
        const formData = new FormData();
        formData.append('level', e.target.value)
        axios.post('/update-difficulty', formData).then(
            setLevel(e.target.value)
        ).catch((error) => {
            alert("❌ Error: Failed to update difficulty.");
        });
    }

    const handleStageChange = (e) => {
        const formData = new FormData();
        formData.append('stage', e.target.value)
        axios.post('/update-stage', formData).then(
            setLevel(e.target.value)
        ).catch((error) => {
            alert("❌ Error: Failed to update stage.");
        });
    }

    const toggleStudentCheck = (name) => {
        const formData = new FormData();
        formData.append('name', name)
        axios.post('/toggle-student-check', formData).then(
            res => {
                setCheckedStudents(prev =>
                    res.data.status === 'Inserted'
                        ? [...prev, name]
                        : prev.filter(n => n !== name)
                );
            }
        )
    }

    return (
        <div>
            <div className="p-2">
                <div className="w-full bg-blue-200 p-3 text-3xl text-center font-bold flex justify-center items-center  gap-2">
                    <ResetToZero
                        qNumber={qNumber}
                        setqNumber={setqNumber}
                        name={"Reset Q"}
                    />

                    <h1>Question no. {qNumber}</h1>
                </div>

                <br />
                <div className="flex flex-row justify-between items-center ">
                    <Options
                        id="difficulty"
                        items={difficulties}
                        itemValue="score"
                        itemName="label"
                        name="difficulty"
                        defaultValue={difficulties.find(dif => Number(dif.score) === Number(level))?.label || "Unknown Difficulty"}
                        onChange={handleDifficultyChange}
                    />

                    <Options
                        id="stage"
                        items={stages}
                        itemValue="value"
                        itemName="label"
                        name="stage"
                        defaultValue={stages.find(dif => Number(dif.value) === Number(isFinal))?.label || "Unknown Stage"}
                        onChange={handleStageChange}
                    />


                    <NextQButton
                        qNumber={qNumber}
                        setqNumber={setqNumber}
                        name={"Next Q"}
                    />
                </div>
                <br />
                <div className="">
                    <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-2">
                        {students.map((student, index) => {
                            const isChecked = checkedStudents.includes(student.name);
                            return (
                                <div
                                    key={index}
                                    onClick={() => toggleStudentCheck(student.name)}
                                    className={`text-center p-4 rounded shadow cursor-pointer transition-all duration-200 ${isChecked ? 'bg-green-400' : 'bg-gray-200 '
                                        }`}
                                >
                                    <span className="font-bold">{student.id}</span>
                                    <span className="text-xs line-clamp-2 capitalize block">{student.name}</span>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default score;
