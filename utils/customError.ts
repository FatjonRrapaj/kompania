import en from "@/translations/en";

interface CustomErrorArgs {
  errorKey: keyof typeof en.toastMessages;
}
interface CustomError {
  customError: keyof typeof en.toastMessages;
}

const generateCustomError = ({ errorKey }: CustomErrorArgs): CustomError => {
  return {
    customError: errorKey,
  };
};

export default generateCustomError;
