import IAddress from "../../contracts/general/address/IAddress";

class GeneralHelper {
  public static getDescription(address: IAddress): string {
    const { description } = address;

    if (!description) {
      return "Inválida";
    }

    return description;
  }

  public static getName(address: IAddress): string {
    const { name } = address;

    if (!name) {
      return "Sin nombre";
    }

    return name;
  }
}

export default GeneralHelper;
