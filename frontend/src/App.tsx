import React, {useEffect, useState} from 'react';
import './App.css';
import requestJSON from './typescript/RequestJson/RequestJson';
import { HTTPMethods } from './typescript/RequestJson/Constants';
import TinderCard from 'react-tinder-card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";

import getPets from './typescript/Components/Requests/getPets';
import { Pet } from './typescript/Types';
import ratePet from './typescript/Components/Requests/ratePet';
import Highscores from './typescript/Components/Highscores/Highscores';

const petsMock = [
  {
    id: "1",
    name: 'John',
    imageURL: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80',
    likeCount: 0,
  },
  {
    id: "2",
    name: 'Jane',
    imageURL: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
    likeCount: 0,
  },
  {
    id: "3",
    name: 'Keith',
    imageURL: 'https://images.unsplash.com/photo-1625316708582-7c38734be31d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
    likeCount: 0,
  },
  {
    id: "4",
    name: 'Keith 2',
    imageURL: 'https://images.unsplash.com/photo-1625316708582-7c38734be31d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
    likeCount: 0,
  }
]

function App() {
  const [pets, setPets] = useState<any>(petsMock)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showHighscores, setShowHighscores] = useState<boolean>(true)

  const fetchPets = () => {
    setIsLoading(true)
    getPets().then((res: Pet[]) => {
      console.log(res)
      if(res) {
        // setPets(res)
      }
      setIsLoading(false)
    })
  }

  const removePetFromStack = (id: string, direction: string) => {
    if(!isLoading) {
      setIsLoading(true);
      
      ratePet(id, direction === 'right').then(res => {
        setPets((pets) => pets.filter((pet) => pet.id !== id));
        setIsLoading(false);
      })

    }
  }

  useEffect((() => {
    if(!isLoading) {
      fetchPets()
    }
  }), [])

  return (
    <div className="body">
      <button className="button" style={{position: 'fixed', top: 200 }} onClick={() => {setShowHighscores(!showHighscores)}}>
        <FontAwesomeIcon icon={showHighscores ? faCircleXmark :faRankingStar} size="4x" className="CustomColor" color="#f6cb0d"/>
      </button>
      {
        showHighscores ? (
          <Highscores />
        ) : (
          <div className="main">
          <>
            {!pets.length && <p style={{ color: 'white'}}>Sorry, no pets left</p>}
            {pets.length && pets?.map(({ id, imageURL, name }) => (
              <>
              <TinderCard onCardLeftScreen={(direction) => removePetFromStack("",direction)} preventSwipe={['up', 'down']}>
                <div className="card">
                  <div className="image">
                    <img draggable="false" src={imageURL} alt="pet" className="image"/>
                  </div>
                  <p style={{ margin: 8, fontSize: 30}}>{name}</p>
                </div> 
              </TinderCard>
              {true && (
                  <div className="buttonsContainer">
                    <button className="button" onClick={() => removePetFromStack(id,'left')}>
                      <FontAwesomeIcon icon={faCircleXmark} size="4x" className="CustomColor" color="#cd0000"/>
                    </button>
                    <button className="button" onClick={() => removePetFromStack(id,'right')}>
                      <FontAwesomeIcon icon={faHeart} size="4x" className="CustomColor" color="#00cd15"/>
                    </button>
                  </div>
                )}
              </>
            ))}
          </>    
      </div>
        )
      }
    </div>
  );
}

export default App;
