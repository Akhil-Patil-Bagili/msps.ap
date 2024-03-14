import { Appbar } from "../components/Appbar";
import wip from "../assets/wip.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { PuzzleBoard } from "../components/PuzzleBoard";


export const HomePage = () => {
    const [user, setUser] = useState({}); 
    const [puzzle, setPuzzle] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return; 
        }

        const fetchData = async () => {
            try {
                const userResponse = await axios.get("http://127.0.0.1:5000/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(userResponse.data); 
                console.log(userResponse.data)

                const puzzleResponse = await axios.get("http://127.0.0.1:5000/api/puzzle");
                setPuzzle(puzzleResponse.data.puzzle);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); 
    }, []);

    return <div>
        <Appbar user={user}/>
        <PuzzleBoard/>
        {/* <div className="flex justify-center items-center mt-2">
                    <img src={wip} alt="mockup"/>
        </div>  */}
    </div>
}