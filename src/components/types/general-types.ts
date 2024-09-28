export interface IUser {
  _id: string,
  userName: string,
  googleId: string,
  entryDate: {
    $date: string,
  },
  __v: number
}
