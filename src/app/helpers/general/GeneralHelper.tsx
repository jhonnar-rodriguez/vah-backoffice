class GeneralHelper {
  public static strLimit(text: string, length: number = 30): string {
    return text.length > length ? `${text.substring(0, length)} ...` : text;
  }
}

export default GeneralHelper;
