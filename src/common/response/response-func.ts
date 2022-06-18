export default function response(status: number, resData: any) {
  return {
    status,
    data: resData,
  }
}