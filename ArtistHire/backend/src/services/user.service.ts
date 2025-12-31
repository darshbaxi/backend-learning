import {User,RoleType} from '@prisma/client'
import prisma from '../client'
import encryptPassword from '../utils/encryption'

const getUser = async (id:string): Promise<User> => {
    return  prisma.user.findUnique({
        where : {id}
    }) as Promise<User>
}


const createUser = async (
  email: string,
  password: string,
  username: string,
  first_name: string,
  role: RoleType,
  last_name?: string
): Promise<User> => {

  if(await(getUserbyusername(username))){
     throw new Error('Username already taken')
  }
  if(await(getUserbyemail(email))){
     throw new Error('Username already taken')
  }
  const hashedPassword = await encryptPassword(password)

  const data: {
    email: string
    username: string
    password: string
    first_name: string
    role: RoleType
    last_name?: string
  } = {
    email,
    username,
    password: hashedPassword,
    first_name,
    last_name,
    role,
  }

  return prisma.user.create({
    data,
  })
}


const getUserbyemail = async <Key extends keyof User>(email:string, 
  keys:Key[]=['id', 'email', 'username', 'password', 'createdAt', 'updatedAt', 'role'] as Key[]):
  Promise<Pick<User,Key> | null> =>{
    return prisma.user.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<User, Key> | null>
}

const getUserbyusername = async <Key extends keyof User>(username:string, 
  keys:Key[]=['id', 'email', 'username', 'password', 'createdAt', 'updatedAt', 'role'] as Key[]):
  Promise<Pick<User,Key> | null> =>{
    return prisma.user.findUnique({
    where: { username },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<User, Key> | null>
}





export default {getUser, createUser, getUserbyemail, getUserbyusername}