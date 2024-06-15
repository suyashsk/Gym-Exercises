
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios'

function App() {
  
  const[data,setData] = useState([]);
  const[inputData,setInputData] = useState("");
  useEffect(()=>{

    async function getDataa(){
      const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises',
        params: {
          limit: '15',
          offset: '0'
        },
        headers: {
          'x-rapidapi-key': 'f51d4f4046msh81e25e82e26b3a5p13c8fbjsnfe54366e3bcf',
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
      };

      const result = await axios.request(options)
      console.log(result.data);
      setData(result.data);
    }
    getDataa();
  },[]);
  console.log(data)

  function handleInputData(){
    let temp = data.filter((item)=>{
        if(item.bodyPart === inputData.toLowerCase())
          return item;
        
    })
    setData(temp)
    setInputData("")
  }

  return (
    <>
      <div className='main_container'>
        <div className='title'>
          <h2>Awesome Exercises You Should Know</h2>
        </div>
        <div className='searchbar'>
          <input className='text_search' type='text' placeholder='Search with your target bodypart' value={inputData} onChange={(e)=>setInputData(e.currentTarget.value)} />
          <button className='btn_search' onClick={handleInputData}>Search</button>
        </div>

        <div className='data_content'>
          {
            data.map((item,index)=>{
              return(
                <div className='exercise_data' key={index}>
                  <div className='image'>
                    <img src={item.gifUrl} alt='body_parts_inage'/>
                  </div>
                  <div>
                    <p>{item.bodyPart}</p>
                    
                    <div className='secondary'>
                      {item.secondaryMuscles.map((ab,index)=>{
                        return(
                          <p className='se1'>{item.secondaryMuscles[index]}</p>
                        )
                      })}
                    </div>
                    
                    <p className='item_name'>{item.name}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      
    </>
  )
}

export default App
