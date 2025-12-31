


import prisma from "../client"
import { User,TokenType } from "@prisma/client"
import userService from './user.service'
import exclude from "../utils/exclude"
import { isPasswordMatch } from "../utils/encryption"


const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<Omit<User, 'password'>> => {
  const user = await userService.getUserbyemail(email)

  if (user) {
    const provider = await prisma.provider.findUnique({
      where: {
        userId: user.id
      }
    })
    if (provider) {
      throw new Error('User registered through 3rd party auth')
    }
  }
  if (!user) {
    throw new Error('User does not exist')
  }
  if (!(await isPasswordMatch(password, user.password as string))) {
    throw new Error('Incorrect email or password')
  }
  return exclude(user, ['password'])
}


const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenData = await prisma.token.findFirst({
    where: {
      token: refreshToken,
      type: TokenType.REFRESH
    }
  })
  if (!refreshTokenData) {
    throw new Error('Not found')
  }
  await prisma.token.deleteMany({ where: { userId: refreshTokenData.userId } })
}

export default {loginUserWithEmailAndPassword,logout}