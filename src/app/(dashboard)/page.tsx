'use client'

// React Imports
import { useState } from 'react'
import type { FormEvent } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Type Imports
import { getIdTokenResult, signInWithEmailAndPassword } from 'firebase/auth'

import type { Mode } from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { firebaseAuth } from '@/libs/firebase-config'

import routers from '@/routes'

import { useAuthState } from 'react-firebase-hooks/auth'

import Loader from '@/components/common/Loader'
import UnProtectedWrapper from '@/components/authComp/UnProtectedWrapper'

const Login = ({ mode }: { mode: Mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [user, userLoading, userError] = useAuthState(firebaseAuth)

  // setting the form credentials
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<Record<string, any> | null>(null)

  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  // Hooks
  const router = useRouter()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleSubmit = async (email: string, password: string) => {
    // register user with email and password
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
      const user = userCredential.user

      // router.replace(routers.Dashboard)
    } catch (error) {
      console.error('Login failed:', error)
      setError({ message: 'Invalid Email or Passsword' })
    }
  }

  if (!userLoading) {
    if (user) {
      // checking to see the role of the user
      user.getIdTokenResult().then(result => {
        console.log(`user role is: ${result.claims.role}`)
        const role = result.claims.role;
        if (role === 'admin') {
          router.push('/admin')
        } else if (role === 'hotelManager') {
          router.push('/hotelManager');
        } else if (role === 'aircraftManager') {
          router.push('/aircraftManager');
        } 
      })
    }
  }

  return (
    <UnProtectedWrapper>
      <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
        <Card className='flex flex-col sm:is-[450px]'>
          <CardContent className='p-6 sm:!p-12'>
            <Link href='/' className='flex justify-center items-center mbe-6'>
              <Logo />
            </Link>
            <div className='flex flex-col gap-5'>
              <div>
                <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}!👋🏻`}</Typography>
                <Typography className='mbs-1'>Please sign-in to your account here</Typography>
                <Typography className='mbs-1' style={{ color: 'red' }}>
                  {error ? error.message : ''}
                </Typography>
              </div>
              <form
                noValidate
                autoComplete='off'
                onSubmit={e => {
                  e.preventDefault()
                  handleSubmit(email, password)
                }}
                className='flex flex-col gap-5'
              >
                <TextField
                  autoFocus
                  fullWidth
                  label='Email'
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                    setError(null)
                  }}
                />
                <TextField
                  fullWidth
                  label='Password'
                  id='outlined-adornment-password'
                  type={isPasswordShown ? 'text' : 'password'}
                  onChange={e => {
                    setPassword(e.target.value)
                    setError(null)
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                  <FormControlLabel control={<Checkbox />} label='Remember me' />
                  <Typography className='text-end' color='primary' component={Link} href='/forgot-password'>
                    Forgot password?
                  </Typography>
                </div>
                <Button fullWidth variant='contained' type='submit'>
                  Log In
                </Button>
                <div className='flex justify-center items-center flex-wrap gap-2'>
                  <Typography>New on our platform?</Typography>
                  <Typography component={Link} href='/register' color='primary'>
                    Create an account
                  </Typography>
                </div>
                <Divider className='gap-3'>or</Divider>
                <div className='flex justify-center items-center gap-2'>
                  <IconButton size='small' className='text-facebook'>
                    <i className='ri-facebook-fill' />
                  </IconButton>
                  <IconButton size='small' className='text-twitter'>
                    <i className='ri-twitter-fill' />
                  </IconButton>
                  <IconButton size='small' className='text-github'>
                    <i className='ri-github-fill' />
                  </IconButton>
                  <IconButton size='small' className='text-googlePlus'>
                    <i className='ri-google-fill' />
                  </IconButton>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
        <Illustrations maskImg={{ src: authBackground }} />
      </div>
    </UnProtectedWrapper>
  )
}

export default Login