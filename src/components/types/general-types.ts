export interface IUser {
  _id: {
    $oid: string
  },
  userName: string,
  googleId: string,
  entryDate: {
    $date: string,
  },
  __v: number
}
