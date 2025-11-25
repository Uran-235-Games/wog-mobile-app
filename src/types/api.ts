type ErrorResponse = {
  code: number;
  message: string;
};

export type ApiResponse<T = any> = {
  errors: ErrorResponse[];
  result: T;
  success: boolean;
};
