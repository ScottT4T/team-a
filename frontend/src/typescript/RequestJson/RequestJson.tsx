import { HTTPCodes, HTTPMethods } from "./Constants"

const requestJSON = async (requestPath: any, method: HTTPMethods): Promise<any> => {
  await fetch(requestPath, { method })
    .then((res?: Response) => {
      if (res?.status === HTTPCodes.OK) {
        res?.json().then((response) => {
          return response
        })
      } else {
        console.error('Bad request, please try again.')
      }
    })
    .catch(console.error)
}

export default requestJSON