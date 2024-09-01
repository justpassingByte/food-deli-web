import React from 'react'

const InputBox = ({name,type,placeholder,id,value,icon,onChange}) => {
  return (
    <div className='relative w-[100%] mb4'>
    <input 
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        defaultValue={value} 
        onChange={onChange}
        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1'
            />
            <i className={"fi" +icon+ "input-icon"}></i>
</div>
  )
}

export default InputBox
