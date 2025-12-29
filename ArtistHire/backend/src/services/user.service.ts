import {User} from '@prisma/client'
import prisma from '../client'

const getUser = async (id:string): Promise<User> => {
    return  prisma.user.findUnique({
        where : {id}
    }) as Promise<User>
}

export default {getUser}