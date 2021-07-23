class GeneralHelper {
  public static strLimit(text: string, length: number = 30): string {
    return text.length > length ? `${text.substring(0, length)} ...` : text;
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
}

export default GeneralHelper;
