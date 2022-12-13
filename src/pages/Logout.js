import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate()
    function logoutHandler(){
        localStorage.clear()
        navigate('/signin')
        window.location.reload()

    }
    return (

            <Button onClick={logoutHandler} sx={{ color: '#fff' }}>
                Logout
            </Button>
    )
}

export default Logout
