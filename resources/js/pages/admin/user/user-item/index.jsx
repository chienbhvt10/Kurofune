import React from 'react'
import { useTranslation } from 'react-i18next'
import './style.scss'

export const UserItem = ({identify}) => {
  const {i18n,t}= useTranslation()
  return (
    <div>{t(`admins.user.${identify}.title`)}</div>
  )
}
