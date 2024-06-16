import { Star,Coolshape,Flower } from 'coolshapes-react';
import { marked } from 'marked';
import { useEffect, useState } from 'react';
import './App.css';
import { run } from './geminiAPI';
import images from './MemeShufle.js';
import { getItem, setItem } from './StorageUtils';
function App() {
  const [generatedText, setGeneratedText] = useState('');
  const [hobbies, setHobbies] = useState(getItem('hobbies') || '');
  const [goals, setGoals] = useState(getItem('goals') || '');
  const [profession, setProfession] = useState(getItem('profession') || '');
  const [newHobbies, setNewHobbies] = useState('');
  const [newGoals, setNewGoals] = useState('');
  const [newProfession, setNewProfession] = useState('');
  const [editInfo, setEditInfo] = useState(false);
  const [time, setTime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTimeAdded, setIsTimeAdded] = useState(false);
  const [randomImage, setRandomImage] = useState('');
  const style = "font-mono font-bold flex items-center justify-center";

  useEffect(() => {
    getRandomImage();
  }, [loading]);

  function getRandomKey(obj) {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  function getRandomImage() {
    const randomKey = getRandomKey(images);
    setRandomImage(images[randomKey]);
  }

  function addTime() {
    const timeInput = document.getElementById("time_input").value;
    const timeInt = parseInt(timeInput, 10);
    if (!timeInput || isNaN(timeInt) || timeInt === 0) {
      alert("Please input valid time, each quantity separated by comma ','");
    } else {
      const time_array = timeInput.split(",");
      setTime(time_array);
      setIsTimeAdded(true);
    }
  }

  async function callAPI() {
    if (!isTimeAdded || time.length === 0) {
      alert("Enter time value first");
      return;
    }

    try {
      setLoading(true);
      const response = await run(time, hobbies, goals, profession);
      const formattedResponse = formatResponse(response);
      setGeneratedText(formattedResponse);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
    }
  }

  function changeData() {
    if (newHobbies) {
      setHobbies(newHobbies);
      setItem('hobbies', newHobbies);
    }
    if (newGoals) {
      setGoals(newGoals);
      setItem('goals', newGoals);
    }
    if (newProfession) {
      setProfession(newProfession);
      setItem('profession', newProfession);
    }
    setEditInfo(false);
  }

  function formatResponse(response) {
    return marked.parse(response);
  }
  return (
    <>
      <div className='w-screen flex gap-10 mt-2 justify-center items-center text-3xl'>

        <span className={`${style}`}><Star size={32} /><span className='m-4 text-purple-400'>Hobbies</span> = {hobbies}</span>
        <span className={`${style}`}><Coolshape  size={32} /><span className='m-4 text-pink-400'>Goals:</span> {goals}</span>
        <span className={`${style}`}> <Flower size={32} /> <span className='m-4 text-yellow-600'>Profession</span> = {profession}</span>
      </div>
      <div className='flex items-center gap-4 w-screen h-screen justify-around'>
        <div className='flex flex-col items-center gap-2'>
          <input className="text-black p-2 border border-gray-300 rounded w-48" type="text" placeholder='Enter Time as 00,00,00' id="time_input" />
          <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={addTime}>Add Time</button>
          {isTimeAdded ? (
            <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={callAPI} id="call_api">Search </button>
          ) : (
            <p>Please enter time first</p>
          )}
          <button className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => setEditInfo(true)}>Edit Data</button>
          {editInfo && (
            <div className='flex flex-col items-center gap-2'>
              <input
                className="p-2 text-black border border-gray-300 rounded w-48"
                type="text"
                placeholder='Hobbies'
                value={newHobbies}
                onChange={(e) => setNewHobbies(e.target.value)}
              />
              <input
                className="p-2 border text-black border-gray-300 rounded w-48"
                type="text"
                placeholder='Goals (If any)'
                value={newGoals}
                onChange={(e) => setNewGoals(e.target.value)}
              />
              <input
                className="p-2 border text-black border-gray-300 rounded w-48"
                type="text"
                placeholder='Profession'
                value={newProfession}
                onChange={(e) => setNewProfession(e.target.value)}
              />
              <button className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600" onClick={changeData}>Change Data</button>
            </div>
          )}
        </div>
        <div className='w-[1000px] h-[600px] border-4  rounded-xl overflow-auto'>
        
          <div className='w-full h-full p-5 text-3xl flex flex-col items-center'>
             
            <div className="photo-gallery"></div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className='w-full min-h-full   text-wrap'>
                <div dangerouslySetInnerHTML={{ __html: generatedText }} />
                {randomImage && (
                  <div className='random-image flex flex-col justify-center items-center gap-5 ' >
                    <img src={randomImage} alt="Random Meme" /><Coolshape />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

}

export default App;
