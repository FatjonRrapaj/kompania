import en from "@/translations/en";

interface CustomErrorArgs {
  errorKey: keyof typeof en.toastMessages;
}
interface CustomError {
  customCode: keyof typeof en.toastMessages;
}

const generateCustomError = ({ errorKey }: CustomErrorArgs): CustomError => {
  return {
    customCode: errorKey,
  };
};

export default generateCustomError;
