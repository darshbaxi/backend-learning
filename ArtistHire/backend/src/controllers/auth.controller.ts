import httpStatus from 'http-status'
import { Request, Response } from 'express'
import sendResponse  from '../utils/sendResponse'
import exclude from '../utils/exclude'
import { userService } from '../services'
// import encryptPassword from '../utils/encryption'
import { RoleType } from '@prisma/client'

const getUser = async (req:Request,res:Response) => {
    const userId = res.locals.user.id
    const user = await userService.getUser(userId)
    const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt'])
    sendResponse(res, httpStatus.OK, null, { user: userWithoutPassword }, 'User fetched successfully')
}


const register =async(req:Request,res:Response) => {
    try{const {email, password, username, first_name, last_name} = req.body
    const user = await userService.createUser(
        email,
        password,
        username,
        first_name,
        RoleType.CLIENT,
        last_name
    )
  const userWithoutPassword = exclude(user,['password', 'createdAt', 'updatedAt'])

  sendResponse(
    res,
    httpStatus.CREATED,
    null,
    { user: userWithoutPassword },
    'User created successfully'
  )}catch (error: any) {
        res.status(400).json({
        message: error.message,
        })
    }

}

export default { 
    getUser,
    register

}