export interface IAddressCoords {
  latitude: number,
  longitude: number,
}

interface IAddress {
  _id?: string,
  name: string,
  phone: string,
  surname: string,
  addressName: string,
  description: string,
  addressComplement: string,
  coordinates?: IAddressCoords,
}

export default IAddress;
