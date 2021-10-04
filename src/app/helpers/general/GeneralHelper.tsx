import ICustomer from "../../contracts/customer/ICustomer";
import IPromotionDetail from "../../contracts/promotion/IPromotionDetail";

class GeneralHelper {
  public static strLimit(text: string, length: number = 30): string {
    return typeof text !== "undefined" && text.length > length ? `${text.substring(0, length)} ...` : text;
  }

  public static getStatusInSpanish(baseStatus: string): string {
    let translation = "";

    switch (baseStatus) {
      case "success":
        translation = "Exitoso";
        break;

      case "pending":
        translation = "Pendiente";
        break;

      case "cancelled":
        translation = "Cancelado";
        break;

      case "rejected":
        translation = "Rechazado";
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
      return "Indefinido";
    }

    return `${name} ${surname}`;
  }

  public static getDNIForCustomer(customer: ICustomer): string {
    const { document, documentType } = customer;

    if (!document || !documentType) {
      return "Indefinido";
    }

    return `${documentType} ${document}`
  }

  public static formatPromotionDetail(details: any): string {
    let formattedDetail: string = '';

    if (typeof details !== 'object') {
      return 'No disponible';
    }

    details
      .forEach((detail: IPromotionDetail) => {
        const formattedPromotion: string = typeof detail === 'string' ? detail : `${detail.sku},${detail.price}`;

        formattedDetail = formattedDetail.length > 0 ?
          `${formattedDetail};${formattedPromotion}` :
          formattedPromotion;
      });

    return formattedDetail;
  }
}

export default GeneralHelper;
