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

  return (
    <div className='highscores'>
      {highscores?.map((pet: Pet, index: number) => (
        <div
          className={`medal-card medal-${index}`}
          style={{
            backgroundImage: pet.imageURL,
          }}
        >
          <div className='medal-title'>{pet.name}</div>
        </div>
      ))}
    </div>
  )
}

export default Highscores