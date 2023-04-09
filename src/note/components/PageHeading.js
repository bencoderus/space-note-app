import React from 'react'

export const PageHeading = ({title, subtitle}) => {
  return (
    <div className='my-4'>
        <p className='text-2xl font-bold my-4'>{title}</p>
        <p>
            {subtitle}
        </p>
    </div>
  )
}

PageHeading.defaultProps = {
    subtitle: ""
}
