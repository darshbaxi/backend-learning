

import jwt from 'jsonwebtoken'
import moment, { Moment } from 'moment'
import httpStatus from 'http-status'
import config from '../config/config'
import userService from './user.service'
import { Token, TokenType } from '@prisma/client'
import prisma from '../client'
import { AuthTokensResponse } from '../types/response'




const generateToken = (
  userId: string,
  expires: Moment,
  type: TokenType,
  secret = config.jwt.secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  }
  return jwt.sign(payload, secret)
}

const saveToken = async (
  token: string,
  userId: string,
  expires: Moment,
  type: TokenType
): Promise<Token> => {
  const createdToken = prisma.token.create({
    data: {
      token,
      userId: userId,
      expires: expires.toDate(),
      type
    }
  })
  return createdToken
}

const deleteAuthTokens = async (user: { id: string }): Promise<void> => {
  const tokens = await prisma.token.findMany({
    where: {
      userId: user.id,
      type: {
        in: ['ACCESS', 'REFRESH']
      }
    }
  })
  if (tokens) {
    await prisma.token.deleteMany({
      where: {
        userId: user.id,
        type: {
          in: ['ACCESS', 'REFRESH']
        }
      }
    })
  }
}

const generateAuthTokens = async (user: { id: string }): Promise<AuthTokensResponse> => {
  await deleteAuthTokens(user)

  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minute')
  const accessToken = generateToken(user.id, accessTokenExpires, TokenType.ACCESS)
  await saveToken(accessToken, user.id, accessTokenExpires, TokenType.ACCESS)

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days')
  const refreshToken = generateToken(user.id, refreshTokenExpires, TokenType.REFRESH)
  await saveToken(refreshToken, user.id, refreshTokenExpires, TokenType.REFRESH)

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  }
}


export default {generateAuthTokens}