import { FormSchema, type IFormScheme } from '../types';

const validateForm = (form: IFormScheme) => FormSchema.parse(form);
export default validateForm;
