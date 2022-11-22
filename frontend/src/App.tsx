import React, {useEffect, useState} from 'react';
import './App.css';
import requestJSON from './typescript/RequestJson/RequestJson';
import { HTTPMethods } from './typescript/RequestJson/Constants';
import TinderCard from 'react-tinder-card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const petsMock = [
  {
    id: 1,
    name: 'John',
    url: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80',
  },
  {
    id: 2,
    name: 'Jane',
    url: 'https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
  },
  {
    id: 3,
    name: 'Keith',
    url: 'https://images.unsplash.com/photo-1625316708582-7c38734be31d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
  },
  {
    id: 4,
    name: 'Keith 2',
    url: 'https://images.unsplash.com/photo-1625316708582-7c38734be31d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
  }
]

function App() {
  const [pets, setPets] = useState<any>(petsMock)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  console.log(pets)

  const removePetFromStack = (id: number, direction: string) => {
    if(!isLoading) {
      setIsLoading(true);
      setPets(pets.slice(1))
      // post request with direction
      setIsLoading(false);
    }
  }

  useEffect((() => {
    // setIsLoading(true)
    // fetch and store
  }), [])

  return (
    <div className="body">
      <div className='title'>
        <h1>Rate your</h1>
        <h2>PETS</h2>
      </div>
      <div className="main">
        {pets?.map(({ id, url, name }) => (
          <TinderCard onCardLeftScreen={(direction) => removePetFromStack(id, direction)} preventSwipe={['up', 'down']}>
            <div className="card">
              <div className="image">
                <img draggable="false" src={url} alt="pet" className="image"/>
              </div>
              <p style={{ margin: 8, fontSize: 30}}>{name}</p>
            </div> 
          </TinderCard>
        ))}
        <div className="buttonsContainer">
          <button className="button" onClick={() => removePetFromStack(pets[0].id, 'left')}>
            <FontAwesomeIcon icon={faCircleXmark} size="4x" className="CustomColor" color="#cd0000"/>
          </button>
          <button className="button" onClick={() => removePetFromStack(pets[0].id, 'right')}>
              <FontAwesomeIcon icon={faHeart} size="4x" className="CustomColor" color="#00cd15"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
