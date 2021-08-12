import ICustomer from "../../contracts/customer/ICustomer";

class GeneralHelper {
  public static strLimit(text: string, length: number = 30): string {
    return typeof text !== "undefined" && text.length > length ? `${text.substring(0, length)} ...` : text;
  }

  public static getStatusInSpanish(baseStatus: string): string {
    let translation = "";

    switch (baseStatus) {
      case "success":
        translation = "Exitosa";
        break;

      case "pending":
        translation = "Pendiente";
        break;

      case "cancelled":
        translation = "Cancelada";
        break;

      case "rejected":
        translation = "Rechazada";
        break;

      default:
        translation = "Por Definir";
        break;
    }

    return translation;
  }

  public static getFullNameFromCustomer(customer: ICustomer): string {
    const { name, surname } = customer;

    if (!name || !surname) {
      return "Inválido";
    }

    return `${name} ${surname}`;
  }

  public static getDNIForCustomer(customer: ICustomer): string {
    const { document, documentType } = customer;

    if (!document || !documentType) {
      return "Inválido";
    }

    return `${documentType} ${document}`
  }
}

export default GeneralHelper;
