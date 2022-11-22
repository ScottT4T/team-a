import { HTTPMethods } from "../../RequestJson/Constants"
import requestJSON from "../../RequestJson/RequestJson"
import { Pet } from "../../Types"

const getPets = async (): Promise<Pet[]> => await requestJSON('/api/getPets', HTTPMethods.GET)

export default getPets