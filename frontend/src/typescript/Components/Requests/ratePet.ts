import { HTTPMethods } from "../../RequestJson/Constants"
import requestJSON from "../../RequestJson/RequestJson"
import { Pet } from "../../Types"

const ratePet = async (petId: string, like: boolean): Promise<Pet[]> => await requestJSON(`/api/ratePet?id=${petId}&like=${like}`, HTTPMethods.POST)

export default ratePet