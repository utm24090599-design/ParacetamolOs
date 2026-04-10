export interface SendCodeRequestDto {
  email: string;
}

export interface VerifyCodeRequestDto {
  email: string;
  code: string;
}

export interface VerifyCodeResponseDto {
  token: string;
}
