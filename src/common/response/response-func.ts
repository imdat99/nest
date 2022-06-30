import { HttpException, HttpStatus } from "@nestjs/common";

export default function response(statusCode: number, resData: any) {
  return {
    statusCode,
    data: resData,
  };
}

export function errorResponse(message: string) {
  throw new HttpException(message, HttpStatus.BAD_REQUEST)

}

export function paginateResponse(data: any, page: number, limit: number) {
  const [result, total] = data;
  const lastPage = Math.ceil(total / limit);
  const nextPage = Number(page) + 1 > lastPage ? null : Number(page) + 1;
  const prevPage = Number(page) - 1 < 1 ? null : Number(page) - 1;
  return {
    status: 200,
    data: result,
    count: total,
    currentPage: Number(page),
    nextPage: nextPage,
    prevPage: prevPage,
    lastPage: lastPage,
  };
}
