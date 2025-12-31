import bcrypt from 'bcryptjs'

const encryptPassword = async(password:string):Promise<string> => {
        return  await bcrypt.hash(password , 8)
}
export const isPasswordMatch = async (password: string, userPassword: string) => {
  return bcrypt.compare(password, userPassword)
}

export default encryptPassword