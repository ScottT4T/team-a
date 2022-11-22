import { HTTPMethods } from "../../RequestJson/Constants"
import requestJSON from "../../RequestJson/RequestJson"
import { Pet } from "../../Types"

const getPets = async (): Promise<Pet[]> => await requestJSON('/api/getHighscores', HTTPMethods.GET)

export default getPets