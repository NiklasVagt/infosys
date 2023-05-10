export interface ErrorDto {
  message: string;
}

export const isErrorDto = (data: any): data is ErrorDto => !!data.message;
