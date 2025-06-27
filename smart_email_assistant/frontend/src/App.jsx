import { useState } from 'react'
import './App.css'
import { Box, Container,Button, Typography ,TextField,FormControl,InputLabel,Select,MenuItem, CircularProgress} from '@mui/material';
import axios from 'axios';

function App() {
  const[emailContent,setEmaiContent]=useState('');
  const[tone,setTone]=useState('');
  const[loading,setLoading]=useState(false);
  const[generatedEmail,setGeneratedEmail]=useState('');
  const[error,setError]=useState('');
  

  const handleSubmit = async()=>{
      setLoading(true);
      setError('');
      try{
        const response = await axios.post("http://localhost:8888/api/email/generate",{
          emailContent,tone
        });
        setGeneratedEmail(typeof response.data ==='string'? response.data : JSON.stringify(response.data))

      }catch(error){
        setError("fsiled to generste email reply.please try again");
        console.error(error);

      }finally{
        setLoading(false);
      }
  }

  return (
   <Container maxWidth="md" sx={{py:4}}>
    <Typography variant='h3' component="h1" gutterBottom>
      Email Reply Generator
    </Typography>
    <Box sx={{mx:3}}>
      <TextField fullWidth multiline rows={6}
      variant='outlined'
      label="Original Email Content"
      value={emailContent || ' '}
      onChange={(e)=> setEmaiContent(e.target.value)}
      sx={{mb:2}}/>
      <FormControl fullWidth sx={{mb:4}}>
        <InputLabel>Tone(Optional)</InputLabel>
        <Select
        value={tone || ''}
        label={"tone(optional)"}
        onChange={(e)=>setTone(e.target.value)}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value="professional">professional</MenuItem>
          <MenuItem value="friendly">Friendly</MenuItem>
          <MenuItem value="casual">Casual</MenuItem>
        </Select>
      </FormControl>
      <Button 
      variant='contained'
      onClick={handleSubmit}
      disabled={!emailContent || loading}>
        {loading ? <CircularProgress size={24} ></CircularProgress>: "generate reply"}

      </Button>

    </Box>
    {error && (
       <Typography color='error' sx={{mb:3}}>
      {error}
    </Typography>
    )}
    {generatedEmail &&(
      <Box sx={{mt:3}}>
        <Typography variant='h6' gutterBottom>
          generated Reply:
        </Typography>
        <TextField
        fullWidth
        multiline
        rows={6}
        variant='outlined'
        value={generatedEmail || ''}
        InputProps={{readOnly:true}} ></TextField>
        <Button
        variant='outlined'
        sx={{mt:2}}
        onClick={()=>navigator.clipboard.writeText(generatedEmail)}>
          copy to clipboard
        </Button>
      </Box>
    )}
   </Container>
  )
}

export default App
