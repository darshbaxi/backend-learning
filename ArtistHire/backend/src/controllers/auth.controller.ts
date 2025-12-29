import httpStatus from 'http-status'
import { Request, Response } from 'express'
import sendResponse  from '../utils/sendResponse'
import exclude from '../utils/exclude'
import { userService } from '../services'

const getUser = async (req:Request,res:Response) => {
    const userId = res.locals.user.id
    const user = await userService.getUser(userId)
    const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt'])
    sendResponse(res, httpStatus.OK, null, { user: userWithoutPassword }, 'User fetched successfully')
}
export default { getUser}