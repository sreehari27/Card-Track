import React from 'react'
import { useState } from 'react'

function EmiInfo({ EmiData }) {

    console.log('data:', EmiData);
    

    
    return (
        <div className="mt-8 p-4 flex justify-center">
  <div className="w-full max-w-4xl flex flex-col gap-4 text-center">
    <span className="bg-white rounded-xl shadow p-3">Principal: {EmiData.principal}</span>
    <span className="bg-white rounded-xl shadow p-3">Interest: {EmiData.interest}</span>
    <span className="bg-white rounded-xl shadow p-3">EMI Amount: {EmiData.emiAmount}</span>

    
  </div>
</div>

    )
}

export default EmiInfo
