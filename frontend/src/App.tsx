import React, {useEffect, useState} from 'react';
import './App.css';
import requestJSON from './typescript/RequestJson/RequestJson';
import { HTTPMethods } from './typescript/RequestJson/Constants';
import TinderCard from 'react-tinder-card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart } from '@fortawesome/fontawesome-free-regular'
import { faHeart, faCircleXmark } from "@fortawesome/free-regular-svg-icons";




const onSwipe = (direction) => {
  console.log('You swiped: ' + direction)
}

const onCardLeftScreen = (myIdentifier) => {
  console.log(myIdentifier + ' left the screen')
}

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
      setPets(
        pets.filter(pet => pet.id !== id)
      )
      // post request with direction
      setIsLoading(false);
    }
  }

  useEffect((() => {
    // fetch and store
  }), [])

  return (
    <div className="body">
       <div className="main">
          {pets?.map(({ id, url, name }) => (
            <TinderCard onCardLeftScreen={(direction) => removePetFromStack(id, direction)} preventSwipe={['up', 'down']}>
              <div className="card">
                <div className="image">
                  <img draggable="false" src={url} alt="pet" className="image"/>
                </div>
                <p style={{ margin: 0, fontSize: 30}}>{name}</p>
              </div> 
            </TinderCard>
          ))}
          <div className="buttonsContainer">
            <button className="button">
              <FontAwesomeIcon icon={faCircleXmark} size="4x" className="CustomColor" color="#cd0000"/>
            </button>
            <button className="button">
                <FontAwesomeIcon icon={faHeart} size="4x" className="CustomColor" color="#00cd15"/>
            </button>
          </div>
      </div>
    </div>
  );
}

export default App;
