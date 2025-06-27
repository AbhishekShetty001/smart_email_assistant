import { useState } from 'react'
import './App.css'
import { Container, Typography } from '@mui/material';

function App() {
  const[emailContent,setEmaiContent]=useState('');
  const[tone,setTone]=useState('');
  const[loading,setLoading]=useState(false);
  const[generatedEmai,setGeneratedEmail]=useState('');
  const[error,setError]=useState('');
  



  return (
   <Container maxWidth="md" sx={{py:4}}>
    <Typography variant='h3' component="h1" gutterBottom>
      Email Reply Generator
    </Typography>

   </Container>
  )
}

export default App
