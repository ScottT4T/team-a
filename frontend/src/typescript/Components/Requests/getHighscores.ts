import { HTTPMethods } from "../../RequestJson/Constants"
import requestJSON from "../../RequestJson/RequestJson"
import { Highscores } from "../../Types"

const getHighscores = async (): Promise<Highscores> => await requestJSON('/api/getHighscores', HTTPMethods.GET)

export default getHighscores