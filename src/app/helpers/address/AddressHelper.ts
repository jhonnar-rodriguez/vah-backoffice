import IAddress from "../../contracts/general/address/IAddress";

class AddressHelper {
  public static getDescription(address: IAddress): string {
    if (address === null) {
      return "Inválida";
    }

    const { description } = address;

    if (!description) {
      return "Inválida";
    }

    return description;
  }

  public static getName(address: IAddress): string {
    if (address === null) {
      return "Sin nombre";
    }

    const { name } = address;

    if (!name) {
      return "Sin nombre";
    }

    return name;
  }
}

export default AddressHelper;
