import React from 'react'

const UrlInfo = ({newUrl,cnt}) => {
  return (
    <>
    <span>Hashed url- <a href={newUrl}>{newUrl}</a></span>
    <span>Number of clicks-{cnt}</span>
    </>
  )
}

export default UrlInfo