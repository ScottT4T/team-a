import { HTTPMethods } from "../../RequestJson/Constants"
import requestJSON from "../../RequestJson/RequestJson"
import { Pet } from "../../Types"

const getPets = async (petId: number): Promise<Pet[]> => await requestJSON(`/api/ratePet?id=${petId}`, HTTPMethods.POST)

export default getPets