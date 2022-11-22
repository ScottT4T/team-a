import React, { useState } from "react"
import { useEffect } from "react"
import { Pet } from "../../Types"
import getHighscores from "../Requests/getHighscores"

import './Highscores.css'

const Highscores = () => {
  const [highscores, setHighscores] = useState<Pet[]>([])

  useEffect(() => {
    getHighscores().then((res: Pet[]) => {
      if (res) {
        setHighscores(res)
      }
    })
  }, [])

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
  
  const trimmedPetsMock = petsMock.slice(0, 3)

  return (
    <div className='highscores'>
      {trimmedPetsMock.length && trimmedPetsMock?.map((pet: Pet, index: number) => (
        <div
          className={`medal-card medal-${index + 1}`}
          style={{
            backgroundImage: `url(${pet.imageURL})`,
          }}
        >
          <div className='medal-title '>{pet.name} - {pet.likeCount}</div>
        </div>
      ))}
    </div>
  )
}

export default Highscores